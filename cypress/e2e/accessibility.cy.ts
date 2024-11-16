import 'cypress-axe';
import { mockTodos } from '../../src/app/DB/Todos';

describe('Accessibility tests', () => {
	let length = mockTodos.length;
	beforeEach(() => {
		cy.visit('/');
		cy.injectAxe();
	});

	it('Can add and announce a new task', () => {
		const input = getInput(cy);
		input.find('input[type="text"]').type('New task{enter}');
		const todoList = getTodoList(cy);
		todoList.find('app-todo-item').last().shadow().find('span').should('contain', 'New task');
		cy.checkA11y();
	});

	it('Can mark a task as completed', () => {
		const input = getInput(cy);
		input.find('input[type="text"]').type('New task{enter}');
		const todoList = getTodoList(cy);
		const lastTodo = todoList.find('app-todo-item').last().shadow();
		const checkbox = lastTodo.find('input[type="checkbox"]');
		checkbox.click();
		const span = lastTodo.parent().find('span');
		span.should('have.class', 'completed');
		cy.checkA11y();
	});

	it('Can delete a task', () => {
		const input = getInput(cy);
		input.find('input[type="text"]').type('New task{enter}');
		let todoList = getTodoList(cy);
		const lastTodo = todoList.find('app-todo-item').last().shadow();
		const deleteButton = lastTodo.find('button');
		deleteButton.click();
		todoList = getTodoList(cy);
		todoList.get('app-todo-item').should('have.length', length);
		cy.checkA11y();
	});
	
	it('Cannot add an empty task', () => {
		const input = getInput(cy);
		input.find('input[type="text"]').type('{enter}');
		let todoList = getTodoList(cy);
		todoList.get('app-todo-item').should('have.length', length);
	});

	it('Cannot add the same task twice', () => {
		let input = getInput(cy);
		input.find('input[type="text"]').type('New task{enter}');
		let todoList = getTodoList(cy);
		todoList.get('app-todo-item').should('have.length', length + 1);
		input = getInput(cy);
		input.find('input[type="text"]').type('New task{enter}');
		todoList = getTodoList(cy);
		todoList.get('app-todo-item').should('have.length', length + 1);
		cy.checkA11y();
	});
});

function getInput(cy: Cypress.cy) {
	const homeCy = cy.get('app-home').shadow();
	const inputCy = homeCy.find('app-input').shadow();
	return inputCy;
}

function getTodoList(cy: Cypress.cy) {
	return cy.get('app-home').shadow().find('app-todo-list').shadow();
}
