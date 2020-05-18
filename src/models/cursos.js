const mongoose = require('mongoose');

//importa o mongoose paginate (paginacao)
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    unique: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10000,
    unique: true
  },
  mediaSal: {
    intern: {
      type: Number,
      minlength: 1,
      maxlength: 999999
    },
    traineer: {
      type: Number,
      minlength: 1,
      maxlength: 999999
    },
    junior: {
      type: Number,
      minlength: 1,
      maxlength: 999999
    },
    pleno: {
      type: Number,
      minlength: 1,
      maxlength: 999999
    },
    senior: {
      type: Number,
      minlength: 1,
      maxlength: 999999
    },
    master: {
      type: Number,
      minlength: 1,
      maxlength: 999999
    }
  },
  mainInfo: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10000
  },
  psInfo: {
    type: String,
    minlength: 1,
    maxlength: 10000
  },
  occupationArea: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10000
  },
  //poderia ser -> {
  // timestamps: true,
  // }
  // cria createdAt: true e updatedAt
  //vai salvar a data e preencher automaticamente
  createdAt: {
    type: Date,
    default: Date.now
  },
});



//adiciona o plugin para permitir paginacao
CourseSchema.plugin(mongoosePaginate);


mongoose.model('Curso', CourseSchema);