const fail = function() {
    return Promise.reject("[useful-promises] Nothing was provided.");
};

const first = function(... args) {
    if (args.length === 1) {
        return run(Array.isArray(args[0]) ? args[0]: [args[0]]);
    }
    return run(args);
};

const run = function(list) {
    if (!list.length) {
        return fail();
    }

    const promises = [... list];

    return new Promise(function(resolve, reject) {
        let promise = Promise.resolve();

        const doTry = function() {
            const fn = promises.shift();
            if (typeof fn !== "function") {
                reject("[useful-promises] All failed.");
            }
            promise = promise.then(fn).then(resolve, doTry);
        };

        doTry();
    });
};

module.exports = first;
