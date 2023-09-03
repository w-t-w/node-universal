function interview(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const interviewRandom = Math.random();
            if (interviewRandom > 0.3) {
                resolve('success');
            } else {
                const error = new Error('failed');
                error.name = name;
                reject(error);
            }
        }, 500);
    });
}

const company = ['tencent', 'geekBang'];
Promise.all(company.map(value => interview(value)))
    .then(() => {
        console.log('smile');
    })
    .catch((err) => {
        console.log(`cry at ${err.name} company!`);
    });