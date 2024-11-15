import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { TodosService } from 'src/app/services/todos.service';
import { nanoid } from 'nanoid';
import { Todo } from 'src/app/interfaces/todo';
import { NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { AnouncerService } from 'src/app/services/anouncer.service';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, FormsModule, NgIf],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class InputComponent implements OnInit {
	private readonly _todo = inject(TodosService);
	private readonly _anouncer = inject(AnouncerService);
	constructor() {}

	newTodo = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), this.validateIsTodoAlreadyInList()] });

	requiredText = 'Task cannot be empty.';
	minLengthText = 'Task must be at least 3 characters long.';
	alreadyExistsText = 'Task already exists in list.';

	formSubmitted$ = new Subject<void>();

	@ViewChild('todoAnouncement') todoAnouncement?: ElementRef<HTMLDivElement>;

	ngOnInit(): void {
		this.newTodo.valueChanges.subscribe(value => {
			if (this.newTodo.invalid) {
				return;
			}
		});
	}

	submit() {
		if (this.newTodo.invalid) {
			let message = '';
			switch (true) {
				case this.newTodo.errors?.['required']:
					message = this.requiredText;
					break;
				case this.newTodo.errors?.['minlength']:
					message = this.minLengthText;
					break;
				case this.newTodo.errors?.['todoAlreadyExists']:
					message = this.alreadyExistsText;
					break;
			}
			this._anouncer.anounceNewMessage(message);
			this.newTodo.markAsTouched();
			this.newTodo.markAsDirty();
			return;
		}

		this._todo.addTodo({
			id: nanoid(),
			title: this.newTodo.value as string,
			completed: false,
			timestamp: Date.now(),
		});

		this.anounceNewTodo(this.newTodo.value as string);

		this.newTodo.reset();
		this.newTodo.markAsUntouched();
		this.newTodo.markAsPristine();
	}

	anounceNewTodo(title: string) {
		if (!this.todoAnouncement?.nativeElement) {
			return;
		}

		const todoAnouncement = this.todoAnouncement.nativeElement;

		todoAnouncement.textContent = `New task item added ${title}`;
		setTimeout(() => {
			todoAnouncement.textContent = null;
		}, 3000);
	}

	validateIsTodoAlreadyInList(): ValidatorFn {
		return (control: AbstractControl) => {
			const todos = this._todo.getTodos();
			const value: string = control.value;
			if (!value) {
				return null;
			}

			if (todos.some(todo => todo.title.toLowerCase().trim() === value.trim().toLowerCase())) {
				return { todoAlreadyExists: true };
			}
			return null;
		};
	}
}
