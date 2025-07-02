import ArticleService from '../../api/controllers/article-controller';
import Article from '../../api/model/article-model';
import { setup } from '../setup';
setup();


describe('Teste Resource model', () => {
  

  it('Should return only 1 article with findOne', async () => {
    const _oneResource = [
      {
          "_id": "6815337537b4b6910eddec85",
          "title": "st981185795460",
          "content": "sed do eiusmod tempor incididunt ut",
          "author": "Jones",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z"
      }
    ];

    mockingoose(model).toReturn(_oneResource, 'findOne');

    const res = await model.findOne({ _id: '6815337537b4b6910eddec85' });
    expect(JSON.parse(JSON.stringify(res))).toMatchObject(_oneResource);
  });

  it('Should return the changed article when findOneAndUpdate', async () => {
    const datenow = new Date();
    const _res = {
          "_id": "6815337537b4b6910eddec85",
          "title": "st981185795460",
          "content": "sed do eiusmod tempor incididunt ut",
          "author": "Jones",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedAt": null
      };
    mockingoose(model).toReturn(_res, 'findOneAndUpdate');

    const res = await model
      .findOneAndUpdate({ _id: '6815337537b4b6910eddec85' }, {
        title: "Changed",
        lastModifiedAt: datenow.toISOString()
      });
    expect(JSON.parse(JSON.stringify(res))).toMatchObject(_res);
  });

  it('Should return the new article when create', async () => {
    const datenow = new Date();
    const _res = {
        "title": "new article",
        "content": "loren ipsum dolor sit amet",
        "author": "Martin",
        "createdAt": datenow.toISOString(),
        "lastModifiedAt": null
    };

    mockingoose(model).toReturn(_res, 'create');

    const res = await model.create({
      "title": "new article",
      "content": "loren ipsum dolor sit amet",
      "author": "Martin",
      "createdAt": datenow.toISOString(),
      "lastModifiedAt": null
    });
    expect(JSON.parse(JSON.stringify(res))).toMatchObject(_res);
  });

  it('Should remove the article when findOneAndDelete', async () => {
    const datenow = new Date();
    const _res = {
          "_id": "6815337537b4b6910eddec85",
          "title": "st981185795460",
          "content": "sed do eiusmod tempor incididunt ut",
          "author": "Jones",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedAt": null
      };

    mockingoose(model).s(_res, 'findOneAndDelete');

    const res = await model.create({
      "title": "new article",
      "content": "loren ipsum dolor sit amet",
      "author": "Martin",
      "createdAt": datenow.toISOString(),
      "lastModifiedAt": null
    });
    expect(JSON.parse(JSON.stringify(res))).toMatchObject(_res);
  });
});

describe('Getting articles', () => {
  const _resources = [
      {
          "_id": "6815337537b4b6910eddec82",
          "title": "Hello World",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "author": "John",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z" 
      },
      {
          "_id": "6815337537b4b6910eddec83",
          "title": "projai795460",
          "content": "Lorem ipsum dolor sit amet",
          "author": "Medvedev",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z"
      },
      {
          "_id": "6815337537b4b6910eddec84",
          "title": "space794398",
          "content": "consectetur adipiscing elit",
          "author": "Roger",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z"
      },
      {
          "_id": "6815337537b4b6910eddec85",
          "title": "st981185795460",
          "content": "sed do eiusmod tempor incididunt ut",
          "author": "Jones",
          "createdAt": "2025-04-28T15:12:56.090Z",
          "lastModifiedAt": "2025-04-28T15:12:56.090Z"
      }
    ];
  it('Should return all the articles with find', async () => {
    await Article.create(_resources);
    const result = await ArticleService.listArticles();
    expect(JSON.parse(JSON.stringify(items))).toMatchObject(_resources);
  });
  it('should return the rizzes added to the database', async () => {
    await Article.create([{ text: 'First Rizz' }, { text: 'Second Rizz' }]);
    const result = await RizzService.GetLatestRizz();
    expect(result.total_docs).toBe(2);
  });
});

describe('Liking a rizz', () => {
  it('should increase the likes count of a rizz', async () => {
    const rizz = await Rizz.create({ text: 'First Rizz' });
    await RizzService.LikeRizz(rizz._id);
    const updatedRizz = await Rizz.findById(rizz._id);
    expect(updatedRizz.likes).toBe(1);
  });
}); 
