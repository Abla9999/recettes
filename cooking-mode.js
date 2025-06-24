// Cooking mode functionality
const cookingState = {
  currentStep: 0,
  completedSteps: [],
  timer: {
    seconds: 0,
    isRunning: false,
    interval: null,
  },
  recipe: null,
}

function openCookingMode(recipeId) {
  const recipe = getRecipeById(recipeId)
  if (!recipe || !isRecipePurchased(recipeId)) {
    showNotification("Vous devez acheter cette recette pour accéder au mode cuisson", "error")
    return
  }

  cookingState.recipe = recipe
  cookingState.currentStep = 0
  cookingState.completedSteps = []

  displayCookingMode()
  $("#cooking-modal").fadeIn()
}

function displayCookingMode() {
  const recipe = cookingState.recipe
  const currentStep = recipe.instructions[cookingState.currentStep]

  $("#cooking-title").text(recipe.title)
  updateProgress()
  displayCurrentStep(currentStep)
  updateNavigationButtons()
}

function updateProgress() {
  const progress = ((cookingState.currentStep + 1) / cookingState.recipe.instructions.length) * 100
  $("#progress-fill").css("width", `${progress}%`)
  $("#progress-text").text(`Étape ${cookingState.currentStep + 1} sur ${cookingState.recipe.instructions.length}`)
}

function displayCurrentStep(step) {
  const stepContent = `
        <div class="cooking-step">
            <div class="step-header">
                <h3>Étape ${step.step}: ${step.title}</h3>
                <div class="step-time-badge">⏱️ ${step.time} min</div>
            </div>
            <div class="step-description">
                <p>${step.description}</p>
            </div>
            ${
              step.tips
                ? `
                <div class="step-tips">
                    <h4>💡 Conseils du Chef:</h4>
                    <ul>
                        ${step.tips.map((tip) => `<li>${tip}</li>`).join("")}
                    </ul>
                </div>
            `
                : ""
            }
            <div class="step-actions">
                <button class="btn-secondary" onclick="setTimer(${step.time})">
                    Minuteur ${step.time}min
                </button>
                <button class="btn-secondary" onclick="readStepAloud()">
                    🔊 Lire à Voix Haute
                </button>
            </div>
        </div>
    `

  $("#cooking-content").html(stepContent)
}

function updateNavigationButtons() {
  const isFirstStep = cookingState.currentStep === 0
  const isLastStep = cookingState.currentStep === cookingState.recipe.instructions.length - 1
  const isStepCompleted = cookingState.completedSteps.includes(cookingState.currentStep)

  $("#prev-step").prop("disabled", isFirstStep)
  $("#next-step").prop("disabled", isLastStep)

  if (isStepCompleted) {
    $("#complete-step").text("✅ Terminé").addClass("completed")
  } else {
    $("#complete-step").text("✅ Terminer l'étape").removeClass("completed")
  }
}

// Timer functions
function setTimer(minutes) {
  cookingState.timer.seconds = minutes * 60
  updateTimerDisplay()
  showNotification(`Minuteur réglé sur ${minutes} minutes`)
}

function startTimer() {
  if (cookingState.timer.seconds <= 0) return

  cookingState.timer.isRunning = true
  cookingState.timer.interval = setInterval(() => {
    cookingState.timer.seconds--
    updateTimerDisplay()

    if (cookingState.timer.seconds <= 0) {
      timerFinished()
    }
  }, 1000)

  updateTimerButtons()
}

function pauseTimer() {
  cookingState.timer.isRunning = false
  clearInterval(cookingState.timer.interval)
  updateTimerButtons()
}

function resetTimer() {
  cookingState.timer.isRunning = false
  cookingState.timer.seconds = 0
  clearInterval(cookingState.timer.interval)
  updateTimerDisplay()
  updateTimerButtons()
}

function updateTimerDisplay() {
  const minutes = Math.floor(cookingState.timer.seconds / 60)
  const seconds = cookingState.timer.seconds % 60
  const display = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  $("#timer-display").text(display)

  // Change color when time is running low
  if (cookingState.timer.seconds <= 60 && cookingState.timer.seconds > 0) {
    $("#timer-display").addClass("timer-warning")
  } else {
    $("#timer-display").removeClass("timer-warning")
  }
}

function updateTimerButtons() {
  if (cookingState.timer.isRunning) {
    $("#timer-start").hide()
    $("#timer-pause").show()
  } else {
    $("#timer-start").show()
    $("#timer-pause").hide()
  }
}

function timerFinished() {
  pauseTimer()
  showNotification("⏰ Temps écoulé!", "info")

  // Play notification sound (if available)
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("RecipeMaster", {
      body: "Votre minuteur de cuisine a sonné!",
      icon: "/favicon.ico",
    })
  }

  // Flash the timer
  $("#timer-display").addClass("timer-finished")
  setTimeout(() => {
    $("#timer-display").removeClass("timer-finished")
  }, 3000)
}

// Navigation functions
function goToPreviousStep() {
  if (cookingState.currentStep > 0) {
    cookingState.currentStep--
    displayCookingMode()
  }
}

function goToNextStep() {
  if (cookingState.currentStep < cookingState.recipe.instructions.length - 1) {
    cookingState.currentStep++
    displayCookingMode()
  }
}

function completeCurrentStep() {
  const currentStepIndex = cookingState.currentStep

  if (!cookingState.completedSteps.includes(currentStepIndex)) {
    cookingState.completedSteps.push(currentStepIndex)
    showNotification("Étape terminée!", "success")
  }

  updateNavigationButtons()

  // Auto-advance to next step if not last step
  if (cookingState.currentStep < cookingState.recipe.instructions.length - 1) {
    setTimeout(() => {
      goToNextStep()
    }, 1000)
  } else {
    // Recipe completed
    showRecipeCompleted()
  }
}

function showRecipeCompleted() {
  const completionContent = `
        <div class="recipe-completed">
            <div class="completion-icon">🎉</div>
            <h2>Félicitations!</h2>
            <p>Vous avez terminé la recette <strong>${cookingState.recipe.title}</strong></p>
            <div class="completion-stats">
                <div class="stat">
                    <span class="stat-number">${cookingState.completedSteps.length}</span>
                    <span class="stat-label">Étapes Terminées</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${cookingState.recipe.time}</span>
                    <span class="stat-label">Temps Total</span>
                </div>
            </div>
            <div class="completion-actions">
                <button class="btn-primary" onclick="rateRecipe(${cookingState.recipe.id})">
                    ⭐ Noter cette Recette
                </button>
                <button class="btn-secondary" onclick="shareRecipe(${cookingState.recipe.id})">
                    📤 Partager
                </button>
                <button class="btn-secondary" onclick="cookAgain()">
                    🔄 Cuisiner à Nouveau
                </button>
            </div>
        </div>
    `

  $("#cooking-content").html(completionContent)
  $("#cooking-navigation").hide()

  // Save completion to user stats
  saveRecipeCompletion(cookingState.recipe.id)
}

function saveRecipeCompletion(recipeId) {
  const completedRecipes = JSON.parse(localStorage.getItem("completedRecipes")) || []
  const completion = {
    recipeId: recipeId,
    completedAt: new Date().toISOString(),
    steps: cookingState.completedSteps.length,
  }

  completedRecipes.push(completion)
  localStorage.setItem("completedRecipes", JSON.stringify(completedRecipes))
}

function rateRecipe(recipeId) {
  const rating = prompt("Notez cette recette de 1 à 5 étoiles:", "5")
  if (rating && rating >= 1 && rating <= 5) {
    // Save rating
    const ratings = JSON.parse(localStorage.getItem("userRatings")) || {}
    ratings[recipeId] = Number.parseInt(rating)
    localStorage.setItem("userRatings", JSON.stringify(ratings))

    showNotification(`Merci pour votre note de ${rating} étoiles!`)
  }
}

function shareRecipe(recipeId) {
  const recipe = getRecipeById(recipeId)
  const shareText = `Je viens de cuisiner "${recipe.title}" avec RecipeMaster! 🍳✨`

  if (navigator.share) {
    navigator.share({
      title: recipe.title,
      text: shareText,
      url: window.location.href,
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(shareText + " " + window.location.href)
    showNotification("Lien copié dans le presse-papiers!")
  }
}

function cookAgain() {
  cookingState.currentStep = 0
  cookingState.completedSteps = []
  resetTimer()
  displayCookingMode()
  $("#cooking-navigation").show()
}

function readStepAloud() {
  if ("speechSynthesis" in window) {
    const step = cookingState.recipe.instructions[cookingState.currentStep]
    const text = `Étape ${step.step}: ${step.title}. ${step.description}`

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "fr-FR"
    utterance.rate = 0.8

    speechSynthesis.speak(utterance)
    showNotification("Lecture à voix haute démarrée")
  } else {
    showNotification("La lecture à voix haute n'est pas supportée sur ce navigateur", "error")
  }
}

// Event listeners for cooking mode
$(document).ready(() => {
  // Timer controls
  $("#timer-start").on("click", startTimer)
  $("#timer-pause").on("click", pauseTimer)
  $("#timer-reset").on("click", resetTimer)

  // Preset timer buttons
  $(".preset-btn").on("click", function () {
    const minutes = $(this).data("minutes")
    setTimer(minutes)
  })

  // Navigation buttons
  $("#prev-step").on("click", goToPreviousStep)
  $("#next-step").on("click", goToNextStep)
  $("#complete-step").on("click", completeCurrentStep)

  // Keyboard shortcuts
  $(document).on("keydown", (e) => {
    if ($("#cooking-modal").is(":visible")) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          goToPreviousStep()
          break
        case "ArrowRight":
          e.preventDefault()
          goToNextStep()
          break
        case " ":
          e.preventDefault()
          if (cookingState.timer.isRunning) {
            pauseTimer()
          } else {
            startTimer()
          }
          break
        case "Enter":
          e.preventDefault()
          completeCurrentStep()
          break
      }
    }
  })
})

// Request notification permission
$(document).ready(() => {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission()
  }
})

// Add timer warning styles
$("<style>")
  .text(`
    .timer-warning {
        color: #ff4757 !important;
        animation: pulse 1s infinite;
    }
    
    .timer-finished {
        color: #ff4757 !important;
        animation: flash 0.5s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
    
    @keyframes flash {
        0% { background: transparent; }
        50% { background: #ff4757; color: white; }
        100% { background: transparent; }
    }
    
    .step-completed {
        opacity: 0.7;
        background: #f8f9fa;
    }
    
    .recipe-completed {
        text-align: center;
        padding: 2rem;
    }
    
    .completion-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .completion-stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin: 2rem 0;
    }
    
    .completion-stats .stat {
        text-align: center;
    }
    
    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: #f5aa20;
    }
    
    .stat-label {
        font-size: 0.9rem;
        color: #666;
    }
    
    .completion-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
`)
  .appendTo("head")
