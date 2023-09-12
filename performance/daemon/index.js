const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    // const cpu = os.cpus();
    // for (let i = 0; i < cpu.length / 2; i++) {
    let pingCount = 0,
        pingMax = 3;
    for (let i = 0; i < 1; i++) {
        const worker = cluster.fork();
        // 心跳检测,检测僵尸进程
        const zombie_timer = setInterval(() => {
            console.log('ping!');
            worker.send('ping!');
            pingCount++;
            if (pingCount >= pingMax) {
                process.kill(worker.process.pid);
                clearInterval(zombie_timer);
            }
            worker.on('message', msg => {
                if (msg === 'pong!') {
                    pingCount--;
                }
            });
        }, 100);
    }
    // 宕机重载
    cluster.on('exit', () => {
        const exit_timer = setTimeout(() => {
            clearTimeout(exit_timer);
            cluster.fork();
        }, 3000);
    });
} else {
    // 异常监控
    process.on('uncaughtException', error => {
        console.log('error: ', error);
        process.exit(1);
    });
    // 内存监控
    const memory_timer = setInterval(() => {
        const rss = process.memoryUsage.rss();
        // console.log(`memory usage: ${rss}`);
        if (rss > 200 * 1024 * 1024) {
            console.log('oom');
            clearInterval(memory_timer);
            process.exit(1);
        }
    }, 3000);
    process.on('message', msg => {
        if (msg === 'ping!') {
            console.log('pong!');
            process.send('pong!');
        }
    });
    require('../../project');
}