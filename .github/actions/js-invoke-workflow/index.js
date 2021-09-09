const core  = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getIput('token');
        const octokit = github.getOctokit(token);
        const result = await octokit.rest.createWorkflowDispatch({
            owner: 'bryopsida',
            repo: 'actions-playground',
            workflow_id: 'invoke-invoke.yml',
            ref: 'master'
        });
        core.info(result);
    } catch(error) {
        core.setFailed(error.message);
    }
}

run();