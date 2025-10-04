package com.markkuvaara.mediasocial.repository;

import com.markkuvaara.mediasocial.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

}
