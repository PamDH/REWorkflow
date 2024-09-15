import LoginPage from "../../page_objects/login.page";
import DashboardPage from "../../page_objects/dashboard.page";
import HomePage from "../../page_objects/home.page";

let user

describe('Login', () => {
    before(() => {
        cy.fixture("testData/userCredentials.json").then((data) => {
            user = data
        })
    })
    
    beforeEach(() => {
        cy.visit('/')
    })

    it('Should log in with existing account', () => {
        HomePage.loginButton.click();
        LoginPage.login(user.email, user.password)
        cy.contains('role: admin');
        cy.contains(user.firstName);
        cy.contains(user.lastName);
    })

    it('Should log out', () => {
        HomePage.loginButton.click();
        cy.apiLogin(user.email, user.password);
         
        cy.visit('dashboard/user/profile')
        DashboardPage.userIconButton.click();
        DashboardPage.logoutButton.click();

        cy.url().should('include', 'auth/login')
    })
})