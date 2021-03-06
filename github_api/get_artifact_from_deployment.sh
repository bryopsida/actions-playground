#!/usr/bin/env bash
deploy_url="${1}"
artifact_workflow_name="${2}"
artifact_name="${3}"

deploy_obj=$(curl -s -H "Authorization: token $GITHUB_PAT" "$deploy_url")
sha=$(echo "$deploy_obj" | jq -r '.sha')
workflow_run=$(curl -s -H "Authorization: token $GITHUB_PAT" "https://api.github.com/repos/bryopsida/actions-playground/actions/workflows/$artifact_workflow_name/runs")
artifacts_url=$(echo $workflow_run | jq 'first(.workflow_runs[] | select(.head_sha == "'$sha'") ) | .artifacts_url' | tr -d '"')
if [ -z "$artifacts_url" ]; then
  echo "No artifacts found"
  exit 1
fi
artifacts=$(curl -s -H "Authorization: token $GITHUB_PAT" "$artifacts_url")
archive_download_url=$(echo $artifacts | jq '.artifacts[] | select(.name == "'$artifact_name'") | .archive_download_url' | tr -d '"')
if [ -z "$archive_download_url" ]; then
  echo "No artifact found"
  exit 1
fi
curl -s -O -J -L -H "Authorization: token $GITHUB_PAT" "$archive_download_url"
unzip "$artifact_name".zip