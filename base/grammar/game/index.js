const argv = process.argv,
    argv_length = argv.length,
    argv_last_element = argv[argv_length - 1];

const selection = ['rock', 'scissors', 'paper'],
    selection_length = selection.length;

const player_action = argv_length > 2 && selection.includes(argv_last_element) ? argv_last_element : 'rock';

const computer_random = Math.floor(Math.random() * selection_length),
    computer_action = selection[computer_random];

console.log(`电脑的手势: ${computer_action}! 你的手势: ${player_action}!`);

if (computer_action === player_action) {
    console.log('平局!');
} else if (differentActionJudgement(player_action, computer_action)) {
    console.log('你赢了!');
} else {
    console.log('你输了!');
}

function differentActionJudgement(player, computer) {
    let player_index = 0;
    for (let [key, value] of selection.entries()) {
        if (value === player_action)
            player_index = key;
    }
    if (player_index === (selection_length - 1))
        player_index = -1;
    return computer === selection[++player_index];
}