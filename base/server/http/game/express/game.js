module.exports = function game(player_action) {
    const selection = ['rock', 'scissors', 'paper'];
    const selection_length = selection.length;

    player_action = (typeof player_action !== 'undefined' && selection.includes(player_action)) ? player_action : 'rock';

    const computer_random = Math.floor(Math.random() * selection_length);
    const computer_action = selection[computer_random];

    function differentActionJudgement(player, computer) {
        let player_key = null;
        for (let [key, value] of selection.entries()) {
            if (player === value) {
                player_key = key;
                break;
            }
        }
        if (player_key + 1 === selection_length) {
            player_key = -1;
        }
        return computer === selection[++player_key];
    }

    console.log(`电脑的手势: ${computer_random} ${computer_action}`);

    if (player_action === computer_action) {
        return 0;
    } else if (differentActionJudgement(player_action, computer_action)) {
        return 1;
    } else {
        return -1;
    }
};