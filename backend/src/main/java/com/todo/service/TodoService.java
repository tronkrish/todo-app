package com.todo.service;

import com.todo.model.Todo;
import com.todo.model.User;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos(User user) {
        return todoRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Todo getTodoById(Long id, User user) {
        return todoRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    public Todo createTodo(Todo todo, User user) {
        todo.setUser(user);
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todoDetails, User user) {
        Todo todo = getTodoById(id, user);
        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setPriority(todoDetails.getPriority());
        todo.setCompleted(todoDetails.isCompleted());
        return todoRepository.save(todo);
    }

    public Todo toggleTodo(Long id, User user) {
        Todo todo = getTodoById(id, user);
        todo.setCompleted(!todo.isCompleted());
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id, User user) {
        Todo todo = getTodoById(id, user);
        todoRepository.delete(todo);
    }
}
