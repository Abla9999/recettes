// Global variables and utilities
let currentUser = null
let cart = JSON.parse(localStorage.getItem("recipeCart")) || []
let purchasedRecipes = JSON.parse(localStorage.getItem("purchasedRecipes")) || []

// Enhanced Recipe database with all recipes from your files
const recipesDatabase = [
  {
    id: 1,
    title: "Cake au Chocolat",
    chef: "Chef Marco",
    price: 19.99,
    rating: 4.8,
    difficulty: "facile",
    time: "45 min",
    serves: 6,
    image: "Chocolate-Pound-Cake_1.jpg",
    description: "Un délicieux cake au chocolat fondant et moelleux, parfait pour les occasions spéciales",
    category: "dessert",
    tags: ["chocolat", "dessert", "facile"],
    ingredients: [
      { name: "Chocolat noir", quantity: "200g" },
      { name: "Oeufs", quantity: "3" },
      { name: "Sucre", quantity: "100g" },
      { name: "Beurre", quantity: "100g" },
      { name: "Farine", quantity: "75g" }
    ],
    instructions: [
      "Faire fondre le chocolat et le beurre au micro onde à puissance maximale pendant 1 minutes 30.",
      "Dans un saladier, mélanger la farine, le sucre et les œufs. Ajouter le chocolat fondu. Bien mélanger.",
      "Verser la préparation dans un moule à cake. Faire cuire à puissance maximale pendant 5 minutes."
    ],
  },
  {
    id: 2,
    title: "Charlotte aux Fruits",
    chef: "Chef Pierre",
    price: 24.99,
    rating: 4.6,
    difficulty: "moyen",
    time: "90 min",
    serves: 8,
    image: "charlotte_2.jpg",
    description: "Une charlotte élégante aux fruits frais, parfaite pour les fêtes",
    category: "dessert",
    tags: ["fruits", "dessert", "fêtes", "élégant"],
    ingredients: [
      { name: "Fruits frais mélangés", quantity: "500g" },
      { name: "Biscuits à la cuillère", quantity: "200g" },
      { name: "Gélatine", quantity: "4 feuilles" },
      { name: "Crème fraîche", quantity: "300ml" },
      { name: "Sucre", quantity: "100g" },
      { name: "Vanille", quantity: "1 gousse" }
    ],
    instructions: [
      "Préparer la crème chantilly avec la gélatine et le sucre.",
      "Tapisser un moule avec les biscuits à la cuillère.",
      "Alterner couches de crème et de fruits.",
      "Laisser prendre au réfrigérateur 4 heures minimum."
    ],
  },
  {
    id: 3,
    title: "Cake aux Fruits Rouges",
    chef: "Chef Sophie",
    price: 22.99,
    rating: 4.7,
    difficulty: "facile",
    time: "50 min",
    serves: 6,
    image: "cake_aux_fruits_rouges_et_lait_de_coco.jpg",
    description: "Un cake léger et fruité aux fruits rouges de saison",
    category: "dessert",
    tags: ["fruits rouges", "dessert", "léger"],
    ingredients: [
      { name: "Farine", quantity: "200g" },
      { name: "Levure chimique", quantity: "1 sachet" },
      { name: "Sucre vanillé", quantity: "1 sachet" },
      { name: "Oeufs", quantity: "3" },
      { name: "Lait de coco", quantity: "200ml" },
      { name: "Fruits rouges mélangés", quantity: "250g" },
      { name: "Sucre semoule", quantity: "120g" }
    ],
    instructions: [
      "Préchauffer le four à 180°C. Rouler les fruits rouges dans un peu de farine.",
      "Fouetter les oeufs avec le sucre pour obtenir un mélange mousseux.",
      "Ajouter petit à petit la farine et la levure. Incorporer le lait de coco.",
      "Ajouter délicatement les fruits rouges sans trop mélanger.",
      "Faire cuire environ 35 minutes à four moyen."
    ],
  },
  {
    id: 4,
    title: "Pizza Pepperoni",
    chef: "Chef Marco",
    price: 34.99,
    rating: 4.9,
    difficulty: "moyen",
    time: "45 min",
    serves: 4,
    image: "pizza_pepperoni.jpg",
    description: "Une pizza authentique aux saveurs italiennes",
    category: "plat-principal",
    tags: ["pizza", "italien", "pepperoni", "fromage"],
    ingredients: [
      { name: "Farine T55", quantity: "400g" },
      { name: "Levure fraîche", quantity: "10g" },
      { name: "Eau tiède", quantity: "250ml" },
      { name: "Pepperoni", quantity: "150g" },
      { name: "Mozzarella", quantity: "200g" },
      { name: "Sauce tomate", quantity: "200ml" },
      { name: "Huile d'olive", quantity: "2 c. à soupe" }
    ],
    instructions: [
      "Préparer la pâte avec farine, levure et eau. Laisser lever 1 heure.",
      "Étaler la pâte et ajouter la sauce tomate.",
      "Disposer le pepperoni et la mozzarella.",
      "Cuire à 250°C pendant 12-15 minutes."
    ],
  },
  {
    id: 5,
    title: "Salade Colorée",
    chef: "Chef Yuki",
    price: 18.99,
    rating: 4.5,
    difficulty: "facile",
    time: "15 min",
    serves: 2,
    image: "depositphotos_144188519-stock-photo-colorful-food-pattern.jpg",
    description: "Une salade fraîche et colorée aux saveurs méditerranéennes",
    category: "entrée",
    tags: ["salade", "frais", "méditerranéen", "healthy"],
    ingredients: [
      { name: "Laitue", quantity: "1" },
      { name: "Tomates cerises", quantity: "200g" },
      { name: "Concombre", quantity: "1" },
      { name: "Olives", quantity: "100g" },
      { name: "Feta", quantity: "100g" },
      { name: "Huile d'olive", quantity: "3 c. à soupe" },
      { name: "Vinaigre balsamique", quantity: "1 c. à soupe" }
    ],
    instructions: [
      "Laver et couper tous les légumes.",
      "Mélanger dans un saladier.",
      "Ajouter la feta et les olives.",
      "Assaisonner avec huile d'olive et vinaigre balsamique."
    ],
  },
  {
    id: 6,
    title: "Pasta Carbonara",
    chef: "Chef Antoine",
    price: 26.99,
    rating: 4.6,
    difficulty: "moyen",
    time: "25 min",
    serves: 4,
    image: "Fotolia_50412971_S-849x516.jpg",
    description: "Des pâtes crémeuses à la carbonara traditionnelle",
    category: "plat-principal",
    tags: ["pâtes", "italien", "carbonara", "crème"],
    ingredients: [
      { name: "Spaghetti", quantity: "400g" },
      { name: "Lardons", quantity: "200g" },
      { name: "Oeufs", quantity: "4" },
      { name: "Parmesan", quantity: "100g" },
      { name: "Poivre noir", quantity: "2 c. à café" },
      { name: "Sel", quantity: "1 pincée" }
    ],
    instructions: [
      "Cuire les pâtes selon les instructions.",
      "Faire revenir les lardons à la poêle.",
      "Battre les oeufs avec le parmesan et le poivre.",
      "Mélanger les pâtes chaudes avec la préparation aux oeufs."
    ],
  },
  {
    id: 7,
    title: "Smoothie Bowl",
    chef: "Chef Marie",
    price: 16.99,
    rating: 4.4,
    difficulty: "facile",
    time: "10 min",
    serves: 1,
    image: "170920241726586386.jpeg",
    description: "Un smoothie bowl healthy et coloré pour bien commencer la journée",
    category: "petit-déjeuner",
    tags: ["smoothie", "healthy", "fruits", "petit-déjeuner"],
    ingredients: [
      { name: "Banane", quantity: "1" },
      { name: "Fruits rouges", quantity: "100g" },
      { name: "Yaourt grec", quantity: "100g" },
      { name: "Granola", quantity: "50g" },
      { name: "Miel", quantity: "1 c. à café" },
      { name: "Graines de chia", quantity: "1 c. à soupe" }
    ],
    instructions: [
      "Mixer la banane, les fruits rouges et le yaourt.",
      "Verser dans un bol.",
      "Décorer avec granola, miel et graines de chia.",
      "Servir immédiatement."
    ],
  },
  {
    id: 8,
    title: "Tarte aux Pommes",
    chef: "Chef Pierre",
    price: 28.99,
    rating: 4.8,
    difficulty: "moyen",
    time: "60 min",
    serves: 8,
    image: "images (1).jpeg",
    description: "Une tarte aux pommes traditionnelle et délicieuse",
    category: "dessert",
    tags: ["tarte", "pommes", "français", "classique"],
    ingredients: [
      { name: "Pâte brisée", quantity: "1" },
      { name: "Pommes Golden", quantity: "6" },
      { name: "Sucre", quantity: "100g" },
      { name: "Beurre", quantity: "50g" },
      { name: "Cannelle", quantity: "1 c. à café" },
      { name: "Oeuf", quantity: "1" }
    ],
    instructions: [
      "Préchauffer le four à 180°C.",
      "Étaler la pâte dans un moule à tarte.",
      "Disposer les pommes épluchées et coupées.",
      "Saupoudrer de sucre et cannelle.",
      "Cuire 45 minutes jusqu'à doré."
    ],
  },
]

// Utility functions
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  window.jQuery("#cart-count").text(cartCount)
}

function saveToLocalStorage() {
  localStorage.setItem("recipeCart", JSON.stringify(cart))
  localStorage.setItem("purchasedRecipes", JSON.stringify(purchasedRecipes))
}

function addToCart(recipeId) {
  const recipe = recipesDatabase.find((r) => r.id === recipeId)
  if (!recipe) return

  const existingItem = cart.find((item) => item.recipeId === recipeId)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      recipeId,
      quantity: 1,
    })
  }

  updateCartCount()
  saveToLocalStorage()
  showNotification("Recette ajoutée au panier!")
}

function removeFromCart(recipeId) {
  cart = cart.filter((item) => item.recipeId !== recipeId)
  updateCartCount()
  saveToLocalStorage()
}

function isRecipePurchased(recipeId) {
  return purchasedRecipes.includes(recipeId)
}

function purchaseRecipe(recipeId) {
  if (!purchasedRecipes.includes(recipeId)) {
    purchasedRecipes.push(recipeId)
    saveToLocalStorage()
  }
}

function formatPrice(price) {
  return price.toFixed(2) + "€"
}

function getRecipeById(id) {
  return recipesDatabase.find((recipe) => recipe.id === Number.parseInt(id))
}

// Recipe navigation functions
function viewRecipeDetail(recipeId) {
  window.location.href = `recipe-detail.html?id=${recipeId}`;
}

function startCooking(recipeId) {
  window.location.href = `recipe-detail.html?id=${recipeId}&mode=cooking`;
}

// Initialize on page load
window.jQuery(document).ready(() => {
  updateCartCount()

  // Check if user is logged in
  const loggedInUser = localStorage.getItem("currentUser")
  if (loggedInUser) {
    currentUser = JSON.parse(loggedInUser)
    updateUserInterface()
  }
})

function updateUserInterface() {
  if (currentUser) {
    window.jQuery(".nav-auth").html(`
            <span>Bonjour, ${currentUser.nom}</span>
            <a href="#" class="nav-btn" onclick="logout()">Déconnexion</a>
        `)
  }
}

function logout() {
  localStorage.removeItem("currentUser")
  currentUser = null
  window.location.href = "index.html"
}

// Add notification styles to CSS
window
  .jQuery("<style>")
  .text(`
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    }
    
    .notification.success {
        background: #28a745;
    }
    
    .notification.error {
        background: #dc3545;
    }
    
    .notification.info {
        background: #17a2b8;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`)
  .appendTo("head")

// Universal Display Function
function displayContent(content, options = {}) {
    const {
        container = 'main',
        type = 'grid', // 'grid', 'list', 'cards', 'table'
        animation = true,
        loading = false,
        emptyMessage = 'Aucun contenu à afficher',
        className = '',
        onComplete = null
    } = options;

    const containerElement = typeof container === 'string' ? 
        document.getElementById(container) || document.querySelector(container) : 
        container;

    if (!containerElement) {
        console.error('Container not found:', container);
        return;
    }

    // Show loading state if requested
    if (loading) {
        containerElement.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Chargement en cours...</p>
            </div>
        `;
        return;
    }

    // Handle empty content
    if (!content || (Array.isArray(content) && content.length === 0)) {
        containerElement.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h3>Aucun contenu</h3>
                <p>${emptyMessage}</p>
            </div>
        `;
        return;
    }

    let html = '';
    const containerClass = `display-container ${type}-display ${className}`;

    // Generate HTML based on type
    switch (type) {
        case 'grid':
            html = generateGridHTML(content);
            break;
        case 'list':
            html = generateListHTML(content);
            break;
        case 'cards':
            html = generateCardsHTML(content);
            break;
        case 'table':
            html = generateTableHTML(content);
            break;
        default:
            html = generateGridHTML(content);
    }

    // Apply animation if enabled
    if (animation) {
        containerElement.style.opacity = '0';
        containerElement.style.transform = 'translateY(20px)';
        containerElement.innerHTML = `<div class="${containerClass}">${html}</div>`;
        
        setTimeout(() => {
            containerElement.style.transition = 'all 0.3s ease-in-out';
            containerElement.style.opacity = '1';
            containerElement.style.transform = 'translateY(0)';
        }, 50);
    } else {
        containerElement.innerHTML = `<div class="${containerClass}">${html}</div>`;
    }

    // Call onComplete callback if provided
    if (onComplete && typeof onComplete === 'function') {
        setTimeout(onComplete, animation ? 350 : 0);
    }
}

// Helper functions for different display types
function generateGridHTML(content) {
    if (Array.isArray(content)) {
        return content.map(item => `
            <div class="grid-item" data-id="${item.id || ''}">
                ${item.image ? `<img src="${item.image}" alt="${item.title || item.name}" class="grid-item-image">` : ''}
                <div class="grid-item-content">
                    <h3>${item.title || item.name}</h3>
                    ${item.description ? `<p>${item.description}</p>` : ''}
                    ${item.price ? `<span class="price">${formatPrice(item.price)}</span>` : ''}
                </div>
            </div>
        `).join('');
    }
    return `<div class="content">${content}</div>`;
}

function generateListHTML(content) {
    if (Array.isArray(content)) {
        return content.map(item => `
            <div class="list-item" data-id="${item.id || ''}">
                <div class="list-item-content">
                    <h3>${item.title || item.name}</h3>
                    ${item.description ? `<p>${item.description}</p>` : ''}
                    ${item.price ? `<span class="price">${formatPrice(item.price)}</span>` : ''}
                </div>
                ${item.image ? `<img src="${item.image}" alt="${item.title || item.name}" class="list-item-image">` : ''}
            </div>
        `).join('');
    }
    return `<div class="content">${content}</div>`;
}

function generateCardsHTML(content) {
    if (Array.isArray(content)) {
        return content.map(item => {
            const isPurchased = isRecipePurchased(item.id);
            const difficultyClass = item.difficulty ? `difficulty-${item.difficulty}` : '';
            
            return `
                <div class="recipe-card" data-recipe-id="${item.id || ''}">
                    <div class="recipe-image-container">
                        ${item.image ? `<img src="${item.image}" alt="${item.title || item.name}" class="recipe-image" loading="lazy">` : ''}
                        ${isPurchased ? '<div class="purchased-badge">✅ Acheté</div>' : '<div class="premium-badge">🔒 Premium</div>'}
                    </div>
                    <div class="recipe-content">
                        <h4 class="recipe-title">${item.title || item.name}</h4>
                        ${item.chef ? `<p class="recipe-chef">par ${item.chef}</p>` : ''}
                        <div class="recipe-meta">
                            ${item.price ? `<span class="recipe-price">€${item.price}</span>` : ''}
                            ${item.rating ? `<div class="recipe-rating"><span>⭐ ${item.rating}</span></div>` : ''}
                        </div>
                        <div class="recipe-info">
                            ${item.time ? `<span class="recipe-time">⏱️ ${item.time}</span>` : ''}
                            ${item.serves ? `<span class="recipe-serves">👥 ${item.serves}</span>` : ''}
                            ${item.difficulty ? `<span class="difficulty-badge ${difficultyClass}">${item.difficulty}</span>` : ''}
                        </div>
                        ${item.tags ? `
                            <div class="recipe-tags">
                                ${item.tags.slice(0, 3).map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                        ${item.description ? `<p class="recipe-description">${item.description.substring(0, 100)}...</p>` : ''}
                        <div class="recipe-actions">
                            <button class="btn-primary" onclick="viewRecipeDetail(${item.id})">
                                👁️ Voir Détails
                            </button>
                            ${isPurchased 
                                ? `<button class="btn-secondary" onclick="startCooking(${item.id})">🍳 Cuisiner</button>`
                                : `<button class="btn-secondary" onclick="addToCart(${item.id})">🛒 Ajouter</button>`
                            }
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    return `<div class="content">${content}</div>`;
}

function generateTableHTML(content) {
    if (Array.isArray(content) && content.length > 0) {
        const headers = Object.keys(content[0]);
        return `
            <table class="data-table">
                <thead>
                    <tr>
                        ${headers.map(header => `<th>${header.charAt(0).toUpperCase() + header.slice(1)}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${content.map(item => `
                        <tr data-id="${item.id || ''}">
                            ${headers.map(header => `<td>${item[header] || ''}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    return `<div class="content">${content}</div>`;
}

// Enhanced notification function with more options
function showNotification(message, options = {}) {
    const {
        type = 'success', // 'success', 'error', 'warning', 'info'
        duration = 3000,
        position = 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'
        dismissible = true,
        icon = true
    } = options;

    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type} notification-${position}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    notification.innerHTML = `
        <div class="notification-content">
            ${icon ? `<span class="notification-icon">${icons[type]}</span>` : ''}
            <span class="notification-message">${message}</span>
            ${dismissible ? '<button class="notification-close">&times;</button>' : ''}
        </div>
    `;

    document.body.appendChild(notification);

    // Add show class for animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto dismiss
    if (duration > 0) {
        setTimeout(() => dismissNotification(notification), duration);
    }

    // Manual dismiss
    if (dismissible) {
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => dismissNotification(notification));
    }

    return notification;
}

function dismissNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}
