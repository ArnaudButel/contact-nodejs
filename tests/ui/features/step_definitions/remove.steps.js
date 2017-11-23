const { Given , Then , When } = require ('cucumber');
const { expect } = require ('chai');
const assert = require('assert');

Given (/^The contact list is display$/, function ( callback ) {
    this.browser.visit("http://localhost:3000", (err) => {
        const names = [['Eric', 'RAMAT'],['Pierre', 'DUPONT'],['Jean', 'DUPOND'] ,['Jacques', 'DURAND']];
        let C = this.browser.tabs.current.Contact;
        let iterator = C.Contacts.instance().iterator();
        let count = 0;
        while (iterator.hasNext()) {
            let contact = iterator.next();
            assert.equal(contact.firstName() , names[count][0]);
            assert.equal(contact.lastName() , names[count][1]);
            count++;
        }
        callback ();
    });
});

let contact;
let ligne;

When (/^User clicks on remove button of the first contact$/, function ( callback ) {
    this.browser.visit("http://localhost:3000", (err) => {
        let C = this.browser.tabs.current.Contact;
        contact = C.Contacts.instance().iterator().first();
        let bouton = this.browser.document.getElementById('button_'+contact.id());
        this.browser.pressButton(bouton);
        ligne = this.browser.document.getElementById('x'+contact.id());
        callback ();
    });
});

Then (/^The first contact is removed$/, function ( callback ) {
    this.browser.visit("http://localhost:3000", (err) => {
        let C = this.browser.tabs.current.Contact;
        assert.ok( !ligne );
        let newFirstContact = C.Contacts.instance().iterator().first();
        assert.ok( contact !== newFirstContact );
        callback ();
    });
});