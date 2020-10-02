import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message('0', 'subject', 'Text', 'Caleb Baird')
  ];

  constructor() { }

  ngOnInit(): void {}

  onAddMessage(newMessage) {
    this.messages.push(newMessage)
  }
}
