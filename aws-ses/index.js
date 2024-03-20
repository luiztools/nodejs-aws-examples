//index.js
const SQS = require("./sesClient");

(async () => {

    try {
        //SQS.addEmailIdentity('contato@luiztools.com.br');
        //SQS.setMailFromDomain('luiztools.com.br', 'smtp.luiztools.com.br');
        //SQS.sendEmail('contato@luiztools.com.br', 'luizfduartejr@gmail.com', 'mais umteste', 'just another test text');
    }
    catch (error) {
        console.log(`ERRO: ${error}`);
    }
})();