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
        .then(response => {
            if (response.ok) {
                // HTTP 상태 코드가 200-299 범위에 속할 때
                return response.json();
            } else {
                // HTTP 상태 코드가 200-299 범위 밖에 있을 때
                throw new Error(`로그인에 실패했습니다. 상태 코드: ${response.status}`);
            }
        })
        .then(data => {
            if (data.access_token && data.refresh_token) {
                // 토큰이 성공적으로 받아졌을 때
                saveTokens(data.access_token, data.refresh_token);

                // 사용자 정보가 필요하다면 저장
                if (data.user) {
                    saveUserInfo(data.user);
                }

                // 성공 메시지 표시
                messageContainer.innerHTML = `<p>로그인 성공</p>`;

                // 로그인 성공 후 페이지 이동
                window.location.href = '../blog/main.html';
            } else {
                // 토큰이 없을 때
                messageContainer.innerHTML = '<p>토큰을 받을 수 없습니다.</p>';
            }
        })
        .catch(error => {
            // 기타 오류 처리, 예를 들어 네트워크 문제 또는 서버 오류
            console.error('에러:', error);
            messageContainer.innerHTML = '<p>로그인에 실패했습니다. 다시 시도해주세요.</p>';
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
