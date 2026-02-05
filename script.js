document.addEventListener('DOMContentLoaded', () => {
    // Инициализация плавного скролла
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    // Изменение хедера при скролле
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(15, 23, 42, 0.9)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'transparent';
        }
    });

    console.log('<?= $domainTitle ?> system initialized...');
});
// Внутри DOMContentLoaded
gsap.from(".hero__title", {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: "power4.out",
    delay: 0.2
});

gsap.from(".hero__subtitle", {
    duration: 1.2,
    y: 30,
    opacity: 0,
    ease: "power4.out",
    delay: 0.4
});

gsap.from(".hero__actions", {
    duration: 1,
    y: 20,
    opacity: 0,
    ease: "power4.out",
    delay: 0.6
});

gsap.from(".hero__code-window", {
    duration: 1.5,
    x: 100,
    opacity: 0,
    rotate: 5,
    ease: "elastic.out(1, 0.75)",
    delay: 0.8
});
// Внутри DOMContentLoaded
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
// Внутри DOMContentLoaded после инициализации GSAP
const steps = document.querySelectorAll('.step-card');

steps.forEach((step, index) => {
    ScrollTrigger.create({
        trigger: step,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => step.classList.add('is-active'),
        onLeaveBack: () => step.classList.remove('is-active'),
        // Опционально: добавить легкий параллакс для каждого шага
    });
});