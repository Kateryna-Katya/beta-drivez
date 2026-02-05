document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ---
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    const toggleMenu = () => {
        burger.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(mobileMenu.classList.contains('is-active')) toggleMenu();
        });
    });

    // --- 2. COOKIE POPUP ---
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('is-show');
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.remove('is-show');
    });

    // --- 3. АНИМАЦИИ ПОЯВЛЕНИЯ (GSAP) ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Анимация
    const heroTl = gsap.timeline();
    heroTl.from(".hero__title", { duration: 1, y: 50, opacity: 0, ease: "power4.out" })
          .from(".hero__subtitle", { duration: 1, y: 30, opacity: 0, ease: "power4.out" }, "-=0.6")
          .from(".hero__actions", { duration: 0.8, y: 20, opacity: 0, ease: "power4.out" }, "-=0.6")
          .from(".hero__viz", { duration: 1, x: 50, opacity: 0, ease: "power2.out" }, "-=0.8");

    // Анимация шагов Методологии
    const steps = document.querySelectorAll('.step-card');
    steps.forEach((step) => {
        ScrollTrigger.create({
            trigger: step,
            start: "top 80%",
            onEnter: () => step.classList.add('is-active'),
            once: true
        });
    });

    // Эффект Spotlight для карточек курсов
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // --- 4. FAQ АККОРДЕОН ---
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        item.querySelector('.faq__question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // --- 5. ФОРМА КОНТАКТОВ + КАПЧА ---
    const phoneInput = document.getElementById('phoneInput');
    if(phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9+]/g, '');
        });
    }

    const captchaQ = document.getElementById('captchaQuestion');
    const captchaInput = document.getElementById('captchaInput');
    if(captchaQ) {
        let n1 = Math.floor(Math.random() * 10) + 1;
        let n2 = Math.floor(Math.random() * 10) + 1;
        let correctSum = n1 + n2;
        captchaQ.innerText = `${n1} + ${n2} =`;

        document.getElementById('mainForm').addEventListener('submit', function(e) {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== correctSum) {
                alert('Неверный ответ капчи');
                return;
            }
            const btn = this.querySelector('button');
            const msg = document.getElementById('formMessage');
            btn.disabled = true;
            btn.innerText = 'Отправка...';
            
            setTimeout(() => {
                this.reset();
                btn.disabled = false;
                btn.innerText = 'Узнать детали';
                msg.innerText = 'Успех! Мы свяжемся с вами.';
                msg.classList.add('success');
            }, 1500);
        });
    }
});