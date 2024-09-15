class HomePage {
    get loginButton() {return cy.get('[href="/auth/login"]')};
    get registerButton() {return cy.get('[href="/auth/register"]')};
    get setNightMode() { return cy.get('input[type="checkbox"]') };
    get setCheckBox() { return cy.get('input[type="checkbox"]').should('be.checked')};
    get keywordInput() {return cy.contains('label', 'Search').parent().find('input')};
    get bedroomsDropdown() {return cy.contains('label', 'Bedrooms').parent().find('[variant="outlined"]')};
    get priceElement() {return cy.get('[class="MuiBox-root css-6yrxxf"]').eq(0)};
    get stateDropdown() {return cy.contains('label', 'State').parent().find('[variant="outlined"]')};
    get cityInput() {return cy.contains('label', 'City').parent().find('input')};
    get searchButton() {return cy.get('button [width="1em"]')};

    get anyListingMoreInfo() { return cy.get('a[tabindex="0"]').eq(0).parent().then(($parent) => {
      cy.contains('More Info').click();
    }) }

    comparePrice(expectedPrice) {
      this.priceElement.then((element) => {
        const expectedPriceNumber = Number(expectedPrice);
        const text = element.text();
        const cleanedText = text.replace(/[^0-9]/g, '');
        const priceValue = parseInt(cleanedText, 10);
        expect(priceValue).to.equal(expectedPriceNumber);
      });
    }

    verifyAllBedrooms(expectedBedrooms) {
      cy.get('[viewBox="0 0 2048 1280"]').parent().each((textParam) => {
        const lastValue = textParam.text().split(' ').pop();
        cy.wrap(parseInt(lastValue)).should('be.gte', expectedBedrooms);
      })
    }

    verifyBedroomsRandomListing(expectedBedrooms) {
      cy.get('[viewBox="0 0 2048 1280"]').eq(0).parent().then(($parent) => {
        cy.contains('More Info').click();
        const text = $parent.text().split(' ').pop();
        cy.wrap(parseInt(text)).should('be.gte', expectedBedrooms);
      })
    }

    verifyStateValue(expectedState) {
      cy.get('[viewBox="0 0 100 100"]').parent().each((textParam) => {
        const stateValue = textParam.text().split(':').pop().trim();
        expect(stateValue).to.equal(expectedState);
      });
    }

    searchByKeyword(keyword) {this.keywordInput.type(keyword)};
    bedroomsSearch(dataValue) {return cy.get(`[data-value="${dataValue}"]`)}; 
    stateSearch(dataValue) {return cy.get(`[data-value="${dataValue}"]`)};
  }

  export default new HomePage();