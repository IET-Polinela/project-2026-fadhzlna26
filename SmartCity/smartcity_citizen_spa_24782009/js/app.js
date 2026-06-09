let currentTab = 'my_reports';
let currentPage = 1;
let allReports = [];
let totalPages = 1;
let editingReportId = null;

function getAccessToken() {
    return localStorage.getItem('access_token');
}

async function requestAPI(endpoint, method = 'GET', body = null) {
    const token = getAccessToken();

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    return await fetch(`http://127.0.0.1:8000/api${endpoint}`, options);
}

window.switchTab = function(tab) {
    currentTab = tab;
    currentPage = 1;

    const tabMyReports = document.getElementById('tabMyReports');
    const tabFeed = document.getElementById('tabFeed');

    if (tabMyReports) tabMyReports.classList.remove('active');
    if (tabFeed) tabFeed.classList.remove('active');

    if (tab === 'my_reports') {
        if (tabMyReports) tabMyReports.classList.add('active');
    } else {
        if (tabFeed) tabFeed.classList.add('active');
    }

    window.loadDashboardData(tab, 1);
};

window.loadDashboardData = async function(tab = currentTab, page = currentPage) {
    currentTab = tab;
    currentPage = page;

    const listContainer = document.getElementById('listContainer');
    const paginationContainer = document.getElementById('paginationContainer');

    if (!listContainer || !paginationContainer) {
        console.log('listContainer atau paginationContainer belum ditemukan.');
        return;
    }

    listContainer.innerHTML = `
        <div class="col-12 text-center text-muted p-5">
            <div class="spinner-border text-primary mb-3" role="status"></div>
            <p>Memuat data laporan...</p>
        </div>
    `;

    try {
        const response = await requestAPI(`/report/?tab=${tab}&page=${page}`, 'GET');

        console.log('STATUS API:', response.status);

        if (response.status === 200) {
            const data = await response.json();

            console.log('DATA API:', data);

            allReports = data.results || [];
            const totalData = data.count || 0;
            totalPages = Math.ceil(totalData / 10);

            renderList(allReports, tab);
            renderPagination(totalPages, currentPage);
            loadSummaryStats();

        } else if (response.status === 401) {
            listContainer.innerHTML = `
                <div class="col-12 text-center text-muted p-5">
                    <i class="bi bi-lock fs-1"></i>
                    <p>Sesi login habis. Silakan login ulang.</p>
                    <a href="#login" class="btn btn-primary mt-2">Login Ulang</a>
                </div>
            `;

            paginationContainer.innerHTML = '';

        } else {
            const errorText = await response.text();
            console.log('ERROR API:', errorText);

            listContainer.innerHTML = `
                <div class="col-12 text-center text-muted p-5">
                    <i class="bi bi-exclamation-triangle fs-1"></i>
                    <p>Gagal memuat data laporan.</p>
                    <small>Status: ${response.status}</small>
                </div>
            `;

            paginationContainer.innerHTML = '';
        }

    } catch (error) {
        console.error('Gagal mengambil data dashboard:', error);

        listContainer.innerHTML = `
            <div class="col-12 text-center text-muted p-5">
                <i class="bi bi-wifi-off fs-1"></i>
                <p>Terjadi kesalahan koneksi API.</p>
            </div>
        `;

        paginationContainer.innerHTML = '';
    }
};

async function loadSummaryStats() {
    const countDraft = document.getElementById('countDraft');
    const countReported = document.getElementById('countReported');
    const countVerified = document.getElementById('countVerified');
    const countProcess = document.getElementById('countProcess');
    const countDone = document.getElementById('countDone');

    try {
        const response = await requestAPI('/report/?tab=my_reports&page_size=1000', 'GET');

        console.log('STATUS REKAP:', response.status);

        if (response.status === 200) {
            const data = await response.json();
            const reports = data.results || [];

            const totalDraft = reports.filter(report => report.status === 'DRAFT').length;
            const totalReported = reports.filter(report => report.status === 'REPORTED').length;
            const totalVerified = reports.filter(report => report.status === 'VERIFIED').length;
            const totalProcess = reports.filter(report => report.status === 'IN_PROGRESS').length;
            const totalDone = reports.filter(report => report.status === 'RESOLVED').length;

            if (countDraft) countDraft.textContent = totalDraft;
            if (countReported) countReported.textContent = totalReported;
            if (countVerified) countVerified.textContent = totalVerified;
            if (countProcess) countProcess.textContent = totalProcess;
            if (countDone) countDone.textContent = totalDone;

            console.log('REKAP STATUS:', {
                draft: totalDraft,
                reported: totalReported,
                verified: totalVerified,
                in_progress: totalProcess,
                resolved: totalDone
            });
        } else {
            console.log('Gagal memuat rekap status. Status:', response.status);
        }

    } catch (error) {
        console.error('Gagal mengambil rekap status:', error);
    }
}

function renderList(reports, tab) {
    const listContainer = document.getElementById('listContainer');

    if (!listContainer) return;

    if (!reports || reports.length === 0) {
        listContainer.innerHTML = `
            <div class="col-12 text-center text-muted p-5">
                <i class="bi bi-inbox fs-1"></i>
                <p>Belum ada laporan.</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = reports.map(report => {
        const progress = getProgressByStatus(report.status);
        const badgeClass = getBadgeClass(report.status);

        let actionButton = '';

        if (tab === 'my_reports' && report.status === 'DRAFT' && report.is_owner === true) {
            actionButton = `
                <button 
                    type="button" 
                    class="btn btn-sm btn-outline-primary mt-3"
                    onclick="editDraft(${report.id})"
                >
                    <i class="bi bi-pencil-square me-1"></i>
                    Edit Draft
                </button>
            `;
        }

        return `
            <div class="col-12">
                <div class="card border-0 p-4 shadow-sm">

                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h5 class="fw-bold mb-1">${escapeHtml(report.title)}</h5>

                            <small class="text-muted">
                                <i class="bi bi-geo-alt me-1"></i>
                                ${escapeHtml(report.location)}
                            </small>

                            <br>

                            <small class="text-muted">
                                <i class="bi bi-clock-history me-1"></i>
                                Diperbarui: ${formatDate(report.updated_at)}
                            </small>
                        </div>

                        <span class="badge ${badgeClass}">
                            ${escapeHtml(report.status)}
                        </span>
                    </div>

                    <p class="text-muted mb-2">
                        ${escapeHtml(report.description)}
                    </p>

                    <div class="mb-1">
                        <small class="fw-semibold">Kategori:</small>
                        <small>${escapeHtml(report.category)}</small>
                    </div>

                    <div class="mb-2">
                        <small class="fw-semibold">Pelapor:</small>
                        <small>${escapeHtml(report.reporter)}</small>
                    </div>

                    <div class="progress mt-3" style="height: 10px;">
                        <div 
                            class="progress-bar" 
                            role="progressbar" 
                            style="width: ${progress}%"
                            aria-valuenow="${progress}" 
                            aria-valuemin="0" 
                            aria-valuemax="100">
                        </div>
                    </div>

                    <small class="text-muted mt-2 d-block">
                        Progress: ${progress}%
                    </small>

                    ${actionButton}

                </div>
            </div>
        `;
    }).join('');
}

function renderPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById('paginationContainer');

    if (!paginationContainer) return;

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let buttons = '';

    if (currentPage > 1) {
        buttons += `
            <button 
                type="button"
                class="btn btn-sm btn-outline-primary me-1"
                onclick="loadDashboardData('${currentTab}', ${currentPage - 1})"
            >
                Previous
            </button>
        `;
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
        startPage = 1;
        endPage = Math.min(6, totalPages);
    }

    if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 5);
        endPage = totalPages;
    }

    if (startPage > 1) {
        buttons += `
            <button 
                type="button"
                class="btn btn-sm btn-outline-primary me-1"
                onclick="loadDashboardData('${currentTab}', 1)"
            >
                1
            </button>
        `;

        if (startPage > 2) {
            buttons += `<span class="mx-1 align-self-center">...</span>`;
        }
    }

    for (let page = startPage; page <= endPage; page++) {
        buttons += `
            <button 
                type="button"
                class="btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline-primary'} me-1"
                onclick="loadDashboardData('${currentTab}', ${page})"
            >
                ${page}
            </button>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            buttons += `<span class="mx-1 align-self-center">...</span>`;
        }

        buttons += `
            <button 
                type="button"
                class="btn btn-sm btn-outline-primary me-1"
                onclick="loadDashboardData('${currentTab}', ${totalPages})"
            >
                ${totalPages}
            </button>
        `;
    }

    if (currentPage < totalPages) {
        buttons += `
            <button 
                type="button"
                class="btn btn-sm btn-outline-primary"
                onclick="loadDashboardData('${currentTab}', ${currentPage + 1})"
            >
                Next
            </button>
        `;
    }

    paginationContainer.innerHTML = `
        <div class="d-flex justify-content-center flex-wrap gap-1">
            ${buttons}
        </div>
    `;
}

function getProgressByStatus(status) {
    if (status === 'DRAFT') return 10;
    if (status === 'REPORTED') return 30;
    if (status === 'VERIFIED') return 50;
    if (status === 'IN_PROGRESS') return 75;
    if (status === 'RESOLVED') return 100;

    return 0;
}

function getBadgeClass(status) {
    if (status === 'DRAFT') return 'bg-secondary';
    if (status === 'REPORTED') return 'bg-info';
    if (status === 'VERIFIED') return 'bg-primary';
    if (status === 'IN_PROGRESS') return 'bg-warning text-dark';
    if (status === 'RESOLVED') return 'bg-success';

    return 'bg-dark';
}

window.editDraft = async function(id) {
    editingReportId = id;

    try {
        const response = await requestAPI(`/report/${id}/`, 'GET');

        console.log('STATUS DETAIL:', response.status);

        if (response.status === 200) {
            const report = await response.json();

            document.getElementById('title').value = report.title || '';
            document.getElementById('category').value = report.category || '';
            document.getElementById('location').value = report.location || '';
            document.getElementById('description').value = report.description || '';

            const modalTitle = document.getElementById('reportModalLabel');
            if (modalTitle) {
                modalTitle.innerHTML = `<i class="bi bi-pencil-square me-2"></i>Edit Draft`;
            }

            const modalElement = document.getElementById('reportModal');
            const reportModal = new bootstrap.Modal(modalElement);
            reportModal.show();

        } else {
            alert('Gagal mengambil data draft.');
        }

    } catch (error) {
        console.error('Gagal mengambil detail draft:', error);
        alert('Terjadi kesalahan saat mengambil data draft.');
    }
};

async function submitReport(statusValue) {
    const reportForm = document.getElementById('reportForm');

    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value.trim();
    const location = document.getElementById('location').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!title || !category || !location || !description) {
        alert('Semua field laporan wajib diisi.');
        return;
    }

    const payload = {
        title: title,
        category: category,
        location: location,
        description: description,
        status: statusValue
    };

    let endpoint = '/report/';
    let method = 'POST';

    if (editingReportId !== null) {
        endpoint = `/report/${editingReportId}/`;
        method = 'PUT';
    }

    try {
        const response = await requestAPI(endpoint, method, payload);

        console.log('STATUS SUBMIT:', response.status);

        if (response.status === 201 || response.status === 200) {
            const modalElement = document.getElementById('reportModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);

            if (modalInstance) {
                modalInstance.hide();
            }

            if (reportForm) {
                reportForm.reset();
            }

            editingReportId = null;

            const modalTitle = document.getElementById('reportModalLabel');
            if (modalTitle) {
                modalTitle.innerHTML = `<i class="bi bi-pencil-square me-2"></i>Buat Laporan Baru`;
            }

            await loadDashboardData(currentTab, currentPage);
            await loadSummaryStats();

            alert('Laporan berhasil disimpan.');

        } else if (response.status === 401) {
            alert('Sesi login habis. Silakan login ulang.');

        } else {
            const errorData = await response.json();
            console.log('ERROR SUBMIT:', errorData);
            alert('Gagal menyimpan laporan. Cek kembali data yang diisi.');
        }

    } catch (error) {
        console.error('Gagal submit laporan:', error);
        alert('Terjadi kesalahan koneksi saat menyimpan laporan.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const reportForm = document.getElementById('reportForm');
    const btnDraft = document.getElementById('btnDraft');
    const btnSubmit = document.getElementById('btnSubmit');
    const reportModalElement = document.getElementById('reportModal');

    if (btnDraft) {
        btnDraft.addEventListener('click', function () {
            submitReport('DRAFT');
        });
    }

    if (btnSubmit) {
        btnSubmit.addEventListener('click', function () {
            submitReport('REPORTED');
        });
    }

    if (reportModalElement) {
        reportModalElement.addEventListener('hidden.bs.modal', function () {
            editingReportId = null;

            if (reportForm) {
                reportForm.reset();
            }

            const modalTitle = document.getElementById('reportModalLabel');
            if (modalTitle) {
                modalTitle.innerHTML = `<i class="bi bi-pencil-square me-2"></i>Buat Laporan Baru`;
            }
        });
    }
});

function formatDate(value) {
    if (!value) {
        return '-';
    }

    const date = new Date(value);

    return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(value) {
    if (value === null || value === undefined) {
        return '';
    }

    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}