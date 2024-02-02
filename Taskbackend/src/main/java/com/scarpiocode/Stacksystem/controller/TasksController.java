package com.scarpiocode.Stacksystem.controller;

import com.scarpiocode.Stacksystem.model.Tasks;
import com.scarpiocode.Stacksystem.service.TasksService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
@CrossOrigin("*")
public class TasksController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TasksController.class);

    @Autowired
    private TasksService tasksService;

    @PostMapping
    public ResponseEntity<Tasks> saveTasks(@RequestBody Tasks task) {
        LOGGER.info("Saving task: {}", task);
        Tasks addedTasks = tasksService.createTasks(task);
        LOGGER.info("Task saved successfully: {}", addedTasks);
        return new ResponseEntity<>(addedTasks, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Tasks>> getAllTasks() {
        LOGGER.info("Fetching all tasks");
        List<Tasks> tasksList = tasksService.getAll();
        LOGGER.info("Fetched {} tasks", tasksList.size());
        return new ResponseEntity<>(tasksList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tasks> getTaskById(@PathVariable Long id) {
        LOGGER.info("Fetching task with id: {}", id);
        return new ResponseEntity<>(tasksService.getTaskById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tasks> update(@PathVariable Long id, @RequestBody Tasks updateTask) {
        LOGGER.info("Updating task with id: {}", id);
        return new ResponseEntity<>(tasksService.update(id, updateTask), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        LOGGER.info("Deleting task with id: {}", id);
        tasksService.deleteTasks(id);
        LOGGER.info("Task deleted successfully");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/markComplete/{id}")
    public ResponseEntity<String> markComplete(@PathVariable Long id) {
        LOGGER.info("Marking task with id: {} as complete", id);
        return new ResponseEntity<>(tasksService.completeTasks(id), HttpStatus.OK);
    }
}
