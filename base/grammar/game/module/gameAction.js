module.exports = function game(player_action) {
    const selection = ['rock', 'scissors', 'paper'],
        selection_length = selection.length;

    player_action = selection.includes(player_action) ? player_action : 'rock';

    const computer_random = Math.floor(Math.random() * selection_length),
        computer_action = selection[computer_random];

    console.log(`电脑手势: ${computer_action}! 你的手势: ${player_action}!`);

    if (computer_action === player_action) {
        console.log('平局!');
    } else if (differentActionJudgement(player_action, computer_action)) {
        console.log('你赢了!');
    } else {
        console.log('你输了!')
    }

    function differentActionJudgement(player, computer) {
        let player_index = null;
        for (let [key, value] of selection.entries()) {
            if (value === player)
                player_index = key;
        }
        if (player_index === (selection_length - 1))
            player_index = -1;
        return computer === selection[++player_index];
    }
};