export class TodoNotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TodoNotFoundError';
	}
}

export class InputRequiredError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InputRequiredError';
	}
}
