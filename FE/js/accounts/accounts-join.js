document.addEventListener('DOMContentLoaded', function () {
    const joinForm = document.getElementById('join-form');
    const messageContainer = document.getElementById('message-container');

    joinForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(joinForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const apiUrl = 'http://52.78.33.155:8000/accounts/join/';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
        .then(response => {
            if (response.status === 201) {
                // 가입 성공
                messageContainer.innerHTML = '<p>가입이 완료되었습니다. 로그인 페이지로 이동합니다.</p>';
                window.location.href = '/login.html';
            } else if (response.status === 400) {
                // 가입 실패
                return response.json();
            } else {
                // 기타 오류
                throw new Error('Unexpected response from the server');
            }
        })
        .then(data => {
            if (data) {
                // 가입 실패 메시지 표시
                messageContainer.innerHTML = `<p>가입실패</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
