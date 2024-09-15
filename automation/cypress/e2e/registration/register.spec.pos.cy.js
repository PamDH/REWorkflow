import { faker } from '@faker-js/faker';
import RegisterPage from "../../page_objects/registration.page";
import DashboardPage from "../../page_objects/dashboard.page";

const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.string.uuid()
}

let user
let error

describe('Register', () => {
    before(() => {
        cy.fixture("testData/userCredentials.json").then((data) => {
            user = data;
        })

        cy.fixture('testData/errorText.json').then((data) => {
            error = data;
        })
    })

    beforeEach(() => {
        cy.visit('/auth/register')
    })

    it('Should register a new account', () => {
        RegisterPage.registerAccount(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password
        )
            
        cy.url().should("include", "dashboard/user/profile")
        cy.contains('role: user');
        cy.contains(userData.firstName);
        cy.contains(userData.lastName);

        DashboardPage.userIconButton.click();
        DashboardPage.logoutButton.click();
        cy.url().should('include', 'auth/login')

        cy.apiLogin(userData.email, userData.password);
    })  

    it('Should not register with an already existing email account', () => {
        RegisterPage.registerAccount(
            user.firstName,
            user.lastName,
            user.email,
            user.password
        )
       
        RegisterPage.errorAlert.should('have.text', error.validationFailed).and('be.visible');
    })

    it('Should not register without filling in required credentials', () => {
        RegisterPage.registerButton.click();

        cy.contains(error.firstNameRequired);
        cy.contains(error.lastNameRequired);
        cy.contains(error.emailRequired);
        cy.contains(error.passwordRequired);
    })
})