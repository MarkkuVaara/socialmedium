
package com.markkuvaara.mediasocial.repository;

import com.markkuvaara.mediasocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
