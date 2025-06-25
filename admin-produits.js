// Admin Products/Recipes Management
let currentPage = 1;
const itemsPerPage = 12;
let filteredRecipes = [];
let allRecipes = [];
let currentEditingId = null;

const $ = window.jQuery; // Declare the $ variable

// Enhanced recipe data with more recipes from your files
const recipesData = [
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
        sales: 45,
        revenue: 899.55,
        description: "Un délicieux cake au chocolat fondant et moelleux",
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
        ],
        dateCreated: "2024-01-15",
        status: "published"
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
        sales: 32,
        revenue: 799.68,
        description: "Un cake riche en fruits secs et noix, parfait pour les fêtes",
        image: "https://fac.img.pmdstatic.net/fit/~1~fac~2018~07~30~1cb86e18-c9ca-400f-95a4-25b6fa454003.jpeg/750x562/quality/80/crop-from/center/cr/wqkgS2V0dGVuaG9mZW4vU3VjcsOpIFNhbMOpIC8gRmVtbWUgQWN0dWVsbGU%3D/cake-aux-fruits-secs-et-aux-agrumes.jpeg",
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
        ],
        dateCreated: "2024-01-20",
        status: "published"
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
        sales: 28,
        revenue: 643.72,
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
        ],
        dateCreated: "2024-02-01",
        status: "published"
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
        sales: 67,
        revenue: 2344.33,
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
        ],
        dateCreated: "2024-01-10",
        status: "published"
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
        sales: 43,
        revenue: 1246.57,
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
        ],
        dateCreated: "2024-01-25",
        status: "published"
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
        sales: 35,
        revenue: 944.65,
        description: "La célèbre tarte tatin revisitée avec des pommes premium",
        image: "https://www.academiedugout.fr/images/32253/948-580/8147-tarte-tatin-dananas.jpg?poix=50&poiy=50",
        tags: ["tarte", "pommes", "français", "classique"],
        ingredients: [
            { name: "Pommes Reinette", quantity: "8" },
            { name: "Pâte brisée", quantity: "1" },
            { name: "Sucre", quantity: "150g" },
            { name: "Beurre", quantity: "50g" },
            { name: "Cannelle", quantity: "1 c. à café" },
            { name: "Vanille", quantity: "1 gousse" }
        ],
        instructions: [
            "Éplucher et couper les pommes en quartiers.",
            "Faire un caramel avec le sucre dans un moule à tarte tatin.",
            "Disposer les pommes sur le caramel.",
            "Recouvrir de pâte brisée en rentrant les bords.",
            "Cuire 45 minutes à 180°C puis retourner délicatement."
        ],
        dateCreated: "2024-02-05",
        status: "published"
    }
];

$(document).ready(() => {
    initializeProductsPage();
    setupEventListeners();
});

function initializeProductsPage() {
    allRecipes = [...recipesData];
    filteredRecipes = [...allRecipes];
    
    updateStats();
    displayRecipes();
    setupPagination();
    loadChefOptions();
}

function setupEventListeners() {
    // Search functionality
    $('#recipe-search').on('input', debounce(handleSearch, 300));
    
    // Filter functionality
    $('#category-filter, #difficulty-filter, #chef-filter').on('change', handleFilters);
    
    // Form tabs
    $('.tab-btn').on('click', function() {
        const tabId = $(this).data('tab');
        switchTab(tabId);
    });
    
    // Modal close
    $('.modal-close').on('click', closeModal);
    
    // Form submission
    $('#recipe-form').on('submit', handleRecipeSubmit);
    
    // Image preview
    $('#recipe-image').on('input', updateImagePreview);
}

function updateStats() {
    const totalRecipes = allRecipes.length;
    const popularRecipes = allRecipes.filter(r => r.sales > 30).length;
    const totalRevenue = allRecipes.reduce((sum, r) => sum + r.revenue, 0);
    const avgRating = allRecipes.reduce((sum, r) => sum + r.rating, 0) / totalRecipes;
    
    $('#total-recipes').text(totalRecipes);
    $('#popular-recipes').text(popularRecipes);
    $('#total-revenue').text(totalRevenue.toFixed(2) + '€');
    $('#avg-rating').text(avgRating.toFixed(1));
}

function loadChefOptions() {
    const chefs = [...new Set(allRecipes.map(r => r.chef))];
    const chefFilter = $('#chef-filter');
    
    chefs.forEach(chef => {
        chefFilter.append(`<option value="${chef}">${chef}</option>`);
    });
}

function handleSearch() {
    const searchTerm = $('#recipe-search').val().toLowerCase();
    applyFilters(searchTerm);
}

function handleFilters() {
    const searchTerm = $('#recipe-search').val().toLowerCase();
    applyFilters(searchTerm);
}

function applyFilters(searchTerm = '') {
    const categoryFilter = $('#category-filter').val();
    const difficultyFilter = $('#difficulty-filter').val();
    const chefFilter = $('#chef-filter').val();
    
    filteredRecipes = allRecipes.filter(recipe => {
        const matchesSearch = !searchTerm || 
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.chef.toLowerCase().includes(searchTerm) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !categoryFilter || recipe.category === categoryFilter;
        const matchesDifficulty = !difficultyFilter || recipe.difficulty === difficultyFilter;
        const matchesChef = !chefFilter || recipe.chef === chefFilter;
        
        return matchesSearch && matchesCategory && matchesDifficulty && matchesChef;
    });
    
    currentPage = 1;
    displayRecipes();
    setupPagination();
}

function displayRecipes() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const recipesToShow = filteredRecipes.slice(startIndex, endIndex);
    
    const container = $('#recipes-grid');
    container.empty();
    
    if (recipesToShow.length === 0) {
        container.html(`
            <div class="empty-state">
                <h3>Aucune recette trouvée</h3>
                <p>Essayez de modifier vos critères de recherche</p>
            </div>
        `);
        return;
    }
    
    recipesToShow.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        container.append(recipeCard);
    });
}

function createRecipeCard(recipe) {
    const difficultyClass = `difficulty-${recipe.difficulty}`;
    const statusClass = `status-${recipe.status}`;
    
    return $(`
        <div class="admin-recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-image-container">
                <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
                <div class="recipe-overlay">
                    <div class="recipe-actions">
                        <button class="btn-action btn-view" onclick="viewRecipe(${recipe.id})" title="Voir détails">
                            👁️
                        </button>
                        <button class="btn-action btn-edit" onclick="editRecipe(${recipe.id})" title="Modifier">
                            ✏️
                        </button>
                        <button class="btn-action btn-delete" onclick="deleteRecipe(${recipe.id})" title="Supprimer">
                            🗑️
                        </button>
                    </div>
                </div>
                <span class="status-badge ${statusClass}">${recipe.status}</span>
            </div>
            <div class="admin-recipe-card-content">
                <h4>${recipe.title}</h4>
                <div class="chef">Par ${recipe.chef}</div>
                <div class="admin-recipe-meta">
                    <span class="price">€${recipe.price}</span>
                    <span class="difficulty ${difficultyClass}">${recipe.difficulty}</span>
                </div>
                <div class="admin-recipe-stats">
                    <div class="stat-item">
                        <span>⭐ ${recipe.rating}</span>
                    </div>
                    <div class="stat-item">
                        <span>🛒 ${recipe.sales}</span>
                    </div>
                    <div class="stat-item">
                        <span>💰 €${recipe.revenue.toFixed(0)}</span>
                    </div>
                    <div class="stat-item">
                        <span>⏱️ ${recipe.time}</span>
                    </div>
                </div>
                <div class="recipe-tags">
                    ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `);
}

function setupPagination() {
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
    const pageNumbers = $('#page-numbers');
    pageNumbers.empty();
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = $(`
            <button class="page-number ${i === currentPage ? 'active' : ''}" 
                    onclick="goToPage(${i})">${i}</button>
        `);
        pageNumbers.append(pageBtn);
    }
    
    // Update navigation buttons
    $('.page-btn').first().prop('disabled', currentPage === 1);
    $('.page-btn').last().prop('disabled', currentPage === totalPages);
}

function goToPage(page) {
    currentPage = page;
    displayRecipes();
    setupPagination();
}

function previousPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function openAddRecipeModal() {
    $('#modal-title').text('Ajouter une Recette');
    $('#recipe-form')[0].reset();
    currentEditingId = null;
    switchTab('basic');
    clearDynamicFields();
    $('#recipe-modal').fadeIn();
}

function editRecipe(recipeId) {
    const recipe = allRecipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    currentEditingId = recipeId;
    $('#modal-title').text('Modifier la Recette');
    
    // Fill basic info
    $('#recipe-title').val(recipe.title);
    $('#recipe-chef').val(recipe.chef);
    $('#recipe-price').val(recipe.price);
    $('#recipe-category').val(recipe.category);
    $('#recipe-difficulty').val(recipe.difficulty);
    $('#recipe-time').val(recipe.time);
    $('#recipe-serves').val(recipe.serves);
    $('#recipe-rating').val(recipe.rating);
    $('#recipe-description').val(recipe.description);
    $('#recipe-tags').val(recipe.tags.join(', '));
    $('#recipe-image').val(recipe.image);
    
    // Fill ingredients
    clearDynamicFields();
    recipe.ingredients.forEach(ingredient => {
        addIngredient(ingredient.name, ingredient.quantity);
    });
    
    // Fill instructions
    recipe.instructions.forEach((instruction, index) => {
        addInstruction(instruction, index + 1);
    });
    
    updateImagePreview();
    switchTab('basic');
    $('#recipe-modal').fadeIn();
}

function viewRecipe(recipeId) {
    const recipe = allRecipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    // Create a detailed view modal (you can implement this)
    alert(`Viewing recipe: ${recipe.title}\nBy: ${recipe.chef}\nPrice: €${recipe.price}`);
}

function deleteRecipe(recipeId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette?')) {
        allRecipes = allRecipes.filter(r => r.id !== recipeId);
        applyFilters();
        updateStats();
        showNotification('Recette supprimée avec succès!', 'success');
    }
}

function switchTab(tabId) {
    $('.tab-btn').removeClass('active');
    $('.tab-content').removeClass('active');
    
    $(`.tab-btn[data-tab="${tabId}"]`).addClass('active');
    $(`#${tabId}-tab`).addClass('active');
}

function addIngredient(name = '', quantity = '') {
    const ingredientItem = $(`
        <div class="ingredient-item">
            <input type="text" placeholder="Nom de l'ingrédient" value="${name}" class="ingredient-name">
            <input type="text" placeholder="Quantité" value="${quantity}" class="ingredient-quantity">
            <button type="button" class="remove-btn" onclick="$(this).parent().remove()">🗑️</button>
        </div>
    `);
    
    $('#ingredients-list').append(ingredientItem);
}

function addInstruction(text = '', step = null) {
    const stepNumber = step || $('#instructions-list .instruction-item').length + 1;
    
    const instructionItem = $(`
        <div class="instruction-item">
            <span class="step-number">${stepNumber}.</span>
            <textarea placeholder="Décrivez cette étape..." class="instruction-text" rows="2">${text}</textarea>
            <button type="button" class="remove-btn" onclick="$(this).parent().remove(); renumberInstructions()">🗑️</button>
        </div>
    `);
    
    $('#instructions-list').append(instructionItem);
}

function renumberInstructions() {
    $('#instructions-list .instruction-item').each(function(index) {
        $(this).find('.step-number').text(`${index + 1}.`);
    });
}

function addImageField() {
    const imageField = $(`
        <div class="image-field">
            <input type="url" placeholder="URL de l'image supplémentaire" class="additional-image">
            <button type="button" class="remove-btn" onclick="$(this).parent().remove()">🗑️</button>
        </div>
    `);
    
    $('#additional-images').append(imageField);
}

function updateImagePreview() {
    const imageUrl = $('#recipe-image').val();
    const preview = $('#image-preview');
    
    if (imageUrl) {
        preview.css('background-image', `url(${imageUrl})`);
        preview.addClass('has-image');
        preview.text('');
    } else {
        preview.css('background-image', 'none');
        preview.removeClass('has-image');
        preview.text('Aperçu de l\'image');
    }
}

function clearDynamicFields() {
    $('#ingredients-list').empty();
    $('#instructions-list').empty();
    $('#additional-images').find('.image-field').remove();
}

function handleRecipeSubmit(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        title: $('#recipe-title').val().trim(),
        chef: $('#recipe-chef').val().trim(),
        price: parseFloat($('#recipe-price').val()),
        category: $('#recipe-category').val(),
        difficulty: $('#recipe-difficulty').val(),
        time: $('#recipe-time').val().trim(),
        serves: parseInt($('#recipe-serves').val()),
        rating: parseFloat($('#recipe-rating').val()) || 0,
        description: $('#recipe-description').val().trim(),
        tags: $('#recipe-tags').val().split(',').map(tag => tag.trim()).filter(tag => tag),
        image: $('#recipe-image').val().trim(),
        ingredients: [],
        instructions: []
    };
    
    // Collect ingredients
    $('#ingredients-list .ingredient-item').each(function() {
        const name = $(this).find('.ingredient-name').val().trim();
        const quantity = $(this).find('.ingredient-quantity').val().trim();
        if (name && quantity) {
            formData.ingredients.push({ name, quantity });
        }
    });
    
    // Collect instructions
    $('#instructions-list .instruction-item').each(function() {
        const text = $(this).find('.instruction-text').val().trim();
        if (text) {
            formData.instructions.push(text);
        }
    });
    
    // Validate form
    if (!validateRecipeForm(formData)) {
        return;
    }
    
    if (currentEditingId) {
        updateRecipe(currentEditingId, formData);
    } else {
        addNewRecipe(formData);
    }
}

function validateRecipeForm(data) {
    if (!data.title || !data.chef || !data.price || !data.category || !data.difficulty) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return false;
    }
    
    if (data.ingredients.length === 0) {
        showNotification('Veuillez ajouter au moins un ingrédient', 'error');
        return false;
    }
    
    if (data.instructions.length === 0) {
        showNotification('Veuillez ajouter au moins une instruction', 'error');
        return false;
    }
    
    return true;
}

function addNewRecipe(formData) {
    const newRecipe = {
        id: Math.max(...allRecipes.map(r => r.id)) + 1,
        ...formData,
        sales: 0,
        revenue: 0,
        dateCreated: new Date().toISOString().split('T')[0],
        status: 'published'
    };
    
    allRecipes.push(newRecipe);
    applyFilters();
    updateStats();
    closeModal();
    
    showNotification('Recette ajoutée avec succès!', 'success');
}

function updateRecipe(recipeId, formData) {
    const recipeIndex = allRecipes.findIndex(r => r.id === recipeId);
    if (recipeIndex !== -1) {
        allRecipes[recipeIndex] = { ...allRecipes[recipeIndex], ...formData };
        applyFilters();
        updateStats();
        closeModal();
        
        showNotification('Recette modifiée avec succès!', 'success');
    }
}

function clearFilters() {
    $('#recipe-search').val('');
    $('#category-filter').val('');
    $('#difficulty-filter').val('');
    $('#chef-filter').val('');
    applyFilters();
}

function importRecipes() {
    // Simulate import functionality
    showNotification('Fonctionnalité d\'import en cours de développement', 'info');
}

function closeModal() {
    $('.modal').fadeOut();
    currentEditingId = null;
}

function showNotification(message, type = 'success') {
    const notification = $(`
        <div class="notification ${type}">
            ${message}
        </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(() => {
        notification.fadeOut(() => notification.remove());
    }, 3000);
}

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

// Add additional styles for recipe management
$('<style>').text(`
    .recipe-image-container {
        position: relative;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
    }
    
    .recipe-image-container img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .admin-recipe-card:hover .recipe-image-container img {
        transform: scale(1.05);
    }
    
    .recipe-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .admin-recipe-card:hover .recipe-overlay {
        opacity: 1;
    }
    
    .recipe-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .difficulty-facile {
        background: #d5f4e6;
        color: #27ae60;
    }
    
    .difficulty-moyen {
        background: #fff3cd;
        color: #856404;
    }
    
    .difficulty-difficile {
        background: #f8d7da;
        color: #721c24;
    }
    
    .difficulty-expert {
        background: #d1ecf1;
        color: #0c5460;
    }
    
    .recipe-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        margin-top: 1rem;
    }
    
    .tag {
        background: #f8f9fa;
        color: #6c757d;
        padding: 0.2rem 0.5rem;
        border-radius: 10px;
        font-size: 0.7rem;
        font-weight: 500;
    }
    
    .ingredient-item, .instruction-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .step-number {
        font-weight: bold;
        color: #f39c12;
        min-width: 30px;
        margin-top: 0.5rem;
    }
    
    .instruction-text {
        flex: 1;
        resize: vertical;
        min-height: 60px;
    }
    
    .image-field {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-bottom: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .additional-image {
        flex: 1;
    }
    
    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: #7f8c8d;
    }
    
    .empty-state h3 {
        margin-bottom: 1rem;
        color: #2c3e50;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    }
    
    .notification.success {
        background: #27ae60;
    }
    
    .notification.error {
        background: #e74c3c;
    }
    
    .notification.info {
        background: #3498db;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`).appendTo('head');
