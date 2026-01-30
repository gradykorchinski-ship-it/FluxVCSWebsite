// Main entry point - Vanilla JS (No bundler)
console.log('FluxVCS Website Loaded');

// Static Search Index
const searchIndex = [
    {
        title: "Home",
        url: "/",
        content: "FluxVCS distributed version control system fast simple integrity speed",
        category: "Page"
    },
    {
        title: "About FluxVCS",
        url: "/about.html",
        content: "Mission team distributed version control why flux performance simplicity open source fluxlinux",
        category: "About"
    },
    {
        title: "Documentation",
        url: "/documentation.html",
        content: "Installation guide flux init commit branch merge setup configuration ubuntu debian fedora",
        category: "Docs"
    },
    {
        title: "Downloads",
        url: "/downloads.html",
        content: "Download Linux Windows macOS source code binary release apt yum dnf",
        category: "Downloads"
    },
    {
        title: "Community",
        url: "/community.html",
        content: "IRC mailing list contributing get help report bugs flux-users",
        category: "Community"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');

    if (searchForm) {
        const input = searchForm.querySelector('input');

        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        searchForm.appendChild(resultsContainer);

        // Input listener
        input.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase().trim();

            if (query.length < 2) {
                resultsContainer.classList.remove('active');
                return;
            }

            // Filter results
            const results = searchIndex.filter(function (item) {
                return item.title.toLowerCase().includes(query) ||
                    item.content.toLowerCase().includes(query);
            });

            // Render results
            resultsContainer.innerHTML = '';

            if (results.length > 0) {
                results.forEach(function (result) {
                    const el = document.createElement('a');
                    el.href = result.url;
                    el.className = 'search-result-item';
                    el.innerHTML = '<span class="search-result-title">' + result.title + '</span>' +
                        '<span class="search-result-excerpt">in ' + result.category + '</span>';
                    resultsContainer.appendChild(el);
                });
            } else {
                resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
            }

            resultsContainer.classList.add('active');
        });

        // Hide when clicking outside
        document.addEventListener('click', function (e) {
            if (!searchForm.contains(e.target)) {
                resultsContainer.classList.remove('active');
            }
        });

        // Prevent default submit
        searchForm.addEventListener('submit', function (e) { e.preventDefault(); });
    }

    // Inject Retro Warning Banner
    createRetroBanner();

    // Download Counter Logic
    initDownloadCounter();
});

function initDownloadCounter() {
    const counterEl = document.getElementById('download-count');
    const NAMESPACE = 'fluxvcs';
    const KEY = 'downloads';

    // Fetch current count
    if (counterEl) {
        fetch('https://api.counterapi.dev/v1/' + NAMESPACE + '/' + KEY + '/')
            .then(function (res) {
                if (!res.ok) throw new Error('API Error');
                return res.json();
            })
            .then(function (data) {
                if (data.count !== undefined) {
                    counterEl.textContent = data.count.toLocaleString();
                } else {
                    counterEl.textContent = '1,248'; // Fallback
                }
            })
            .catch(function () {
                counterEl.textContent = '1,248'; // Fallback
            });
    }

    // Attach listener to all download buttons
    const downloadBtns = [
        document.getElementById('home-download-btn'),
        document.getElementById('linux-download-btn')
    ];

    downloadBtns.forEach(function (btn) {
        if (btn) {
            btn.addEventListener('click', function () {
                // Increment count on server (uses GET /up/)
                fetch('https://api.counterapi.dev/v1/' + NAMESPACE + '/' + KEY + '/up/')
                    .catch(function (err) { console.error('Error incrementing counter:', err); });
            });
        }
    });
}

function createRetroBanner() {
    const banner = document.createElement('div');
    banner.className = 'retro-banner-overlay';
    banner.innerHTML =
        '<div class="retro-box">' +
        '<div class="retro-header-label">System Notice</div>' +
        '<p><strong>WARNING: ALPHA SOFTWARE</strong><br>' +
        'FluxVCS is currently in early development. You will encounter bugs, crashes, or data loss. Use at your own risk.</p>' +
        '<div style="text-align: center;">' +
        '<button class="retro-btn" id="dismiss-banner">I Understand</button>' +
        '</div>' +
        '</div>';

    document.body.appendChild(banner);

    var btn = banner.querySelector('#dismiss-banner');
    if (btn) {
        btn.addEventListener('click', function () {
            banner.style.opacity = '0';
            setTimeout(function () { banner.remove(); }, 300);
        });
    }
}
