import { Message } from './message.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  maxMessagesId = 0;

  constructor(
    private http: HttpClient
  ) {
    http.get('https://cms-app-77a0c.firebaseio.com/messages.json')
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessagesId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      }, (error:any) => console.error(error))
  }

  getMessages(): Message[] { return this.messages.slice() }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id);
  }

  getMaxId(): number {
    let ids = this.messages.map(document => parseInt(document.id))
    return Math.max(...ids);
  }

  addMessage(message: Message): void {
    if (message) {
      ++this.maxMessagesId;
      message.id = this.maxMessagesId.toString();
      this.messages.push(message);
      this.storeMessages();
    }
  }

  storeMessages(): void {
    let headers = new HttpHeaders({'content-type': 'application/json'});
    this.http.put('https://cms-app-77a0c.firebaseio.com/messages.json',
                  JSON.stringify(this.messages),
                  {headers: headers})
      .subscribe(() => {
        this.messageListChangedEvent.next(this.messages.slice());
      }, (error:any) => console.error(error))
  }
}
