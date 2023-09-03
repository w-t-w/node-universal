// try {
//     interview((result) => {
//         console.log(result);
//     });
// } catch (err) {
//     console.log(err.message);
// }
// function interview(callback) {
//     setTimeout(() => {
//         const interviewResult = Math.random();
//         if (interviewResult > 0.8) {
//             console.log('success');
//             callback('smile');
//         } else {
//             console.log('failed');
//             throw new Error('cry');
//         }
//     }, 3000);
// }
require('./complete');