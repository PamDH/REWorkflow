import HomePage from "../../page_objects/home.page";
import ListingsPage from "../../page_objects/listings.page";

let user;
let newListing;

describe('Featured Listing Page Search Functionality', () => {
  before(() => {
    cy.fixture("testData/userCredentials.json").then((data) => {
      user = data;
      cy.apiLogin(user.email, user.password);  
    })

    cy.createListing();
    
    cy.get('@createdListing').then((createdListing) => {
      expect(createdListing).to.have.property('title');
      newListing = createdListing
    })  
  })

  beforeEach(() => {
      cy.visit('/featured-listings')
      HomePage.setNightMode.click();
      HomePage.setCheckBox;
  })

  it('should search by Keyword', () => {
    HomePage.keywordInput.type('quaint');
    HomePage.searchButton.click();

    cy.contains(newListing.title).should('have.length', 1); 
  })

  it('should search by number of Bedrooms', () => {
    const parsedBedrooms = parseInt(newListing.bedrooms, 10);

    HomePage.bedroomsDropdown.click();
    HomePage.bedroomsSearch(parsedBedrooms).click();
    HomePage.searchButton.click();

    HomePage.verifyAllBedrooms(parsedBedrooms);
    HomePage.verifyBedroomsRandomListing(parsedBedrooms);
  }); 

  it('should search by Price', () => { 
    cy.visit('/featured-listings?price=500000-600000');
    cy.url().should('include', '/featured-listings?price=500000-600000');
    
    HomePage.anyListingMoreInfo;
    ListingsPage.checkPriceWithinRange(500000, 600000);
  })

  it('should search by State', () => {
    HomePage.stateDropdown.click();
    HomePage.stateSearch(newListing.state).click();
    HomePage.searchButton.click();

    HomePage.verifyStateValue(newListing.state);
  })

  it('should search by City and verify search page data matches details page data', () => {
    HomePage.cityInput.type(newListing.city);
    HomePage.searchButton.click();

    cy.contains(newListing.city).should('have.length', 1);     

    cy.contains(newListing.title);
    cy.contains(newListing.address);
    HomePage.comparePrice(newListing.price);
    cy.contains(newListing.sqft);
    cy.contains(newListing.bedrooms);
    cy.contains(newListing.city);
    cy.contains(newListing.zipCode);
    cy.contains(newListing.garage);
    cy.contains(newListing.bathrooms);
    cy.contains(newListing.state);
    
    cy.contains('More Info').click();

    cy.contains(newListing.title);
    cy.contains(newListing.address);
    ListingsPage.comparePrice(newListing.price)
    cy.contains(newListing.sqft);
    cy.contains(newListing.bedrooms);
    cy.contains(newListing.garage);
    cy.contains(newListing.bathrooms);
    cy.contains(newListing.lotSize);  
  })

  after(() => {
    const resourceId = Cypress.env('resourceId');
    cy.deleteListing(resourceId);
  });
})