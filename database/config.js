const mongoose = require('mongoose');

const dotenv = require('dotenv').config()

const URI = process.env.LOGIN;

const connectDB = async () =>{
  await mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  console.log('Banco de dados Inicializado');
}

module.exports = connectDB;

/*mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('debug', true);
*/

/*mongoose
  .connect(URI)
  .then(() => console.log('Banco de Dados inicializado'))
  .catch((err) => console.log(err));*/



