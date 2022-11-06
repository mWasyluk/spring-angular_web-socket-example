import { Injectable } from '@angular/core';
import { Message } from '../app.component';
import * as SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

@Injectable()
export class WebSocketService {

    public stompClient: CompatClient;
    public msg: Message[] = [];

    constructor() {
        this.initializeWebSocketConnection();
    }

    initializeWebSocketConnection() {
        const serverUrl = 'http://localhost:8080/msender';
        const ws = new SockJS(serverUrl);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, () => {
            this.stompClient.subscribe('/conversations', (message) => {
                if (message.body) {
                    const mess: Message = JSON.parse(message.body);
                    this.msg.push(mess);
                    console.log("Otrzymano wiadomość: ", message.body);
                }
            });
        });
    }

    sendMessage(message: Message) {
        this.stompClient.send('/app/chat', {}, JSON.stringify(message));
        console.log("Wysłano wiadomość: ", message);
    }
}