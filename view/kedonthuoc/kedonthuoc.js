$(document).ready(function () {
  const token = JSON.parse(localStorage.getItem("token"));

  let listthuoc= [];
  let donthuoc;

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

      data: { drugID: JSON.stringify(listthuoc), 	medicalRecordID: 26, note: ghichuthuoc},

      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Lưu thành công !',
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(function () {
          location.reload();
        }, 2000);
      }
      });


  });

  $("#themthuoc").click(function (e) {
    
    let i = 1;
    let tenthuoc = $("#dsthuocinput").val();
    let slngay = $("#solanngay").val();
    let sllan = $("#soluonglan").val();
    let tongcong = $("#tongcong").val();
    let donvi = $('#donvi').val();
    let phuongthuc = $("#pthuc").val();
    

    listthuoc.push(
      {"dgID": Number(tenthuoc), "count": Number(tongcong)});

    if (tenthuoc != "" || slngay != "" || sllan != "" || tongcong != "") {
      $("#dsthuoc").append(
        "<tr id='" + i + "'>" +
        "<td>" + tenthuoc + "</td>" +
        "<td>" + slngay + "</td>" +
        "<td>" + sllan + "</td>" +
        "<td>" + tongcong + "</td>" +
        "<td>" + donvi + "</td>" +
        "<td>" + phuongthuc + "</td>" +
        "</tr>"
      );

      $("#tenthuoc").val("");
      $("#solanngay").val("");
      $("#soluonglan").val('');
      $("#tongcong").val('');
      i++;
    } else {
      alert("Vui lòng nhập đầy đủ đơn thuốc !!");
    }

  });
});