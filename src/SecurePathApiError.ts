export class SecurePathApiError extends Error {
	constructor(message: string, public code: string) {
		super(message);
	}
}
