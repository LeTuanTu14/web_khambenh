const Account = require("../model/Account");
const Doctor = require("../model/Doctor");
const jwt = require("jsonwebtoken");
const getAllAccount = (req, res, next) => {
  try {
    Account.getAllAccount(function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        if (rows === 0) {
          return res.json({
            status: 200,
            result: [],
          });
        } else {
          return res.json({
            status: 200,
            result: rows,
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
const signIn = (req, res, next) => {
  try {
    Account.checkAccount(req.body.userName, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        if (rows.length === 0) {
          return res.json({
            status: 403,
            result: "Không tìm thấy tài khoản!!!",
          });
        } else {
          Account.signIn(
            req.body.userName,
            req.body.password,
            function (err, rows) {
              if (err) {
                res.json(err);
              } else {
                if (rows.length === 0) {
                  return res.json({
                    status: 403,
                    result: "Sai mật khẩu!!!",
                  });
                } else {
                  Doctor.getDoctorByID(rows[0].idUser, function (err, result) {
                    const accessToken = jwt.sign(
                      { id: result[0].id },
                      process.env.ACCESS_TOKEN_SECRET,
                      { expiresIn: "24h" }
                    );
                    return res.json({
                      status: 200,
                      result: result[0],
                      token: accessToken,
                    });
                  });
                }
              }
            }
          );
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAccount, signIn };
