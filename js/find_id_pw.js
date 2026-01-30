document.addEventListener('DOMContentLoaded', async () =>{
    const response = await fetch('./js/userDB.json');
    const userDB = await response.json();

    const userName01 = document.getElementById('user_name01');
    const userName02 = document.getElementById('user_name02');
    const userId = document.getElementById('user_id');
    const userEmail01 = document.getElementById('user_email01');
    const userEmail02 = document.getElementById('user_email02');
    const findIdBtn = document.querySelector('.find_id_btn');
    const findPwBtn = document.querySelector('.find_pw_btn');

    userName01.addEventListener('change', nameChk01);
    userName02.addEventListener('change', nameChk02);
    userId.addEventListener('change', idChk);
    userEmail01.addEventListener('change', emailChk01);
    userEmail02.addEventListener('change', emailChk02);
    findIdBtn.addEventListener('click', FindId);
    findPwBtn.addEventListener('click', FindPw);

    function nameChk01(){
        if(userName01.value.length < 2 || userName01.value.length > 10){
            alert('이름을 2~10자로 입력해 주세요.');
            userName01.value = '';
            userName01.focus();
        }
    }

    function nameChk02(){
        if(userName02.value.length < 2 || userName02.value.length > 10){
            alert('이름을 2~10자로 입력해 주세요.');
            userName02.value = '';
            userName02.focus();
        }
    }
    // name

    function idChk(){
        if(userId.value.length < 4 || userId.value.length > 16){
            alert('아이디를 다시 입력해 주세요.');
            userId.value = '';
            userId.focus();
        }
    }
    // id

    function emailChk01() {
        const email = userEmail01.value;
        const special = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!special.test(email)) {
            alert('이메일을 다시 입력해 주세요.');
            userEmail01.value = '';
            userEmail01.focus();
        }
    }

    function emailChk02() {
        const email = userEmail02.value;
        const special = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!special.test(email)) {
            alert('이메일을 다시 입력해 주세요.');
            userEmail02.value = '';
            userEmail02.focus();
        }
    }
    // email

    function FindId(){
        const name = userName01.value;
        const email = userEmail01.value;

        const user = userDB.find(u => u.name === name && u.email === email);

        if(user){
            alert(`회원님의 아이디는 ${user.id} 입니다`);
        }else{
            alert('입력하신 정보와 일치하는 회원이 없습니다.');
        }
    }

    function FindPw(){
        const id = userId.value;
        const name = userName02.value;
        const email = userEmail02.value;

        const user = userDB.find(u => u.id === id && u.name === name && u.email === email);

        if(user){
            alert('본인 확인 완료되셨습니다. 임시 비밀번호를 이메일로 전송했습니다.');
        }else{
            alert('입력하신 정보와 일치하는 회원이 없습니다.');
        }
    }
});