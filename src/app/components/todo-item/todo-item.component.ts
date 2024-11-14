import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodosService } from 'src/app/services/todos.service';

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.scss'],
	standalone: true,
	imports: [NgClass],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class TodoItemComponent implements OnInit {
	_todo = inject(TodosService);
	constructor() {}

	@Input() todo!: Todo;

	ngOnInit(): void {
		this.todo ??= {
			id: '',
			title: '',
			completed: false,
			timestamp: 0,
		};
	}

	toggle() {
		this._todo.toggleTodoById(this.todo.id);
	}

	remove(){
		this._todo.removeTodoById(this.todo.id);
	}
}
