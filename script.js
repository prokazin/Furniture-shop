// ===== УНИКАЛЬНЫЕ КЛЮЧИ ДЛЯ МЕБЕЛЬНОГО ПРОЕКТА =====
var STORAGE_KEYS = {
    PRODUCTS: 'furniture_products',
    CATEGORIES: 'furniture_categories',
    CART: 'furniture_cart',
    ORDERS: 'furniture_orders',
    SETTINGS: 'furniture_settings',
    LEADS: 'furniture_leads'
};

// ===== ДЕФОЛТНЫЕ ДАННЫЕ =====
function getDefaultProducts() {
    return [
        {
            id: 1,
            name: 'Диван "Комфорт"',
            category: 'sofas',
            price: 49900,
            oldPrice: 59900,
            rating: 4.8,
            reviews: 127,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
            images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'],
            inStock: true,
            isHit: true,
            description: 'Уютный диван с мягкими подушками и прочным каркасом. Идеально подходит для гостиной.',
            specs: {
                width: '220 см',
                depth: '95 см',
                height: '85 см',
                frame: 'Массив сосны',
                filling: 'ППУ высокой плотности',
                upholstery: 'Велюр/Рогожка'
            },
            sizes: [
                { label: '220 см', price: 49900 },
                { label: '240 см', price: 52900 },
                { label: '260 см', price: 55900 }
            ],
            colors: ['Бежевый', 'Серый', 'Синий', 'Зелёный'],
            drawings: [],
            interiorPhotos: []
        },
        {
            id: 2,
            name: 'Кресло "Премиум"',
            category: 'armchairs',
            price: 25900,
            oldPrice: null,
            rating: 4.9,
            reviews: 89,
            image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
            images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400'],
            inStock: true,
            isHit: false,
            description: 'Элегантное кресло с высокой спинкой и мягкими подлокотниками.',
            specs: {
                width: '85 см',
                depth: '80 см',
                height: '100 см',
                frame: 'Массив дуба',
                filling: 'ППУ + пружинный блок',
                upholstery: 'Кожа/Экокожа'
            },
            sizes: [
                { label: 'Стандарт', price: 25900 }
            ],
            colors: ['Бежевый', 'Чёрный', 'Коричневый'],
            drawings: [],
            interiorPhotos: []
        },
        {
            id: 3,
            name: 'Пуф "Мягкий"',
            category: 'poufs',
            price: 8900,
            oldPrice: null,
            rating: 4.7,
            reviews: 56,
            image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400',
            images: ['https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400'],
            inStock: true,
            isHit: false,
            description: 'Компактный и удобный пуф для отдыха. Лёгкий и мобильный.',
            specs: {
                width: '60 см',
                depth: '60 см',
                height: '45 см',
                frame: 'Массив сосны',
                filling: 'ППУ',
                upholstery: 'Велюр'
            },
            sizes: [
                { label: '60 см', price: 8900 }
            ],
            colors: ['Серый', 'Бежевый', 'Синий'],
            drawings: [],
            interiorPhotos: []
        },
        {
            id: 4,
            name: 'Кровать "Альфа"',
            category: 'beds',
            price: 65900,
            oldPrice: 78900,
            rating: 4.9,
            reviews: 203,
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
            images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'],
            inStock: true,
            isHit: true,
            description: 'Двуспальная кровать с мягким изголовьем. Прочная и надёжная конструкция.',
            specs: {
                width: '180 см',
                depth: '200 см',
                height: '95 см',
                frame: 'Массив сосны',
                filling: 'ППУ высокой плотности',
                upholstery: 'Велюр/Рогожка'
            },
            sizes: [
                { label: '160×200 см', price: 59900 },
                { label: '180×200 см', price: 65900 },
                { label: '200×200 см', price: 71900 }
            ],
            colors: ['Серый', 'Бежевый', 'Тёмно-синий'],
            drawings: [],
            interiorPhotos: []
        }
    ];
}

function getDefaultCategories() {
    return [
        { id: 'sofas', name: 'Диваны', icon: 'fa-solid fa-couch', count: 0 },
        { id: 'armchairs', name: 'Кресла', icon: 'fa-solid fa-chair', count: 0 },
        { id: 'poufs', name: 'Пуфы', icon: 'fa-solid fa-stool', count: 0 },
        { id: 'beds', name: 'Кровати', icon: 'fa-solid fa-bed', count: 0 }
    ];
}

// ===== ЗАГРУЗКА ДАННЫХ =====
function loadData(key, defaultData) {
    var stored = localStorage.getItem(key);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return defaultData;
        }
    }
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

var products = loadData(STORAGE_KEYS.PRODUCTS, getDefaultProducts());
var categories = loadData(STORAGE_KEYS.CATEGORIES, getDefaultCategories());
var cart = loadData(STORAGE_KEYS.CART, []);

// ===== РЕНДЕРИНГ ГЛАВНОЙ СТРАНИЦЫ =====
function renderHits() {
    var grid = document.getElementById('hitsGrid');
    if (!grid) return;
    
    var hits = products.filter(function(p) { return p.isHit; });
    if (hits.length === 0) {
        hits = products.slice(0, 4);
    }
    
    grid.innerHTML = hits.map(function(p) {
        return createProductCard(p);
    }).join('');
}

function createProductCard(p) {
    var oldPriceHtml = p.oldPrice ? '<span class="old-price">' + p.oldPrice.toLocaleString() + ' ₽</span>' : '';
    var hitBadge = p.isHit ? '<span class="badge-hit">🔥 Хит</span>' : '';
    var stockBadge = p.inStock ? '<span class="badge-stock">В наличии</span>' : '<span class="badge-stock out">Нет в наличии</span>';
    
    return '<div class="product-card" onclick="location.href=\'product.html?id=' + p.id + '\'">' +
        '<div class="product-image">' +
        '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
        hitBadge +
        '</div>' +
        '<div class="product-info">' +
        '<h3>' + p.name + '</h3>' +
        '<div class="product-rating">★ ' + p.rating + ' (' + p.reviews + ')</div>' +
        '<div class="product-price">' +
        '<span class="current-price">' + p.price.toLocaleString() + ' ₽</span>' +
        oldPriceHtml +
        '</div>' +
        '<div class="product-stock">' + stockBadge + '</div>' +
        '<button class="btn-add-cart" onclick="event.stopPropagation();addToCart(' + p.id + ')">Добавить в корзину</button>' +
        '</div>' +
        '</div>';
}

function renderCategories() {
    var grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    grid.innerHTML = categories.map(function(c) {
        var count = products.filter(function(p) { return p.category === c.id; }).length;
        return '<div class="category-card" onclick="location.href=\'catalog.html?category=' + c.id + '\'">' +
            '<div class="category-icon"><i class="' + c.icon + '"></i></div>' +
            '<h3>' + c.name + '</h3>' +
            '<span class="category-count">' + count + ' моделей</span>' +
            '</div>';
    }).join('');
}

// ===== КОРЗИНА =====
function addToCart(productId) {
    var product = products.find(function(p) { return p.id === productId; });
    if (!product) return;
    
    var existing = cart.find(function(item) { return item.id === productId; });
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: productId, qty: 1, price: product.price });
    }
    saveData(STORAGE_KEYS.CART, cart);
    updateCartCount();
    showToast('✅ ' + product.name + ' добавлен в корзину!');
}

function updateCartCount() {
    var countEl = document.getElementById('cartCount');
    if (!countEl) return;
    var total = cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
    countEl.textContent = total;
}

function showToast(msg) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = '0.4s';
        setTimeout(function() { toast.remove(); }, 400);
    }, 2500);
}

// ===== ПОИСК =====
function searchProducts(e) {
    e.preventDefault();
    var query = document.getElementById('searchInput').value.trim();
    if (!query) {
        location.href = 'catalog.html';
        return;
    }
    location.href = 'catalog.html?search=' + encodeURIComponent(query);
}

// ===== ПОДПИСКА =====
function subscribeNewsletter(e) {
    e.preventDefault();
    var email = e.target.querySelector('input').value;
    if (email) {
        showToast('✅ Спасибо за подписку!');
        e.target.reset();
    }
}

// ===== БУРГЕР-МЕНЮ =====
document.getElementById('burgerBtn')?.addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('mainNav')?.classList.toggle('active');
});

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', function() {
    renderHits();
    renderCategories();
    updateCartCount();
});
