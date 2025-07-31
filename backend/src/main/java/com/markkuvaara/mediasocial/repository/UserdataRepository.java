
package com.markkuvaara.mediasocial.repository;

import com.markkuvaara.mediasocial.model.Userdata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserdataRepository extends JpaRepository<Userdata, Long> {

    List<Userdata> findByUserid(Long userid);

}
