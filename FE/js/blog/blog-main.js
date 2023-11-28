document.addEventListener('DOMContentLoaded', function () {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const postDetailsContainer = document.getElementById('post-details');
    const navbar = document.getElementById('navbar');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');

    function isLoggedIn() {
        const token = localStorage.getItem('access_token'); // 로컬 스토리지에서 토큰을 가져옴
        console.log(token);
        return !!token; // 토큰이 존재하면 로그인 상태로 간주
    }

    // 블로그 메인 초기화 함수
    function initializeBlogMain() {

        // 블로그 게시물 목록 요청
        const apiUrl = 'http://52.78.33.155:8000/blog/posts/';

        fetch(apiUrl, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // 게시물 목록 표시
                const postsHtml = data.map(post => `
                    <div class="blog-post" data-post-id="${post.id}">
                        <p>카테고리: ${post.category}</p>
                        <p>질문: ${post.question}</p>
                    </div>
                    <br>
                `).join('');

                blogPostsContainer.innerHTML = postsHtml;

                // 각 게시물에 대한 클릭 이벤트 처리
                const postElements = document.querySelectorAll('.blog-post');
                postElements.forEach(postElement => {
                    postElement.addEventListener('click', () => {
                        const postId = postElement.getAttribute('data-post-id');
                        // 게시물 상세정보 요청 및 업데이트
                        updatePostDetails(postId);
                    });
                });
            } else {
                blogPostsContainer.innerHTML = '<p>게시물이 없습니다.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // 로그인 상태에 따라 네비바 업데이트
        updateNavbar();

        // 네비바 링크에 클릭 이벤트 추가
        signupLink.addEventListener('click', () => {
            window.location.href = '../accounts/join.html';
        });

        loginLink.addEventListener('click', () => {
            window.location.href = '../accounts/login.html';
        });

        profileLink.addEventListener('click', () => {
            window.location.href = '../accounts/profile.html';
        });

        logoutLink.addEventListener('click', () => {
            window.location.href = '../accounts/logout.html';
        });

        // 블로그 메인 태그 클릭 이벤트 처리
        const blogMainTitle = document.querySelector('#app h1');
        blogMainTitle.addEventListener('click', () => {
            // 게시물 목록 표시
            blogPostsContainer.style.display = 'block';
            // 게시물 상세정보 숨김
            postDetailsContainer.innerHTML = '';
        });
    }

    function updateNavbar() {
        if (isLoggedIn()) {
            // 로그인 상태: 프로필과 로그아웃 링크 표시
            profileLink.style.display = 'block';
            logoutLink.style.display = 'block';
            // 회원가입과 로그인 링크 숨김
            signupLink.style.display = 'none';
            loginLink.style.display = 'none';
        } else {
            // 로그아웃 상태: 회원가입과 로그인 링크 표시
            signupLink.style.display = 'block';
            loginLink.style.display = 'block';
            // 프로필과 로그아웃 링크 숨김
            profileLink.style.display = 'none';
            logoutLink.style.display = 'none';
        }
    }

    // 게시물 상세정보 업데이트 함수
    function updatePostDetails(postId) {
        // 블로그 게시물 상세정보 요청
        const postApiUrl = `http://52.78.33.155:8000/blog/posts/${postId}/`;

        fetch(postApiUrl, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            // 게시물 목록 숨김
            blogPostsContainer.style.display = 'none';

            // 게시물 상세정보 표시
            const postHtml = `
                <div class="blog-post">
                    <p>카테고리: ${data.category}</p>
                    <p>질문: ${data.question}</p>
                    <p>답변: ${data.answer}</p>
                    <p>조회수: ${data.views}</p>
                    <p>좋아요: ${data.like}</p>
                    <p>작성일: ${new Date(data.created_at).toLocaleString()}</p>
                    <p>최종 업데이트: ${new Date(data.updated_at).toLocaleString()}</p>
                </div>
            `;

            // postHtml을 받아온 후에 innerHTML 설정
            postDetailsContainer.innerHTML = postHtml;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // 블로그 메인 초기화
    initializeBlogMain();
});
