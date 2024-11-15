import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodosService } from 'src/app/services/todos.service';
import { nanoid } from 'nanoid';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class InputComponent {
	private readonly _todo = inject(TodosService);
	constructor() {}

	newTodo = new FormControl('', { nonNullable: true, validators: [Validators.required] });

	submit() {
		if (this.newTodo.invalid) {
			this.newTodo.markAsTouched();
			return;
		}

		this._todo.addTodo({
			id: nanoid(),
			title: this.newTodo.value as string,
			completed: false,
			timestamp: Date.now(),
		});

		this.newTodo.reset();
	}
}
