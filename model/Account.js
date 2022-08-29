const db = require("../config/ConnectDB");

const Account = {
  getAllAccount: function (callback) {
    return db.query("Select * from Account", callback);
  },
  checkAccount: function (userName, callback) {
    return db.query(
      "select * from Account where userName=?",
      [userName],
      callback
    );
  },
  signIn: function (userName, password, callback) {
    return db.query(
      "select idUser from Account where userName=? and password=?",
      [userName, password],
      callback
    );
  },
};
module.exports = Account;
