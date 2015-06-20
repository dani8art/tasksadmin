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
    
    @Query("select task from Task task where task.user = ?1 and task.completed=0 order by task.endDate, task.priority")
	public List<Task> findByUser(User user);

}
