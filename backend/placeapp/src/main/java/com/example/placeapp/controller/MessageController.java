package com.example.placeapp.controller;

import com.example.placeapp.model.Message;
import com.example.placeapp.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    // POST: Send a new message
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
        message.setTimestamp(LocalDateTime.now());
        Message saved = messageRepository.save(message);
        return ResponseEntity.ok(saved);
    }

    // GET: Get conversation between admin and user
    @GetMapping("/conversation")
    public ResponseEntity<List<Message>> getConversation(
        @RequestParam String userEmail
    ) {
        List<Message> messages = messageRepository
            .findBySenderAndReceiverOrReceiverAndSenderOrderByTimestampAsc(
                "admin", userEmail, userEmail, "admin"
            );
        return ResponseEntity.ok(messages);
    }
}
