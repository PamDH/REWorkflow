class ListingsPage {
    get listingsButton() {return cy.get('[href="/featured-listings"]')}; 
 
    get priceElement() {
        return cy.get('[viewBox="0 0 1920 1280"]').parent();
      }
    
    checkPriceWithinRange(min, max) {
      this.priceElement.then((element) => {
        const text = element.text();
        const cleanedText = text.replace(/[^0-9]/g, '');
        const priceValue = parseInt(cleanedText, 10);
        expect(priceValue).to.be.within(min, max);
      });
    }    

    comparePrice(expectedPrice) {
      this.priceElement.then((element) => {
        const expectedPriceNumber = Number(expectedPrice);
        const text = element.text();
        const cleanedText = text.replace(/[^0-9]/g, '');
        const priceValue = parseInt(cleanedText, 10);
        expect(priceValue).to.equal(expectedPriceNumber);
      });
    }

    verifyLargeImage(imageKeyword) {
      cy.get('[alt="large image"]')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('include', imageKeyword);
    }
}

export default new ListingsPage();