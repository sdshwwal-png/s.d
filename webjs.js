// 1. تبديل الوضع (دارك/لايت)
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

themeIcon.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 2. عداد الزوار
let count = parseInt(localStorage.getItem('visitCount')) || 0;
count++;
localStorage.setItem('visitCount', count);
document.getElementById('visitCount').innerText = count;
document.getElementById('visitCountDisplay').innerText = count;

// عدد المستخدمين الوهمي
let users = parseInt(localStorage.getItem('usersCount')) || 0;
if (count === 1) { users = 1; localStorage.setItem('usersCount', users); }
document.getElementById('usersCountDisplay').innerText = users;

// 3. كود الخصم
function applyDiscount() {
    const code = document.getElementById('discountCode').value.trim();
    const messageBox = document.getElementById('discountMessage');
    if (code === 'sand123') {
        messageBox.innerHTML = '<span style="color:gold; font-weight:bold;">✅ تم تطبيق خصم 20%!</span>';
    } else {
        messageBox.innerHTML = '<span style="color:red;">❌ كود خصم غير صحيح</span>';
    }
}

// 4. لوحة التحكم
function accessDashboard() {
    const secretCode = document.getElementById('secretCode').value.trim();
    const dashboard = document.getElementById('dashboard-content');
    if (secretCode === 'ilmnilmn#1') {
        dashboard.style.display = 'block';
        document.getElementById('visitCount').innerText = count;
        document.getElementById('currentMode').innerText = body.classList.contains('light-mode') ? 'لايت مود' : 'دارك مود';
        updateProductCount();
        loadProducts();
        updateGiftStatus();
        alert('مرحباً بك يا مدير! يمكنك إدارة المنتجات والإحصائيات.');
    } else {
        alert('كود غير صحيح!');
        dashboard.style.display = 'none';
    }
}

// 5. إدارة الهدية
function getGiftEnabled() {
    return localStorage.getItem('giftEnabled') !== 'false'; // القيمة الافتراضية true
}

function updateGiftBannerVisibility() {
    const banner = document.getElementById('giftBanner');
    if (banner) {
        banner.style.display = getGiftEnabled() ? 'block' : 'none';
    }
}

function toggleGift() {
    const current = getGiftEnabled();
    localStorage.setItem('giftEnabled', !current);
    updateGiftBannerVisibility();
    updateGiftStatus();
}

function updateGiftStatus() {
    const statusEl = document.getElementById('giftStatus');
    if (statusEl) {
        statusEl.innerText = getGiftEnabled() ? ' (مفعلة)' : ' (معطلة)';
    }
}

// 6. إضافة منتج عبر لوحة التحكم
function addProduct() {
    const name = document.getElementById('newProductName').value.trim();
    const price = document.getElementById('newProductPrice').value.trim();
    const img = document.getElementById('newProductImg').value.trim();
    if (name && price) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, price, img });
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        updateProductCount();
        alert('تمت إضافة الباقة بنجاح!');
        document.getElementById('newProductName').value = '';
        document.getElementById('newProductPrice').value = '';
        document.getElementById('newProductImg').value = '';
    } else {
        alert('يرجى إدخال اسم الباقة والسعر على الأقل');
    }
}

function loadProducts() {
    const list = document.getElementById('productList');
    list.innerHTML = '';
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if (products.length === 0) {
        list.innerHTML = '<p style="color:#666;">لا توجد باقات مضافة بعد.</p>';
        return;
    }
    products.forEach((p, index) => {
        const div = document.createElement('div');
        div.style.border = '1px solid #444';
        div.style.padding = '10px';
        div.style.margin = '5px';
        div.style.borderRadius = '8px';
        div.style.background = '#222';
        div.innerHTML = `
            <strong>${p.name}</strong> - ${p.price}<br>
            ${p.img ? `<img src="${p.img}" width="80" style="border-radius:5px;">` : ''}
            <button onclick="deleteProduct(${index})" style="background:red; border:none; color:white; border-radius:5px; padding:2px 8px; margin-top:5px; cursor:pointer;">حذف</button>
        `;
        list.appendChild(div);
    });
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    updateProductCount();
}

function updateProductCount() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    document.getElementById('productCount').innerText = products.length;
}

// 7. طلب خدمة (يفتح واتساب برسالة جاهزة)
function orderService(serviceName) {
    const message = encodeURIComponent(`مرحباً، أرغب في طلب: ${serviceName}`);
    window.open(`https://wa.me/96477777777?text=${message}`, '_blank');
}

// 8. تحميل أولي
window.addEventListener('DOMContentLoaded', () => {
    updateGiftBannerVisibility();
    loadProducts();
    updateProductCount();
    updateGiftStatus();
});

// رابط تيك توك (تنبيه للتعديل)
document.getElementById('tiktokLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert('يرجى استبدال هذا الرابط برابط حساب التيك توك الخاص بك في ملف HTML.');
});
