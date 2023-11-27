document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const messageContainer = document.getElementById('message-container');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const apiUrl = 'http://52.78.33.155:8000/accounts/login/';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
        .then(response => response.json())
        .then(data => {
            if (data.access_token && data.refresh_token) {
                // 성공적으로 토큰을 받았을 때
                saveTokens(data.access_token, data.refresh_token);

                // 사용자 정보가 필요하다면 저장
                if (data.user) {
                    saveUserInfo(data.user);
                }

                // 로그인 성공 또는 실패 메시지 표시
                messageContainer.innerHTML = `<p>${data.detail}</p>`;
            } else {
                // 토큰이 없을 때
                messageContainer.innerHTML = '<p>토큰을 받을 수 없습니다.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function saveTokens(accessToken, refreshToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    }

    function saveUserInfo(user) {
        localStorage.setItem('user_info', JSON.stringify(user));
    }
});