const mongoose = require("mongoose");

function connectDatabase() {
  mongoose.Promise = global.Promise;
  const dbUrlDev = `mongodb://localhost/encontralo`;
  // const dbPablo = `mongodb+srv://${process.env.USR_DB_PAB}:${process.env.PSW_DB_PAB}@cluster0-kzisw.gcp.mongodb.net/encontralo-devr?retryWrites=true&w=majority`;
  // const dbUrlPro = `mongodb+srv://${process.env.USR_DB_PRO}:${process.env.PSW_DB_PRO}@cluster0-kzisw.gcp.mongodb.net/db-encontralo?retryWrites=true&w=majority`;
  let dbConnect = dbUrlDev;

  // process.env.NODE_ENV = process.env.NODE_ENV || "dev";
  // if (process.env.NODE_ENV == "dev") {
  //   dbConnect = dbPablo;
  // } else {
  //   dbConnect = dbUrlPro;
  // }

  mongoose
    .connect(dbConnect, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.clear();
      console.log("------------------------------------------------------");
      console.log("Base de datos iniciada satisfactoriamente - Encontralo");
      console.log("------------------------------------------------------");
    })
    .catch((err) => console.log(err));
}

module.exports = {
  connectDatabase,
};
