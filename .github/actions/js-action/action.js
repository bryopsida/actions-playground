const core  = require('@actions/core');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function run() {
    for(let i = 0; i < 10; i++) {
        core.info('sleeping for 1s');
        await sleep(1000);
    }
    core.info('done');
}

run();