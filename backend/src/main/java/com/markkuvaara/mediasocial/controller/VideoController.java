package com.markkuvaara.mediasocial.controller;

import com.markkuvaara.mediasocial.model.Video;
import com.markkuvaara.mediasocial.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoRepository videoRepository;

    @Autowired
    public VideoController(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @GetMapping
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @PostMapping
    public Video createVideo(@RequestBody Video video) {
        return videoRepository.save(video);
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable Long id) {
        videoRepository.deleteById(id);
    }

}
