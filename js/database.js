cat > ~/social-network/js/database.js << 'EOF'
// إعداد Supabase - بالمفتاح الصحيح
const supabaseUrl = 'https://nqgdqyndtusbovuwhygb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZ2RxeW5kdHVzYm92dXdoeWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTIyODQsImV4cCI6MjA3NjM4ODI4NH0.Sj6GnBn_OzcJ5X2MO2g4JmUm50kI1jKbFkDykmi5kCg';

// تهيئة Supabase بشكل صحيح
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log('✅ تم تهيئة Supabase بنجاح');

// دالة الحصول على جميع المستخدمين
async function getAllUsers() {
    try {
        console.log('🔍 جاري جلب جميع المستخدمين...');
        
        const { data, error } = await supabase
            .from('users')
            .select('*');
        
        if (error) {
            console.error('❌ خطأ في جلب المستخدمين:', error);
            throw error;
        }
        
        console.log('✅ تم جلب المستخدمين بنجاح:', data);
        return { success: true, users: data };
    } catch (error) {
        console.error('❌ خطأ:', error);
        return { success: false, error: error.message };
    }
}

// دالة تسجيل مستخدم جديد
async function registerUser(userData) {
    try {
        console.log('🔍 جاري تسجيل المستخدم:', userData);
        
        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select();
        
        if (error) {
            console.error('❌ خطأ في التسجيل:', error);
            throw error;
        }
        
        console.log('✅ تم التسجيل بنجاح:', data);
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('❌ خطأ:', error);
        return { success: false, error: error.message };
    }
}

// دالة تسجيل الدخول - المعدلة لتعطي رسالة دقيقة
async function loginUser(email, password) {
    try {
        console.log('🔍 جاري تسجيل الدخول:', email);
        
        // أولاً: تحقق إذا كان البريد الإلكتروني موجود أصلاً
        const { data: userExists, error: checkError } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();
        
        if (checkError && checkError.code === 'PGRST116') {
            // لم يتم العثور على المستخدم
            return { 
                success: false, 
                error: '❌ لا يوجد حساب مرتبط بهذا البريد الإلكتروني' 
            };
        }
        
        // ثانياً: حاول تسجيل الدخول
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();
        
        if (error) {
            if (error.code === 'PGRST116') {
                // المستخدم موجود لكن كلمة المرور خاطئة
                return { 
                    success: false, 
                    error: '❌ كلمة المرور غير صحيحة' 
                };
            }
            console.error('❌ خطأ في تسجيل الدخول:', error);
            throw error;
        }
        
        console.log('✅ تم تسجيل الدخول بنجاح:', data);
        return { success: true, user: data };
    } catch (error) {
        console.error('❌ خطأ:', error);
        return { 
            success: false, 
            error: '❌ حدث خطأ أثناء تسجيل الدخول' 
        };
    }
}

// دالة التحقق من وجود مستخدم
async function checkUserExists(email) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();
        
        return { exists: !!data, error };
    } catch (error) {
        return { exists: false, error: null };
    }
}

function setSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    console.log('✅ تم حفظ الجلسة:', user);
}

function checkSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('currentUser');
    const sessionData = { 
        isLoggedIn: isLoggedIn === 'true', 
        user: user ? JSON.parse(user) : null 
    };
    console.log('🔍 فحص الجلسة:', sessionData);
    return sessionData;
}

function logout() {
    console.log('🚪 جاري تسجيل الخروج');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}
EOF
