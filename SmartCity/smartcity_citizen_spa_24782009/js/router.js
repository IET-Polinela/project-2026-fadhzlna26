const routes = {

    '#login': `
        <div class="row justify-content-center mt-5 mb-5">
            <div class="col-lg-5 col-md-7 card shadow-lg border-0 p-5" style="border-radius: 20px;">
                <h3 class="text-center fw-bold mb-5 mt-3" style="color: #333; font-size: 28px;">Login Warga</h3>

                <form id="loginForm">
                    <div class="mb-5">
                        <label for="loginUsername" class="form-label fw-bold mb-3" style="font-size: 15px; color: #333;">Username</label>
                        <input type="text"
                               id="loginUsername"
                               class="form-control form-control-lg"
                               placeholder="Masukkan username"
                               style="border-radius: 8px; border: 1px solid #ddd; padding: 12px 16px; font-size: 15px;"
                               required>
                    </div>

                    <div class="mb-5">
                        <label for="loginPassword" class="form-label fw-bold mb-3" style="font-size: 15px; color: #333;">Password</label>
                        <div class="position-relative">
                            <input type="password"
                                   id="loginPassword"
                                   class="form-control form-control-lg password-input"
                                   placeholder="Masukkan password"
                                   style="border-radius: 8px; border: 1px solid #ddd; padding: 12px 16px; font-size: 15px;"
                                   required>
                            <button type="button"
                                    class="btn btn-link position-absolute end-0 top-50 translate-middle-y password-toggle"
                                    style="border: none; color: #999; padding-right: 12px;">
                                <i class="bi bi-eye-fill" style="font-size: 18px;"></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit"
                            class="btn btn-primary btn-lg w-100 fw-bold mt-4"
                            style="border-radius: 8px; padding: 12px; font-size: 16px;">
                        Login
                    </button>
                </form>
            </div>
        </div>
    `,

    '#register': `
        <div class="row justify-content-center mt-5 mb-5">
            <div class="col-lg-5 col-md-7 card shadow-lg border-0 p-5" style="border-radius: 20px;">
                <h3 class="text-center fw-bold mb-5 mt-3" style="color: #333; font-size: 28px;">Register Warga</h3>

                <form>
                    <div class="mb-5">
                        <label for="registerUsername" class="form-label fw-bold mb-3" style="font-size: 15px; color: #333;">Username</label>
                        <input type="text"
                               id="registerUsername"
                               class="form-control form-control-lg"
                               placeholder="Masukkan username"
                               style="border-radius: 8px; border: 1px solid #ddd; padding: 12px 16px; font-size: 15px;"
                               required>
                    </div>

                    <div class="mb-5">
                        <label for="registerEmail" class="form-label fw-bold mb-3" style="font-size: 15px; color: #333;">Email</label>
                        <input type="email"
                               id="registerEmail"
                               class="form-control form-control-lg"
                               placeholder="Masukkan email"
                               style="border-radius: 8px; border: 1px solid #ddd; padding: 12px 16px; font-size: 15px;"
                               required>
                    </div>

                    <div class="mb-5">
                        <label for="registerPassword" class="form-label fw-bold mb-3" style="font-size: 15px; color: #333;">Password</label>
                        <div class="position-relative">
                            <input type="password"
                                   id="registerPassword"
                                   class="form-control form-control-lg password-input"
                                   placeholder="Masukkan password"
                                   style="border-radius: 8px; border: 1px solid #ddd; padding: 12px 16px; font-size: 15px;"
                                   required>
                            <button type="button"
                                    class="btn btn-link position-absolute end-0 top-50 translate-middle-y password-toggle"
                                    style="border: none; color: #999; padding-right: 12px;">
                                <i class="bi bi-eye-fill" style="font-size: 18px;"></i>
                            </button>
                        </div>
                    </div>

                    <button type="button"
                            class="btn btn-primary btn-lg w-100 fw-bold mt-4"
                            style="border-radius: 8px; padding: 12px; font-size: 16px;">
                        Register
                    </button>
                </form>
            </div>
        </div>
    `,

    '#dashboard': `
        <div class="row g-4">

            <aside class="col-12 col-lg-3">
                <div class="card border-0 p-3 shadow-sm mb-3">
                    <button 
                        type="button"
                        class="btn btn-primary btn-lg w-100 fw-bold"
                        data-bs-toggle="modal"
                        data-bs-target="#reportModal"
                    >
                        <i class="bi bi-plus-circle-fill me-2"></i>
                        Laporan Baru
                    </button>
                </div>

                <div class="card border-0 p-3 shadow-sm">
                    <h6 class="fw-bold mb-3">
                        <i class="bi bi-bar-chart-fill text-primary me-2"></i>
                        Rekap Status
                    </h6>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span>
                            <i class="bi bi-pencil-square text-secondary me-2"></i>
                            Draft
                        </span>
                        <span class="fw-bold badge bg-secondary rounded-pill" id="countDraft">0</span>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span>
                            <i class="bi bi-send-fill text-warning me-2"></i>
                            Diajukan
                        </span>
                        <span class="fw-bold badge bg-warning text-dark rounded-pill" id="countReported">0</span>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span>
                            <i class="bi bi-patch-check-fill text-primary me-2"></i>
                            Diverifikasi
                        </span>
                        <span class="fw-bold badge bg-primary rounded-pill" id="countVerified">0</span>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span>
                            <i class="bi bi-gear-fill text-info me-2"></i>
                            Diproses
                        </span>
                        <span class="fw-bold badge bg-info text-dark rounded-pill" id="countProcess">0</span>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <span>
                            <i class="bi bi-check-circle-fill text-success me-2"></i>
                            Selesai
                        </span>
                        <span class="fw-bold badge bg-success rounded-pill" id="countDone">0</span>
                    </div>
                </div>
            </aside>

            <section class="col-12 col-lg-6">

                <div class="card border-0 p-3 shadow-sm mb-3">
                    <ul class="nav nav-pills nav-fill">
                        <li class="nav-item">
                            <button 
                                class="nav-link active" 
                                id="tabMyReports"
                                type="button"
                                onclick="switchTab('my_reports')"
                            >
                                Laporan Saya
                            </button>
                        </li>

                        <li class="nav-item">
                            <button 
                                class="nav-link" 
                                id="tabFeed"
                                type="button"
                                onclick="switchTab('feed')"
                            >
                                Feed Kota
                            </button>
                        </li>
                    </ul>
                </div>

                <div id="listContainer" class="row g-3"></div>

                <div id="paginationContainer" class="mt-4"></div>

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

        navMenus.innerHTML = `
            <a href="#login" class="btn btn-outline-light me-2">
                Login
            </a>

            <a href="#register" class="btn btn-light text-primary">
                Register
            </a>
        `;

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

    setupPasswordToggle();

    if (
        hash === '#login' &&
        typeof setupLoginForm === 'function'
    ) {
        setupLoginForm();
    }

    if (
        hash === '#dashboard' &&
        typeof loadDashboardData === 'function'
    ) {
        loadDashboardData('my_reports', 1);
    }
}


function setupPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');

    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            const passwordInput = this.parentElement.querySelector('.password-input');
            const icon = this.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('bi-eye-fill');
                icon.classList.add('bi-eye-slash-fill');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('bi-eye-slash-fill');
                icon.classList.add('bi-eye-fill');
            }
        });
    });
}


window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);