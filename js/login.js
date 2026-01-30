document.addEventListener('DOMContentLoaded', async() => {
    const response = await fetch('./js/userDB.json');
    const userDB = await response.json();

    let userId = document.getElementById('user_id');
    let userPw = document.getElementById('user_pw');
    let loginBtn = document.querySelector('.login_btn');

    loginBtn.addEventListener('click', () => {
        const user = userDB.find(u => u.id === userId.value);

        if(!userId.value){
            alert('아이디를 입력해 주세요.');
            userId.value = '';
            userId.focus();
            return;
        }if(!userPw.value){
            alert('비밀번호를 입력해 주세요.');
            userPw.value = '';
            userPw.focus();
            return;
        }if(!user){
            alert('존재하지 않는 아이디입니다.');
            userId.value = '';
            userId.focus();
            return;
        }if(user.pw !== userPw.value){
            alert('비밀번호가 틀립니다.');
            userPw.value = '';
            userPw.focus();
            return;
        }
        alert('로그인 되셨습니다.');
    });
});
