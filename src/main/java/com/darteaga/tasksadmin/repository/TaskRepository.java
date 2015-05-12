package com.darteaga.tasksadmin.repository;

import com.darteaga.tasksadmin.domain.Task;
import com.darteaga.tasksadmin.domain.User;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Task entity.
 */
public interface TaskRepository extends JpaRepository<Task,Long> {

    @Query("select task from Task task where task.user.login = ?#{principal.username}")
    List<Task> findAllForCurrentUser();

	public List<Task> findByUser(User user);

}
