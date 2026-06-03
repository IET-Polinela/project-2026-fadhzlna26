const routes = {

    '#login': `
        <div class="row justify-content-center mt-5">
            <div class="col-md-4 card shadow-sm border-0 p-4">
                <h4 class="text-center fw-bold mb-4">Login Warga</h4>

                <form id="loginForm">
                    <input type="text"
                           id="loginUsername"
                           class="form-control mb-3"
                           placeholder="Username"
                           required>

                    <input type="password"
                           id="loginPassword"
                           class="form-control mb-3"
                           placeholder="Password"
                           required>

                    <button type="submit"
                            class="btn btn-primary w-100 fw-bold">
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    `,

    '#dashboard': `
        <div class="row g-3">

            <aside class="col-12 col-lg-3">
                <div class="card border-0 p-3 shadow-sm">

                    <button class="btn btn-primary btn-lg w-100 fw-bold">
                        <i class="bi bi-plus-circle-fill me-2"></i>
                        Laporan Baru
                    </button>

                </div>
            </aside>

            <section class="col-12 col-lg-6">
                <div class="card border-0 p-4 shadow-sm text-center text-muted">

                    <i class="bi bi-inbox fs-2"></i>

                    <h5 class="mt-3">
                        Selamat Datang!
                    </h5>

                    <p class="mb-0">
                        Koneksi API untuk data laporan akan diimplementasikan pada Lab 12.
                    </p>

                </div>
            </section>

            <aside class="col-12 col-lg-3">
                <div class="card border-0 p-3 shadow-sm">

                    <h6 class="fw-bold mb-2">
                        <i class="bi bi-info-circle-fill text-primary me-2"></i>
                        Pengumuman
                    </h6>

                    <p class="text-muted small mb-0">
                        Gunakan portal ini untuk mengirim laporan warga.
                    </p>

                </div>
            </aside>

        </div>
    `
};


function renderNavbar() {

    const navMenus = document.getElementById("nav-menus");
    const token = localStorage.getItem("access_token");

    if (!navMenus) return;

    if (token) {

        navMenus.innerHTML = `
            <div class="dropdown">

                <button
                    class="btn btn-light dropdown-toggle fw-bold"
                    type="button"
                    data-bs-toggle="dropdown">

                    <i class="bi bi-person-circle me-2"></i>
                    Citizen
                </button>

                <ul class="dropdown-menu dropdown-menu-end">

                    <li>
                        <a
                            class="dropdown-item text-danger"
                            href="#"
                            onclick="logout(); return false;">

                            <i class="bi bi-box-arrow-right me-2"></i>
                            Logout

                        </a>
                    </li>

                </ul>

            </div>
        `;

    } else {

        navMenus.innerHTML = "";

    }
}


function logout() {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    alert("Logout berhasil!");

    window.location.hash = "#login";

    renderNavbar();
}


function handleRouting() {

    const hash = window.location.hash || '#login';

    document.getElementById('app-content').innerHTML =
        routes[hash] || routes['#login'];

    renderNavbar();

    if (
        hash === '#login' &&
        typeof setupLoginForm === 'function'
    ) {
        setupLoginForm();
    }
}


window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);