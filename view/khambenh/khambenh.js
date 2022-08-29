document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.sidebar .nav-link').forEach(function (element) {

    element.addEventListener('click', function (e) {

      let nextEl = element.nextElementSibling;
      let parentEl = element.parentElement;

      if (nextEl) {
        e.preventDefault();
        let mycollapse = new bootstrap.Collapse(nextEl);

        if (nextEl.classList.contains('show')) {
          mycollapse.hide();
        } else {
          mycollapse.show();
          // find other submenus with class=show
          var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
          // if it exists, then close all of them
          if (opened_submenu) {
            new bootstrap.Collapse(opened_submenu);
          }
        }
      }
    }); // addEventListener
  }) // forEach
});

$(document).ready(function () {
  let idbook;
  let lichhen = 0;
  // let i = 0;
  // let listdv = [];
  // let dv;
  let loaidv;
  // let donthuoc;
  let listthuoc = {
    "lthuoc": [
    ]
  };
  let idhosodangkham;
  let bnmoi = 1;
  let dsdichvucuahshientai;
  // let dsthuoccuadonthuochtientai;

  const account = JSON.parse(localStorage.getItem("account"));

  const token = JSON.parse(localStorage.getItem("token"));

  locdss(account.id);

  $('#myTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  $.ajax({
    url: "https://pkbe.hewo.vn/categoryservice/getallcategoryservice",
    type: "get",
    headers: {
      Authorization: token,
    },
    data: {},
    success: function (response) {
      response.result.forEach((element) => {
        $("#ldvu").append(
          "<option value='" + element.id + "' class='form-control' name='" + element.name + "'>" + element.name + "</option>"
        );
      });

      loaidv = response.result[0].name;
    }
  });

  $.ajax({
    url: "https://pkbe.hewo.vn/doctor/getalldoctor",
    type: "get",
    headers: {
      Authorization: token,
    },
    data: {},
    success: function (response) {
      response.result.forEach((element) => {
        $("#bacsi").append(
          "<option value='" + element.id + "' class='form-control' name='" + element.name + "'>" + element.name + "</option>"
        );
      });

      // loaidv = response.result[0].name;
    }
  });

  $.ajax({
    url: "https://pkbe.hewo.vn/service/getservicebycategory/" + 1,
    type: "get",
    headers: {
      Authorization: token,
    },

    data: {},

    success: function (response) {
      response.result.forEach((element) => {
        $("#dvu").append(
          "<option value='" + element.id + "' class='form-control'>" + element.name + "</option>"
        );
      });
    }
  });

  if (account == null) {
    location.replace("/home");
  }

  $("#nguoidung").html(account.name);

  $("#home").click(function (e) {
    $("#chuandoan").css("display", "none");
    $("#khambenh").css("display", "none");
    $("#kedonthuoc").css("display", "none");
    $("#ds").css("display", "inline");
  });

  $("#chuandoann").click(function (e) {
    $("#chuandoan").css("display", "block");
    $("#khambenh").css("display", "none");
    $("#kedonthuoc").css("display", "none");
    $("#ds").css("display", "none");


  });

  $("#luuhosobenhnhan").click(function (e) {
    let tenbnn = $("#tenbn").val();
    let gtbnn = $('input[name="gtbn"]:checked').val();
    let nsbnn = $("#ngaysinhbn").val();
    let sbhytbnn = $("#sobhbn").val();
    let dctbnn = $("#diachibn").val();
    let sdttbnn = $("#sdtbn").val();
    let idbskham = $("#bacsi").val();
    let ttbenhnhankham = $("#ttbenhnhankham").val();
    if (bnmoi === 1) {
      if (ktraTen() == true && ktraSDT() == true && ktraSBH() == true && ktraTTBN() == true) {
        $.ajax({
          url: "https://pkbe.hewo.vn/patient/addpartient",
          headers: {
            Authorization: token,
          },
          type: "post",
          data: { name: tenbnn, gender: gtbnn, birthday: nsbnn, insuranceNumber: sbhytbnn, address: dctbnn, phone: sdttbnn },
          success: function (response) {
            $.ajax({
              url: "https://pkbe.hewo.vn/medicalrecord/addmedicalrecord",
              headers: {
                Authorization: token,
              },
              type: "post",
              data: { patientID: response.result[0].id, doctorID: idbskham, examinationDate: response.now, patientCondition: ttbenhnhankham, note: "" },
              success: function (response) {
                // idhosodangkham= response.result[0].id;
                Swal.fire({
                  icon: 'success',
                  title: 'Cập nhật thành công !',
                  showConfirmButton: false,
                  timer: 2000
                })
                setTimeout(function () {
                  location.reload();
                }, 2000);
              }
            });
          }
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Lưu thất bại !',
          showConfirmButton: false,
          timer: 2000
        })
      }
    } else {
      var d = new Date();

      var curr_day = d.getDate();
      var curr_month = d.getMonth() + 1;
      var curr_year = d.getFullYear();

      let ngkhamhsm = curr_year + "-" + curr_month + "-" + curr_day;
      $.ajax({
        url: "https://pkbe.hewo.vn/medicalrecord/addmedicalrecord",
        headers: {
          Authorization: token,
        },
        type: "post",
        data: { patientID: idbn, doctorID: idbskham, examinationDate: ngkhamhsm, patientCondition: ttbenhnhankham, note: "" },
        success: function (response) {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công !',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(function () {
            location.reload();
          }, 2000);
        }
      });
    }
  });

  ///////////////////////// Lưu ho so va hen

  $("#luuhosobenhnhanvahen").click(function (e) {
    let tenbnn = $("#tenbn").val();
    let gtbnn = $('input[name="gtbn"]:checked').val();
    let nsbnn = $("#ngaysinhbn").val();
    let sbhytbnn = $("#sobhbn").val();
    let dctbnn = $("#diachibn").val();
    let sdttbnn = $("#sdtbn").val();
    let idbskham = $("#bacsi").val();
    let ttbenhnhankham = $("#ttbenhnhankham").val();
    if (bnmoi === 1) {
      if (ktraTen() == true && ktraSDT() == true && ktraSBH() == true && ktraTTBN() == true) {
        $.ajax({
          url: "https://pkbe.hewo.vn/patient/addpartient",
          headers: {
            Authorization: token,
          },
          type: "post",
          data: { name: tenbnn, gender: gtbnn, birthday: nsbnn, insuranceNumber: sbhytbnn, address: dctbnn, phone: sdttbnn },
          success: function (response) {
            var d = new Date();

            var curr_day = d.getDate() + 1;
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();

            let nghenkham = curr_year + "-" + curr_month + "-" + curr_day;
            $.ajax({
              url: "https://pkbe.hewo.vn/medicalrecord/addmedicalrecord",
              headers: {
                Authorization: token,
              },
              type: "post",
              data: { patientID: response.result[0].id, doctorID: idbskham, examinationDate: response.now, patientCondition: ttbenhnhankham, note: "" },
              success: function (response) {


                $.ajax({
                  url: "https://pkbe.hewo.vn/book/addbook",
                  headers: {
                    Authorization: token,
                  },
                  type: "post",
                  data: { date: nghenkham, medicalRecordID: response.result[0].id },
                  success: function (response) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Cập nhật thành công !',
                      showConfirmButton: false,
                      timer: 2000
                    })
                    setTimeout(function () {
                      location.reload();
                    }, 2000);
                  }
                });

              }
            });
          }
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Lưu thất bại !',
          showConfirmButton: false,
          timer: 2000
        })
      }
    } else {
      var d = new Date();

      var curr_day = d.getDate();
      var curr_month = d.getMonth() + 1;
      var curr_year = d.getFullYear();

      let ngkhamhsm = curr_year + "-" + curr_month + "-" + curr_day;
      $.ajax({
        url: "https://pkbe.hewo.vn/medicalrecord/addmedicalrecord",
        headers: {
          Authorization: token,
        },
        type: "post",
        data: { patientID: idbn, doctorID: idbskham, examinationDate: ngkhamhsm, patientCondition: ttbenhnhankham, note: "" },
        success: function (response) {

          var d = new Date();

          var curr_day = d.getDate() + 1;
          var curr_month = d.getMonth() + 1;
          var curr_year = d.getFullYear();

          let nghenkhamsm = curr_year + "-" + curr_month + "-" + curr_day;
          $.ajax({
            url: "https://pkbe.hewo.vn/book/addbook",
            headers: {
              Authorization: token,
            },
            type: "post",
            data: { date: nghenkhamsm, medicalRecordID: response.result[0].id },
            success: function (response) {
              Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công !',
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(function () {
                location.reload();
              }, 2000);
            }
          });
        }
      });
    }
  });


  $("#doittbs").click(function (e) {
    console.log(account);

    $("#txtHotenbs").val(account.name);
    $("#txtsdtbs").val(account.phone);
    $("#txtDiaChibs").val(account.address);
    $("#txtkhoabs").val(account.speciality);
    $("#txtphongbs").val(account.clinic);
    if (account.gender === "Nữ") {
      $("#nubs").prop("checked", true);
    } else {
      $("#nambs").prop("checked", true);
    }
    let ngbs = [];
    if ((Number(new Date(account.birthday).getMonth()) + 1) < 10) {
      let ss = Number(new Date(account.birthday).getMonth()) + 1;

      let tngsb = "0" + ss.toString();
      ngbs.push(tngsb)
    } else {
      let ss = Number(new Date(account.birthday).getMonth()) + 1;

      let tngsb = ss.toString();
      ngbs.push(tngsb)
    }
    let nsf = `${new Date(account.birthday).getFullYear()}-${ngbs}-${new Date(account.birthday).getDate()}`;

    let ngs = nsf.substring(0, 10);
    $("#ngaysinhbs").val(nsf);
    $("#exampleModal").modal("show");
    $('#exampleModal').insertAfter($('body'));
  });

  $("#updateBS").click(function (e) {
    let hoten = $("#txtHotenbs").val();
    let sdt = $("#txtsdtbs").val();
    let khoa = $("#txtkhoabs").val();
    let phong = $("#txtphongbs").val();
    let gt = $('input[name="gtbs"]:checked').val();
    let dchi = $("#txtDiaChibs").val();
    var nsinput = $("#ngaysinhbs").val();

    $.ajax({
      url: "https://pkbe.hewo.vn/doctor/updateDoctor/" + account.id,
      type: "put",
      headers: {
        Authorization: token,
      },

      data: { name: hoten, phone: sdt, address: dchi, clinic: phong, speciality: khoa, birthday: nsinput, gender: gt },

      success: function (response) {
        $.ajax({
          url: "https://pkbe.hewo.vn/doctor/getdoctorbyid/" + account.id,
          headers: {
            Authorization: token,
          },
          type: "get",
          success: function (response) {
            localStorage.setItem(
              "account",
              JSON.stringify(response.result)
            );
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật thành công !',
              showConfirmButton: false,
              timer: 2000
            })
            setTimeout(function () {
              location.reload();
            }, 2000);
          },
        });
        $("#exampleModal").modal("hide");
      },
    });

  });

  $("#bocso").click(function (e) {
    localStorage.setItem(
      "so",
      1
    );
    location.replace("/home/bocso");
  });

  $("#dangxuat").click(function (e) {
    var result = confirm("Bạn có chắc chắn muốn đăng xuất ?");
    if (result == true) {
      localStorage.removeItem("account");
      localStorage.removeItem("token");
      location.replace("/home");
    } else {
    }
  });

  $('#ldvu').click(function () {
    var id = $('#ldvu').val();
    $("#dvu").html("");
    $.ajax({
      url: "https://pkbe.hewo.vn/service/getservicebycategory/" + id,
      type: "get",
      headers: {
        Authorization: token,
      },
      data: {},
      success: function (response) {
        response.result.forEach((element) => {
          $("#dvu").append(
            "<option value='" + element.id + "' class='form-control' >" + element.name + "</option>"
          );
        });
        // loaidv = response.name;
      }
    });
    $.ajax({
      url: "https://pkbe.hewo.vn/categoryservice/getcategoryservicebyid/" + id,
      type: "get",
      headers: {
        Authorization: token,
      },
      data: {},
      success: function (response) {
        loaidv = response.result[0].name;
      }
    });
  });


  $("#themdv").click(function (e) {

    let iddichvu = $("#dvu").val();
    // let ii=0;

    // i++;
    if (dsdichvucuahshientai == null) {
      dsdichvucuahshientai = {
        "idhskhambenhht": idhosodangkham,
        "listdv": [
        ]
      };
    } else {
      dsdichvucuahshientai = JSON.parse(localStorage.getItem("listdvhsdangkham"));
      for (let index = 0; index < dsdichvucuahshientai.listdv.length; index++) {
        // const element = listdv[index];
        if (dsdichvucuahshientai.listdv[index].iddv == iddichvu) {
          Swal.fire({
            icon: 'error',
            title: 'Dịch vụ đã xử dụng !',
            showConfirmButton: false,
            timer: 2000
          });
          return;
        }
      }
    }
    let dvdangchon = {
      "iddv": iddichvu,
      "loaidv": loaidv
    };
    dsdichvucuahshientai.listdv.push(dvdangchon);

    localStorage.setItem(
      "listdvhsdangkham",
      JSON.stringify(dsdichvucuahshientai)
    );
    $.ajax({
      url: "https://pkbe.hewo.vn/service/getservicebyid/" + iddichvu,
      type: "get",
      headers: {
        Authorization: token,
      },
      data: {},
      success: function (response) {
        $("#dsdv").append(
          "<tr id='" + iddichvu + "'>" +
          "<td>" + loaidv + "</td>" +
          "<td>" + response.result[0].name + "</td>" +
          "<td>" + response.result[0].cost + "</td>" +
          "<td><input class='btn btn-primary' type='submit' name='" + iddichvu + "' style='background-color: red;border: red' value='Xóa' /></td>" +
          "</tr>"
        );
      }
    });
  });

  $("#luuhosokhambenh").click(function (e) {
    let chuandoan = $("#chuandoanbs").val();
    let ghichu = $("#ghichubs").val();
    $.ajax({
      url: "https://pkbe.hewo.vn/medicalrecord/updatemedicalrecord/" + idhosodangkham,
      type: "put",
      headers: {
        Authorization: token,
      },

      data: { diagnostic: chuandoan, note: ghichu, serviceID: JSON.stringify(dsdichvucuahshientai.listdv) },

      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Lưu thành công !',
          showConfirmButton: false,
          timer: 2000
        })
        $("#chuandoan").css("display", "none");
        $("#khambenh").css("display", "none");
        $("#ds").css("display", "none");
        $("#kedonthuoc").css("display", "inline");

        localStorage.setItem(
          "listdvhsdangkham",
          JSON.stringify(null)
        );

        $.ajax({
          url: "https://pkbe.hewo.vn/book/deletebookbymedicalrecordid/" + idbook,
          type: "delete",
          headers: {
            Authorization: token,
          },
          success: function (response) {
          }
        });
      }
    });
  });


  $("#dsdv").on("click", "input[type=submit]", function (e) {
    e.preventDefault();
    let stt = $(this).attr("name");
    if ($(this).attr("value") === "Xóa") {
      $("#" + stt).remove();
      dsdichvucuahshientai.listdv.forEach((element) => {
        if (element.iddv == stt) {
          // dsdichvucuahshientai.listdv.remove(element);
          dsdichvucuahshientai.listdv = dsdichvucuahshientai.listdv.filter(item => item !== element)
        }
      });
      console.log(dsdichvucuahshientai.listdv);
      localStorage.setItem(
        "listdvhsdangkham",
        JSON.stringify(dsdichvucuahshientai)
      );
    }
  });


  $("#indonthuoc").click(function (e) {
    window.print();
    // location.reload();
    return false;

  });

  ///////////

  $.ajax({
    url: "https://pkbe.hewo.vn/drug/getalldrug",
    type: "get",
    headers: {
      Authorization: token,
    },
    data: {},
    success: function (response) {
      response.result.forEach((element) => {
        $("#dsthuocinput").append(
          "<option value='" + element.id + "' class='form-control' name='" + element.name + "'>" + element.name + "</option>"
        );
      });

    }
  });

  $("#luuthuoc").click(function (e) {
    let ghichuthuoc = $("#ghichuthuoc").val();

    $.ajax({
      url: "https://pkbe.hewo.vn/prescription/addprescription",
      type: "post",
      headers: {
        Authorization: token,
      },

      data: { drugID: JSON.stringify(listthuoc.lthuoc), medicalRecordID: idhosodangkham, note: ghichuthuoc },

      success: function (response) {

        ///////////////////////////// hien don thuoc de in ///////////////////////////////

        $("#dsinthuoc").html("");
        $.ajax({
          url: "https://pkbe.hewo.vn/prescription/printprescription/" + response.result[0].id,
          type: "get",
          headers: {
          },

          data: {},

          success: function (response) {
            $("#inma").html("Mã bệnh nhân: " + response.result.patient.id);
            $("#inhoten").html("Họ và tên: " + response.result.patient.name);
            $("#ingt").html("Giới tính: " + response.result.patient.gender);
            $("#inns").html("Năm sinh: " + response.result.patient.birthday);
            $("#indc").html("Địa chỉ: " + response.result.patient.address);
            $("#insdt").html("Số điện thoại: " + response.result.patient.phone);
            $("#insbh").html("Số bảo hiểm: " + response.result.patient.insuranceNumber);
            $("#incd").html("Chẩn đoán: " + response.result.medicalRecord.diagnostic);
            $("#intenbs").html(response.result.doctor.name);
            $("#inghichu").html("Ghi chú: " + ghichuthuoc);
            var d = new Date();

            var curr_day = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();

            let inngkham = curr_day + "/" + curr_month + "/" + curr_year;
            $("#inngaykham").html("Ngày khám: " + inngkham);
            console.log(response);
            const str = response.result.prescription.drugID;
            let arr = JSON.parse(str);
            console.log(str);
            arr.forEach((element) => {
              $("#dsinthuoc").append(
                "<tr>" +
                "<td>" + element.name + "</td>" +
                "<td>" + element.numberUse + "</td>" +
                "<td>" + element.numberOfDay + "</td>" +
                "<td>" + element.count + "</td>" +
                "<td>" + element.unit + "</td>" +
                "<td>" + element.method + "</td>" +
                "<td>" + element.note + "</td>" +
                "</tr>"
              );
            });
          }
        });
        $("#indonthuocModal").modal("show");
        $('#indonthuocModal').insertAfter($('body'));
      }
    });


  });

  // $("#themthuoc").click(function (e) {

  //   let i = 1;
  //   let idthuoc = $("#dsthuocinput").val();
  //   let slngay = $("#solanngay").val();
  //   let sllan = $("#soluonglan").val();
  //   let tongcong = $("#tongcong").val();
  //   let donvi = $('#donvi').val();
  //   let phuongthuc = $("#pthuc").val();

  //   if (sllan != "" && sllan != "" && tongcong != "") {

  //     $.ajax({
  //       url: "https://pkbe.hewo.vn/drug/getdrugbyid/" + idthuoc,
  //       type: "get",
  //       headers: {
  //         Authorization: token,
  //       },
  //       data: {},
  //       success: function (response) {
  //         let tenthuoc = response.result[0].name;
  //         listthuoc.push(
  //           { "dgID": Number(idthuoc), "name": tenthuoc, "count": Number(tongcong), "numberUse": Number(sllan), "method": phuongthuc, "numberOfDay": Number(slngay), "unit": response.result[0].unit, "note": response.result[0].description });

  //         $("#dsthuoc").append(
  //           "<tr id='" + i + "'>" +
  //           "<td>" + tenthuoc + "</td>" +
  //           "<td>" + slngay + "</td>" +
  //           "<td>" + sllan + "</td>" +
  //           "<td>" + tongcong + "</td>" +
  //           "<td>" + donvi + "</td>" +
  //           "<td>" + phuongthuc + "</td>" +
  //           "</tr>"
  //         );

  //         $("#tenthuoc").val("");
  //         $("#solanngay").val("");
  //         $("#soluonglan").val('');
  //         $("#tongcong").val('');
  //         i++;
  //       }
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Nhập đầy đủ thông tin thuốc !',
  //       showConfirmButton: false,
  //       timer: 2000
  //     })
  //   }

  // });

  $("#themthuoc").click(function (e) {

    let i = 1;
    let idthuoc = $("#dsthuocinput").val();
    let slngay = $("#solanngay").val();
    let sllan = $("#soluonglan").val();
    let tongcong = $("#tongcong").val();
    let donvi = $('#donvi').val();
    let phuongthuc = $("#pthuc").val();

    if (sllan != "" && sllan != "" && tongcong != "") {
      if (listthuoc.lthuoc != null) {
        for (let index = 0; index < listthuoc.lthuoc.length; index++) {
          if (listthuoc.lthuoc[index].dgID == idthuoc) {
            Swal.fire({
              icon: 'error',
              title: 'Thuốc đã xử dụng !',
              showConfirmButton: false,
              timer: 2000
            });
            return;
          }
        }
      }

      $.ajax({
        url: "https://pkbe.hewo.vn/drug/getdrugbyid/" + idthuoc,
        type: "get",
        headers: {
          Authorization: token,
        },
        data: {},
        success: function (response) {
          let tenthuoc = response.result[0].name;
          listthuoc.lthuoc.push(
            { "dgID": Number(idthuoc), "name": tenthuoc, "count": Number(tongcong), "numberUse": Number(sllan), "method": phuongthuc, "numberOfDay": Number(slngay), "unit": response.result[0].unit, "note": response.result[0].description });

          $("#dsthuoc").append(
            "<tr id='thuoc" + idthuoc + "'>" +
            "<td>" + tenthuoc + "</td>" +
            "<td>" + slngay + "</td>" +
            "<td>" + sllan + "</td>" +
            "<td>" + tongcong + "</td>" +
            "<td>" + donvi + "</td>" +
            "<td>" + phuongthuc + "</td>" +
            "<td><input class='btn btn-primary' type='submit' name='" + idthuoc + "' style='background-color: red;border: red' value='Xóa' /></td>" +
            "</tr>"
          );

          $("#tenthuoc").val("");
          $("#solanngay").val("");
          $("#soluonglan").val('');
          $("#tongcong").val('');
          i++;
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Nhập đầy đủ thông tin thuốc !',
        showConfirmButton: false,
        timer: 2000
      })
    }

  });


  $("#dsthuoc").on("click", "input[type=submit]", function (e) {
    e.preventDefault();
    let stt = $(this).attr("name");
    if ($(this).attr("value") === "Xóa") {
      $("#thuoc" + stt).remove();
      listthuoc.lthuoc.forEach((element) => {
        if (element.dgID == stt) {
          listthuoc.lthuoc = listthuoc.lthuoc.filter(item => item !== element)
        }
      });

      console.log(listthuoc);
    }
  });

  $("#tkbenhnhan").click(function (e) {
    let mabenhnahn = $("#inputtkbenhnhan").val();
    $.ajax({
      url: "https://pkbe.hewo.vn/patient/getpartientbyid/" + mabenhnahn,
      type: "get",
      headers: {
        Authorization: token,
      },
      data: {},
      success: function (response) {
        console.log(response);
        if (response.result[0] != null) {
          bnmoi = 0;
          idbn = mabenhnahn;
          $("#tenbn").val(response.result[0].name);
          $("#ngaysinhbn").val(response.result[0].birthday);
          $("#diachibn").val(response.result[0].address);
          $("#sobhbn").val(response.result[0].insuranceNumber);
          $("#sdtbn").val(response.result[0].phone);
          if (response.result[0].gender == "Nam") {
            $("#nambn").prop("checked", true);
          } else {
            $("#nubn").prop("checked", true);
          }
        } else {
          bnmoi = 1;
          Swal.fire({
            icon: 'error',
            title: 'Không tìm thấy bệnh nhân !',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    });

  });

  ///////////// danh sach cho kham ////////////////////////

  $("#locds").click(function (e) {
    locdss(account.id);
  });

  $('#locdstheopp').click(function () {
    var id = $('#locdstheopp').val();
    $("#listdschokham").html('');
    if (id == 0) {
      lichhen = 0;
      $.ajax({
        url: "https://pkbe.hewo.vn/medicalrecord/getmedicalrecordbydoctorid/" + account.id,
        type: "get",
        headers: {
          Authorization: token,
        },
        data: {},
        success: function (response) {
          response.result.forEach((element) => {
            $.ajax({
              url: "https://pkbe.hewo.vn/patient/getpartientbyid/" + element.patientID,
              type: "get",
              headers: {
                Authorization: token,
              },
              data: {},
              success: function (response) {
                $("#listdschokham").append(
                  "<tr id=" + element.id + ">" +
                  "<td>" + element.id + "</td>" +
                  "<td>" + response.result[0].name + "</td>" +
                  "<td>" + response.result[0].birthday + "</td>" +
                  "<td>" + response.result[0].gender + "</td>" +
                  "<td>" + element.patientCondition + "</td>" +
                  `<td><input type='submit' value='Khám' name='${element.id}' class='btn btn-success'></td>`
                );
              }
            });
          });
        }
      });
    } else {
      lichhen = 1;
      let ngdangkham;
      var d = new Date();

      var curr_day = d.getDate();
      var curr_month = d.getMonth() + 1;
      var curr_year = d.getFullYear();

      if (curr_month < 10) {
        ngdangkham = curr_year + "-0" + curr_month + "-" + curr_day;
      } else {
        ngdangkham = curr_year + "-" + curr_month + "-" + curr_day;
      }
      $.ajax({
        url: "https://pkbe.hewo.vn/book/getbookbydate",
        type: "post",
        headers: {
          Authorization: token,
        },
        data: { date: ngdangkham },
        success: function (response) {
          response.result.forEach((element) => {

            $.ajax({
              url: "https://pkbe.hewo.vn/medicalrecord/getmedicalrecordbyid/" + element.medicalRecordID,
              type: "post",
              headers: {
                Authorization: token,
              },
              data: {},
              success: function (response) {
                let ttbenhnhannnnnn = response.result.patientCondition;
                $.ajax({
                  url: "https://pkbe.hewo.vn/patient/getpartientbyid/" + response.result.patientID,
                  type: "get",
                  headers: {
                    Authorization: token,
                  },
                  data: {},
                  success: function (response) {
                    $("#listdschokham").append(
                      "<tr id=" + element.medicalRecordID + ">" +
                      "<td>" + element.medicalRecordID + "</td>" +
                      "<td>" + response.result[0].name + "</td>" +
                      "<td>" + response.result[0].birthday + "</td>" +
                      "<td>" + response.result[0].gender + "</td>" +
                      "<td>" + ttbenhnhannnnnn + "</td>" +
                      `<td><input type='submit' value='Khám' name='${element.medicalRecordID}' class='btn btn-success'></td>`
                    );
                  }
                });
              }
            });
          });
        }
      });
    }
  });

  $("#listdschokham").on("click", "input[type=submit]", function (e) {
    e.preventDefault();
    let stt = $(this).attr("name");
    idhosodangkham = stt;
    $("#dsdv").html("");
    if ($(this).attr("value") === "Khám") {
      donthuoc = "";
      let idbn = "";
      $("#chuandoanbs").val("");
      $("#dsthuoc").html("");
      listthuoc.lthuoc = [];
      // let idbs = "";
      if (lichhen == 1) {
        idbook = stt;
      }
      $.ajax({
        url: "https://pkbe.hewo.vn/medicalrecord/getmedicalrecordbyid/" + stt,
        headers: {
          Authorization: token,
        },
        type: "post",
        data: {},
        success: function (response) {
          idbn = response.result.patientID;
          idhosodangkham = response.result.id;
          idbs = response.result.doctorID;
          $("#ttttbenhnhan").html(response.result.patientCondition);
          $.ajax({
            url: "https://pkbe.hewo.vn/patient/getpartientbyid/" + idbn,
            headers: {
              Authorization: token,
            },
            type: "get",
            data: {},
            success: function (response) {
              $("#ttmabn").html(response.result[0].id);
              $("#tthoten").html(response.result[0].name);
              $("#ttngaysinh").html(response.result[0].birthday);
              $("#ttgioiTinh").html(response.result[0].gender);
              $("#ttdiachi").html(response.result[0].address);
            },
          });
          $.ajax({
            url: "https://pkbe.hewo.vn/doctor/getdoctorbyid/" + account.id,
            headers: {
              Authorization: token,
            },
            type: "get",
            data: {},
            success: function (response) {
              $("#ttbacsi").html(response.result.name);
              $("#ttkhoa").html(response.result.speciality);
            },
          });

          dsdichvucuahshientai = JSON.parse(localStorage.getItem("listdvhsdangkham"));
          if (dsdichvucuahshientai != null) {
            if (dsdichvucuahshientai.idhskhambenhht != stt) {
              dsdichvucuahshientai = null;
            } else {
              console.log(dsdichvucuahshientai);
              dsdichvucuahshientai.listdv.forEach((element) => {
                $.ajax({
                  url: "https://pkbe.hewo.vn/service/getservicebyid/" + element.iddv,
                  type: "get",
                  headers: {
                    Authorization: token,
                  },
                  data: {},
                  success: function (response) {
                    $("#dsdv").append(
                      "<tr id='" + element.iddv + "'>" +
                      "<td>" + element.loaidv + "</td>" +
                      "<td>" + response.result[0].name + "</td>" +
                      "<td>" + response.result[0].cost + "</td>" +
                      "<td><input class='btn btn-primary' type='submit' name='" + element.iddv + "' style='background-color: red;border: red' value='Xóa' /></td>" +
                      "</tr>"
                    );
                  }
                });
              });
            }
          };
        },
      });

      $("#chuandoan").css("display", "none");
      $("#khambenh").css("display", "inline");
      $("#ds").css("display", "none");
      $("#" + stt).remove();
    }
  });

  $("#huykhambenh").click(function (e) {
    location.reload();
  });

  $("#huychuandoan").click(function (e) {
    location.reload();
  });


  function locdss(params) {
    $("#listdschokham").html('');
    lichhen = 0;
    $.ajax({
      url: "https://pkbe.hewo.vn/medicalrecord/getmedicalrecordbydoctorid/" + params,
      type: "get",
      headers: {
        Authorization: token,
      },
      data: {},
      success: function (response) {
        response.result.forEach((element) => {
          $.ajax({
            url: "https://pkbe.hewo.vn/patient/getpartientbyid/" + element.patientID,
            type: "get",
            headers: {
              Authorization: token,
            },
            data: {},
            success: function (response) {
              $("#listdschokham").append(
                "<tr id=" + element.id + ">" +
                "<td>" + element.id + "</td>" +
                "<td>" + response.result[0].name + "</td>" +
                "<td>" + response.result[0].birthday + "</td>" +
                "<td>" + response.result[0].gender + "</td>" +
                "<td>" + element.patientCondition + "</td>" +
                `<td><input type='submit' value='Khám' name='${element.id}' class='btn btn-success'></td>`
              );
            }
          });

        });

      }
    });
  }

});





