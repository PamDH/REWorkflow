import { faker } from '@faker-js/faker';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('apiLogin', (email, password) => { 
    cy.request('POST', '/api/users/login', { 
      "email": email,
      "password": password
    }).then((response) => {
      expect(response.status).to.eq(201);
      window.localStorage.setItem('accessToken', response.body.accessToken);
      return response.body.accessToken;
    });
});

Cypress.Commands.add('createListing', () => {  
    const listingTitle = faker.company.catchPhrase();
    const formData = new FormData();

    cy.fixture("testData/Tudor Home.jpeg").then((image) => {
      const blob = Cypress.Blob.base64StringToBlob(image, 'image/jpeg');
      formData.append('images', blob);
    });  

    cy.fixture("testData/searchlistingData.json").then((data) => {
      formData.append('title', listingTitle);
      formData.append('description', data.description);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('zipCode', data.zipCode);
      formData.append('state', data.state);
      formData.append('price', data.price);
      formData.append('bedrooms', data.bedrooms);
      formData.append('bathrooms', data.bathrooms);
      formData.append('garage', data.garage);
      formData.append('sqft', data.sqft);
      formData.append('lotSize', data.lotSize);
      formData.append('isPublished', data.isPublished);
    });

    const token = window.localStorage.getItem('accessToken');
    cy.request({ 
        method: 'POST', 
        url: '/api/estate-objects', 
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        const enc = new TextDecoder("utf-8");
        const data = new Uint8Array(response.body)
        const responseBody = JSON.parse(enc.decode(data))
        expect(response.status).to.eq(201)
        Cypress.env('resourceId', responseBody.id); 
        cy.wrap(responseBody).as('createdListing');
    });
});

Cypress.Commands.add('deleteListing', (id) => {
    const token = window.localStorage.getItem('accessToken');
    cy.request({
      method: 'DELETE',
      url: `/api/estate-objects/${id}`, 
      headers: {
        Authorization: `Bearer ${token}`  
      }
    }).then((response) => {
      expect(response.status).to.eq(200); 
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

import 'cypress-file-upload';
// };
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })