// Cart Management System
let cart = JSON.parse(localStorage.getItem('recipeCart')) || [];
let purchasedRecipes = JSON.parse(localStorage.getItem('purchasedRecipes')) || [];

const $ = window.jQuery;

// Enhanced recipes database with all images
const recipesDatabase = [
    {
        id: 1,
        title: "Cake au Chocolat",
        chef: "Chef Marco",
        price: 19.99,
        category: "dessert",
        difficulty: "facile",
        time: "45 min",
        serves: 6,
        rating: 4.8,
        description: "Un délicieux cake au chocolat fondant et moelleux, parfait pour les occasions spéciales",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
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
        ]
    },
    {
        id: 2,
        title: "Cake aux Fruits Secs",
        chef: "Chef Pierre",
        price: 24.99,
        category: "dessert",
        difficulty: "moyen",
        time: "90 min",
        serves: 8,
        rating: 4.6,
        description: "Un cake riche en fruits secs et noix, parfait pour les fêtes",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400",
        tags: ["fruits secs", "dessert", "fêtes"],
        ingredients: [
            { name: "Fruits secs mélangés", quantity: "150g" },
            { name: "Noix", quantity: "50g" },
            { name: "Rhum", quantity: "60g" },
            { name: "Beurre doux", quantity: "170g" },
            { name: "Sucre", quantity: "125g" },
            { name: "Oeufs", quantity: "3" },
            { name: "Miel", quantity: "1 c. à soupe" },
            { name: "Farine", quantity: "200g" },
            { name: "Levure chimique", quantity: "1 sachet" },
            { name: "Lait", quantity: "50g" }
        ],
        instructions: [
            "La veille, couper les fruits secs et casser les noix. Les laisser mariner dans le rhum.",
            "Battre le beurre en crème jusqu'à ce que le mélange blanchisse. Ajouter le sucre et le sel.",
            "Ajouter l'oeuf battu et mélanger, puis le miel et l'extrait de vanille.",
            "Tamiser et mélanger la farine et la levure. Ajouter le lait puis les fruits et noix.",
            "Enfourner à 180°C pendant 45 à 55 minutes."
        ]
    },
    {
        id: 3,
        title: "Cake aux Fruits Rouges",
        chef: "Chef Sophie",
        price: 22.99,
        category: "dessert",
        difficulty: "facile",
        time: "50 min",
        serves: 6,
        rating: 4.7,
        description: "Un cake léger et fruité aux fruits rouges de saison",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
        tags: ["fruits rouges", "dessert", "léger"],
        ingredients: [
            { name: "Farine", quantity: "200g" },
            { name: "Levure chimique", quantity: "1 sachet" },
            { name: "Sucre vanillé", quantity: "1 sachet" },
            { name: "Oeufs", quantity: "3" },
            { name: "Huile de tournesol", quantity: "2 c. à soupe" },
            { name: "Fruits rouges mélangés", quantity: "250g" },
            { name: "Sucre semoule", quantity: "120g" },
            { name: "Yaourt nature", quantity: "1" }
        ],
        instructions: [
            "Préchauffer le four à 180°C. Rouler les fruits rouges dans un peu de farine.",
            "Fouetter les oeufs avec le sucre pour obtenir un mélange mousseux.",
            "Ajouter petit à petit la farine et la levure. Incorporer le yaourt et l'huile.",
            "Ajouter délicatement les fruits rouges sans trop mélanger.",
            "Faire cuire environ 35 minutes à four moyen."
        ]
    },
    {
        id: 4,
        title: "Risotto aux Truffes",
        chef: "Chef Marco",
        price: 34.99,
        category: "plat-principal",
        difficulty: "expert",
        time: "45 min",
        serves: 4,
        rating: 4.9,
        description: "Un risotto crémeux aux truffes noires, un plat d'exception",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
        tags: ["risotto", "truffes", "luxe", "italien"],
        ingredients: [
            { name: "Riz Arborio", quantity: "300g" },
            { name: "Truffes noires", quantity: "50g" },
            { name: "Bouillon de volaille", quantity: "1L" },
            { name: "Vin blanc sec", quantity: "150ml" },
            { name: "Parmesan râpé", quantity: "100g" },
            { name: "Beurre", quantity: "80g" },
            { name: "Échalotes", quantity: "2" },
            { name: "Huile de truffe", quantity: "2 c. à soupe" }
        ],
        instructions: [
            "Faire chauffer le bouillon et le maintenir au chaud.",
            "Faire revenir les échalotes hachées dans le beurre.",
            "Ajouter le riz et nacrer pendant 2 minutes.",
            "Verser le vin blanc et laisser évaporer.",
            "Ajouter le bouillon louche par louche en remuant constamment.",
            "Incorporer les truffes râpées et le parmesan en fin de cuisson."
        ]
    },
    {
        id: 5,
        title: "Ramen Authentique",
        chef: "Chef Yuki",
        price: 28.99,
        category: "plat-principal",
        difficulty: "difficile",
        time: "4 heures",
        serves: 2,
        rating: 4.8,
        description: "Un ramen traditionnel japonais avec bouillon tonkotsu",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
        tags: ["ramen", "japonais", "authentique", "bouillon"],
        ingredients: [
            { name: "Os de porc", quantity: "1kg" },
            { name: "Nouilles ramen", quantity: "200g" },
            { name: "Porc chashu", quantity: "200g" },
            { name: "Oeufs marinés", quantity: "2" },
            { name: "Pousses de bambou", quantity: "100g" },
            { name: "Algues nori", quantity: "2 feuilles" },
            { name: "Oignons verts", quantity: "2" },
            { name: "Miso blanc", quantity: "2 c. à soupe" }
        ],
        instructions: [
            "Faire bouillir les os de porc pendant 3-4 heures pour le bouillon.",
            "Préparer le porc chashu en le faisant braiser lentement.",
            "Cuire les nouilles ramen selon les instructions.",
            "Assembler le bol avec le bouillon, les nouilles et les garnitures.",
            "Servir immédiatement bien chaud."
        ]
    },
    {
        id: 6,
        title: "Tarte Tatin Premium",
        chef: "Chef Antoine",
        price: 26.99,
        category: "dessert",
        difficulty: "moyen",
        time: "75 min",
        serves: 8,
        rating: 4.5,
        description: "La célèbre tarte tatin revisitée avec des pommes premium",
        image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?w=400",
        tags: ["tarte", "pommes", "français", "classique"],
        ingredients: [
            { name: "Pommes Golden", quantity: "1kg" },
            { name: "Beurre doux", quantity: "100g" },
            { name: "Sucre", quantity: "150g" },
            { name: "Pâte feuilletée", quantity: "1" },
            { name: "Vanille", quantity: "1 gousse" },
            { name: "Sel", quantity: "1 pincée" }
        ],
        instructions: [
            "Préchauffer le four à 200°C.",
            "Faire fondre le beurre avec le sucre dans une poêle.",
            "Disposer les pommes épluchées et coupées en quartiers.",
            "Recouvrir avec la pâte feuilletée et faire cuire 30 minutes.",
            "Retourner la tarte et faire cuire encore 15 minutes."
        ]
    },
    {
        id: 7,
        title: "Bouillabaisse Marseillaise",
        chef: "Chef Marie",
        price: 39.99,
        category: "plat-principal",
        difficulty: "expert",
        time: "2 heures",
        serves: 6,
        rating: 4.7,
        description: "La célèbre soupe de poissons marseillaise",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
        tags: ["poisson", "marseille", "soupe", "méditerranéen"],
        ingredients: [
            { name: "Poissons variés", quantity: "1.5kg" },
            { name: "Crevettes", quantity: "500g" },
            { name: "Safran", quantity: "1 pincée" },
            { name: "Fenouil", quantity: "2" },
            { name: "Tomates", quantity: "500g" },
            { name: "Gousses d'ail", quantity: "4" },
            { name: "Huile d'olive", quantity: "4 c. à soupe" },
            { name: "Pastis", quantity: "2 c. à soupe" }
        ],
        instructions: [
            "Faire revenir l'ail et le fenouil dans l'huile d'olive.",
            "Ajouter les tomates et le safran.",
            "Verser le pastis et laisser flamber.",
            "Ajouter les poissons et faire mijoter 20 minutes.",
            "Ajouter les crevettes en fin de cuisson."
        ]
    },
    {
        id: 8,
        title: "Croissants Maison",
        chef: "Chef Pierre",
        price: 18.99,
        category: "boulangerie",
        difficulty: "difficile",
        time: "8 heures",
        serves: 12,
        rating: 4.9,
        description: "Des croissants authentiques faits maison",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
        tags: ["viennoiserie", "beurre", "français", "boulangerie"],
        ingredients: [
            { name: "Farine T55", quantity: "500g" },
            { name: "Beurre", quantity: "300g" },
            { name: "Levure fraîche", quantity: "15g" },
            { name: "Lait", quantity: "250ml" },
            { name: "Sucre", quantity: "50g" },
            { name: "Sel", quantity: "10g" },
            { name: "Oeuf", quantity: "1" }
        ],
        instructions: [
            "Préparer la pâte avec la farine, levure, lait, sucre et sel.",
            "Laisser reposer 1 heure au réfrigérateur.",
            "Incorporer le beurre en pliant la pâte plusieurs fois.",
            "Former les croissants et laisser lever 2 heures.",
            "Cuire à 200°C pendant 15-20 minutes."
        ]
    }
];

$(document).ready(() => {
    initializeCart();
    setupEventListeners();
});

function initializeCart() {
    updateCartDisplay();
    updateCartCount();
    calculateTotals();
}

function setupEventListeners() {
    // Checkout button
    $('#checkout-btn').on('click', openPaymentModal);
    
    // Payment form submission
    $('#payment-form').on('submit', handlePayment);
    
    // Modal close
    $('.modal-close').on('click', closeModal);
    
    // Card number formatting
    $('#card-number').on('input', formatCardNumber);
    $('#card-expiry').on('input', formatExpiry);
    $('#card-cvv').on('input', formatCVV);
}

function updateCartDisplay() {
    const container = document.getElementById('cart-items-list');
    if (!container) return;
    
    if (cart.length === 0) {
        // Use the universal display function for empty state
        displayContent([], {
            container: container,
            type: 'list',
            animation: true,
            emptyMessage: 'Ajoutez des recettes délicieuses pour commencer',
            className: 'cart-empty',
            onComplete: () => {
                // Add button to explore recipes
                const emptyState = container.querySelector('.empty-state');
                if (emptyState) {
                    const exploreBtn = document.createElement('a');
                    exploreBtn.href = 'marketplace.html';
                    exploreBtn.className = 'btn-primary';
                    exploreBtn.textContent = 'Explorer les Recettes';
                    emptyState.appendChild(exploreBtn);
                }
            }
        });
        return;
    }
    
    // Prepare cart items data for display
    const cartItemsData = cart.map(item => {
        const recipe = recipesDatabase.find(r => r.id === item.recipeId);
        if (recipe) {
            return {
                id: recipe.id,
                title: recipe.title,
                name: recipe.title, // For compatibility with display function
                description: `par ${recipe.chef} • ⏱️ ${recipe.time} • 📊 ${recipe.difficulty} • ⭐ ${recipe.rating}`,
                price: (recipe.price * item.quantity).toFixed(2),
                image: recipe.image,
                quantity: item.quantity,
                unitPrice: recipe.price
            };
        }
        return null;
    }).filter(item => item !== null);
    
    // Use the universal display function
    displayContent(cartItemsData, {
        container: container,
        type: 'list',
        animation: true,
        emptyMessage: 'Aucun article dans le panier',
        className: 'cart-items',
        onComplete: () => {
            // Add event listeners to cart items
            const cartItems = container.querySelectorAll('.list-item');
            cartItems.forEach(item => {
                const recipeId = parseInt(item.dataset.id);
                
                // Add quantity controls
                const quantityControls = document.createElement('div');
                quantityControls.className = 'cart-item-quantity';
                quantityControls.innerHTML = `
                    <button class="quantity-btn" onclick="updateQuantity(${recipeId}, -1)">-</button>
                    <span class="quantity-value">${cart.find(item => item.recipeId === recipeId)?.quantity || 1}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${recipeId}, 1)">+</button>
                `;
                
                // Add remove button
                const removeBtn = document.createElement('button');
                removeBtn.className = 'btn-remove';
                removeBtn.innerHTML = '🗑️';
                removeBtn.onclick = () => removeFromCart(recipeId);
                
                // Add price display
                const priceDisplay = document.createElement('div');
                priceDisplay.className = 'cart-item-price';
                const cartItem = cart.find(item => item.recipeId === recipeId);
                const recipe = recipesDatabase.find(r => r.id === recipeId);
                if (cartItem && recipe) {
                    priceDisplay.innerHTML = `
                        <span class="price-per-unit">€${recipe.price}</span>
                        <span class="price-total">€${(recipe.price * cartItem.quantity).toFixed(2)}</span>
                    `;
                }
                
                // Append controls to item
                item.appendChild(quantityControls);
                item.appendChild(priceDisplay);
                item.appendChild(removeBtn);
            });
        }
    });
}

function updateQuantity(recipeId, change) {
    const itemIndex = cart.findIndex(item => item.recipeId === recipeId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            removeFromCart(recipeId);
        } else {
            updateCartDisplay();
            calculateTotals();
            saveCart();
        }
    }
}

function removeFromCart(recipeId) {
    cart = cart.filter(item => item.recipeId !== recipeId);
    updateCartDisplay();
    updateCartCount();
    calculateTotals();
    saveCart();
    showNotification('Recette retirée du panier', 'success');
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => {
        const recipe = recipesDatabase.find(r => r.id === item.recipeId);
        return sum + (recipe ? recipe.price * item.quantity : 0);
    }, 0);
    
    const tax = subtotal * 0.20; // 20% TVA
    const total = subtotal + tax;
    
    $('#subtotal').text(`€${subtotal.toFixed(2)}`);
    $('#tax').text(`€${tax.toFixed(2)}`);
    $('#total').text(`€${total.toFixed(2)}`);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').text(totalItems);
    localStorage.setItem('cartCount', totalItems);
}

function saveCart() {
    localStorage.setItem('recipeCart', JSON.stringify(cart));
}

function openPaymentModal() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide', 'error');
        return;
    }
    $('#payment-modal').show();
}

function handlePayment(e) {
    e.preventDefault();
    
    // Simulate payment processing
    showNotification('Traitement du paiement...', 'info');
    
    setTimeout(() => {
        // Add recipes to purchased list
        cart.forEach(item => {
            if (!purchasedRecipes.includes(item.recipeId)) {
                purchasedRecipes.push(item.recipeId);
            }
        });
        
        // Save purchased recipes
        localStorage.setItem('purchasedRecipes', JSON.stringify(purchasedRecipes));
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCount();
        calculateTotals();
        
        closeModal();
        showNotification('Paiement réussi ! Vos recettes sont maintenant disponibles', 'success');
        
        // Redirect to purchased recipes
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }, 3000);
}

function closeModal() {
    $('.modal').hide();
}

// Card formatting functions
function formatCardNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value.substring(0, 19);
}

function formatExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value.substring(0, 5);
}

function formatCVV(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value.substring(0, 3);
}

function showNotification(message, type = 'success') {
    const notification = $(`
        <div class="notification ${type}" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        ">
            ${message}
        </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(() => {
        notification.css('transform', 'translateX(0)');
    }, 100);
    
    setTimeout(() => {
        notification.css('transform', 'translateX(100%)');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Global functions for other pages
function addToCart(recipeId) {
    const existingItem = cart.find(item => item.recipeId === recipeId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ recipeId, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Recette ajoutée au panier', 'success');
}

function isRecipePurchased(recipeId) {
    return purchasedRecipes.includes(recipeId);
}

// Export functions for other pages
window.addToCart = addToCart;
window.isRecipePurchased = isRecipePurchased;
window.recipesDatabase = recipesDatabase;
