interview((err, result) => {
    if (err) return console.error(`cry!${err.message}!`);
    console.log(`smile!${result}!`);
});

function interview(callback) {
    setTimeout(() => {
        const interviewResult = Math.random();
        if (interviewResult > 0.3) {
            callback(null, 'success');
        } else {
            callback(new Error('failed'));
        }
    }, 3000);
}