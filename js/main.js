document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 120,
            easing: 'ease-out-quad'
        });
    }

    // --- Theme & RTL Initialization ---
    const currentTheme = localStorage.getItem('theme') || 'light';
    const currentDir = localStorage.getItem('dir') || 'ltr';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('dir', currentDir);

    // --- Theme Toggle ---
    const themeBtn = document.querySelector('#theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = themeBtn?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    updateThemeIcon(currentTheme);

    // --- RTL Toggle ---
    const rtlBtn = document.querySelector('#rtl-toggle');
    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const newDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }

    // --- Scroll to Top ---
    const scrollTopBtn = document.querySelector('#scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Portfolio Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('d-none');
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.classList.add('d-none'), 300);
                    }
                });
            });
        });
    }

    // --- Form Validation & Handling ---
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                // Simulated success
                if (form.id === 'contact-form' || form.id === 'quote-form') {
                    e.preventDefault();
                    showToast('Success! Your message has been sent.', 'success');
                    form.reset();
                }
            }
            form.classList.add('was-validated');
        }, false);
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                
                // Email validation
                if (input.type === 'email' && !validateEmail(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });
        return isValid;
    }

    function validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    // --- Password Visibility Toggle ---
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // --- Scroll Animations (Handled by AOS) ---
    // Custom observer removed to prevent conflicts and scroll jank.

    // --- Helper: Show Toast (Simulated alert for better UX) ---
    function showToast(message, type) {
        // Using simple alert for now, but could be a custom toast
        alert(message);
    }

    // --- Image Upload Preview (Pricing Page) ---
    const imageUpload = document.querySelector('#image-upload');
    const imagePreviewContainer = document.querySelector('#image-preview');
    if (imageUpload && imagePreviewContainer) {
        const imagePreviewImg = imagePreviewContainer.querySelector('img');
        imageUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreviewImg.setAttribute('src', e.target.result);
                    imagePreviewContainer.classList.remove('d-none');
                }
                reader.readAsDataURL(file);
            }
        });
    }

});
