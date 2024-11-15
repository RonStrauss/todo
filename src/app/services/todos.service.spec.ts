import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { Todo } from '../interfaces/todo';
import { take } from 'rxjs/operators';
import { mockTodos } from '../DB/Todos';
import { TodoNotFoundError } from '../libs/Errors';

describe('TodosService', () => {
	let service: TodosService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TodosService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize with mock todos', () => {
		expect(service.getTodos()).toEqual(mockTodos);
	});

	it('should get todos', () => {
		const todos = service.getTodos();
		expect(todos).toEqual(mockTodos);
	});

	it('should set todos', () => {
		const newTodos: Todo[] = [
			{ id: '3', title: 'New Todo 1', completed: false, timestamp: Date.now() },
			{ id: '4', title: 'New Todo 2', completed: true, timestamp: Date.now() },
		];
		service.setTodos(newTodos);
		expect(service.getTodos()).toEqual(newTodos);
	});

	it('should add a new todo', () => {
		const newTodo: Todo = {
			id: '3',
			title: 'New Todo',
			completed: false,
			timestamp: Date.now(),
		};
		service.addTodo(newTodo);
		expect(service.getTodos()).toContain(newTodo);
	});

	it('should remove a todo by id', () => {
		const todoId = mockTodos[0].id;
		service.removeTodoById(todoId);
		expect(service.getTodos().find(todo => todo.id === todoId)).toBeUndefined();
	});

	it('should clear all todos', () => {
		service.clearAllTodos();
		expect(service.getTodos().length).toBe(0);
	});

	it('should toggle todo completion status by id', () => {
		const todoId = mockTodos[0].id;
		const initialStatus = mockTodos[0].completed;
		service.toggleTodoById(todoId);
		expect(service.getTodos().find(todo => todo.id === todoId)?.completed).toBe(!initialStatus);
	});

	it('should throw an error if toggling a non-existent todo', () => {
		expect(() => service.toggleTodoById('non-existent-id')).toThrowError(TodoNotFoundError);
	});

	it('should emit sorted todos via todos$', done => {
		const newTodos: Todo[] = [
			{ id: '3', title: 'New Todo 1', completed: false, timestamp: Date.now() + 1000 },
			{ id: '4', title: 'New Todo 2', completed: true, timestamp: Date.now() },
		];
		service.setTodos(newTodos);
		service.todos$.pipe(take(1)).subscribe(todos => {
			expect(todos).toEqual(newTodos.sort((a, b) => a.timestamp - b.timestamp));
			done();
		});
	});
});
