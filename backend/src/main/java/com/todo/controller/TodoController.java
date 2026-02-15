package com.todo.controller;

import com.todo.model.Todo;
import com.todo.model.User;
import com.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(todoService.getAllTodos(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(todoService.getTodoById(id, user));
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo, @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(todoService.createTodo(todo, user), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @Valid @RequestBody Todo todo,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(todoService.updateTodo(id, todo, user));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggleTodo(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(todoService.toggleTodo(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id, @AuthenticationPrincipal User user) {
        todoService.deleteTodo(id, user);
        return ResponseEntity.noContent().build();
    }
}
