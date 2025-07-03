package com.markkuvaara.mediasocial;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TextController {

    @GetMapping("/")
    public String mediasocial() {
        return "Media Social Backend";
    }

}
