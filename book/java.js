function t() {
    var time = new Date();
    var f = time.toLocaleDateString();
    var d = time.toLocaleTimeString();
    document.getElementById("time").innerHTML = "التاريخ: " + f + "     الوقت: " + d;
}
t();
//--------------------------------------------------------------------------------------------------------------------

function Get() {
    var price = localStorage.getItem('travelPrice');
    var location = localStorage.getItem('travelLocation');
    var start = localStorage.getItem('start');
   
       document.getElementById('priceSpan').value = price;
        document.getElementById('locationInput').value = location;
      document.getElementById('start').value = start;
    
}

window.onload = Get; // هذا السطر يستخدم لاستدعاء المثود تلقائيا بعد تحميل الصفحة 

function calculateFinalCost() {
    var price = Number(document.getElementById('priceSpan').value);
    var numberOfPeople = parseInt(document.getElementById('numberOfPeople').value, 10) || 1;
    let totalPrice = price * numberOfPeople;

    var addons = document.querySelectorAll('input[name="addons"]:checked');
    addons.forEach(addon => {
        totalPrice += numberOfPeople * parseFloat(addon.value);
    });

    var travelClass = document.querySelector('input[name="T"]:checked').value;
    var classMultiplier = parseFloat(travelClass);
    totalPrice *= classMultiplier;

    return totalPrice;
}

function validateForm() {
    let isValid = true;

    var fullName = document.getElementById('fullName');
    var nationalID = document.getElementById('nationalID');
    var phoneNumber = document.getElementById('phoneNumber');
    var numberOfPeople = document.getElementById('numberOfPeople');
    var terms = document.getElementById('terms');

    document.querySelectorAll('.error').forEach(el => el.innerText = '');

    if (fullName.value.trim() == '') {
        document.getElementById('fullNameError').innerText = 'يجب إدخال الاسم الرباعي';
        isValid = false;
    }
    if (nationalID.value.trim() == '') {
        document.getElementById('nationalIDError').innerText = 'يجب ادخال الرقم الوطني';
        isValid = false;
    }
    if (phoneNumber.value.trim() == '') {
        document.getElementById('phoneNumberError').innerText = '  يجب ادخال رقم الهاتف';
        isValid = false;
    }
    if (numberOfPeople.value.trim() == '' || parseInt(numberOfPeople.value, 10) <= 0) {
        document.getElementById('numberOfPeopleError').innerText = '   ادخل عدد الاشخاص    ';
        isValid = false;
    }

    if (!terms.checked) {
        alert('يجب الموافقة على الشروط والأحكام');
        isValid = false;
    }

    if (isValid) {
        var totalCost = calculateFinalCost();
        var tax = " شامل ضريبة المبيعات";
        var bookingInfo = `
            الاسم الرباعي: ${fullName.value}
            الرقم الوطني: ${nationalID.value}
            رقم الهاتف: ${phoneNumber.value}
            عدد الأشخاص: ${numberOfPeople.value}
            التكلفة النهائية: ${totalCost} دينار
            
        `;

        document.getElementById('bookingInfo').value = bookingInfo + tax;
    }
}
