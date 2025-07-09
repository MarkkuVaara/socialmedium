
package com.markkuvaara.mediasocial.repository;

import com.markkuvaara.mediasocial.model.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViewRepository extends JpaRepository<View, Long> {

    List<View> findByuserid(Long userid);

}
