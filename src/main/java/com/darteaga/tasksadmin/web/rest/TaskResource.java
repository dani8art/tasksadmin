package com.darteaga.tasksadmin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.darteaga.tasksadmin.domain.Task;
import com.darteaga.tasksadmin.domain.User;
import com.darteaga.tasksadmin.repository.TaskRepository;
import com.darteaga.tasksadmin.repository.UserRepository;
import com.darteaga.tasksadmin.web.rest.util.PaginationUtil;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;

import java.net.URI;
import java.net.URISyntaxException;

import javax.servlet.http.HttpServletResponse;

import java.util.List;

/**
 * REST controller for managing Task.
 */
@RestController
@RequestMapping("/api")
public class TaskResource {

    private final Logger log = LoggerFactory.getLogger(TaskResource.class);

    @Inject
    private TaskRepository taskRepository;
    
    @Inject
    private UserRepository userRepository;

    /**
     * POST  /tasks -> Create a new task.
     */
    @RequestMapping(value = "/tasks",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> create(@Valid @RequestBody Task task) throws URISyntaxException {
        log.debug("REST request to save Task : {}", task);
        if (task.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new task cannot already have an ID").build();
        }
        task.setInsertDate(new DateTime());
        task.setCompleted(false);
        if(task.getTopic() == null || task.getTopic().equals("")){
        	task.setTopic("General");
        }
        if(task.getType() == null || task.getType().equals("")){
        	task.setType("Execute");
        }
        taskRepository.save(task);
        return ResponseEntity.created(new URI("/api/tasks/" + task.getId())).build();
    }

    /**
     * PUT  /tasks -> Updates an existing task.
     */
    @RequestMapping(value = "/tasks",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> update(@Valid @RequestBody Task task) throws URISyntaxException {
        log.debug("REST request to update Task : {}", task);
        if (task.getId() == null) {
            return create(task);
        }
        
        taskRepository.save(task);
        return ResponseEntity.ok().build();
    }

    /**
     * GET  /tasks -> get all the tasks.
     */
    @RequestMapping(value = "/tasks",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Task>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
                                  @RequestParam(value = "per_page", required = false) Integer limit)
        throws URISyntaxException {
        Page<Task> page = taskRepository.findAll(PaginationUtil.generatePageRequest(offset, limit));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tasks", offset, limit);
        return new ResponseEntity<List<Task>>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tasks/:id -> get the "id" task.
     */
    @RequestMapping(value = "/tasks/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Task> get(@PathVariable Long id, HttpServletResponse response) {
        log.debug("REST request to get Task : {}", id);
        Task task = taskRepository.findOne(id);
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
    
    /**
     * GET  /tasks/:login/all -> get Tasks by user login.
     */
    @RequestMapping(value = "/tasks/{login}/all",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Task>> getbyuser(@PathVariable String login, HttpServletResponse response) {
        log.debug("REST request to get Tasks by user: {}", login);
        User user = userRepository.findOneByLogin(login);
        List<Task> task = taskRepository.findByUser(user);
        
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    /**
     * DELETE  /tasks/:id -> delete the "id" task.
     */
    @RequestMapping(value = "/tasks/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Task : {}", id);
        taskRepository.delete(id);
    }
}
