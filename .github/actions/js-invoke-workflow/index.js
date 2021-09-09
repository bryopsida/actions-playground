const core  = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token');
        const context = github.context;
        core.info(`invoked by ${context.actor} on ${context.repo.repo}, owner is ${context.repo.owner}`);
        const octokit = github.getOctokit(token);
        const result = await octokit.rest.actions.createWorkflowDispatch({
            owner: context.repo.owner,
            repo: context.repo.repo,
            workflow_id: 'invoke-js-action',
            ref: 'master'
        });
        core.info(`result of action invoke = ${JSON.stringify(result)}`);
    } catch(error) {
        core.setFailed(error.message);
    }
}

run();