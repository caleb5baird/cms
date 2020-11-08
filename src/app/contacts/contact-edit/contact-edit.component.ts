import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {

        this.id = params.id;

        if (this.id) {
          this.originalContact = this.contactService.getContact(this.id);

          if (this.originalContact) {
            this.editMode = true;
            this.contact = {...this.originalContact};

            if (this.contact.group && this.contact.group.length > 0) {
              this.groupContacts = JSON.parse(JSON.stringify(
                this.contact.group
              ))
            }
          }
        }
      })
  }

  onSubmit(form: NgForm): void {
    let value = form.value // get values from form’s fields

    let newContact = new Contact();
    newContact.name = value.name;
    newContact.email = value.email;
    newContact.phone = value.phone;
    newContact.imageUrl = value.imageUrl;
    newContact.group = this.groupContacts;

    if (this.editMode) {
      this.contactService.updateContact(
        this.originalContact, newContact
      )

    } else {
      this.contactService.addContact(newContact)
    }

    this.router.navigate(['/contacts']);
  }

  onCancel(): void { this.router.navigate(['/contacts']); }
}
