function ktraMK() {
    
    var Regex = new RegExp("^(?=.{3,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var mk = document.getElementById("matKhau").value;
    if (Regex.test(mk)) {
        document.getElementById("matKhauError").innerHTML= "";
        return true;
    } else if(mk === ""){
        document.getElementById("matKhauError").innerHTML= "Vui lòng nhập mật khẩu !!";
        return false;
    }
    else{
        document.getElementById("matKhauError").innerHTML= "Vui lòng nhập ít nhất 3 kí tự và kết hợp chữ và số !!";
        return false;
    }
    
}

function ktraUser() {

    var ten= document.getElementById("txtUN").value.trim();
    var regt= /^[A-Za-z0-9]{2,}$/;
    if(regt.test(ten)){
        document.getElementById("usError").innerHTML= "";
        return true;
    }else if(ten===""){
        document.getElementById("usError").innerHTML= "Vui lòng nhập tài khoản !!";
        return false;
    }
    else{
        document.getElementById("usError").innerHTML= "Vui lòng nhập lại tài khoản !!";
        return false;
    }
}

function ktraTen() {

    var ten= document.getElementById("tenbn").value.trim();
    var regt= /^[A-Z]+[A-Za-z]*(\s*[A-Z]+[A-Za-z]*)*$/;
    if(regt.test(ten)){
        document.getElementById("tenbnerror").innerHTML= "";
        return true;
    }else if(ten===""){
        document.getElementById("tenbnerror").innerHTML= "Vui lòng nhập họ tên !!";
        return false;
    }
    else{
        document.getElementById("tenbnerror").innerHTML= "Vui lòng nhập lại họ tên !!";
        return false;
    }
}

function ktraNS() {

    var ns= document.getElementById("ngaysinhbn").value.trim();
    var n= ns.split("-", 3);
    
}

function ktraSDT() {

    var sdt= document.getElementById("sdtbn").value.trim();
    var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    if(phoneNum.test(sdt)){
        document.getElementById("sdtbnerror").innerHTML= "";
        return true;
    }else if(sdt === ""){
        document.getElementById("sdtbnerror").innerHTML= "Vui lòng nhập số điện thoại !!";
        return false;
    }
    else{
        document.getElementById("sdtbnerror").innerHTML= "Số máy quý khách vừa nhập là số không có thực !!";
        return false;
    }
}

function ktraSBH() {

    var sdt= document.getElementById("sobhbn").value.trim();
    var phoneNum = /^\(?([A-Z]{2})\)?[- ]?([0-9]{1})[- ]?([0-9]{2})[- ]?([0-9]{10})$/; 
    if(phoneNum.test(sdt)){
        document.getElementById("sobherror").innerHTML= "";
        return true;
    }else if(sdt === ""){
        document.getElementById("sobherror").innerHTML= "Vui lòng nhập số BHYT !!";
        return false;
    }
    else{
        document.getElementById("sobherror").innerHTML= "Số BHYT không đúng dạng (SV 1 23 1234567890) !!";
        return false;
    }
}

function ktraTTBN() {

    var ttbn= document.getElementById("ttbenhnhankham").value.trim();
    if(ttbn === ""){
        document.getElementById("ttbnkhamnerror").innerHTML= "Vui lòng nhập số tình trạng bệnh nhân !!";
        return false;
    }
    else{
        document.getElementById("ttbnkhamnerror").innerHTML= "";
        return true;
    }
}