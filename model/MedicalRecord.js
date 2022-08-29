const db = require("../config/ConnectDB");

const MedicalRecord = {
  getMedicalRecordByID: function (id, callback) {
    return db.query("select * from MedicalRecord where id=?", [id], callback);
  },
  addMedicalRecord: function (medicalRecord, callback) {
    return db.query(
      "INSERT INTO MedicalRecord (`patientID`, `doctorID`, `examinationDate`, `patientCondition`, `diagnostic`, `prescription`, `note`) VALUES (?,?,?,?,?,?,?)",
      [
        medicalRecord.patientID,
        medicalRecord.doctorID,
        medicalRecord.examinationDate,
        medicalRecord.patientCondition,
        medicalRecord.diagnostic,
        medicalRecord.prescription,
        medicalRecord.note,
      ],
      callback
    );
  },
  updateMedicalRecord: function (id, medicalRecord, callback) {
    return db.query(
      "update MedicalRecord set patientCondition=?,diagnostic=?,prescription=?,note=? where id=?",
      [
        medicalRecord.patientCondition,
        medicalRecord.diagnostic,
        medicalRecord.prescription,
        medicalRecord.note,
        id,
      ],
      callback
    );
  },
  deleteMedicalRecord: function (id, callback) {
    return db.query("delete from MedicalRecord where id=?", [id], callback);
  },
};
module.exports = MedicalRecord;
