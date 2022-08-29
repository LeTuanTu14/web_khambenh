$(document).ready(function () {
    // let ng = null;
    // let th = null;
    // let nam = null;
    let so;
    let nglamhs;
    var d = new Date();

    var curr_day = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();

    if(curr_month <10){
        nglamhs = curr_year + "-0" + curr_month + "-" + curr_day;
    }else{
        nglamhs = curr_year + "-" + curr_month + "-" + curr_day;
    }

    const token = JSON.parse(localStorage.getItem("token"));

    setInterval(function () {
        $.ajax({
            url: "https://pkbe.hewo.vn/book/getbookbydate",
            type: "post",
            headers: {
                Authorization: token,
            },
            data: {date: nglamhs},
            success: function (response) {
                let dai = response.result.length;
                if (dai == 0) {
                    so = 0;
                }
                so = response.result[Number(dai) - 1].id;
            }
        });
        $.ajax({
            url: "https://pkbe.hewo.vn/book/resetnumber",
            type: "get",
            headers: {
                Authorization: token,
            },
            data: {date: nglamhs},
            success: function (response) {
            }
        });
    }, 86400000);

    $("#bs").click(function (e) {

        $.ajax({
            url: "https://pkbe.hewo.vn/book/getbookbydate",
            type: "post",
            headers: {
                Authorization: token,
            },
            data: {date:nglamhs},
            success: function (response) {
                let dai = response.result.length;
                if (dai != 0 && so < response.result[Number(dai) - 1].id) {
                    so = response.result[Number(dai) - 1].id;
                }

                so++;

                $("#soboc").html("Số bốc được là: " + so);

                location.replace("https://pkbe.hewo.vn/patient/createnumber/" + so);
            }
        });
        
    });
});
