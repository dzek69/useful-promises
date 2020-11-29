const DEFAULT_INTERVAL = 50;

const waitFor = (fn, interval = DEFAULT_INTERVAL, timeout = Infinity) => {
    return new Promise((resolve, reject) => {
        let intervalTimer, failTimer;

        if (isFinite(timeout)) {
            failTimer = setTimeout(() => {
                reject(new Error("Timeout"));
                clearInterval(intervalTimer);
            }, timeout);
        }

        intervalTimer = setInterval(() => {
            if (fn()) {
                clearTimeout(failTimer);
                clearInterval(intervalTimer);
                resolve();
            }
        }, interval);
    });
};

export default waitFor;
