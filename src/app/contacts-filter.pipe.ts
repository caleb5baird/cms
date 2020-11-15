import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts/contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {

    term = term ? term.toLowerCase() : '';

    if (term && term.length > 0) {
      let filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(term));

      if (filteredContacts.length > 0) {
        return filteredContacts;
      }
    }

    return contacts;
  }
}
