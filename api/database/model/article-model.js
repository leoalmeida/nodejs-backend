// Definição de um modelo de Artigo
import { Schema as _Schema, model as _model } from 'mongoose';

const schema = new _Schema ({
    title : { type: String, required: [true, 'article title required'] },
    content : { type: String, required: [true, 'article content required'] },
    author :  { type: String, required: [true, 'article author required'] }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

schema.pre('save', () => console.log('Saving article...'));

schema.post('save', function(article) {
  console.log('%s has been saved', article._id);
});

schema.pre('validate', () => console.log('Validating article...'));

schema.post('validate', function(article) {
  console.log('%s has been validated (but not saved yet)', article._id);
});
schema.post('deleteOne', function(article) {
  console.log('%s has been deleted', article._id);
});

const model = _model('Article', schema);

// Exportando o model utilizado pelos controllers
export default { model, schema };