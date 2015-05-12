package com.darteaga.tasksadmin.repository;

import com.darteaga.tasksadmin.domain.Profile;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Profile entity.
 */
public interface ProfileRepository extends JpaRepository<Profile,Long> {

}
