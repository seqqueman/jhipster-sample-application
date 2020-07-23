package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Advertisment;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Advertisment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdvertismentRepository extends JpaRepository<Advertisment, Long> {

    @Query("select advertisment from Advertisment advertisment where advertisment.user.login = ?#{principal.username}")
    List<Advertisment> findByUserIsCurrentUser();
}
