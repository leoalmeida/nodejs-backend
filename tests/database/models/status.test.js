const mockingoose = require('mockingoose');
const resource = require('./resourceModel');

describe('test mongoose Resource model', () => {
  it('Deve retornar os status de todos os recursos com find', () => {
    const _resources = [
      {
          "_id": "6815337537b4b6910eddec82",
          "name": "hub7943981185795460",
          "type": "accounts",
          "location": "eastus",
          "status": "running",
          "createdBy": "5da9ea674234635bdff45c02",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedBy": "5da9ea674234635bdff45c02",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z" 
      },
      {
          "_id": "6815337537b4b6910eddec83",
          "name": "projai795460",
          "type": "project",
          "location": "eastus",
          "status": "running",
          "createdBy": "5da9ea674234635bdff45c02",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedBy": "5da9ea674234635bdff45c02",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z"
      },
      {
          "_id": "6815337537b4b6910eddec84",
          "name": "space794398",
          "type": "hub",
          "location": "eastus",
          "status": "stopped",
          "createdBy": "5da9ea674234635bdff45c02",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedBy": "5da9ea674234635bdff45c02",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z"
      },
      {
          "_id": "6815337537b4b6910eddec85",
          "name": "st981185795460",
          "type": "storage",
          "location": "eastus",
          "status": "stopped",
          "createdBy": "5da9ea674234635bdff45c02",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedBy": "5da9ea674234635bdff45c02",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z"
      }
    ];

    mockingoose(resource.model).toReturn(_resources, 'find');

    return resource.model.find({}).then(items => {
      expect(JSON.parse(JSON.stringify(items))).toMatchObject(_resources);
    });
  });

  it('Deve retornar o status de 1 recurso com findOne', () => {
    const _oneResource = [
      {
          "_id": "6815337537b4b6910eddec85",
          "name": "st981185795460",
          "type": "storage",
          "location": "eastus",
          "status": "stopped",
          "createdBy": "5da9ea674234635bdff45c02",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedBy": "5da9ea674234635bdff45c02",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z"
      }
    ];

    mockingoose(resource.model).toReturn(_oneResource, 'findOne');

    return resource.model.findOne({ _id: '6815337537b4b6910eddec85' }).then(res => {
      expect(JSON.parse(JSON.stringify(res))).toMatchObject(_oneResource);
    });
  });

  it('Deve retornar o novo status do recurso atualizado', () => {
    const datenow = new Date();
    const _res = {
        "_id": "6815337537b4b6910eddec85",
        "name": "st981185795460",
        "type": "storage",
        "location": "eastus",
        "status": "running",
        "createdBy": "5da9ea674234635bdff45c02",
        "createdAt": "2025-04-28T15:12:56.090Z",
        "lastModifiedBy": "admin",
        "lastModifiedAt": datenow.toISOString()
    };

    mockingoose(resource.model).toReturn(_res, 'findOneAndUpdate');

    return resource.model
      .findOneAndUpdate({ _id: '6815337537b4b6910eddec85' }, {
        status: "running",
        lastModifiedBy: "admin",
        lastModifiedAt: datenow.toISOString()})
      .then(res => {
        expect(JSON.parse(JSON.stringify(res))).toMatchObject(_res);
      });
  });
});
