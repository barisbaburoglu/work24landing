function changeLanguage() {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        const newLang = langSelect.value;
        updateContent(newLang);
    }
}

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // data-tr attribute'ları için
    const trElements = document.querySelectorAll('[data-tr="tr"]');
    const enElements = document.querySelectorAll('[data-tr="en"]');

    if (lang === 'tr') {
        trElements.forEach(el => {
            el.style.display = '';
            el.style.removeProperty('display');
        });
        enElements.forEach(el => el.style.display = 'none');
    } else {
        trElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => {
            el.style.display = '';
            el.style.removeProperty('display');
        });
    }

    // Fiyatlandırma mesajının dilini güncelle (varsa)
    if (typeof updatePricingContactMessageLang === 'function') {
        updatePricingContactMessageLang(lang);
    }
}

// Sayfa yüklendiğinde dil tercihini yükle veya varsayılan dili kullan
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('work24_language') || 'en';
    updateContent(savedLang);
    // Bayrağı da güncelle
    const currentFlag = document.getElementById('currentFlag');
    if (currentFlag) {
        currentFlag.src = `assets/imgs/flags/${savedLang}.png`;
    }
});

function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    menu.classList.toggle('show');
}

function selectLanguage(lang) {
    const menu = document.getElementById('languageMenu');
    const currentFlag = document.getElementById('currentFlag');
    const currentLanguage = document.getElementById('currentLanguage');

    // Dil tercihini localStorage'a kaydet
    localStorage.setItem('work24_language', lang);

    // Bayrak ve dil adını güncelle
    currentFlag.src = `assets/imgs/flags/${lang}.png`;

    // Menüyü kapat
    menu.classList.remove('show');

    // İçeriği güncelle
    updateContent(lang);
}

// Sayfa dışına tıklandığında menüyü kapat
document.addEventListener('click', function (event) {
    const menu = document.getElementById('languageMenu');
    const languageButton = document.querySelector('.language-button');

    if (!languageButton.contains(event.target) && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }
});

// Featured Features Tab Functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabItems = document.querySelectorAll('.feature-tab-item');
    const textContents = document.querySelectorAll('.feature-text');

    // Tab mapping: data-tab -> Bootstrap tab ID
    const tabMapping = {
        'dashboard': 'v-pills-home',
        'shift': 'v-pills-profile',
        'leave': 'v-pills-messages',
        'payroll': 'v-pills-settings'
    };

    tabItems.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');
            const bootstrapTabId = tabMapping[targetTab];

            // Remove active class from all tabs
            tabItems.forEach(item => {
                item.classList.remove('active');
                item.style.borderColor = '#e2e8f0';
                item.style.background = 'white';
                item.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            });

            // Add active class to clicked tab
            this.classList.add('active');
            this.style.borderColor = '#7ed957';
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)';
            this.style.boxShadow = '0 4px 12px rgba(126, 217, 87, 0.15)';

            // Hide all text contents
            textContents.forEach(text => {
                text.style.display = 'none';
            });

            // Show target text content
            const targetText = document.getElementById('text-' + targetTab);
            if (targetText) {
                targetText.style.display = 'block';
            }

            // Resim değiştirme - Her sekme için farklı resim
            const imageMapping = {
                'dashboard': 'assets/imgs/images/generative-ai-8-01.png',
                'shift': 'assets/imgs/images/generative-ai-8-02.png',
                'leave': 'assets/imgs/images/generative-ai-8-03.png',
                'payroll': 'assets/imgs/images/generative-ai-8-04.png'
            };

            const mainImage = document.getElementById('feature-main-image');
            if (mainImage && imageMapping[targetTab]) {
                // Fade out
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = imageMapping[targetTab];
                    // Fade in
                    mainImage.style.opacity = '1';
                }, 250);
            }
        });
    });
});

// Smooth Scroll for Menu Links
document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link, .mobile-menu-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // Mobil menüden tıklandıysa offcanvas'ı kapat
                const offcanvasElement = document.getElementById('offcanvasMenu');
                if (offcanvasElement && this.classList.contains('mobile-menu-link')) {
                    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                    if (offcanvas) {
                        offcanvas.hide();
                    }
                }
                
                // Ana sayfa için özel kontrol
                if (targetId === 'home') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Tüm aktif sınıfları kaldır ve ana sayfa linkini aktif yap
                    menuLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    return;
                }
                
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Scroll tamamlandıktan sonra aktif sınıfı güncelle
                    setTimeout(() => {
                        menuLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                    }, 500);
                }
            }
        });
    });
});

// Mobile Language Menu Functions
function toggleMobileLanguageMenu() {
    const menu = document.getElementById('mobileLanguageMenu');
    menu.classList.toggle('active');
}

function selectMobileLanguage(lang) {
    const menu = document.getElementById('mobileLanguageMenu');
    const currentFlag = document.getElementById('mobileCurrentFlag');
    const currentLang = document.getElementById('mobileCurrentLang');
    
    // Dil tercihini localStorage'a kaydet
    localStorage.setItem('work24_language', lang);
    
    // Bayrak ve dil adını güncelle
    currentFlag.src = `assets/imgs/flags/${lang}.png`;
    currentLang.textContent = lang === 'tr' ? 'Türkçe' : 'English';
    
    // Menüyü kapat
    menu.classList.remove('active');
    
    // İçeriği güncelle
    updateContent(lang);
    
    // Desktop dil menüsünü de güncelle
    const desktopFlag = document.getElementById('currentFlag');
    if (desktopFlag) {
        desktopFlag.src = `assets/imgs/flags/${lang}.png`;
    }
}

// Update mobile language on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('work24_language') || 'en';
    const mobileCurrentFlag = document.getElementById('mobileCurrentFlag');
    const mobileCurrentLang = document.getElementById('mobileCurrentLang');
    
    if (mobileCurrentFlag) {
        mobileCurrentFlag.src = `assets/imgs/flags/${savedLang}.png`;
    }
    
    if (mobileCurrentLang) {
        mobileCurrentLang.textContent = savedLang === 'tr' ? 'Türkçe' : 'English';
    }
});

// Active menu link on scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu-link, .mobile-menu-link');
    const scrollPosition = window.scrollY + 150;
    const headerHeight = document.querySelector('header')?.offsetHeight || 100;
    
    // Ana sayfa kontrolü - sayfa başına yakınsa ana sayfa aktif
    if (window.scrollY < headerHeight + 100) {
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
        return;
    }
    
    // Diğer bölümler için kontrol
    let activeSection = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = sectionId;
        }
    });
    
    // Aktif bölümü menü linklerine uygula
    if (activeSection) {
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }
});

