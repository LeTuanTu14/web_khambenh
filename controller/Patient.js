const Patient = require("../model/Patient");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const getPartientByID = (req, res, next) => {
  try {
    Patient.getPartientByID(req.params.id, function (err, rows) {
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

const createNumber = async (req, res, next) => {
  try {
    const doc = new PDFDocument({margin: 50});
    
    doc.pipe(
      fs.createWriteStream(`./temp/Number${req.body.number}.pdf`, "UTF-8")
    );
    doc.fontSize(25).text("So thu tu", {
      align: "center",
    }).moveDown();
    doc.fontSize(45).text(`${req.body.number}`, {
      align: "center",
    }).moveDown().moveDown();
    doc.end();
    
    return res.json({
      status: 200,
      result: "ok",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getPartientByID, createNumber };
