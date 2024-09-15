class RegisterPage {
    get firstNameInput() { return cy.get('[name="firstName"]') };
    get lastNameInput() { return cy.get('[name="lastName"]') };
    get emailInput() { return cy.get('[name="email"]') };
    get passwordInput() { return cy.get('[name="password"]') };
    get registerButton() {return  cy.get('[type="submit"]')};
    get userIconButton() {return cy.get('a [data-testid="PersonIcon"]')};
    get menuOptions() {return cy.get('a[role="menuitem"]')};
    get errorAlert() { return cy.get('[role="alert"]'); };

    registerAccount(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.registerButton.click();
    }
}

export default new RegisterPage();