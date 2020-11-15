import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  maxContactId = 0;

  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(
    private http: HttpClient
  ) {
    http.get('https://cms-app-77a0c.firebaseio.com/contacts.json')
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((lhs, rhs) =>
          lhs.name.localeCompare(rhs.name))
        this.contactListChangedEvent.next(this.contacts.slice());
      }, (error:any) => console.error(error))
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
      this.contacts.sort((lhs, rhs) =>
        lhs.name.localeCompare(rhs.name))
      this.storeContacts()
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      const pos = this.contacts.indexOf(originalContact);

      if (pos != -1) {
        newContact.id = originalContact.id
        this.contacts[pos] = newContact
        this.storeContacts()
      }
    }
  }

  deleteContact(contact: Contact) {
    if (contact) {
      const pos = this.contacts.indexOf(contact);

      if (pos != -1) {
        this.contacts.splice(pos, 1);
        this.storeContacts()
      }
    }
  }

  storeContacts(): void {
    let headers = new HttpHeaders({'content-type': 'application/json'});
    this.http.put('https://cms-app-77a0c.firebaseio.com/contacts.json',
                  JSON.stringify(this.contacts),
                  {headers: headers})
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      }, (error:any) => console.error(error))
  }
}
