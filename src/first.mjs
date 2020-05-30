const fail = function() {
    return Promise.reject(new TypeError("[useful-promises/first] At least one function must be provided."));
};

const run = function(list) {
    if (!list.length) {
        return fail();
    }

    const promises = [...list];

    return new Promise((resolve, reject) => {
        let promise = Promise.resolve();

        const errors = [];

        const doTry = function(error) {
            if (error) {
                errors.push(error);
            }
            const fn = promises.shift();
            if (typeof fn !== "function") {
                const finalError = new Error("[useful-promises/first] Everything failed.");
                finalError.details = {
                    errors,
                };
                reject(finalError);
            }
            promise = promise.then(fn).then(resolve, doTry);
        };

        doTry();
    });
};

/**
 * Executes given functions one by one, awaiting results and returns first non-failing result.
 * @param {...function|Array<function>} args
 * @returns {Promise<any>}
 */
const first = function(...args) {
    if (args.length === 1) {
        return run(Array.isArray(args[0]) ? args[0] : [args[0]]);
    }
    return run(args);
};

export default first;
