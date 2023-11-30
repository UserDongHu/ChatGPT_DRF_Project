document.addEventListener('DOMContentLoaded', function () {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const postDetailsContainer = document.getElementById('post-details');
    const navbar = document.getElementById('navbar');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const createLink = document.getElementById('create-link');
    const postCommentsContainer = document.getElementById('post-comments');
    const postFormContainer = document.getElementById('post-form');
    
    function isLoggedIn() {
        const token = localStorage.getItem('access_token'); // 로컬 스토리지에서 토큰을 가져옴
        return !!token; // 토큰이 존재하면 로그인 상태로 간주
    }
    // 블로그 메인 초기화 함수
    function initializeBlogMain() {
        postCommentsContainer.style.display = 'none';
        postFormContainer.style.display = 'none';
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
        createLink.addEventListener('click', () => {
            window.location.href = '../blog/create.html'
        })
        // 블로그 메인 태그 클릭 이벤트 처리
        const blogMainTitle = document.querySelector('#app h1');
        blogMainTitle.addEventListener('click', () => {
            // 게시물 목록 표시
            blogPostsContainer.style.display = 'block';
            // 게시물 상세정보 숨김
            postDetailsContainer.innerHTML = '';

            postCommentsContainer.style.display = 'none';

            postFormContainer.style.display = 'none';
        });
    }
    function updateNavbar() {
        if (isLoggedIn()) {
            // 로그인 상태: 프로필과 로그아웃 링크 표시
            profileLink.style.display = 'block';
            logoutLink.style.display = 'block';
            createLink.style.display = 'block';
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
            createLink.style.display = 'none';
        }
    }
    function updateComments(postId) {
        const commentsApiUrl = `http://52.78.33.155:8000/blog/posts/${postId}/comments/`;
        const currentUser = JSON.parse(localStorage.getItem('user_info'));
        fetch(commentsApiUrl, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const commentsHtml = data.map(comment => {
                        const deleteButton = isLoggedIn() && comment.user === currentUser.username ?
                            `<button class="delete-comment-button" data-comment-id="${comment.id}">댓글 삭제</button>` : '';
                        return `
                            <div class="comment">
                                <p>${comment.user}: ${comment.content}</p>
                                ${deleteButton}
                            </div>
                        `;
                    }).join('');
                    postCommentsContainer.innerHTML = commentsHtml;
                    // 삭제 버튼에 이벤트 리스너 추가
                    const deleteButtons = document.querySelectorAll('.delete-comment-button');
                    deleteButtons.forEach(button => {
                        button.addEventListener('click', function () {
                            const commentId = this.getAttribute('data-comment-id');
                            deleteComment(postId, commentId);
                        });
                    });
                } else {
                    postCommentsContainer.innerHTML = '<p>댓글이 없습니다.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    function deleteComment(postId, commentId) {
        const deleteCommentApiUrl = `http://52.78.33.155:8000/blog/posts/${postId}/comments/${commentId}/`;
        // 현재 로그인된 사용자의 토큰 가져오기
        const accessToken = localStorage.getItem('access_token');
    
        fetch(deleteCommentApiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log('댓글이 성공적으로 삭제되었습니다.');
                    updateComments(postId); // 댓글 삭제 후 댓글 목록 업데이트
                } else {
                    console.error('댓글 삭제 실패:', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                <p>글쓴이: ${data.user}</p>
                <p>질문: ${data.question}</p>
                <p>답변: ${data.answer}</p>
                <p>조회수: ${data.views}</p>
                <p>좋아요: <span id="likeCount">${data.like}</span> <button id="likeButton">좋아요</button></p>
                <p>작성일: ${new Date(data.created_at).toLocaleString()}</p>
                <p>최종 업데이트: ${new Date(data.updated_at).toLocaleString()}</p>
            </div>
        `;
                // postHtml을 받아온 후에 innerHTML 설정
                postDetailsContainer.innerHTML = postHtml;

                // 현재 로그인된 사용자 정보
                const currentUser = JSON.parse(localStorage.getItem('user_info'));
                // 좋아요 버튼 클릭 이벤트 처리
                const likeButton = document.getElementById('likeButton');
                likeButton.addEventListener('click', () => {
                    // 좋아요 요청 보내기
                    // 서버에 POST 요청 보내기
                    const likeApiUrl = `http://52.78.33.155:8000/blog/posts/${postId}/like/`;
                    // 현재 로그인된 사용자의 토큰 가져오기
                    const accessToken = localStorage.getItem('access_token');
                    fetch(likeApiUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    })
                        .then(response => {
                            if (response.ok) {
                                // 좋아요 성공 시의 동작 처리
                                console.log('좋아요가 성공적으로 추가되었습니다.');
                                // 예: 좋아요 숫자 업데이트 등
                                // 좋아요 숫자 업데이트
                                const likeCountElement = document.getElementById('likeCount');
                                const currentLikeCount = parseInt(likeCountElement.innerText, 10);
                                likeCountElement.innerText = currentLikeCount + 1;
                            } else {
                                // 좋아요 실패 시의 동작 처리
                                console.error('좋아요 추가 실패:', response.status);
                                // 예: 실패 메시지 표시 등
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                });
                // 현재 사용자가 게시물의 글쓴이인 경우 수정, 삭제 버튼 추가
                if (currentUser && currentUser.username === data.user) {
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = '게시물 삭제';
                    deleteButton.addEventListener('click', () => {
                        // 모달 열기
                        const confirmDelete = confirm('게시물을 삭제하시겠습니까?');
                        // 사용자가 확인을 누른 경우에만 삭제 요청 보내기
                        if (confirmDelete) {
                            // 서버에 DELETE 요청 보내기
                            const deleteApiUrl = `http://52.78.33.155:8000/blog/posts/${postId}/`;
                            // 현재 로그인된 사용자의 토큰 가져오기
                            const accessToken = localStorage.getItem('access_token');

                            fetch(deleteApiUrl, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`,
                                },
                            })
                                .then(response => {
                                    if (response.ok) {
                                        // 삭제 성공 시의 동작 처리
                                        console.log('게시물이 성공적으로 삭제되었습니다.');
                                        // 예: 모달 닫기, 페이지 새로고침 또는 다른 동작을 수행할 수 있습니다.
                                        window.location.reload();
                                    } else {
                                        // 삭제 실패 시의 동작 처리
                                        console.error('게시물 삭제 실패:', response.status);
                                        // 예: 실패 메시지 표시 등
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        } else {
                            // 사용자가 확인을 누르지 않은 경우의 동작 처리
                            console.log('삭제 취소');
                        }
                    });
                    // 버튼들을 상세정보 컨테이너에 추가
                    postDetailsContainer.appendChild(deleteButton);
                }
                // 댓글 목록 업데이트
                updateComments(postId);
                postCommentsContainer.style.display = 'block';
                // 로그인 상태 체크
                if (isLoggedIn()) {
                    postFormContainer.style.display = 'block';
                    // 댓글 작성 폼 추가
                    const commentFormHtml = `
        <form id="comment-form">
            <label for="comment-content">댓글 작성:</label>
            <textarea id="comment-content" name="comment-content" rows="4" cols="50"></textarea>
            <button type="submit">댓글 등록</button>
        </form>
    `;
                    // post-form에 추가
                    postFormContainer.innerHTML = commentFormHtml;
                    // 댓글 작성 폼 제출 이벤트 처리
                    const commentForm = document.getElementById('comment-form');
                    commentForm.addEventListener('submit', function (event) {
                        event.preventDefault();
                        const content = document.getElementById('comment-content').value;
                        // 댓글 작성 요청 보내기
                        const createCommentApiUrl = `http://52.78.33.155:8000/blog/posts/${postId}/comments/`;
                        // 현재 로그인된 사용자의 토큰 가져오기
                        const accessToken = localStorage.getItem('access_token');

                        fetch(createCommentApiUrl, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                content: content,
                            }),
                        })
                            .then(response => {
                                if (response.ok) {
                                    updateComments(postId);
                                    document.getElementById('comment-content').value = "";
                                } else {
                                    console.error('댓글 작성 실패:', response.status);
                                }
                            });
                    });
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    // 블로그 메인 초기화
    initializeBlogMain();
});
