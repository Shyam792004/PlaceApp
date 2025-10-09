package com.example.placeapp.controller;

import com.example.placeapp.model.Notice;
import com.example.placeapp.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend
public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;

    // POST: Create a new notice
    @PostMapping
    public ResponseEntity<String> createNotice(@RequestBody Notice notice) {
        noticeRepository.save(notice);
        return ResponseEntity.ok("Notice posted successfully");
    }

    // GET: Get all posted notices
    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
    if (!noticeRepository.existsById(id)) {
        return ResponseEntity.notFound().build();
    }

    noticeRepository.deleteById(id);
    return ResponseEntity.ok("Notice deleted successfully");
     }


}
