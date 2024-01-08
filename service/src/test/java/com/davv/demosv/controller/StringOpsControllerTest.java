package com.davv.demosv.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
public class StringOpsControllerTest {
    @Test
    @DisplayName("Word is palindrome")
    void testIsPalindrome() {
        StringOpsController ops = new StringOpsController();
        assertEquals(Boolean.TRUE, ops.isPalindrome("oso").getBody());
        assertEquals(Boolean.FALSE, ops.isPalindrome("uva").getBody());
        assertEquals(Boolean.TRUE, ops.isPalindrome("saippuakivikauppias").getBody());
    }

    @Test
    @DisplayName("Reverse String")
    void testReverseString() {
        StringOpsController ops = new StringOpsController();
        assertEquals("solrac", ops.reverse("carlos").getBody());
        assertEquals("orb aloh", ops.reverse("hola bro").getBody());
    }

}
