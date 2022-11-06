package pl.mwasyluk.websockettest;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketController {
    private final SimpMessagingTemplate template;

    @MessageMapping("/chat")
    public void sendMessage(String message){
        if ( message == null || message.isBlank() ){
            System.err.println("Wiadomość nie może być pusta.");
        } else {
            System.out.println("Przesłano wiadomość: " + message);
            template.convertAndSend("/conversations", message);
        }
    }

}
