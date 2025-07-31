
package com.markkuvaara.mediasocial.controller;

import com.markkuvaara.mediasocial.model.Userdata;
import com.markkuvaara.mediasocial.repository.UserdataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/userdata")
public class UserdataController {

    private final UserdataRepository userdataRepository;

    @Autowired
    public UserdataController(UserdataRepository userdataRepository) {
        this.userdataRepository = userdataRepository;
    }

    @PostMapping
    public ResponseEntity<Userdata> createUserdata(@RequestBody Userdata userdata) {

        Userdata saved = userdataRepository.save(userdata);
        return ResponseEntity.ok(saved);

    }

    @GetMapping
    public List<Userdata> getUserdata() {

        return userdataRepository.findAll();

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        Optional<Userdata> opt = userdataRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(opt.get());

    }

    @GetMapping("/user/{userid}")
    public ResponseEntity<List<Userdata>> getByUserId(@PathVariable Long userid) {

        List<Userdata> list = userdataRepository.findByUserid(userid);
        return ResponseEntity.ok(list);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserdata(@PathVariable Long id, @RequestBody Userdata incoming) {

        Optional<Userdata> opt = userdataRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Userdata existing = opt.get();
        existing.setUserid(incoming.getUserid());
        existing.setEmail(incoming.getEmail());
        existing.setAddress(incoming.getAddress());
        existing.setAddressnumber(incoming.getAddressnumber());
        existing.setCity(incoming.getCity());
        existing.setBirthdate(incoming.getBirthdate());

        userdataRepository.save(existing);
        return ResponseEntity.ok(existing);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserdata(@PathVariable Long id) {

        if (!userdataRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userdataRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
