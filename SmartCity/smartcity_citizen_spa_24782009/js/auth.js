function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            console.log('LOGIN STATUS:', response.status);
            console.log('LOGIN DATA:', data);

            if (response.status === 200) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);

                alert('Login berhasil!');

                window.location.hash = '#dashboard';

                if (typeof handleRouting === 'function') {
                    handleRouting();
                }
            } else {
                alert('Login gagal. Periksa username dan password.');
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('Gagal terhubung ke server Django.');
        }
    });
}