Twilio + Cypress
--
> Get verification SMS and send it via Cypress automation framework

```js
const accountSid = 'AC793683c4982a14f01714321bd3f90ca7';
const authToken = '819068e54369ac58bb8aad976fa517bc';

describe('Login with github credentials', () => {
    beforeEach(()=>{
        cy.visit('https://github.com/login');
        cy.get('#login_field').type('your_github_email');
        cy.get('#password').type('your_github_password');
        cy.get('input[type="submit"]').click()
    })
    it('Get SMS and apply it in 2FA form', () => {
        cy.request({
            method: 'GET',
            url: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            auth: {
                username: accountSid,
                password: authToken,
                AuthMethod: 'BasicAuth',
            }
        })
            .its('body').then((res) => {
            cy.wait(1500) //wait for SMS
            const otpcode = res.messages[0].body.substring(0, 6)
            cy.get('#otp').type(otpcode);
            cy.url().should('eq', 'https://github.com/');
        })
    });
});
```
