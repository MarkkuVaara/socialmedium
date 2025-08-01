
package com.markkuvaara.mediasocial.repository;

import com.markkuvaara.mediasocial.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByViewid(Long viewid);

}
