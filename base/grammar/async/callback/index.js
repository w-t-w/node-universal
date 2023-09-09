// try {
//     interview((result) => {
//         console.log(`smile!${result}!`);
//     });
// } catch (e) {
//     console.log(`cry!${e.message}!`);
// }
//
// function interview(callback) {
//     setTimeout(() => {
//         const result = Math.random();
//         if (result > 0.3) {
//             callback('success!');
//         } else {
//             throw new Error('failed!');
//         }
//     }, 200);
// }
// try {
interview((err, result) => {
    if (err) return console.log(`cry!${err.message}!`);
    console.log(`smile!${result}!`);
});
// } catch (e) {
//     console.log(`cry!${e.message}!`);
// }

function interview(callback) {
    setTimeout(() => {
        const result = Math.random();
        if (result > 0.3) {
            callback(null, 'success!');
        } else {
            const error = new Error('failed!');
            callback(error);
        }
    }, 200);
}