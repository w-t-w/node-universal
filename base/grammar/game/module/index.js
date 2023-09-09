const game = require('./gameAction');

console.log(`剪刀、石头、布游戏现在开始!`);
console.log(`请输入您的手势:(rock、scissors or paper)`);
process.stdin.on('data', result => {
    game(result.toString().trim());
    console.log(`请输入您的手势:(rock、scissors or paper)`);
});