// Dashboard functionality for purchased recipes
let purchasedRecipes = JSON.parse(localStorage.getItem('purchasedRecipes')) || [];
let cart = JSON.parse(localStorage.getItem('recipeCart')) || [];

// Enhanced recipes database
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
        image: "Chocolate-Pound-Cake_1.jpg",
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
        image: "ch.webp",
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
        image: "cake_aux_fruits_rouges_et_lait_de_coco.jpg",
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
        image: "pi.jpg",
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
        image: "depositphotos_144188519-stock-photo-colorful-food-pattern.jpg",
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
        image: "ca.webp",
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
        image: "170920241726586386.jpeg",
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
        image: "ta.jpeg",
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

const $ = window.jQuery;

$(document).ready(() => {
    initializeDashboard();
    setupEventListeners();
    updateCartCount();
});

function initializeDashboard() {
    loadPurchasedRecipes();
    updateStats();
}

function setupEventListeners() {
    // Search functionality
    $("#search-input").on("input", debounce(handleSearch, 300));
    $("#search-btn").on("click", handleSearch);

    // Filter functionality
    $("#category-filter").on("change", handleFilterChange);
    $("#difficulty-filter").on("change", handleFilterChange);
    $("#sort-select").on("change", handleSortChange);

    // Modal close
    $('.modal-close').on('click', closeModal);

    // Enter key for search
    $("#search-input").on("keypress", (e) => {
        if (e.which === 13) {
            handleSearch();
        }
    });
}

function loadPurchasedRecipes() {
    const purchasedRecipesData = recipesDatabase.filter(recipe => 
        purchasedRecipes.includes(recipe.id)
    );

    if (purchasedRecipesData.length === 0) {
        $('#purchased-recipes').hide();
        $('#empty-state').show();
        $('#results-count').text('Aucune recette achetée');
        return;
    }

    $('#empty-state').hide();
    $('#purchased-recipes').show();
    displayRecipes(purchasedRecipesData, "purchased-recipes");
    updateResultsCount(purchasedRecipesData.length);
}

function displayRecipes(recipes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Use the universal display function
    displayContent(recipes, {
        container: container,
        type: 'cards',
        animation: true,
        emptyMessage: 'Aucune recette achetée pour le moment',
        className: 'dashboard-recipes',
        onComplete: () => {
            // Add event listeners to recipe cards after display
            const recipeCards = container.querySelectorAll('.card');
            recipeCards.forEach(card => {
                card.addEventListener('click', () => {
                    const recipeId = parseInt(card.dataset.id);
                    viewRecipeDetail(recipeId);
                });
            });
        }
    });
}

function createRecipeCard(recipe) {
    const difficultyClass = `difficulty-${recipe.difficulty}`;

    return $(`
        <div class="recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-image-container">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" loading="lazy">
                <div class="purchased-badge">✅ Acheté</div>
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
                    <button class="btn-secondary" onclick="startCooking(${recipe.id})">
                        🍳 Cuisiner
                    </button>
                </div>
            </div>
        </div>
    `);
}

function updateStats() {
    const purchasedRecipesData = recipesDatabase.filter(recipe => 
        purchasedRecipes.includes(recipe.id)
    );

    $('#total-recipes').text(purchasedRecipesData.length);

    if (purchasedRecipesData.length > 0) {
        const avgRating = (purchasedRecipesData.reduce((sum, recipe) => sum + recipe.rating, 0) / purchasedRecipesData.length).toFixed(1);
        $('#avg-rating').text(avgRating);

        const uniqueChefs = [...new Set(purchasedRecipesData.map(recipe => recipe.chef))];
        $('#total-chefs').text(uniqueChefs.length);

        const totalTime = purchasedRecipesData.reduce((sum, recipe) => {
            const timeMatch = recipe.time.match(/(\d+)/);
            return sum + (timeMatch ? parseInt(timeMatch[1]) : 0);
        }, 0);
        $('#total-time').text(`${totalTime}h`);
    }
}

function handleSearch() {
    const searchTerm = $("#search-input").val().trim().toLowerCase();
    const categoryFilter = $("#category-filter").val();
    const difficultyFilter = $("#difficulty-filter").val();
    const sortBy = $("#sort-select").val();

    let filteredRecipes = recipesDatabase.filter(recipe => 
        purchasedRecipes.includes(recipe.id)
    );

    // Apply search filter
    if (searchTerm) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.chef.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Apply category filter
    if (categoryFilter) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.category === categoryFilter);
    }

    // Apply difficulty filter
    if (difficultyFilter) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficultyFilter);
    }

    // Apply sorting
    filteredRecipes = sortRecipes(filteredRecipes, sortBy);

    displayRecipes(filteredRecipes, "purchased-recipes");
    updateResultsCount(filteredRecipes.length);
}

function handleFilterChange() {
    handleSearch();
}

function handleSortChange() {
    handleSearch();
}

function sortRecipes(recipes, sortBy) {
    const sorted = [...recipes];

    switch (sortBy) {
        case "rating":
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case "time":
            sorted.sort((a, b) => {
                const timeA = parseInt(a.time.match(/\d+/)[0]);
                const timeB = parseInt(b.time.match(/\d+/)[0]);
                return timeA - timeB;
            });
            break;
        case "chef":
            sorted.sort((a, b) => a.chef.localeCompare(b.chef));
            break;
        case "recent":
        default:
            // Keep original order (most recently purchased first)
            break;
    }

    return sorted;
}

function updateResultsCount(count) {
    const text = count === 0 ? "Aucune recette trouvée" : count === 1 ? "1 recette trouvée" : `${count} recettes trouvées`;
    $("#results-count").text(text);
}

function viewRecipeDetail(recipeId) {
    const recipe = recipesDatabase.find(r => r.id === recipeId);
    if (!recipe) return;

    const modalContent = `
        <div class="recipe-detail-modal">
            <div class="recipe-detail-header">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-detail-image">
                <div class="recipe-detail-info">
                    <h2>${recipe.title}</h2>
                    <p class="chef">par ${recipe.chef}</p>
                    <div class="recipe-stats">
                        <span>⏱️ ${recipe.time}</span>
                        <span>👥 ${recipe.serves}</span>
                        <span>📊 ${recipe.difficulty}</span>
                        <span>⭐ ${recipe.rating}</span>
                        <span>€${recipe.price}</span>
                    </div>
                </div>
            </div>
            <div class="recipe-detail-content">
                <div class="ingredients-section">
                    <h3>Ingrédients</h3>
                    <ul>
                        ${recipe.ingredients.map(ingredient => 
                            `<li><strong>${ingredient.name}:</strong> ${ingredient.quantity}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="instructions-section">
                    <h3>Instructions</h3>
                    <ol>
                        ${recipe.instructions.map(instruction => 
                            `<li>${instruction}</li>`
                        ).join('')}
                    </ol>
                </div>
            </div>
            <div class="recipe-detail-actions">
                <button class="btn-primary" onclick="startCooking(${recipe.id})">🍳 Commencer à Cuisiner</button>
                <button class="btn-secondary" onclick="closeModal()">Fermer</button>
            </div>
        </div>
    `;

    $('#modal-body').html(modalContent);
    $('#recipe-modal').show();
}

function startCooking(recipeId) {
    window.location.href = `recipe-detail.html?id=${recipeId}&mode=cooking`;
}

function closeModal() {
    $('.modal').hide();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').text(totalItems);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions
window.viewRecipeDetail = viewRecipeDetail;
window.startCooking = startCooking;
window.closeModal = closeModal;
