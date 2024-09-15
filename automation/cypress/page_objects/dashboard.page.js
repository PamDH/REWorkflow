class DashboardPage {
    get userIconButton() {return cy.get('button [data-testid="PersonIcon"]')};
    get logoutButton() {return cy.contains('Logout')};
    get realEstateDropdown() {return cy.contains('Real Estate')};
    get realEstateCreate() {return cy.contains('create')};
}

export default new DashboardPage();