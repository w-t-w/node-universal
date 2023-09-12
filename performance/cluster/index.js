const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpu = os.cpus();
    // for (let i = 0; i < cpu.length; i++) {
    //     cluster.fork();
    // }
    // RoundRobinHandler
    // free list
    // 内存管理 池的概念
    for (let i = 0; i < cpu.length / 2; i++) {
        cluster.fork();
    }
} else {
    require('../../project');
}
