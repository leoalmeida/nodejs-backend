import en from '../locale/en.js';

export default class BadRequestException {
    constructor(message, status) {
        this.status = status || 422;
        this.message = message || en['bad-request-error'];
    }
};