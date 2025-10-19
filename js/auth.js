// معالجة نماذج المصادقة
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email && password) {
            showLoading('جاري تسجيل الدخول...');
            setTimeout(() => {
                hideLoading();
                alert('تم تسجيل الدخول بنجاح!');
                window.location.href = 'home.html';
            }, 2000);
        } else {
            alert('يرجى ملء جميع الحقول');
        }
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('كلمات المرور غير متطابقة');
            return;
        }
        showLoading('جاري إنشاء الحساب...');
        setTimeout(() => {
            hideLoading();
            alert('تم إنشاء الحساب بنجاح!');
            window.location.href = 'home.html';
        }, 2000);
    });
}

function showLoading(message = 'جاري التحميل...') {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;flex-direction:column;justify-content:center;align-items:center;color:white;z-index:9999;backdrop-filter:blur(5px);';
    loading.innerHTML = `<div style="text-align:center;"><div style="width:50px;height:50px;border:3px solid #fff;border-top:3px solid transparent;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 1rem;"></div><p>${message}</p></div>`;
    document.body.appendChild(loading);
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
