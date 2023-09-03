async function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const interviewRandom = Math.random();
            if (interviewRandom > 0.3) {
                resolve('success');
            } else {
                const err = new Error('failed');
                err.round = round;
                reject(err);
            }
        }, 500);
    });
}

(async function () {
    try {
        await interview(1);
        await interview(2);
        await interview(3);
        await interview(4);
    } catch (err) {
        return console.log(`cry at round ${err.round}!`);
    }
    console.log('smile');
})();