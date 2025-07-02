// Definição de um modelo de Usuário 
import { Schema as _Schema, model as _model } from 'mongoose';

export const schema = new _Schema ({
    name : { type: String, required: true },
    birthDate :  { type: String, required: false },
    phone :  { type: String, required: false },
    email :  { type: String, required: false },
    occupation :  { type: String, required: false },
    state :  { type: String, required: false },
    createdBy :  { type: String, required: true },
    createdAt :  { type: Date, required: true },
    lastModifiedBy :  { type: String, required: false },
    lastModifiedAt :  { type: Date, required: false }
});
export const model = _model('User', schema);

// Criação de recrusos iniciais na tabela para testes
/*model.exists({}).then((users) => {
    if (users) return;
    console.log('Criando dados iniciais de usuários');
    
    model.create({
        "name": "Cliente 149501",
        "birthDate": "1966-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Medico",
        "state": "SP",
        "createdAt": new Date()
    }).then(() => console.log('user1'));
    model.create({
        "name": "Cliente 252",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Analista de Sistemas",
        "state": "SP",
        "createdAt": new Date()
    }).then(() => console.log('user2'));
    model.create({
        "name": "Cliente 252",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Engenheiro",
        "state": "SP",
        "createdAt": new Date()
    }).then(() => console.log('user3'));
});*/
