const core  = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token');
        const context = github.context;
        const octokit = github.getOctokit(token);
        const result = await octokit.rest.actions.createWorkflowDispatch({
            owner: context.actor,
            repo: context.repo,
            workflow_id: 'invoke-invoke.yml',
            ref: 'master'
        });
        core.info(result);
    } catch(error) {
        core.setFailed(error.message);
    }
}

run();