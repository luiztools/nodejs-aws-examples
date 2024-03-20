//setup.js
require("dotenv").config();
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });

async function sendEmail(fromAddress, toAddress, subject, body) {
    const ses = new AWS.SESV2();
    var params = {
        Content: {
            Simple: {
                Body: {
                    Html: { Data: body, Charset: 'UTF-8' }//ISO-8859-1
                },
                Subject: { Data: subject, Charset: 'UTF-8' }//ISO-8859-1
            }
        },
        Destination: { ToAddresses: [toAddress] },
        FeedbackForwardingEmailAddress: fromAddress,
        FromEmailAddress: fromAddress,
        ReplyToAddresses: [fromAddress]
    }
    const response = await ses.sendEmail(params).promise();
    console.log(response);
}

//para criar um novo domínio de email na AWS, use a função abaixo
async function addEmailIdentity(domainOrEmail) {
    const ses = new AWS.SESV2();
    const params = { EmailIdentity: domainOrEmail };
    const response = await ses.createEmailIdentity(params).promise();
    console.log(response);
}

//para retornar novamente as informações de DKIM de um domínio, use a função abaixo
async function getEmailIdentity(domainOrEmail) {
    const ses = new AWS.SESV2();
    const params = { EmailIdentity: domainOrEmail };
    const response = await ses.getEmailIdentity(params).promise();
    console.log(response);
}

//para retornar o token TXT para ser inserido no DNS do domínio
async function getIdentityVerificationAttributes(domain) {
    const ses = new AWS.SES();
    const params = { Identities: [domain] };
    const response = await ses.getIdentityVerificationAttributes(params).promise();
    console.log(response);
}

async function setMailFromDomain(domain, subdomain) {
    const ses = new AWS.SESV2();
    const params = {
        EmailIdentity: domain,
        BehaviorOnMxFailure: 'USE_DEFAULT_VALUE',
        MailFromDomain: subdomain
    };
    const response = await ses.putEmailIdentityMailFromAttributes(params).promise()
    console.log(JSON.stringify(response));
}

module.exports = { sendEmail, addEmailIdentity, getEmailIdentity, getIdentityVerificationAttributes, setMailFromDomain }