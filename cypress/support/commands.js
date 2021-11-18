// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getTwilloCode", ({accountSid, authToken, telFrom, telTo}) => {
    const twilio = require('twilio');
    const LIMIT = 1;
    const client = new twilio(accountSid, authToken);
    client.messages.list({
        // dateSent: new Date(Date.UTC(2021, 1, 14, 0, 0, 0)),
        from: telFrom,
        to: telTo,
        limit: LIMIT
    })
        // .then(messages => messages.forEach(m => cy.log(m.sid,m.body)));
        .then(result => {
            console.log(result);
            return result;
        });
});
