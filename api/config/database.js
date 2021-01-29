const mongoose = require("mongoose");

function connectDatabase() {
  mongoose.Promise = global.Promise;
  const dbUrlDev = `mongodb://localhost/encontralo`;
  const dbUrlPro = `mongodb://${process.env.user_db_production}:${process.env.pwd_db_production}@${process.env.host_db}:${process.env.port_db}/${process.env.name_db}?retryWrites=true&w=majority`;
  let dbConnect = "";

  process.env.NODE_ENV = process.env.NODE_ENV || "dev";
  if (process.env.NODE_ENV == "dev") {
    dbConnect = dbUrlPro;
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
