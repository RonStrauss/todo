export class TodoNotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TodoNotFoundError';
	}
}
