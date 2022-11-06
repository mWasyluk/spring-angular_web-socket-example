import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';

@Component({
  selector: 'broker-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>
        {{title}}
      </h1>
    </div>

    <div class="messages-list">
      <div class="message" *ngFor="let message of websocketService.msg">
        <strong>{{message.from}}:</strong>
        {{message.content}}
      </div>
    </div>

    <div class="content-edit">
    <div class="from">
        <input type="text" [(ngModel)]="from" placeholder="Imię...">
      </div>
      <div class="content">
        <input type="text" [(ngModel)]="content" placeholder="Wprowadź treść wiadomości...">
      </div>
      <div class="send">
        <button (click)="send()">Send</button>
      </div>
    </div>
  `,
  styles: [
    '.content-edit>* {display: inline;}' +
    '.from input {width: 40px}'
  ],
  providers: [WebSocketService]
})
export class AppComponent {
  title = 'MSender pre-pre-pre-beta';
  from!: string;
  content!: string;

  constructor(public websocketService: WebSocketService) { }

  send() {
    if (!this.from || !this.content) {
      console.error("Nie można wysłać wiadomości bez autora i/lub treści.");
    } else {
      let mess = new Message(this.from, this.content)
      this.websocketService.sendMessage(mess);
      this.content = '';
    }
  }
}


export class Message {
  from: string;
  content: string;

  constructor(from: string, content: string) {
    this.from = from;
    this.content = content;
  }
}