import en from '../locale/en.js';

export default class CreationException {
  constructor(message, status) {
    this.status = status || 409;
    this.message = message || en['creation-error'];
  }
};