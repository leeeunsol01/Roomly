document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('./js/userDB.json');
    const userDB = await response.json();

    const userName = document.getElementById('user_name');
    const userId = document.getElementById('user_id');
    const idBtn = document.querySelector('.id_chk');
    const userPw1 = document.getElementById('user_pw1');
    const userPw2 = document.getElementById('user_pw2');
    const pwChk = document.getElementById('pw_chk');
    const userTel2 = document.getElementById('user_tel2');
    const userTel3 = document.getElementById('user_tel3');
    const tellBtn = document.getElementById('tell_btn');
    const userEmail = document.getElementById('user_email');
    const userBirth1 = document.getElementById('user_birth1');
    const userBirth2 = document.getElementById('user_birth2');
    const userBirth3 = document.getElementById('user_birth3');
    const userSize1 = document.getElementById('user_size1');
    const userSize2 = document.getElementById('user_size2');
    const totalTerms = document.getElementById('total_terms');
    const terms = document.querySelectorAll('.term');
    const terms01 = document.getElementById('terms01'); 
    const terms02 = document.getElementById('terms02'); 
    const terms03 = document.getElementById('terms03'); 
    const terms04 = document.getElementById('terms04'); 
    const signBtn = document.querySelector('.sign_btn');
    
    userName.addEventListener('change', checkName);
    userId.addEventListener('change', checkId);
    idBtn.addEventListener('click', idChkBtn);
    userEmail.addEventListener('change', checkEmail);
    userTel2.addEventListener('keyup', moveTel);
    tellBtn.addEventListener('click', tellChk);
    userBirth1.addEventListener('change', checkBirth1);
    userBirth2.addEventListener('change', checkBirth2);
    userBirth3.addEventListener('change', checkBirth3);
    userSize1.addEventListener('change', checkSize1);
    userSize2.addEventListener('change', checkSize2);
    totalTerms.addEventListener('click', termAll);
    terms01.addEventListener('click', termsChk);
    terms02.addEventListener('click', termsChk);
    terms03.addEventListener('click', termsChk);
    terms04.addEventListener('click', termsChk);
    signBtn.addEventListener('click', checkAll);

    function checkName(){
        if(userName.value.length < 2 || userName.value.length > 10){
            alert('이름을 2~10자로 입력해 주세요.');
            userName.value = '';
            userName.focus();
        }
    }
    // name

    function checkId(){
        if(userId.value.length < 4 || userId.value.length > 16){
            alert('아이디를 다시 설정해 주세요.');
            userId.value = '';
            userId.focus();
        }
    }
    // id

    function idChkBtn(){
        const user = userDB.find(u => u.id === userId.value);
        if(user){
            alert('이미 사용 중인 아이디 입니다.');
            userId.value = '';
            userId.focus();
        }else if(!userId.value){
            alert('아이디를 다시 설정해 주세요.');
            userId.value = '';
            userId.focus();
        }
        else{
            alert('사용 가능한 아이디 입니다.');
        }
    }
    // id_btn
    
    function requiredPw(pw, id) {
        const lengthCheck = /^.{10,16}$/; 
        const specialSymbol = /^[A-Za-z0-9~`!@#$%^()*_\-={}[\]|:;<>,.?/]+$/;
        const hasLetter = /[A-Za-z]/.test(pw);
        const hasNumber = /[0-9]/.test(pw);
        const hasSpecial = /[~`!@#$%^()*_\-={}[\]|:;<>,.?/]/.test(pw);

        if (!lengthCheck.test(pw)) {
            alert('비밀번호는 10~16자로 입력해 주세요.');
            return false;
        }
        if (!specialSymbol.test(pw)) {
            alert('허용되지 않은 특수문자가 포함되어 있습니다.');
            return false;
        }
        const typeCount = [hasLetter, hasNumber, hasSpecial].filter(v => v).length;
        if (typeCount < 2) {
            alert('비밀번호는 대소문자/숫자/특수문자 중 2가지 이상 조합이어야 합니다.');
            return false;
        }
        if (pw.includes(' ')) {
            alert('비밀번호에 공백을 사용할 수 없습니다.');
            return false;
        }
        for (let i = 0; i < pw.length - 2; i++) {
            const c1 = pw.charCodeAt(i);
            const c2 = pw.charCodeAt(i + 1);
            const c3 = pw.charCodeAt(i + 2);

            if (c1 + 1 === c2 && c2 + 1 === c3) {
                alert('연속된 문자 또는 숫자를 3개 이상 사용할 수 없습니다.');
                return false;
            }
        }
        if (/(.)\1\1/.test(pw)) {
            alert('동일한 문자를 3번 이상 반복할 수 없습니다.');
            return false;
        }
        if (id && pw.includes(id)) {
            alert('비밀번호에 아이디를 포함할 수 없습니다.');
            return false;
        }
        return true;
    }
    // pw_required

    userPw1.addEventListener('change', () => {
        const pw = userPw1.value;
        const id = userId.value;

        if (!requiredPw(pw, id)) {
            userPw1.value = '';
            userPw1.focus();
        }
    });
    // pw

    userPw2.addEventListener('input', () => {
        if (userPw2.value === '') {
            pwChk.style.display = 'none';
        } else if (userPw1.value === userPw2.value) {
            pwChk.style.display = 'block';
            pwChk.style.color = 'green';
            pwChk.textContent = '비밀번호가 일치합니다.';
        } else {
            pwChk.style.display = 'block';
            pwChk.style.color = 'red';
            pwChk.textContent = '비밀번호가 일치하지 않습니다.';
        }
    });
    // pw_chk

    function moveTel(){
        if(userTel2.value.length === 4){
            userTel3.focus();
        }
    }
    // tell

    function tellChk(){
        let num = Math.floor(Math.random()* 50000 + 10000);
        if(userTel2.value && userTel3.value){
            alert('휴대폰 인증번호는 ' + num + ' 입니다.');
        }
    }

    function checkEmail() {
        const email = userEmail.value;
        const special = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (special.test(email)) {
            alert('사용가능한 이메일 입니다.');
        } else {
            alert('이메일을 다시 입력해 주세요.');
            userEmail.value = '';
            userEmail.focus();
        }
    }
    // email

    function checkBirth1(){
    if(userBirth1.value.length !== 4){
            alert('연도를 다시 입력해 주세요.');
            userBirth1.value = '';
            userBirth1.focus();
        }
    }
    // birth_year

    function checkBirth2(){
        const month = parseInt(userBirth2.value, 10);

        if(month < 1 || month > 12){
            alert('월을 다시 입력해 주세요.');
            userBirth2.value = '';
            userBirth2.focus();
        }
    }
    // birth_month

    function checkBirth3(){
        const day = parseInt(userBirth3.value, 10);

        if(day < 1 || day > 31){
            alert('일을 다시 입력해 주세요.');
            userBirth3.value = '';
            userBirth3.focus();
        }
    }
    // birth_day

    function checkSize1(){
        if(userSize1.value.length > 3){
            alert('키를 다시 입력해 주세요.');
            userSize1.value = '';
            userSize1.focus();
        }
    }
    // size_cm
    
    function checkSize2(){
        if(userSize2.value.length > 3){
            alert('몸무게를 다시 입력해 주세요.');
            userSize2.value = '';
            userSize2.focus();
        }
    }
    // size_kg

    function termAll(){
        if(totalTerms.checked){
            terms.forEach(term => term.checked = true);
        } else {
            terms.forEach(term => term.checked = false);
        }
    }

    function termsChk(){
        if(terms01.checked && terms02.checked && terms03.checked && terms04.checked){
            totalTerms.checked = true;
        } else {
            totalTerms.checked = false;
        }
    }
    // terms_chk

    function checkAll() {
        if (!userName.value) {
            alert('필수 입력사항을 입력해 주세요.');
            userName.focus();
            return false;
        }
        if (!userId.value) {
            alert('필수 입력사항을 입력해 주세요.');
            userId.focus();
            return false;
        }
        if (!userPw1.value) {
            alert('필수 입력사항을 입력해 주세요.');
            userPw1.focus();
            return false;
        }
        if(userId.value === userPw1.value){
            alert('비밀번호에 아이디를 포함할 수 없습니다.');
            userPw1.focus();
            return false;
        }
        if (!userPw2.value) {
            alert('필수 입력사항을 입력해 주세요.');
            userPw2.focus();
            return false;
        }
        if(!document.getElementById("sample6_detailAddress").value){
            alert('필수 입력사항을 입력해 주세요.');
            document.getElementById("sample6_detailAddress").focus();
            return false;
        }
        if (!userTel2.value || !userTel3.value) {
            alert('필수 입력사항을 입력해 주세요.');
            if (!userTel2.value) userTel2.focus();
            else userTel3.focus();
            return false;
        }
        if (!userEmail.value) {
            alert('필수 입력사항을 입력해 주세요.');
            userEmail.focus();
            return false;
        }
        if(!terms01.checked || !terms02.checked){
            alert('필수 입력사항을 체크해 주세요.');
            terms01.focus();
            return false;
        }
        alert('회원가입이 완료되었습니다.');
    }
    // sign_btn
});

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = ''; // 주소 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;

            // 커서를 나머지주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}
// daum_address_api


