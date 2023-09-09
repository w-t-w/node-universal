(async function () {
    try {
        await interview(1);
        await interview(2);
        await interview(3);
        console.log('smile!');
    } catch (e) {
        console.log(`cry at round ${e.round}!`);
    }
})();

function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = Math.random();
            if (result > 0.3) {
                resolve('success');
            } else {
                const err = new Error('failed');
                err.round = round;
                reject(err);
            }
        }, 500);
    });
}