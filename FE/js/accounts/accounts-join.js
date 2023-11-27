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
        .then(response => response.json())
        .then(data => {
            // 가입 성공 또는 실패 메시지 표시
            messageContainer.innerHTML = `<p>${data.detail}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
