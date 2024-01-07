package com.davv.demosv.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@ExtendWith(MockitoExtension.class)
public class HelloWorldControllerTest {

    @Test
    @DisplayName("hello test should succeed")
    void helloTest() {
        HelloWorldController controller = new HelloWorldController();
        assertEquals("Hello there!", controller.hello().getBody());
    }

    @Test
    @DisplayName("hello test should fail")
    void helloTestShouldFail() {
        HelloWorldController controller = new HelloWorldController();
        assertNotEquals("Hello there!!", controller.hello().getBody());
    }

    @Test
    @DisplayName("Add two integers succeed")
    void addTwoIntegersTest() {
        HelloWorldController controller = new HelloWorldController();
        assertEquals(2, controller.addIntegers(1, 1).getBody());
    }

    @Test
    @DisplayName("Subtract two integers succeed")
    void subtractTwoIntegersTest() {
        HelloWorldController controller = new HelloWorldController();
        assertEquals(-2, controller.substractIntegers(-1, 1).getBody());
    }

    @Test
    @DisplayName("Power of number succeed")
    void powerOfNumber() {
        HelloWorldController controller = new HelloWorldController();
        // casteo automatico
        assertEquals(27L, controller.powerOfInteger(3.0, 3.0).getBody());
        assertEquals(64L, controller.powerOfInteger(4.0, 3.0).getBody());
        assertEquals(1, controller.powerOfInteger(2.0, 0.0).getBody());
        assertEquals(2, controller.powerOfInteger(2.0, 1.0).getBody());
    }

    @DisplayName("Multiplying two integers succeed")
    void multiplyTwoIntegersTest() {
        HelloWorldController controller = new HelloWorldController();
        assertEquals(10, controller.multiplyIntegers(5, 2).getBody());
        assertEquals(-15, controller.multiplyIntegers(5, -3).getBody());
    }
}
