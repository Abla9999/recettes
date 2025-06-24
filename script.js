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
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    tags: ["chocolat", "dessert", "facile"],
    ingredients: ["Chocolat noir - 200g", "Oeufs - 3", "Sucre - 100g", "Beurre - 100g", "Farine - 75g"],
    instructions: [
      "Faire fondre le chocolat et le beurre au micro onde à puissance maximale pendant 1 minutes 30.",
      "Dans un saladier, mélanger la farine, le sucre et les œufs. Ajouter le chocolat fondu. Bien mélanger.",
      "Verser la préparation dans un moule à cake. Faire cuire à puissance maximale pendant 5 minutes.",
    ],
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
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    tags: ["fruits", "dessert", "fêtes", "élégant"],
    ingredients: [
      "Fruits frais mélangés - 500g",
      "Biscuits à la cuillère - 200g",
      "Gélatine - 4 feuilles",
      "Crème fraîche - 300ml",
      "Sucre - 100g",
      "Vanille - 1 gousse",
    ],
    instructions: [
      "Préparer la crème chantilly avec la gélatine et le sucre.",
      "Tapisser un moule avec les biscuits à la cuillère.",
      "Alterner couches de crème et de fruits.",
      "Laisser prendre au réfrigérateur 4 heures minimum.",
    ],
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
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    tags: ["fruits rouges", "dessert", "léger"],
    ingredients: [
      "Farine - 200g",
      "Levure chimique - 1 sachet",
      "Sucre vanillé - 1 sachet",
      "Oeufs - 3",
      "Lait de coco - 200ml",
      "Fruits rouges mélangés - 250g",
      "Sucre semoule - 120g",
    ],
    instructions: [
      "Préchauffer le four à 180°C. Rouler les fruits rouges dans un peu de farine.",
      "Fouetter les oeufs avec le sucre pour obtenir un mélange mousseux.",
      "Ajouter petit à petit la farine et la levure. Incorporer le lait de coco.",
      "Ajouter délicatement les fruits rouges sans trop mélanger.",
      "Faire cuire environ 35 minutes à four moyen.",
    ],
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
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    tags: ["pizza", "italien", "pepperoni", "fromage"],
    ingredients: [
      "Farine T55 - 400g",
      "Levure fraîche - 10g",
      "Eau tiède - 250ml",
      "Pepperoni - 150g",
      "Mozzarella - 200g",
      "Sauce tomate - 200ml",
      "Huile d'olive - 2 c. à soupe",
    ],
    instructions: [
      "Préparer la pâte avec farine, levure et eau. Laisser lever 1 heure.",
      "Étaler la pâte et ajouter la sauce tomate.",
      "Disposer le pepperoni et la mozzarella.",
      "Cuire à 250°C pendant 12-15 minutes.",
    ],
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
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    tags: ["salade", "frais", "méditerranéen", "healthy"],
    ingredients: [
      "Laitue - 1",
      "Tomates cerises - 200g",
      "Concombre - 1",
      "Olives - 100g",
      "Feta - 100g",
      "Huile d'olive - 3 c. à soupe",
      "Vinaigre balsamique - 1 c. à soupe",
    ],
    instructions: [
      "Laver et couper tous les légumes.",
      "Mélanger dans un saladier.",
      "Ajouter la feta et les olives.",
      "Assaisonner avec huile d'olive et vinaigre balsamique.",
    ],
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
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    tags: ["pâtes", "italien", "carbonara", "crème"],
    ingredients: [
      "Spaghetti - 400g",
      "Lardons - 200g",
      "Oeufs - 4",
      "Parmesan - 100g",
      "Poivre noir - 2 c. à café",
      "Sel - 1 pincée",
    ],
    instructions: [
      "Cuire les pâtes selon les instructions.",
      "Faire revenir les lardons à la poêle.",
      "Battre les oeufs avec le parmesan et le poivre.",
      "Mélanger les pâtes chaudes avec la préparation aux oeufs.",
    ],
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
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop",
    tags: ["smoothie", "healthy", "fruits", "petit-déjeuner"],
    ingredients: [
      "Banane - 1",
      "Fruits rouges - 100g",
      "Yaourt grec - 100g",
      "Granola - 50g",
      "Miel - 1 c. à café",
      "Graines de chia - 1 c. à soupe",
    ],
    instructions: [
      "Mixer la banane, les fruits rouges et le yaourt.",
      "Verser dans un bol.",
      "Décorer avec granola, miel et graines de chia.",
      "Servir immédiatement.",
    ],
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
    image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?w=400&h=300&fit=crop",
    tags: ["tarte", "pommes", "français", "classique"],
    ingredients: [
      "Pâte brisée - 1",
      "Pommes Golden - 6",
      "Sucre - 100g",
      "Beurre - 50g",
      "Cannelle - 1 c. à café",
      "Oeuf - 1",
    ],
    instructions: [
      "Préchauffer le four à 180°C.",
      "Étaler la pâte dans un moule à tarte.",
      "Disposer les pommes épluchées et coupées.",
      "Saupoudrer de sucre et cannelle.",
      "Cuire 45 minutes jusqu'à doré.",
    ],
  },
]

// Cart and purchase management
let cart = JSON.parse(localStorage.getItem("recipeCart")) || []
const purchasedRecipes = JSON.parse(localStorage.getItem("purchasedRecipes")) || []

// Current filters for marketplace
const currentFilters = {
  search: "",
  category: "",
  difficulty: "",
  priceRange: "",
}

// Utility Functions
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountElement = document.getElementById("cart-count")
  if (cartCountElement) {
    cartCountElement.textContent = totalItems
  }
  localStorage.setItem("cartCount", totalItems)
}

function isRecipePurchased(recipeId) {
  return purchasedRecipes.includes(recipeId)
}

function addToCart(recipeId) {
  const existingItem = cart.find((item) => item.recipeId === recipeId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ recipeId, quantity: 1 })
  }

  localStorage.setItem("recipeCart", JSON.stringify(cart))
  updateCartCount()
  showNotification("Recette ajoutée au panier", "success")
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

function createRecipeCard(recipe) {
  const isPurchased = isRecipePurchased(recipe.id)
  const difficultyClass = `difficulty-${recipe.difficulty}`

  return `
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
    `
}

function displayRecipes(recipes, containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  if (recipes.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>Aucune recette trouvée</h3>
                <p>Essayez de modifier vos critères de recherche.</p>
            </div>
        `
    return
  }

  container.innerHTML = recipes.map((recipe) => createRecipeCard(recipe)).join("")
}

function viewRecipeDetail(recipeId) {
  const recipe = recipesDatabase.find((r) => r.id === recipeId)
  if (!recipe) return

  const isPurchased = isRecipePurchased(recipeId)

  const modalContent = `
        <div class="recipe-detail-modal">
            <div class="recipe-detail-header">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-detail-image">
                <div class="recipe-detail-info">
                    <h3>${recipe.title}</h3>
                    <p><strong>Chef:</strong> ${recipe.chef}</p>
                    <p><strong>Prix:</strong> €${recipe.price}</p>
                    <div class="recipe-detail-meta">
                        <span>⏱️ ${recipe.time}</span>
                        <span>👥 ${recipe.serves}</span>
                        <span>📊 ${recipe.difficulty}</span>
                        <span>⭐ ${recipe.rating}</span>
                    </div>
                    <p>${recipe.description}</p>
                    <div class="recipe-tags">
                        ${recipe.tags.map((tag) => `<span class="recipe-tag">${tag}</span>`).join("")}
                    </div>
                </div>
            </div>
            
            ${
              isPurchased
                ? `
                <div class="ingredients-list">
                    <h4>Ingrédients:</h4>
                    <ul>
                        ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
                    </ul>
                </div>
                
                <div class="instructions-list">
                    <h4>Instructions:</h4>
                    <ol>
                        ${recipe.instructions.map((instruction) => `<li>${instruction}</li>`).join("")}
                    </ol>
                </div>
            `
                : `
                <div class="purchase-prompt">
                    <h4>🔒 Contenu Premium</h4>
                    <p>Achetez cette recette pour accéder aux ingrédients détaillés et aux instructions complètes.</p>
                    <button class="btn-primary" onclick="addToCart(${recipe.id}); closeModal();">
                        Acheter pour €${recipe.price}
                    </button>
                </div>
            `
            }
        </div>
    `

  showModal(modalContent)
}

function startCooking(recipeId) {
  showNotification("Mode cuisson activé!", "info")
  viewRecipeDetail(recipeId)
}

function showModal(content) {
  const modal = document.getElementById("recipe-modal")
  const modalBody = document.getElementById("modal-body")

  if (modal && modalBody) {
    modalBody.innerHTML = content
    modal.style.display = "block"
  }
}

function closeModal() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.style.display = "none"
  })
}

// Search and Filter Functions
function searchRecipes(query, recipes = recipesDatabase) {
  if (!query) return recipes

  const searchTerm = query.toLowerCase()
  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.chef.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      recipe.category.toLowerCase().includes(searchTerm),
  )
}

function filterRecipes(filters, recipes = recipesDatabase) {
  return recipes.filter((recipe) => {
    const matchesCategory = !filters.category || recipe.category === filters.category
    const matchesDifficulty = !filters.difficulty || recipe.difficulty === filters.difficulty

    let matchesPrice = true
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map((p) => Number.parseFloat(p))
      if (max) {
        matchesPrice = recipe.price >= min && recipe.price <= max
      } else {
        matchesPrice = recipe.price >= min
      }
    }

    return matchesCategory && matchesDifficulty && matchesPrice
  })
}

function sortRecipes(recipes, sortBy) {
  const sorted = [...recipes]

  switch (sortBy) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      sorted.sort((a, b) => b.price - a.price)
      break
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating)
      break
    case "difficulty":
      const difficultyOrder = { facile: 1, moyen: 2, difficile: 3 }
      sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
      break
    case "time":
      sorted.sort((a, b) => {
        const timeA = Number.parseInt(a.time.match(/\d+/)[0])
        const timeB = Number.parseInt(b.time.match(/\d+/)[0])
        return timeA - timeB
      })
      break
    default:
      sorted.sort((a, b) => b.rating - a.rating)
  }

  return sorted
}

// Homepage Functions
function displayFeaturedRecipes() {
  const featuredRecipes = recipesDatabase.slice(0, 6)
  displayRecipes(featuredRecipes, "featured-recipes")
}

// Marketplace Functions
function initializeMarketplace() {
  displayRecipes(recipesDatabase, "recipes-grid")
  updateResultsCount(recipesDatabase.length)
}

function setupMarketplaceEventListeners() {
  const searchInput = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-btn")
  const categoryFilter = document.getElementById("category-filter")
  const difficultyFilter = document.getElementById("difficulty-filter")
  const priceFilter = document.getElementById("price-filter")
  const sortSelect = document.getElementById("sort-select")

  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleSearch, 300))
  }
  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch)
  }
  if (categoryFilter) {
    categoryFilter.addEventListener("change", handleFilterChange)
  }
  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", handleFilterChange)
  }
  if (priceFilter) {
    priceFilter.addEventListener("change", handleFilterChange)
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", handleSortChange)
  }

  // Enter key for search
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.which === 13) {
        handleSearch()
      }
    })
  }
}

function handleSearch() {
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    currentFilters.search = searchInput.value.trim()
    applyFilters()
  }
}

function handleFilterChange() {
  const categoryFilter = document.getElementById("category-filter")
  const difficultyFilter = document.getElementById("difficulty-filter")
  const priceFilter = document.getElementById("price-filter")

  if (categoryFilter) currentFilters.category = categoryFilter.value
  if (difficultyFilter) currentFilters.difficulty = difficultyFilter.value
  if (priceFilter) currentFilters.priceRange = priceFilter.value

  applyFilters()
}

function handleSortChange() {
  const sortSelect = document.getElementById("sort-select")
  if (sortSelect) {
    applyFilters(sortSelect.value)
  }
}

function applyFilters(sortBy = "rating") {
  showLoading()

  setTimeout(() => {
    let results = [...recipesDatabase]

    // Apply search
    if (currentFilters.search) {
      results = searchRecipes(currentFilters.search, results)
    }

    // Apply filters
    results = filterRecipes(
      {
        category: currentFilters.category,
        difficulty: currentFilters.difficulty,
        priceRange: currentFilters.priceRange,
      },
      results,
    )

    // Apply sorting
    results = sortRecipes(results, sortBy)

    displayRecipes(results, "recipes-grid")
    updateResultsCount(results.length)
    hideLoading()
  }, 500)
}

function updateResultsCount(count) {
  const resultsCount = document.getElementById("results-count")
  if (resultsCount) {
    const text =
      count === 0 ? "Aucune recette trouvée" : count === 1 ? "1 recette trouvée" : `${count} recettes trouvées`
    resultsCount.textContent = text
  }
}

function showLoading() {
  const container = document.getElementById("recipes-grid")
  if (container) {
    container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Recherche en cours...</p>
            </div>
        `
  }
}

function hideLoading() {
  // Loading is hidden when recipes are displayed
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Cart Functions
function initializeCart() {
  updateCartDisplay()
  updateCartCount()
  calculateTotals()
}

function setupCartEventListeners() {
  const checkoutBtn = document.getElementById("checkout-btn")
  const paymentForm = document.getElementById("payment-form")
  const modalCloses = document.querySelectorAll(".modal-close")

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", openPaymentModal)
  }

  if (paymentForm) {
    paymentForm.addEventListener("submit", handlePayment)
  }

  modalCloses.forEach((close) => {
    close.addEventListener("click", closeModal)
  })

  // Card formatting
  const cardNumber = document.getElementById("card-number")
  const cardExpiry = document.getElementById("card-expiry")
  const cardCvv = document.getElementById("card-cvv")

  if (cardNumber) {
    cardNumber.addEventListener("input", formatCardNumber)
  }
  if (cardExpiry) {
    cardExpiry.addEventListener("input", formatExpiry)
  }
  if (cardCvv) {
    cardCvv.addEventListener("input", formatCVV)
  }
}

function updateCartDisplay() {
  const container = document.getElementById("cart-items-list")
  if (!container) return

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🛒</div>
                <h3>Votre panier est vide</h3>
                <p>Ajoutez des recettes délicieuses pour commencer</p>
                <a href="marketplace.html" class="btn-primary">Explorer les Recettes</a>
            </div>
        `
    return
  }

  const cartItemsHTML = cart
    .map((item) => {
      const recipe = recipesDatabase.find((r) => r.id === item.recipeId)
      if (!recipe) return ""

      return `
            <div class="cart-item">
                <img src="${recipe.image}" alt="${recipe.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${recipe.title}</h4>
                    <p class="cart-item-chef">par ${recipe.chef}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${recipe.id}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${recipe.id}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span class="price-per-unit">€${recipe.price}</span>
                    <span class="price-total">€${(recipe.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${recipe.id})">🗑️</button>
            </div>
        `
    })
    .join("")

  container.innerHTML = cartItemsHTML
}

function updateQuantity(recipeId, change) {
  const itemIndex = cart.findIndex((item) => item.recipeId === recipeId)
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change

    if (cart[itemIndex].quantity <= 0) {
      removeFromCart(recipeId)
    } else {
      updateCartDisplay()
      calculateTotals()
      saveCart()
    }
  }
}

function removeFromCart(recipeId) {
  cart = cart.filter((item) => item.recipeId !== recipeId)
  updateCartDisplay()
  updateCartCount()
  calculateTotals()
  saveCart()
  showNotification("Recette retirée du panier", "success")
}

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => {
    const recipe = recipesDatabase.find((r) => r.id === item.recipeId)
    return sum + (recipe ? recipe.price * item.quantity : 0)
  }, 0)

  const tax = subtotal * 0.2 // 20% TVA
  const total = subtotal + tax

  const subtotalElement = document.getElementById("subtotal")
  const taxElement = document.getElementById("tax")
  const totalElement = document.getElementById("total")

  if (subtotalElement) subtotalElement.textContent = `€${subtotal.toFixed(2)}`
  if (taxElement) taxElement.textContent = `€${tax.toFixed(2)}`
  if (totalElement) totalElement.textContent = `€${total.toFixed(2)}`
}

function saveCart() {
  localStorage.setItem("recipeCart", JSON.stringify(cart))
}

function openPaymentModal() {
  if (cart.length === 0) {
    showNotification("Votre panier est vide", "error")
    return
  }
  const modal = document.getElementById("payment-modal")
  if (modal) {
    modal.style.display = "block"
  }
}

function handlePayment(e) {
  e.preventDefault()

  showNotification("Traitement du paiement...", "info")

  setTimeout(() => {
    // Add recipes to purchased list
    cart.forEach((item) => {
      if (!purchasedRecipes.includes(item.recipeId)) {
        purchasedRecipes.push(item.recipeId)
      }
    })

    // Save purchased recipes
    localStorage.setItem("purchasedRecipes", JSON.stringify(purchasedRecipes))

    // Clear cart
    cart = []
    saveCart()
    updateCartDisplay()
    updateCartCount()
    calculateTotals()

    closeModal()
    showNotification("Paiement réussi ! Vos recettes sont maintenant disponibles", "success")

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html"
    }, 2000)
  }, 3000)
}

// Card formatting functions
function formatCardNumber(e) {
  let value = e.target.value.replace(/\D/g, "")
  value = value.replace(/(\d{4})(?=\d)/g, "$1 ")
  e.target.value = value.substring(0, 19)
}

function formatExpiry(e) {
  let value = e.target.value.replace(/\D/g, "")
  if (value.length >= 2) {
    value = value.substring(0, 2) + "/" + value.substring(2, 4)
  }
  e.target.value = value.substring(0, 5)
}

function formatCVV(e) {
  const value = e.target.value.replace(/\D/g, "")
  e.target.value = value.substring(0, 3)
}

// Dashboard Functions
function initializeDashboard() {
  displayPurchasedRecipes()
  updateDashboardStats()
  updateCartCount()
}

function setupDashboardEventListeners() {
  const searchInput = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-btn")
  const categoryFilter = document.getElementById("category-filter")
  const difficultyFilter = document.getElementById("difficulty-filter")
  const sortSelect = document.getElementById("sort-select")

  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleDashboardSearch, 300))
  }
  if (searchBtn) {
    searchBtn.addEventListener("click", handleDashboardSearch)
  }
  if (categoryFilter) {
    categoryFilter.addEventListener("change", handleDashboardFilter)
  }
  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", handleDashboardFilter)
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", handleDashboardSort)
  }
}

function displayPurchasedRecipes() {
  const purchasedRecipeData = recipesDatabase.filter((recipe) => purchasedRecipes.includes(recipe.id))

  const container = document.getElementById("purchased-recipes")
  const emptyState = document.getElementById("empty-state")

  if (purchasedRecipeData.length === 0) {
    if (container) container.style.display = "none"
    if (emptyState) emptyState.style.display = "block"
    updateResultsCount(0)
    return
  }

  if (container) container.style.display = "grid"
  if (emptyState) emptyState.style.display = "none"

  displayRecipes(purchasedRecipeData, "purchased-recipes")
  updateResultsCount(purchasedRecipeData.length)
}

function updateDashboardStats() {
  const purchasedRecipeData = recipesDatabase.filter((recipe) => purchasedRecipes.includes(recipe.id))

  const totalRecipes = purchasedRecipeData.length
  const avgRating =
    totalRecipes > 0
      ? (purchasedRecipeData.reduce((sum, recipe) => sum + recipe.rating, 0) / totalRecipes).toFixed(1)
      : "0.0"
  const totalChefs = new Set(purchasedRecipeData.map((recipe) => recipe.chef)).size
  const totalTime = purchasedRecipeData.reduce((sum, recipe) => {
    const time = Number.parseInt(recipe.time.match(/\d+/)[0])
    return sum + time
  }, 0)

  const totalRecipesElement = document.getElementById("total-recipes")
  const avgRatingElement = document.getElementById("avg-rating")
  const totalChefsElement = document.getElementById("total-chefs")
  const totalTimeElement = document.getElementById("total-time")

  if (totalRecipesElement) totalRecipesElement.textContent = totalRecipes
  if (avgRatingElement) avgRatingElement.textContent = avgRating
  if (totalChefsElement) totalChefsElement.textContent = totalChefs
  if (totalTimeElement) totalTimeElement.textContent = `${Math.floor(totalTime / 60)}h${totalTime % 60}m`
}

function handleDashboardSearch() {
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    const query = searchInput.value.trim()
    filterPurchasedRecipes(query)
  }
}

function handleDashboardFilter() {
  filterPurchasedRecipes()
}

function handleDashboardSort() {
  const sortSelect = document.getElementById("sort-select")
  if (sortSelect) {
    filterPurchasedRecipes("", sortSelect.value)
  }
}

function filterPurchasedRecipes(searchQuery = "", sortBy = "recent") {
  let purchasedRecipeData = recipesDatabase.filter((recipe) => purchasedRecipes.includes(recipe.id))

  // Apply search
  if (searchQuery) {
    purchasedRecipeData = searchRecipes(searchQuery, purchasedRecipeData)
  }

  // Apply filters
  const categoryFilter = document.getElementById("category-filter")
  const difficultyFilter = document.getElementById("difficulty-filter")

  const filters = {
    category: categoryFilter ? categoryFilter.value : "",
    difficulty: difficultyFilter ? difficultyFilter.value : "",
    priceRange: "",
  }

  purchasedRecipeData = filterRecipes(filters, purchasedRecipeData)

  // Apply sorting
  if (sortBy !== "recent") {
    purchasedRecipeData = sortRecipes(purchasedRecipeData, sortBy)
  }

  displayRecipes(purchasedRecipeData, "purchased-recipes")
  updateResultsCount(purchasedRecipeData.length)
}

// Event Listeners for Modal Close
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal()
  }
})

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
})
