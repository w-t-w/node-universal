// function interview(round) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const interviewRandom = Math.random();
//             if (interviewRandom > 0.3) {
//                 resolve('success');
//             } else {
//                 const error = new Error('failed');
//                 error.round = round;
//                 reject(error);
//             }
//         }, 500);
//     });
// }
//
// interview(1)
//     .then(() => {
//         return interview(2);
//     })
//     .then(() => {
//         return interview(3);
//     })
//     .then(() => {
//         return interview(4)
//     })
//     .then(() => {
//         console.log('smile');
//     })
//     .catch(err => {
//         console.log(`cry at round ${err.round}!`);
//     });
require('./company');