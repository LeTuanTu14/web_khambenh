const db = require("../config/ConnectDB");

const Patient = {
  getPartientByID: function (id, callback) {
    return db.query("select * from Patient where id=?", [id], callback);
  },
};
module.exports = Patient;