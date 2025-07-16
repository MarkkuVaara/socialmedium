
package com.markkuvaara.mediasocial.controller;

import com.markkuvaara.mediasocial.model.View;
import com.markkuvaara.mediasocial.repository.ViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/views")
public class ViewController {

    private final ViewRepository viewRepository;

    @Autowired
    public ViewController(ViewRepository viewRepository) {
        this.viewRepository = viewRepository;
    }

    @GetMapping
    public List<View> getAllViews() {
        return viewRepository.findAll();
    }

    @PostMapping
    public View createView(@RequestBody View view) {
        return viewRepository.save(view);
    }

    @DeleteMapping("/{id}")
    public void deleteView(@PathVariable Long id) {
        viewRepository.deleteById(id);
    }

    @GetMapping("/user/{userid}")
    public List<View> getViewsByuserid(@PathVariable Long userid) {
        return viewRepository.findByuserid(userid);
    }
}
