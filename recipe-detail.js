// Recipe detail page functionality
let currentRecipe = null
const urlParams = new URLSearchParams(window.location.search)
const recipeId = Number.parseInt(urlParams.get("id"))
const cookingMode = urlParams.get("mode") === "cooking"

// Declare variables to fix lint errors
const $ = window.$ // Assuming jQuery is available globally
const getRecipeById = (id) => {
  // Placeholder function to get recipe by ID
  return {
    id: id,
    title: "Sample Recipe",
    image: "sample.jpg",
    difficulty: "easy",
    category: "dinner",
    chef: "Chef John",
    rating: 4.5,
    time: 30,
    serves: 4,
    description: "This is a sample recipe description.",
    tags: ["tag1", "tag2"],
    ingredients: ["ingredient1", "ingredient2", "ingredient3", "ingredient4", "ingredient5", "ingredient6"],
    instructions: [
      { step: 1, title: "Step 1", description: "Description of step 1", time: 10 },
      { step: 2, title: "Step 2", description: "Description of step 2", time: 15 },
    ],
  }
}
const isRecipePurchased = (id) => {
  // Placeholder function to check if recipe is purchased
  return true // Assume all recipes are purchased for demonstration
}
const formatPrice = (price) => {
  // Placeholder function to format price
  return `$${price.toFixed(2)}`
}
const addToCart = (recipeId) => {
  // Placeholder function to add recipe to cart
  console.log(`Recipe ${recipeId} added to cart`)
}
const showNotification = (message, type = "success") => {
  // Placeholder function to show notification
  console.log(`Notification (${type}): ${message}`)
}
const openCookingMode = (recipeId) => {
  // Placeholder function to open cooking mode
  console.log(`Opening cooking mode for recipe ${recipeId}`)
}

$(document).ready(() => {
  if (recipeId) {
    loadRecipeDetail(recipeId)
    if (cookingMode) {
      setTimeout(() => openCookingMode(recipeId), 500)
    }
  } else {
    showError("Recette non trouvée")
  }
})

function loadRecipeDetail(id) {
  currentRecipe = getRecipeById(id)

  if (!currentRecipe) {
    showError("Recette non trouvée")
    return
  }

  const isPurchased = isRecipePurchased(id)
  displayRecipeDetail(currentRecipe, isPurchased)
}

function displayRecipeDetail(recipe, isPurchased) {
  const content = `
        <div class="recipe-detail">
            <div class="recipe-hero">
                <div class="recipe-image-container">
                    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-hero-image">
                    ${isPurchased ? '<div class="purchased-overlay">✅ Acheté</div>' : '<div class="locked-overlay">🔒 Premium</div>'}
                </div>
                <div class="recipe-hero-info">
                    <div class="recipe-badges">
                        <span class="badge badge-${recipe.difficulty}">${recipe.difficulty}</span>
                        <span class="badge badge-category">${recipe.category}</span>
                    </div>
                    <h1>${recipe.title}</h1>
                    <p class="chef-info">par <strong>${recipe.chef}</strong></p>
                    <div class="recipe-stats">
                        <div class="stat">
                            <span class="stat-icon">⭐</span>
                            <span class="stat-value">${recipe.rating}</span>
                            <span class="stat-label">Note</span>
                        </div>
                        <div class="stat">
                            <span class="stat-icon">⏱️</span>
                            <span class="stat-value">${recipe.time}</span>
                            <span class="stat-label">Temps</span>
                        </div>
                        <div class="stat">
                            <span class="stat-icon">👥</span>
                            <span class="stat-value">${recipe.serves}</span>
                            <span class="stat-label">Personnes</span>
                        </div>
                    </div>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-tags">
                        ${recipe.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                    </div>
                    ${createActionButtons(recipe, isPurchased)}
                </div>
            </div>
            
            <div class="recipe-content">
                ${createRecipeContent(recipe, isPurchased)}
            </div>
        </div>
    `

  $("#recipe-detail-content").html(content)
}

function createActionButtons(recipe, isPurchased) {
  if (isPurchased) {
    return `
            <div class="action-buttons">
                <button class="btn-primary btn-large" onclick="openCookingMode(${recipe.id})">
                    🍳 Commencer à Cuisiner
                </button>
                <button class="btn-secondary" onclick="addToFavorites(${recipe.id})">
                    ❤️ Ajouter aux Favoris
                </button>
            </div>
        `
  } else {
    return `
            <div class="purchase-section">
                <div class="price-display">
                    <span class="price-amount">${formatPrice(recipe.price)}</span>
                    <span class="price-label">Prix unique</span>
                </div>
                <div class="action-buttons">
                    <button class="btn-primary btn-large" onclick="addToCart(${recipe.id})">
                        🛒 Ajouter au Panier
                    </button>
                    <button class="btn-secondary" onclick="buyNow(${recipe.id})">
                        ⚡ Acheter Maintenant
                    </button>
                </div>
                <div class="purchase-benefits">
                    <h4>Ce que vous obtenez:</h4>
                    <ul>
                        <li>✅ Instructions détaillées étape par étape</li>
                        <li>✅ Conseils professionnels du chef</li>
                        <li>✅ Mode cuisson interactif avec minuteur</li>
                        <li>✅ Accès à vie à la recette</li>
                        <li>✅ Support technique</li>
                    </ul>
                </div>
            </div>
        `
  }
}

function createRecipeContent(recipe, isPurchased) {
  if (!isPurchased) {
    return createPreviewContent(recipe)
  } else {
    return createFullContent(recipe)
  }
}

function createPreviewContent(recipe) {
  const previewIngredients = recipe.ingredients.slice(0, 5)
  const previewSteps = recipe.instructions.slice(0, 2)

  return `
        <div class="content-preview">
            <div class="preview-section">
                <h3>🔒 Aperçu des Ingrédients</h3>
                <div class="ingredients-preview">
                    <ul>
                        ${previewIngredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
                        <li class="preview-more">+ ${recipe.ingredients.length - 5} ingrédients supplémentaires</li>
                    </ul>
                </div>
            </div>
            
            <div class="preview-section">
                <h3>🔒 Aperçu des Instructions</h3>
                <div class="instructions-preview">
                    ${previewSteps
                      .map(
                        (step, index) => `
                        <div class="preview-step">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">
                                <h4>${step.title}</h4>
                                <p>${step.description.substring(0, 150)}...</p>
                                <span class="step-time">⏱️ ${step.time} min</span>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                    <div class="preview-more-steps">
                        <p>+ ${recipe.instructions.length - 2} étapes supplémentaires avec conseils professionnels</p>
                    </div>
                </div>
            </div>
            
            <div class="unlock-prompt">
                <div class="unlock-icon">🔓</div>
                <h3>Débloquez la Recette Complète</h3>
                <p>Achetez cette recette pour accéder aux instructions détaillées, aux conseils professionnels et au mode cuisson interactif.</p>
                <button class="btn-primary" onclick="addToCart(${recipe.id})">
                    Acheter pour ${formatPrice(recipe.price)}
                </button>
            </div>
        </div>
    `
}

function createFullContent(recipe) {
  return `
        <div class="content-full">
            <div class="ingredients-section">
                <h3>🥘 Ingrédients</h3>
                <div class="ingredients-list">
                    <ul>
                        ${recipe.ingredients
                          .map(
                            (ingredient, index) => `
                            <li>
                                <input type="checkbox" id="ingredient-${index}" class="ingredient-checkbox">
                                <label for="ingredient-${index}">${ingredient}</label>
                            </li>
                        `,
                          )
                          .join("")}
                    </ul>
                    <div class="ingredients-actions">
                        <button class="btn-secondary" onclick="generateShoppingList(${recipe.id})">
                            📝 Générer Liste de Courses
                        </button>
                        <button class="btn-secondary" onclick="scaleRecipe()">
                            ⚖️ Ajuster les Portions
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="instructions-section">
                <h3>👨‍🍳 Instructions Détaillées</h3>
                <div class="instructions-list">
                    ${recipe.instructions
                      .map(
                        (instruction, index) => `
                        <div class="instruction-step" id="step-${index}">
                            <div class="step-header">
                                <div class="step-number">${instruction.step}</div>
                                <div class="step-info">
                                    <h4>${instruction.title}</h4>
                                    <div class="step-meta">
                                        <span class="step-time">⏱️ ${instruction.time} min</span>
                                        <button class="btn-timer-small" onclick="startStepTimer(${instruction.time})">
                                            Démarrer Minuteur
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="step-content">
                                <p class="step-description">${instruction.description}</p>
                                ${
                                  instruction.tips
                                    ? `
                                    <div class="step-tips">
                                        <h5>💡 Conseils du Chef:</h5>
                                        <ul>
                                            ${instruction.tips.map((tip) => `<li>${tip}</li>`).join("")}
                                        </ul>
                                    </div>
                                `
                                    : ""
                                }
                            </div>
                            <div class="step-actions">
                                <button class="btn-step-complete" onclick="markStepComplete(${index})">
                                    ✅ Étape Terminée
                                </button>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="chef-notes">
                <h3>📝 Notes du Chef</h3>
                <div class="notes-content">
                    <p>Cette recette a été perfectionnée au fil des années. N'hésitez pas à l'adapter selon vos goûts!</p>
                    <div class="chef-signature">
                        <strong>- ${recipe.chef}</strong>
                    </div>
                </div>
            </div>
        </div>
    `
}

function buyNow(recipeId) {
  addToCart(recipeId)
  window.location.href = "panier.html"
}

function addToFavorites(recipeId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    showNotification("Recette ajoutée aux favoris!")
  } else {
    showNotification("Cette recette est déjà dans vos favoris", "info")
  }
}

function generateShoppingList(recipeId) {
  const recipe = getRecipeById(recipeId)
  if (!recipe) return

  const checkedIngredients = []
  $(".ingredient-checkbox:checked").each(function () {
    const label = $(this).next("label").text()
    checkedIngredients.push(label)
  })

  const ingredientsToAdd = checkedIngredients.length > 0 ? checkedIngredients : recipe.ingredients

  const shoppingList = {
    recipeTitle: recipe.title,
    ingredients: ingredientsToAdd,
    createdAt: new Date().toISOString(),
  }

  // Save to localStorage
  const shoppingLists = JSON.parse(localStorage.getItem("shoppingLists")) || []
  shoppingLists.push(shoppingList)
  localStorage.setItem("shoppingLists", JSON.stringify(shoppingLists))

  showNotification("Liste de courses générée!")

  // Open shopping list in new window/tab
  const listWindow = window.open("", "_blank")
  listWindow.document.write(`
        <html>
            <head>
                <title>Liste de Courses - ${recipe.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #f5aa20; }
                    ul { list-style-type: none; padding: 0; }
                    li { padding: 10px; border-bottom: 1px solid #eee; }
                    .print-btn { background: #f5aa20; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
                </style>
            </head>
            <body>
                <h1>Liste de Courses</h1>
                <h2>${recipe.title}</h2>
                <ul>
                    ${ingredientsToAdd.map((ingredient) => `<li>☐ ${ingredient}</li>`).join("")}
                </ul>
                <button class="print-btn" onclick="window.print()">Imprimer</button>
            </body>
        </html>
    `)
}

function scaleRecipe() {
  const newServings = prompt("Pour combien de personnes souhaitez-vous adapter cette recette?", currentRecipe.serves)
  if (newServings && !isNaN(newServings) && newServings > 0) {
    const scale = newServings / currentRecipe.serves
    scaleIngredients(scale)
    showNotification(`Recette adaptée pour ${newServings} personnes`)
  }
}

function scaleIngredients(scale) {
  $(".ingredients-list li label").each(function () {
    const text = $(this).text()
    const scaledText = text.replace(/(\d+(?:\.\d+)?)\s*([a-zA-Z]+)/g, (match, number, unit) => {
      const scaledNumber = (Number.parseFloat(number) * scale).toFixed(1)
      return `${scaledNumber} ${unit}`
    })
    $(this).text(scaledText)
  })
}

function markStepComplete(stepIndex) {
  const stepElement = $(`#step-${stepIndex}`)
  stepElement.addClass("step-completed")
  stepElement.find(".btn-step-complete").text("✅ Terminé").prop("disabled", true)

  // Scroll to next step
  const nextStep = $(`#step-${stepIndex + 1}`)
  if (nextStep.length) {
    nextStep[0].scrollIntoView({ behavior: "smooth", block: "center" })
  }
}

function startStepTimer(minutes) {
  // This will be handled by the cooking mode timer
  showNotification(`Minuteur démarré pour ${minutes} minutes`)
}

function showError(message) {
  $("#recipe-detail-content").html(`
        <div class="error-state">
            <h2>Erreur</h2>
            <p>${message}</p>
            <a href="marketplace.html" class="btn-primary">Retour au Marketplace</a>
        </div>
    `)
}
