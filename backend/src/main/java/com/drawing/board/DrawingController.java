package com.drawing.board;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class DrawingController {

    @MessageMapping("/draw")
    @SendTo("/topic/drawing")
    public DrawPoint draw(DrawPoint point) {
        return point;
    }

    @MessageMapping("/clear")
    @SendTo("/topic/drawing")
    public DrawPoint clear() {
        return new DrawPoint(0, 0, "", "clear");
    }
}
