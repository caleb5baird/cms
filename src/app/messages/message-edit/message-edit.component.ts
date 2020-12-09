import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from '../../contacts/contact.model'

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: Contact = {
	  id: "103",
	  name: "Caleb Baird",
	  email: "bai16018@byui.edu",
    phone: null,
    imageUrl: null,
	  group: [ ],
};

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {}

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    this.messageService.addMessage(new Message(
      '1',
      subjectValue,
      msgTextValue,
      this.currentSender
    ))
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
