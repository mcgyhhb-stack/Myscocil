cat > ~/social-network/js/auth.js << 'EOF'
// معالجة نماذج المصادقة مع قاعدة البيانات

// تسجيل الدخول
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email && password) {
            showLoading('جاري تسجيل الدخول...');
            
            const result = await loginUser(email, password);
            
            hideLoading();
            
            if (result.success) {
                setSession(result.user);
                alert('تم تسجيل الدخول بنجاح!');
                window.location.href = 'home.html';
            } else {
                alert(result.error);
            }
        } else {
            alert('يرجى ملء جميع الحقول');
        }
    });
}

// إنشاء حساب
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // التحقق من كلمات المرور
        if (password !== confirmPassword) {
            alert('كلمات المرور غير متطابقة');
            return;
        }
        
        // التحقق من صحة البريد الإلكتروني
        if (!validateEmail(email)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        showLoading('جاري إنشاء الحساب...');
        
        // التحقق من وجود المستخدم مسبقاً
        const userExists = await checkUserExists(email);
        if (userExists.exists) {
            hideLoading();
            alert('هذا البريد الإلكتروني مسجل مسبقاً');
            return;
        }
        
        // بيانات المستخدم
        const userData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username,
            password: password, // في التطبيق الحقيقي، يجب تشفير كلمة المرور
            created_at: new Date().toISOString()
        };
        
        // تسجيل المستخدم في قاعدة البيانات
        const result = await registerUser(userData);
        
        hideLoading();
        
        if (result.success) {
            setSession(userData);
            alert('تم إنشاء الحساب بنجاح!');
            window.location.href = 'home.html';
        } else {
            alert('حدث خطأ أثناء إنشاء الحساب: ' + result.error);
        }
    });
}

// وظائف المساعدة
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
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
EOF
