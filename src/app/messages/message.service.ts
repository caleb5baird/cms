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
    this.http.get('http://localhost:3000/messages')
      .subscribe((responseData: {message: string, messages: Message[]}) => {
        this.messages = responseData.messages;
        this.maxMessagesId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      }, (error:any) => console.error(error))
  }

  getMessages(): Message[] { return this.messages.slice() }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id);
  }

  getMaxId(): number {
    let ids = this.messages.map(message => parseInt(message.id))
    return Math.max(...ids);
  }

  addMessage(message: Message): void {
    if (message) {
      message.id = '';

      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.http.post<{ resultMessage: string, message: Message }>
        ('http://localhost:3000/messages', message, { headers: headers })
        .subscribe((responseData: {resultMessage: string, message: Message}) => {
          // add new message to messages
          this.messages.push(responseData.message);
          this.storeMessages();
        });
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
