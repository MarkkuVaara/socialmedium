
package com.markkuvaara.mediasocial.controller;

import com.markkuvaara.mediasocial.model.Reaction;
import com.markkuvaara.mediasocial.repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    private final ReactionRepository reactionRepository;

    @Autowired
    public ReactionController(ReactionRepository reactionRepository) {
        this.reactionRepository = reactionRepository;
    }

    @GetMapping
    public List<Reaction> getAllReactions() {
        return reactionRepository.findAll();
    }

    @PostMapping
    public Reaction createReaction(@RequestBody Reaction reaction) {
        return reactionRepository.save(reaction);
    }

    @DeleteMapping("/{id}")
    public void deleteReaction(@PathVariable Long id) {
        reactionRepository.deleteById(id);
    }

    @GetMapping("/comment/{commentId}")
    public List<Reaction> getReactionsByCommentId(@PathVariable Long commentId) {
        return reactionRepository.findByCommentId(commentId);
    }
}
