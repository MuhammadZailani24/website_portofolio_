document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Logika Sticky Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. Animasi Scroll "Fade In Up"
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Logika Lightbox Modal (Untuk Preview Gambar Penuh)
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.getElementById('close-modal');
    
    const images = document.querySelectorAll('.preview-img');

    // Fungsi Buka Modal
    images.forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src; 
            modal.classList.remove('hidden');
            
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalImg.classList.remove('scale-95');
                modalImg.classList.add('scale-100');
            }, 10);
            
            document.body.style.overflow = 'hidden';
        });
    });

    // Fungsi Tutup Modal
    const closeModalFunc = () => {
        modal.classList.add('opacity-0');
        modalImg.classList.remove('scale-100');
        modalImg.classList.add('scale-95');
        
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modalImg.src = ''; 
        }, 300);
    };

    if(closeBtn) {
        closeBtn.addEventListener('click', closeModalFunc);
    }
    
    if(modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                closeModalFunc();
            }
        });
    }

    // 4. Logika Menu Mobile (Hamburger)
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileIcon = document.getElementById('mobile-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if(isMenuOpen) {
            // Buka Menu
            mobileMenu.classList.remove('hidden');
            setTimeout(() => { 
                mobileMenu.classList.remove('opacity-0'); 
            }, 10);
            
            // Ubah ikon ke silang (X)
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-xmark');
            
            // Hentikan scroll background
            document.body.style.overflow = 'hidden';
        } else {
            // Tutup Menu
            mobileMenu.classList.add('opacity-0');
            
            // Ubah ikon ke garis tiga (Hamburger)
            mobileIcon.classList.remove('fa-xmark');
            mobileIcon.classList.add('fa-bars');
            
            // Kembalikan scroll background
            document.body.style.overflow = 'auto';
            
            setTimeout(() => { 
                mobileMenu.classList.add('hidden'); 
            }, 300);
        }
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
    }

    // Tutup menu otomatis saat salah satu link ditekan
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });
});