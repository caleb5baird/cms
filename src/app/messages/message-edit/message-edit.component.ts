import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Caleb Baird';

  constructor() { }

  ngOnInit(): void {}

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    this.addMessageEvent.emit(new Message('1',
      subjectValue,
      msgTextValue,
      this.currentSender
    ));
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
