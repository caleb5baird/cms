import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit, OnDestroy {

  @Output() contactSelectedEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];
  subscription: Subscription;
  term = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )
    this.contacts = this.contactService.getContacts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string): void { this.term = value; }

}
