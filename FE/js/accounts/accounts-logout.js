document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout-btn');

    logoutButton.addEventListener('click', function () {
        // 로그아웃 요청
        const apiUrl = 'http://52.78.33.155:8000/accounts/logout/';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${loadAccessToken()}`,
            },
        })
        .then(response => {
            if (response.ok) {
                // 로그아웃 성공 시, 저장된 토큰과 사용자 정보 삭제
                clearTokens();
                window.location.href = 'login.html'; // 로그인 페이지로 리디렉션
            } else {
                // 로그아웃 실패 시, 오류 메시지 표시 또는 다른 처리
                console.error('로그아웃 실패');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function loadAccessToken() {
        return localStorage.getItem('access_token');
    }

    function clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
    }
});
