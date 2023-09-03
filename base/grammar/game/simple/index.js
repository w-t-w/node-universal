const argv = process.argv,
    argv_length = argv.length;

const argv_pop = argv[argv_length - 1];

const selection = ['rock', 'scissors', 'paper'];

const player_action = (argv_length > 2 && selection.includes(argv_pop)) ? argv_pop : 'rock';

const computer_random = Math.random() * selection.length;
let computer_action = selection[Math.floor(computer_random)];

/**
 * 斗兽棋、剪刀石头布等线性游戏判断标准
 * @param player
 * @param computer
 * @returns {boolean}
 */
function differentActionJudgement(player, computer) {
    let playerKey = null;
    for (let [key, action] of selection.entries()) {
        if (action === player) {
            playerKey = key;
            break;
        }
    }
    if ((playerKey + 1) >= selection.length) {
        playerKey = -1;
    }
    return computer === selection[++playerKey];
}

console.log(`电脑: ${computer_random} ${computer_action}`);
if (player_action === computer_action) {
    console.log('平局!');
} else if (differentActionJudgement(player_action, computer_action)) {
    console.log('你赢了!');
} else {
    console.log('你输了!');
}

