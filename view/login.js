
$(document).ready(function () {

    $('#login').click(function (e) {
        let us = $("#txtUN").val();
        let mk = $("#matKhau").val();

        $.ajax({
            url: "https://pkbe.hewo.vn/account/signin",
            type: "post",
            data: { userName: us, password: mk },
            success: function (response) {
                if (response.status != 403) {
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'success',
                        title: 'Đăng nhập thành công !',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    // setTimeout(function(){
                    //   location.reload();
                    // }, 2000);
                    localStorage.setItem(
                        "account",
                        JSON.stringify(response.result)
                    );
                    localStorage.setItem(
                        "token",
                        JSON.stringify(response.token)
                    );
                    setInterval(chuyentrang(), 2000);
                } else
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'error',
                        title: 'Đăng nhập thất bại !',
                        showConfirmButton: false,
                        timer: 2000
                    })
            }
        });

    });

    $("#matKhau").keypress(function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
            let us = $("#txtUN").val();
            let mk = $("#matKhau").val();

            $.ajax({
                url: "https://pkbe.hewo.vn/account/signin",
                type: "post",
                data: { userName: us, password: mk },
                success: function (response) {
                    if (response.status != 403) {
                        Swal.fire({
                            // position: 'top-end',
                            icon: 'success',
                            title: 'Đăng nhập thành công !',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        // setTimeout(function(){
                        //   location.reload();
                        // }, 2000);
                        localStorage.setItem(
                            "account",
                            JSON.stringify(response.result)
                        );
                        localStorage.setItem(
                            "token",
                            JSON.stringify(response.token)
                        );
                        setInterval(chuyentrang(), 2000);
                    } else
                        Swal.fire({
                            // position: 'top-end',
                            icon: 'error',
                            title: 'Đăng nhập thất bại !',
                            showConfirmButton: false,
                            timer: 2000
                        })
                }
            });
        }
    });

});
function chuyentrang() {
    location.replace("/home/khambenh");
};
