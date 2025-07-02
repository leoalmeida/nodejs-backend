export default class InternalServerError {
    constructor(message, errors = '') {
        this.status = 500;
        this.message = message || 'server error';
        this.errors = errors;
    }
};