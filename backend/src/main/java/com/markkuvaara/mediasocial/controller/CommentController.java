
package com.markkuvaara.mediasocial.controller;

import com.markkuvaara.mediasocial.model.Comment;
import com.markkuvaara.mediasocial.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentRepository.save(comment);
    }

    @GetMapping("/view/{viewid}")
    public List<Comment> getCommentsByViewid(@PathVariable Long viewid) {
        return commentRepository.findByViewid(viewid);
    }
}
