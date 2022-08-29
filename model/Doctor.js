const db = require("../config/ConnectDB");

const Doctor = {
  getDoctorByID: function (id, callback) {
    return db.query("select * from Doctor where id=?", [id], callback);
  },
  updateDoctor: function (id, doctor, callback) {
    return db.query(
      "update Doctor set phone=?,address=?,clinic=?,speciality=? where Id=?",
      [phone, address, clinic, speciality, id],
      callback
    );
  },
};
module.exports = Doctor;
