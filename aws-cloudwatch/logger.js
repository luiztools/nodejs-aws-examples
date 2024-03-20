const AWS = require('aws-sdk');

async function describeLogStreams() {
    const cloudwatchlogs = new AWS.CloudWatchLogs({ region: process.env.AWS_CW_REGION });
    const params = { logGroupName: process.env.AWS_CW_GROUP, };
    return cloudwatchlogs.describeLogStreams(params).promise();
}

let nextSequenceToken = null;
async function createLog(message) {
    if (!nextSequenceToken) {
        const res = await describeLogStreams();
        nextSequenceToken = res.logStreams[0].uploadSequenceToken;
    }

    const cloudwatchlogs = new AWS.CloudWatchLogs({ region: process.env.AWS_CW_REGION });
    const params = {
        logEvents: [{ message, timestamp: (new Date()).getTime() }],
        logGroupName: process.env.AWS_CW_GROUP,
        logStreamName: process.env.AWS_CW_STREAM,
        sequenceToken: nextSequenceToken
    };
    const response = await cloudwatchlogs.putLogEvents(params).promise();
    nextSequenceToken = response.nextSequenceToken;
    return response;
}

module.exports = { createLog }