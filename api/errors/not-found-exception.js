import en from '../locale/en.js';

export default class NotFoundException {
    constructor(message) {
        this.status = 404;
        this.message = message || en['page-not-found'];
    }
};