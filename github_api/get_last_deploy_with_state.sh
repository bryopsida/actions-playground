#!/bin/sh
env=$1
state=$2

jsonArr="["
for status_url in $(curl -s -H "Authorization: token $GITHUB_PAT" https://api.github.com/repos/bryopsida/actions-playground/deployments\?environment\=$env | jq '.[].statuses_url')
do
    url=$(echo $status_url | sed 's/\"//g')
    status_info=$(curl -s -H "Authorization: token $GITHUB_PAT" $url | jq '.[] | select(.state == "'$state'")')
    if [ "$status_info" != "" ]; then
        if [ "$jsonArr" == "[" ]; then
            jsonArr="$jsonArr $status_info"
        else
            jsonArr="$jsonArr,$status_info"
        fi
    fi
done
jsonArr="$jsonArr]"
if [ "$jsonArr" == "[]" ]; then
    echo "No deployment found"
    exit 1
fi
sortedJsonArr=$(echo "$jsonArr" | jq 'sort_by(.updated_at) | reverse')
lastDeployStatus=$(echo "$sortedJsonArr" | jq 'first(.[])')
lastDeployUrl=$(echo "$lastDeployStatus" | jq '.deployment_url' | sed 's/\"//g')
echo "$lastDeployUrl"