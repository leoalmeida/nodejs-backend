const mockingoose = require('mockingoose');
const user = require('./userModel');



describe('Teste User model', () => {
  it('Deve retornar todos os usuários com find', () => {
    const _users = [{
        "_id": "6815337537b4b6910eddec83",
        "name": "Cliente 149501",
        "birthDate": "1966-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Medico",
        "state": "SP",
        "createdBy": "admin",
        "createdAt": "2019-10-18T16:37:58.979Z",
        "lastModifiedBy": "",
        "lastModifiedAt": null
    },{
      "_id": "6815337537b4b6910eddec84",
        "name": "Cliente 252",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Analista de Sistemas",
        "state": "SP",        
        "createdBy": "admin",
        "createdAt": "2019-10-18T16:37:58.979Z",
        "lastModifiedBy": "",
        "lastModifiedAt": null
    },{
      "_id": "6815337537b4b6910eddec85",
        "name": "Cliente 252",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Engenheiro",
        "state": "SP",
        "createdBy": "admin",
        "createdAt": "2019-10-18T16:37:58.979Z",
        "lastModifiedBy": "",
        "lastModifiedAt": null
    }];

    mockingoose(user.model).toReturn(_users, 'find');

    return user.model.find({}).then(items => {
      expect(JSON.parse(JSON.stringify(items))).toMatchObject(_users);
    });
  });

  it('Deve retornar 1 usuário com findOne', () => {
    const _oneUser = [
      {
        "_id": "6815337537b4b6910eddec83",
        "name": "Cliente 149501",
        "birthDate": "1966-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Medico",
        "state": "SP",
        "createdBy": "admin",
        "createdAt": "2019-10-18T16:37:58.979Z",
        "lastModifiedBy": "",
        "lastModifiedAt": null
    }
    ];

    mockingoose(user.model).toReturn(_oneUser, 'findOne');

    return user.model.findOne({ _id: '6815337537b4b6910eddec83' }).then(user => {
      expect(JSON.parse(JSON.stringify(user))).toMatchObject(_oneUser);
    });
  });

  it('Deve retornar o usuário atualizado', () => {
    const datenow = new Date();
    const _user = {
        "_id": "6815337537b4b6910eddec85",
        "name": "novo nome",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(22)22222222",
        "email": "email@email.com.br",
        "occupation": "Engenheiro",
        "state": "SP",
        "createdBy": "admin",
        "createdAt": "2019-10-18T16:37:58.979Z",
        "lastModifiedBy": "admin",
        "lastModifiedAt": datenow.toISOString()
    };

    mockingoose(user.model).toReturn(_user, 'findOneAndUpdate');

    return user.model
      .findOneAndUpdate({ _id: '6815337537b4b6910eddec85' }, {
        name: "novo nome",
        phone: "(22)22222222",
        lastModifiedBy: "admin",
        lastModifiedAt: datenow.toISOString()})
      .then(user => {
        expect(JSON.parse(JSON.stringify(user))).toMatchObject(_user);
      });
  });

  it('Deve retornar o novo usuário criado', () => {
    const datenow = new Date();
    const _user = {
        "_id": "6815337537b4b6910eddec88",
        "name": "novo usuário",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(33)33333333",
        "email": "email@email.com.br",
        "occupation": "Developer",
        "state": "SC",
        "createdBy": "admin",
        "createdAt": datenow.toISOString(),
        "lastModifiedBy": "",
        "lastModifiedAt": null
    };

    mockingoose(user.model).toReturn(_user, 'create');

    return user.model.create(
          { "_id": "6815337537b4b6910eddec88",
            "name": "novo usuário",
            "birthDate": "1989-10-23T03:00:00Z",
            "phone": "(33)33333333",
            "email": "email@email.com.br",
            "occupation": "Developer",
            "state": "SC",
            "createdBy": "admin",
            "createdAt": datenow.toISOString(),
            "lastModifiedBy": "",
            "lastModifiedAt": null
        })
      .then(user => {
        expect(JSON.parse(JSON.stringify(user))).toMatchObject(_user);
      });
  });
  it('Deve remover o usuário selecionado', () => {
    const _user = [{
      "_id": "6815337537b4b6910eddec85",
        "name": "Cliente 252",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Engenheiro",
        "state": "SP",
        "createdBy": "admin",
        "createdAt": "2019-10-18T16:37:58.979Z",
        "lastModifiedBy": "",
        "lastModifiedAt": null
    }];
    mockingoose(user.model).toReturn(_user, 'findOneAndDelete');

    return user.model.findOneAndDelete({ "_id": "6815337537b4b6910eddec85"})
      .then(user => {
        expect(JSON.parse(JSON.stringify(user))).toMatchObject(_user);
      });
  });
});