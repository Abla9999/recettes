// Enhanced recipes display functionality with comprehensive database
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
        image: "images/Chocolate-Pound-Cake_1.jpg",
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
        title: "Charlotte aux Fruits",
        chef: "Chef Pierre",
        price: 24.99,
        category: "dessert",
        difficulty: "moyen",
        time: "90 min",
        serves: 8,
        rating: 4.6,
        description: "Une charlotte élégante aux fruits frais, parfaite pour les fêtes",
        image: "images/charlotte_2.jpg",
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
        image: "images/cake_aux_fruits_rouges_et_lait_de_coco.jpg",
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
        ]
    },
    {
        id: 4,
        title: "Pizza Pepperoni",
        chef: "Chef Marco",
        price: 34.99,
        category: "plat-principal",
        difficulty: "moyen",
        time: "45 min",
        serves: 4,
        rating: 4.9,
        description: "Une pizza authentique aux saveurs italiennes",
        image: "images/pizza_pepperoni.jpg",
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
        ]
    },
    {
        id: 5,
        title: "Salade Colorée",
        chef: "Chef Yuki",
        price: 18.99,
        category: "entrée",
        difficulty: "facile",
        time: "15 min",
        serves: 2,
        rating: 4.5,
        description: "Une salade fraîche et colorée aux saveurs méditerranéennes",
        image: "images/depositphotos_144188519-stock-photo-colorful-food-pattern.jpg",
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
        ]
    },
    {
        id: 6,
        title: "Pasta Carbonara",
        chef: "Chef Antoine",
        price: 26.99,
        category: "plat-principal",
        difficulty: "moyen",
        time: "25 min",
        serves: 4,
        rating: 4.6,
        description: "Des pâtes crémeuses à la carbonara traditionnelle",
        image: "images/Fotolia_50412971_S-849x516.jpg",
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
        ]
    },
    {
        id: 7,
        title: "Smoothie Bowl",
        chef: "Chef Marie",
        price: 16.99,
        category: "petit-déjeuner",
        difficulty: "facile",
        time: "10 min",
        serves: 1,
        rating: 4.4,
        description: "Un smoothie bowl healthy et coloré pour bien commencer la journée",
        image: "images/170920241726586386.jpeg",
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
        ]
    },
    {
        id: 8,
        title: "Tarte aux Pommes",
        chef: "Chef Pierre",
        price: 28.99,
        category: "dessert",
        difficulty: "moyen",
        time: "60 min",
        serves: 8,
        rating: 4.8,
        description: "Une tarte aux pommes traditionnelle et délicieuse",
        image: "images/images (1).jpeg",
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
        ]
    }
];

// Cart and purchase management
let cart = JSON.parse(localStorage.getItem('recipeCart')) || [];
let purchasedRecipes = JSON.parse(localStorage.getItem('purchasedRecipes')) || [];

$(document).ready(() => {
    displayFeaturedRecipes();
    updateCartCount();
});

function displayFeaturedRecipes() {
    const featuredRecipes = recipesDatabase.slice(0, 6);
    displayRecipes(featuredRecipes, "featured-recipes");
}

function displayRecipes(recipes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Use the universal display function
    displayContent(recipes, {
        container: container,
        type: 'cards',
        animation: true,
        emptyMessage: 'Aucune recette trouvée. Essayez de modifier vos critères de recherche.',
        className: 'recipes-page',
        onComplete: () => {
            // Add event listeners to recipe cards after display
            const recipeCards = container.querySelectorAll('.card');
            recipeCards.forEach(card => {
                const recipeId = parseInt(card.dataset.id);
                
                // Add click event for viewing details
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.recipe-actions')) {
                        viewRecipeDetail(recipeId);
                    }
                });
                
                // Add event listeners for action buttons
                const viewBtn = card.querySelector('.btn-primary');
                const actionBtn = card.querySelector('.btn-secondary');
                
                if (viewBtn) {
                    viewBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        viewRecipeDetail(recipeId);
                    });
                }
                
                if (actionBtn) {
                    actionBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isPurchased = isRecipePurchased(recipeId);
                        if (isPurchased) {
                            startCooking(recipeId);
                        } else {
                            addToCart(recipeId);
                        }
                    });
                }
            });
        }
    });
}

function createRecipeCard(recipe) {
    const isPurchased = isRecipePurchased(recipe.id);
    const difficultyClass = `difficulty-${recipe.difficulty}`;

    return $(`
        <div class="recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-image-container">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" loading="lazy">
                ${isPurchased ? '<div class="purchased-badge">✅ Acheté</div>' : '<div class="premium-badge">🔒 Premium</div>'}
            </div>
            <div class="recipe-content">
                <h4 class="recipe-title">${recipe.title}</h4>
                <p class="recipe-chef">par ${recipe.chef}</p>
                <div class="recipe-meta">
                    <span class="recipe-price">€${recipe.price}</span>
                    <div class="recipe-rating">
                        <span>⭐ ${recipe.rating}</span>
                    </div>
                </div>
                <div class="recipe-info">
                    <span class="recipe-time">⏱️ ${recipe.time}</span>
                    <span class="recipe-serves">👥 ${recipe.serves}</span>
                    <span class="difficulty-badge ${difficultyClass}">${recipe.difficulty}</span>
                </div>
                <div class="recipe-tags">
                    ${recipe.tags
                      .slice(0, 3)
                      .map((tag) => `<span class="recipe-tag">${tag}</span>`)
                      .join("")}
                </div>
                <p class="recipe-description">${recipe.description.substring(0, 100)}...</p>
                <div class="recipe-actions">
                    <button class="btn-primary" onclick="viewRecipeDetail(${recipe.id})">
                        👁️ Voir Détails
                    </button>
                    ${
                      isPurchased
                        ? `<button class="btn-secondary" onclick="startCooking(${recipe.id})">🍳 Cuisiner</button>`
                        : `<button class="btn-secondary" onclick="addToCart(${recipe.id})">🛒 Ajouter</button>`
                    }
                </div>
            </div>
        </div>
    `);
}

function viewRecipeDetail(recipeId) {
    window.location.href = `recipe-detail.html?id=${recipeId}`;
}

function startCooking(recipeId) {
    window.location.href = `recipe-detail.html?id=${recipeId}&mode=cooking`;
}

function addToCart(recipeId) {
    const existingItem = cart.find(item => item.recipeId === recipeId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ recipeId, quantity: 1 });
    }
    
    localStorage.setItem('recipeCart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Recette ajoutée au panier', 'success');
}

function isRecipePurchased(recipeId) {
    return purchasedRecipes.includes(recipeId);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').text(totalItems);
    localStorage.setItem('cartCount', totalItems);
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
    setTimeout(() => notification.css('transform', 'translateX(0)'), 100);
    setTimeout(() => {
        notification.css('transform', 'translateX(100%)');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function searchRecipes(query, recipes = recipesDatabase) {
    if (!query) return recipes;

    const searchTerm = query.toLowerCase();
    return recipes.filter(
        (recipe) =>
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.chef.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
            recipe.category.toLowerCase().includes(searchTerm),
    );
}

function filterRecipes(filters, recipes = recipesDatabase) {
    return recipes.filter((recipe) => {
        const matchesCategory = !filters.category || recipe.category === filters.category;
        const matchesDifficulty = !filters.difficulty || recipe.difficulty === filters.difficulty;

        let matchesPrice = true;
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split("-").map((p) => Number.parseFloat(p));
            if (max) {
                matchesPrice = recipe.price >= min && recipe.price <= max;
            } else {
                matchesPrice = recipe.price >= min;
            }
        }

        return matchesCategory && matchesDifficulty && matchesPrice;
    });
}

// Export for other pages
window.recipesDatabase = recipesDatabase;
window.addToCart = addToCart;
window.isRecipePurchased = isRecipePurchased;

// Add enhanced styles for recipe cards
$("<style>")
  .text(`
    .recipe-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .recipe-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .recipe-image-container {
        position: relative;
        overflow: hidden;
    }
    
    .recipe-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .recipe-card:hover .recipe-image {
        transform: scale(1.05);
    }
    
    .purchased-badge, .premium-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .purchased-badge {
        background: linear-gradient(135deg, #27ae60, #2ecc71);
    }
    
    .premium-badge {
        background: linear-gradient(135deg, #f39c12, #e67e22);
    }
    
    .recipe-content {
        padding: 2rem;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    
    .recipe-title {
        font-size: 1.4rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 0.5rem;
        line-height: 1.2;
    }
    
    .recipe-chef {
        color: #7f8c8d;
        font-size: 0.95rem;
        margin-bottom: 1rem;
        font-style: italic;
    }
    
    .recipe-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .recipe-price {
        font-size: 1.5rem;
        font-weight: 700;
        color: #27ae60;
    }
    
    .recipe-rating {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        color: #f39c12;
        font-weight: 600;
    }
    
    .recipe-info {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        flex-wrap: wrap;
    }
    
    .recipe-time, .recipe-serves {
        color: #64748b;
        font-weight: 500;
    }
    
    .recipe-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .recipe-tag {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .recipe-description {
        color: #64748b;
        line-height: 1.5;
        margin-bottom: 1.5rem;
        flex: 1;
    }
    
    .recipe-actions {
        display: flex;
        gap: 1rem;
        margin-top: auto;
    }
    
    .recipe-actions .btn-primary,
    .recipe-actions .btn-secondary {
        flex: 1;
        padding: 0.8rem 1rem;
        font-size: 0.9rem;
        text-align: center;
        border-radius: 15px;
    }
    
    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        color: #64748b;
    }
    
    .empty-state h3 {
        font-size: 1.5rem;
        color: #2c3e50;
        margin-bottom: 1rem;
    }
    
    @media (max-width: 768px) {
        .recipe-actions {
            flex-direction: column;
        }
        
        .recipe-info {
            justify-content: center;
        }
        
        .recipe-meta {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
        }
    }
`)
  .appendTo("head")
