document.addEventListener('DOMContentLoaded', function () {
    const profileContainer = document.getElementById('profile-container');

    // 로그인 시 저장한 토큰과 사용자 정보를 불러옴
    const { accessToken } = loadTokens();
    const userInfo = loadUserInfo();

    if (!accessToken || !userInfo) {
        // 토큰이 없으면 로그인 페이지로 리다이렉트 또는 다른 처리
        window.location.href = '/FE/templates/accounts/login.html';
        return;
    }

    // 프로필 정보 요청
    const apiUrl = 'http://52.78.33.155:8000/accounts/profile/';

    fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        // 프로필 정보 표시
        const profileHtml = `
            <p>사용자명: ${data.username}</p>
            <p>Email: ${data.email}</p>
            <p>게시물 수: ${data.posting_num}</p>
            <p>댓글 수: ${data.comment_num}</p>
            <p>좋아요 수: ${data.like_num}</p>
        `;
        profileContainer.innerHTML = profileHtml;
    })
    .catch(error => {
        console.error('Error:', error);
        profileContainer.innerHTML = '<p>프로필을 찾을 수 없습니다.</p>';
    });

    function loadTokens() {
        const accessToken = localStorage.getItem('access_token');
        return { accessToken };
    }

    function loadUserInfo() {
        const userInfoString = localStorage.getItem('user_info');
        return userInfoString ? JSON.parse(userInfoString) : null;
    }
});
