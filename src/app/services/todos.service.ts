import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { TodoNotFoundError } from '../libs/Errors';
import { mockTodos } from '../DB/Todos';

@Injectable({
	providedIn: 'root',
})
export class TodosService {
	constructor() {
		this.init();
	}

	readonly #todos$ = new BehaviorSubject<Todo[]>([]);
	readonly todos$ = this.#todos$.pipe(map(todos => todos.sort((a, b) => a.timestamp - b.timestamp)));

	init(): void {
		this.setTodos(mockTodos);
	}

	getTodos(): Todo[] {
		return this.#todos$.getValue();
	}

	setTodos(todos: Todo[]): void {
		this.#todos$.next(todos);
	}

	addTodo(todo: Todo): void {
		const todos = this.getTodos();
		this.setTodos([...todos, todo]);
	}

	removeTodoById(id: string): void {
		const todos = this.getTodos();
		this.setTodos(todos.filter(todo => todo.id !== id));
	}

	clearAllTodos(): void {
		this.setTodos([]);
	}

	toggleTodoById(id: string): void {
		const todos = this.getTodos();
		const intendedTodo = todos.find(todo => todo.id === id);
		if (!intendedTodo) {
			throw new TodoNotFoundError(`Todo with id ${id} not found`);
		}
		for (const todo of todos) {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
		}

		this.setTodos(todos);
	}
}
