import HomePage from "../../page_objects/home.page";
import ListingsPage from "../../page_objects/listings.page";
import NewListingPage from "../../page_objects/newlisting.page";

let user 
let listing

describe('Login', () => {
    before(() => {
        cy.fixture("testData/userCredentials.json").then((data) => {
            user = data
        })

        cy.fixture("testData/newListingData.json").then((data) => {
            listing = data
        })
    })
    
    beforeEach(() => {
        cy.apiLogin(user.email, user.password);
 
        cy.visit('/dashboard/real-estate/new');
    })

    it('Should create a new listing', () => {
        NewListingPage.createNewListing(listing); 
        cy.url().should("include", "dashboard/real-estate/list");
        
	    cy.visit('/')
        HomePage.searchByKeyword('palatial');
        HomePage.searchButton.click();

        cy.contains(listing.title).should('have.length', 1); 

        cy.contains('More Info').click();
        cy.contains(listing.title);
        cy.contains(listing.address);
        cy.contains('700,000');
        cy.contains(listing.sqft);
        cy.contains(listing.bedrooms);
        cy.contains(listing.garage);
        cy.contains(listing.bathrooms);
        cy.contains(listing.lotSize);  
        const imageKeyword = 'LakeHouse';
        ListingsPage.verifyLargeImage(imageKeyword);
    })
})