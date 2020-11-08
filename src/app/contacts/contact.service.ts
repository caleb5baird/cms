import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS'


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  maxContactId = 0;

  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] { return this.contacts.slice() }

  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id);
  }

  getMaxId(): number {
    let ids = this.contacts.map(contact => parseInt(contact.id))
    return Math.max(...ids);
  }

  addContact(contact: Contact): void {
    if (contact) {
      ++this.maxContactId;
      contact.id = this.maxContactId.toString();
      this.contacts.push(contact);
      this.contactListChangedEvent.next(this.contacts.slice());
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      const pos = this.contacts.indexOf(originalContact);

      if (pos != -1) {
        newContact.id = originalContact.id
        this.contacts[pos] = newContact
        this.contactListChangedEvent.next(this.contacts.slice())
      }
    }
  }

  deleteContact(contact: Contact) {
    if (contact) {
      const pos = this.contacts.indexOf(contact);

      if (pos != -1) {
        this.contacts.splice(pos, 1);
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    }
  }
}
