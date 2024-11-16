import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { TodoNotFoundError } from '../libs/Errors';
import { mockTodos } from '../DB/Todos';
import { AnnouncerService } from './anouncer.service';

@Injectable({
	providedIn: 'root',
})
export class TodosService {
	private _anouncer = inject(AnnouncerService);
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
		this._anouncer.announceNewMessage(`New task item added: ${todo.title}`);
	}

	removeTodoById(id: string): void {
		const todos = this.getTodos();
		const intendedTodo = todos.find(todo => todo.id === id);
		this.setTodos(todos.filter(todo => todo.id !== id));
		this._anouncer.announceNewMessage(`Task item removed: ${intendedTodo?.title}`);
	}

	clearAllTodos(): void {
		this.setTodos([]);
		this._anouncer.announceNewMessage('All task items cleared');
	}

	toggleTodoById(id: string): void {
		const todos = this.getTodos();
		const intendedTodo = todos.find(todo => todo.id === id);
		if (!intendedTodo) {
			throw new TodoNotFoundError(`Task with id ${id} not found`);
		}
		for (const todo of todos) {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
		}

		this.setTodos(todos);
		this._anouncer.announceNewMessage(`Task item ${intendedTodo.title} marked as ${intendedTodo.completed ? 'completed' : 'incomplete'}`);
	}
}
