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
    
    // Ambil semua gambar yang punya class 'preview-img'
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

    // 4. Script Menu Mobile Hamburger
    const mobileBtn = document.querySelector('button[aria-label="Menu"]');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Menu mobile ditekan. Anda bisa menambahkan dropdown menu di sini.');
        });
    }
});