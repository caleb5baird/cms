import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  selectedContact: Contact;

  constructor() { }

  ngOnInit(): void {}

}
