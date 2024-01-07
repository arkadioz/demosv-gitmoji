package com.davv.demosv.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Slf4j
public class StringOpsController {

    @GetMapping("/palindrome/{string}")
    public ResponseEntity<Boolean> isPalindrome(@PathVariable String string) {
        log.info("Checking if {} is palindrome", string);
        StringBuilder sb = new StringBuilder();
        sb.append(string);
        return ResponseEntity.ok(string.contentEquals(sb.reverse()));
    }
}
