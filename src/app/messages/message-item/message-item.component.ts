import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;

  messageSender: string;

  constructor(private contactService: ContactService) {
    this.contactService.contactListChangedEvent.subscribe(() => {
      this.messageSender = this.message.sender.name;
    }),
    (error: any) => console.error(error)
  }

  ngOnInit(): void {
    this.messageSender = this.message.sender.name;
  }
}
