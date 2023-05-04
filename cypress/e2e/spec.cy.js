/// <reference types="cypress" />

import { faker } from '@faker-js/faker'
//! VIRGINIE

describe('View Cart', () => {
  it('step 5 : just view cart', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-166').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.get('#product-addtocart-button').click()
    cy.wait(4000)
    cy.get('.action.showcart').click()
  })

  it('Click on button "Proceed to Checkout" in cart', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-166').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.get('#product-addtocart-button').click()
    cy.wait(4000)
    cy.get('.action.showcart').click()
    cy.get('.ui-dialog .block-minicart .checkout').trigger('mouseover')
    cy.get('#top-cart-btn-checkout').click()
    cy.url().should('include', '/checkout/')
  })

  it('Click on button "View and Edit Cart"', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-166').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.get('#product-addtocart-button').click()
    cy.wait(5000)
    cy.get('.action.showcart').click()
    cy.get('a.viewcart').click()
    cy.url().should('include', '/cart/')
    cy.get('.control.qty span.label:contains("Qty")')
      .click({ force: true })
      .siblings('input')
      .clear()
      .type('2')
    cy.screenshot()
  })
})
// Fabrice

describe('put an article into the cart', () => {
  // mettre un article dans le panier
  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/')
    cy.get('#ui-id-4').click() // page women
    cy.get('dd > .items > :nth-child(1) > a').click() // page tops 50
    cy.get(
      ':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo'
    ).click() // page produit
    cy.get('#option-label-color-93-item-59').click() // choix couleur
    cy.get('#option-label-size-143-item-168').click() // taille
    cy.get('#product-addtocart-button > span').click() // ajouter au panier
    cy.wait(8000) // attente que le panier soit mis à jour.
    cy.get('.showcart').click() // aller au panier
  })
})
describe('proceed to checkout', () => {
  it('proceed to payment', () => {
    cy.get('#top-cart-btn-checkout').click()
    cy.url().should(
      'include',
      'https://magento.softwaretestingboard.com/checkout'
    )
    cy.wait(3000)
    cy.get('#shipping').should('be.visible')
  })
  it('fills out the shipping and billing forms', () => {
    cy.visit('https://magento.softwaretestingboard.com/checkout#shipping')
    cy.get(
      '#customer-email-fieldset > .required > .control > #customer-email'
    ).type(faker.internet.email())
    cy.get('[name="firstname"]').type(faker.name.firstName())
    cy.get('[name="lastname"]').type(faker.name.lastName())
    cy.get('[name="company"]').type(faker.company.name())
    cy.get('[name="street[0]"]').type(faker.address.streetAddress())
    cy.get('[name="street[1]"]').type(faker.address.streetAddress())
    cy.get('[name="street[2]"]').type(faker.address.streetAddress())
    cy.get('[name="city"]').type(faker.address.city())
    cy.get('[name="region_id"]').select('Rhode Island')
    cy.get('[name="postcode"]').type(faker.address.zipCode())
    cy.get('[name="telephone"]').type(faker.phone.phoneNumber())
    cy.get(':nth-child(1) > :nth-child(1) > .radio').check()
    cy.get('.button > span').click()
    cy.get('#billing-address-same-as-shipping-checkmo').uncheck()
    cy.wait(2000)
    cy.get('[name="firstname"]').type(faker.name.firstName())
    cy.get('[name="lastname"]').type(faker.name.lastName())
    cy.get('[name="company"]').type(faker.company.name())
    cy.get('[name="street[0]"]').type(faker.address.streetAddress())
    cy.get('[name="street[1]"]').type(faker.address.streetAddress())
    cy.get('[name="street[2]"]').type(faker.address.streetAddress())
    cy.get('[name="city"]').type(faker.address.city())
    cy.get('[name="region_id"]').select('Rhode Island')
    cy.get('[name="postcode"]').type(faker.address.zipCode())
    cy.get('[name="telephone"]').type(faker.phone.phoneNumber())
    cy.get('.action-update > span').click()
    cy.get('.payment-method-content > :nth-child(4) > div.primary').click()
  })
})
