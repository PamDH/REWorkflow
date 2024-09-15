class LoginPage {
    get emailInput() { return cy.get('[name="email"]') };
    get passwordInput() { return cy.get('[name="password"]') };
    get loginButton() { return cy.contains('Login') };
    get logoutButton() { return cy.contains('Logout') };

    login(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.loginButton.click();
    }
}

export default new LoginPage();