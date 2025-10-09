package com.example.placeapp.controller;

import com.example.placeapp.model.Apply;
import com.example.placeapp.repository.ApplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apply")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend access
public class ApplyController {

    @Autowired
    private ApplyRepository applyRepository;

    // POST new apply data
    @PostMapping("/post")
    public ResponseEntity<?> postApply(@RequestBody Apply apply) {
        Apply saved = applyRepository.save(apply);
        return ResponseEntity.ok(saved);
    }

    // GET all posted apply data
    @GetMapping("/all")
    public List<Apply> getAllApplications() {
        return applyRepository.findAll();
    }

    // DELETE an application by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteApply(@PathVariable Long id) {
        if (!applyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        applyRepository.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
