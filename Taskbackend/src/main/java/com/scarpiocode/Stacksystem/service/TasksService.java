package com.scarpiocode.Stacksystem.service;

import com.scarpiocode.Stacksystem.model.Tasks;
import com.scarpiocode.Stacksystem.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksService {
   @Autowired
    private TasksRepository tasksRepository;

    public Tasks createTasks(Tasks task){
        return tasksRepository.save(task);
    }
    public List<Tasks> getAll(){
        return tasksRepository.findAll();
    }
    public Tasks getTaskById( Long id){
        return tasksRepository.findById(id).orElse(null);

    }
    public Tasks update( Long id, Tasks updateTask){
        Tasks tasks =getTaskById(id);
        if(tasks!=null) {
            tasks.setTitle(updateTask.getTitle());
            tasks.setDescription(updateTask.getDescription());
            tasks.setDue_date(updateTask.getDue_date());
            tasks.setCompleted(updateTask.getCompleted());
        return tasksRepository.save(tasks);
        }
        return null;
    }
    public void deleteTasks(Long id){
        tasksRepository.deleteById(id);
    }

    public String completeTasks(Long id){
        Tasks tasks =getTaskById(id);
        if (!tasks.getCompleted()){
            tasks.setCompleted(true);
            tasksRepository.save(tasks);
            return "task marked as completed";
        }else {
            tasks.setCompleted(false);
            tasksRepository.save(tasks);
            return "task marked as not completed";
        }
    }
}
