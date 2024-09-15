class NewListingPage {
    get titleInput() {return cy.get('[name="title"]')}; 
    get descriptionInput() {return cy.get('[name="description"]')};
    get cityInput() {return cy.get('[name="city"]')};
    get addressInput() {return cy.get('[name="address"]')};
    get zipcodeInput() {return cy.get('[name="zipCode"]')};
    get stateDropdown() {return cy.contains('label', 'State').parent().find('[variant="outlined"]')};
    get priceInput() {return cy.get('[name="price"]')};
    get bedroomsInput() {return cy.get('[name="bedrooms"]')};
    get bathroomsInput() {return cy.get('[name="bathrooms"]')};
    get garageInput() {return cy.get('[name="garage"]')};
    get sqFtInput() {return cy.get('[name="sqft"]')};
    get lotSizeInput() {return cy.get('[name="lotSize"]')};
    get setPublish() {return cy.contains('Publish')};
    get setImage() {return cy.get('input[accept="image/*"]')};
    get postButton() {return cy.get('[type="submit"]')};

    createNewListing(listing) {
        this.titleInput.type(listing.title);
        this.descriptionInput.type(listing.description);
        this.cityInput.type(listing.city);
        this.addressInput.type(listing.address);
        this.zipcodeInput.type(listing.zipCode);
        this.stateDropdown.click();
        this.stateSearch(listing.state).click();
        this.priceInput.type(listing.price);
        this.bedroomsInput.type(listing.bedrooms);
        this.bathroomsInput.type(listing.bathrooms);
        this.garageInput.type(listing.garage);
        this.sqFtInput.type(listing.sqft);
        this.lotSizeInput.type(listing.lotSize);
        this.setPublish.click();
        this.setImage.attachFile(listing.image);
        this.postButton.click();
    }

    stateSearch(stateName) {return cy.contains(stateName)};
}

export default new NewListingPage();
