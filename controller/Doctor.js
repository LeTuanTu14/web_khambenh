const Doctor = require("../model/Doctor");
const updateDoctor = (req, res, next) => {
  try {
    Doctor.updateDoctor(req.params.id, req.body, function (err, rows) {
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

module.exports = { updateDoctor };
