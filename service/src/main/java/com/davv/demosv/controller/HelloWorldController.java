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
public class HelloWorldController {

    @GetMapping("/hello/{name}")
    public ResponseEntity<String> hello(@PathVariable String name) {
        return ResponseEntity.ok("Hello there " + name + "!");
    }

    @GetMapping("/add/{n1}/{n2}")
    public ResponseEntity<Integer> addIntegers(@PathVariable Integer n1, @PathVariable Integer n2) {
        if (n1 < 0 || n2 < 0) {
            ResponseEntity.status(400).body("Can only accept positive numbers");
        }
        return ResponseEntity.ok(n1 + n2);
    }

    @GetMapping("/substract/{n1}/{n2}")
    public ResponseEntity<Integer> substractIntegers(@PathVariable Integer n1, @PathVariable Integer n2) {
        log.info("Subtracting {} - {}", n1, n2);
        return ResponseEntity.ok(n1 - n2);
    }

    @GetMapping("/power/{n1}/{pow}")
    public ResponseEntity<Double> powerOfInteger(@PathVariable Double n1, @PathVariable Double pow) {
        log.info("Power of {} times {}", n1, pow);
        return ResponseEntity.ok(Math.pow(n1, pow));
    }

    @GetMapping("/multiply/{n1}/{n2}")
    public ResponseEntity<Integer> multiplyIntegers(@PathVariable Integer n1, @PathVariable Integer n2) {
        log.info("Multiplying {} x {}", n1, n2);
        return ResponseEntity.ok(n1 * n2);
    }
}
