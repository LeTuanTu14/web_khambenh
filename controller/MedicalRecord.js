const MedicalRecord = require("../model/MedicalRecord");

const getMedicalRecordByID = (req, res, next) => {
  try {
    MedicalRecord.getMedicalRecordByID(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        return res.json({
          status: 200,
          result: rows,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
const addMedicalRecord = (req, res, next) => {
  try {
    MedicalRecord.addMedicalRecord(
      req.body.patientID,
      req.body.doctorID,
      req.body.examinationDate,
      req.body.patientCondition,
      req.body.diagnostic,
      req.body.prescription,
      req.body.note,
      function (err, rows) {
        if (err) {
          res.json(err);
        } else {
          return res.json({
            status: 200,
            result: rows,
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
const updateMedicalRecord = (req, res, next) => {
  try {
    MedicalRecord.updateMedicalRecord(
      req.params.id,
      req.body,
      function (err, rows) {
        if (err) {
          res.json(err);
        } else {
          return res.json({
            status: 200,
            result: rows,
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
const deleteMedicalRecord = (req, res, next) => {
  try {
    MedicalRecord.deleteMedicalRecord(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        return res.json({
          status: 200,
          result: "Xóa thành công!!!",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getMedicalRecordByID,
  addMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
};
