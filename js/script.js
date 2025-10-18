// تفعيل القائمة المتنقلة
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// تفعيل أشرطة المهارات عند التمرير
function animateSkills() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.width = level + '%';
    });
}

// تفعيل العدادات عند التمرير
function animateCounters() {
    const counters = document.querySelectorAll('.number');
    
    counters.forEach(counter => {
        const target = +counter.innerText.replace('+', '');
        const count = +counter.innerText.replace('+', '');
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + '+';
            setTimeout(animateCounters, 20);
        }
    });
}

// التحقق من ظهور العنصر في الشاشة
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// تفعيل الأنيميشن عند التمرير
let skillsAnimated = false;
let countersAnimated = false;

window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills');
    const aboutSection = document.querySelector('.about');
    
    // أنيميشن المهارات
    if (isInViewport(skillsSection) && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
    }
    
    // أنيميشن العدادات
    if (isInViewport(aboutSection) && !countersAnimated) {
        animateCounters();
        countersAnimated = true;
    }
    
    // تغيير لون الشريط عند التمرير
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// تأثير التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تفعيل نموذج الاتصال
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('شكراً لك! سيتم الرد على رسالتك قريباً.');
        this.reset();
    });
}

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('الموقع الشخصي جاهز! 🚀');
    
    // تفعيل الأنيميشن الأولية
    animateSkills();
});
