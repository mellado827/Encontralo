const mongoose = require('mongoose')

function connectDatabase() {
  mongoose.Promise = global.Promise;
  const dbUrlDev = `mongodb://localhost/encontralo`;
  const dbUrlPro = `mongodb+srv://${process.env.USR_DB_PRO}:${process.env.PSW_DB_PRO}@cluster0-kzisw.gcp.mongodb.net/db-comparador?retryWrites=true&w=majority`;
  let dbConnect = "";

  process.env.NODE_ENV = process.env.NODE_ENV || "dev";
  if (process.env.NODE_ENV == "dev") {
    dbConnect = dbUrlDev;
  } else {
    dbConnect = dbUrlPro;
  }

  mongoose
    .connect(dbConnect, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("------------------------------------------------------");
      console.log("Base de datos iniciada satisfactoriamente - Encontralo");
      console.log("------------------------------------------------------");
    })
    .catch((err) => console.log(err));
}

module.exports = {
  connectDatabase,
};
