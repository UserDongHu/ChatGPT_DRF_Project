document.addEventListener('DOMContentLoaded', function () {
    const createPostForm = document.getElementById('create-post-form');

    createPostForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(createPostForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const apiUrl = 'http://52.78.33.155:8000/blog/posts/';
        const accessToken = localStorage.getItem('access_token');

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formDataObject),
        })
        .then(response => {
            if (response.ok) {
                // 성공적으로 응답받은 경우
                return response.json();
            } else {
                // 오류 응답 처리
                throw new Error(`Failed to create post. Status: ${response.status}`);
            }
        })
        .then(data => {
            // 게시물이 성공적으로 생성된 경우, 처리 로직 추가
            console.log('New post created:', data);
            window.location.href = 'main.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
