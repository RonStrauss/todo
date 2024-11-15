import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosService } from 'src/app/services/todos.service';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;
	let todosService: TodosService;

	beforeEach(async () => {
		const todosServiceMock = {
			addTodo: jasmine.createSpy('addTodo'),
			getTodos: jasmine.createSpy('getTodos').and.returnValue([]),
		};

		await TestBed.configureTestingModule({
			imports: [InputComponent, ReactiveFormsModule],
			providers: [{ provide: TodosService, useValue: todosServiceMock }],
		}).compileComponents();

		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		todosService = TestBed.inject(TodosService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should not add todo if input is invalid', () => {
		component.newTodo.setValue('');
		component.submit();
		expect(component.newTodo.touched).toBeTrue();
		expect(todosService.addTodo).not.toHaveBeenCalled();
	});

	it('should add todo if input is valid', () => {
		const todoTitle = 'New Todo';
		component.newTodo.setValue(todoTitle);
		component.submit();
		expect(todosService.addTodo).toHaveBeenCalledWith(
			jasmine.objectContaining({
				title: todoTitle,
				completed: false,
			}),
		);
		expect(component.newTodo.value).toBe('');
		expect(component.newTodo.untouched).toBeTrue();
		expect(component.newTodo.pristine).toBeTrue();
	});
});
