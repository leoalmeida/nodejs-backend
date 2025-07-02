// Definição de um modelo de Recurso 
import { Schema as _Schema, model as _model } from 'mongoose';

export const schema = new _Schema ({
    name : { type: String, required: true },
    type : { type: String, required: true },
    location :  { type: String, required: false },
    status :  { type: String, required: true },
    createdBy :  { type: String, required: true },
    createdAt :  { type: Date, required: true },
    lastModifiedBy :  { type: String, required: false },
    lastModifiedAt :  { type: Date, required: false }
});

export const model = _model('Resource', schema);