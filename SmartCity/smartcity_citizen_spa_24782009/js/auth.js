function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!username || !password) {
            alert('Username dan password wajib diisi.');
            return;
        }

        try {
            const response = await requestAPI('/token/', 'POST', {
                username: username,
                password: password
            });

            let data = null;

            try {
                data = await response.json();
            } catch (error) {
                data = null;
            }

            console.log('LOGIN STATUS:', response.status);
            console.log('LOGIN DATA:', data);

            if (response.status === 200 && data) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem('username', username);

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

function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');

    if (!registerForm) return;

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();

        if (!username || !email || !password) {
            alert('Semua field register wajib diisi.');
            return;
        }

        try {
            const response = await requestAPI('/register/', 'POST', {
                username: username,
                email: email,
                password: password
            });

            let data = null;

            try {
                data = await response.json();
            } catch (error) {
                data = null;
            }

            console.log('REGISTER STATUS:', response.status);
            console.log('REGISTER DATA:', data);

            if (response.status === 201 || response.status === 200) {
                alert('Register berhasil! Silakan login.');
                window.location.hash = '#login';

                if (typeof handleRouting === 'function') {
                    handleRouting();
                }
            } else {
                alert('Register gagal. Cek kembali data yang diisi.');
            }

        } catch (error) {
            console.error('Register error:', error);
            alert('Gagal terhubung ke server Django.');
        }
    });
}