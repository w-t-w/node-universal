const game = require('./game');

let playerWonCount = 0,
    playerWonResultEnum = 1;

console.log('剪刀、石头、布游戏正式开始!');
console.log('请输入您的手势:[rock、scissors or paper]');

process.stdin.on('data', data => {
    data = data.toString().trim();
    const result = game(data);

    if (result === playerWonResultEnum) {
        playerWonCount++;
        if (playerWonCount >= 3) {
            console.log('你太厉害了!我不跟你玩儿了!');
            process.exit(1);
        }
    }

    console.log('请输入您的手势:[rock、scissors or paper]');
});
