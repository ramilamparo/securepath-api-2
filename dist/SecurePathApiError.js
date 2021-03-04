"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurePathApiError = void 0;
class SecurePathApiError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.SecurePathApiError = SecurePathApiError;
