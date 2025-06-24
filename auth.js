// Enhanced Authentication System
const users = [
  {
    id: 1,
    nom: "admin123",
    email: "admin@recipemaster.com",
    password: "password123",
    role: "admin",
    prenom: "Admin",
    telephone: "+33123456789",
    dateInscription: "2024-01-01",
    statut: "active",
  },
  {
    id: 2,
    nom: "Abla Ghozlani",
    email: "abla@example.com",
    password: "abla123",
    role: "user",
    prenom: "Abla",
    telephone: "+33987654321",
    dateInscription: "2024-01-15",
    statut: "active",
  },
  {
    id: 3,
    nom: "Fatima Benali",
    email: "fatima@example.com",
    password: "alicepasse",
    role: "user",
    prenom: "Fatima",
    telephone: "+33456789123",
    dateInscription: "2024-02-01",
    statut: "active",
  },
  {
    id: 4,
    nom: "Chef Marco",
    email: "marco@recipemaster.com",
    password: "chef123",
    role: "chef",
    prenom: "Marco",
    telephone: "+33789123456",
    dateInscription: "2024-01-10",
    statut: "active",
  },
]

let isLoading = false
const $ = window.jQuery // Declare the $ variable

$(document).ready(() => {
  setupAuthEventListeners()
  setupPasswordValidation()
  setupEmailValidation()
})

function setupAuthEventListeners() {
  // Login form
  $("#form-connexion").on("submit", handleLogin)

  // Registration form
  $("#form-inscription").on("submit", handleRegistration)

  // Password toggle
  $(".password-toggle").on("click", function () {
    const input = $(this).siblings("input")
    const type = input.attr("type") === "password" ? "text" : "password"
    input.attr("type", type)
    $(this).text(type === "password" ? "👁️" : "🙈")
  })

  // Social login buttons
  $(".social-btn").on("click", handleSocialLogin)

  // Demo login buttons
  $(".demo-btn").on("click", function () {
    const role = $(this).hasClass("admin-demo") ? "admin" : "user"
    loginDemo(role)
  })

  // Form input animations
  $(".input-container input")
    .on("focus", function () {
      $(this).parent().addClass("focused")
    })
    .on("blur", function () {
      if (!$(this).val()) {
        $(this).parent().removeClass("focused")
      }
    })
}

function handleLogin(e) {
  e.preventDefault()

  if (isLoading) return

  const email = $("#email").val().trim().toLowerCase()
  const password = $("#password").val().trim()

  if (!email || !password) {
    showAuthError("Veuillez remplir tous les champs")
    return
  }

  startLoading()

  // Simulate API call
  setTimeout(() => {
    const user = users.find(
      (u) => (u.email.toLowerCase() === email || u.nom.toLowerCase() === email) && u.password === password,
    )

    if (user) {
      if (user.statut === "suspended") {
        showAuthError("Votre compte a été suspendu. Contactez l'administrateur.")
        stopLoading()
        return
      }

      loginSuccess(user)
    } else {
      showAuthError("Email/nom d'utilisateur ou mot de passe incorrect")
      stopLoading()
    }
  }, 1500)
}

function handleRegistration(e) {
  e.preventDefault()

  if (isLoading) return

  const formData = {
    prenom: $("#prenom").val().trim(),
    nom: $("#nom").val().trim(),
    email: $("#email").val().trim(),
    telephone: $("#telephone").val().trim(),
    password: $("#password").val(),
    confirmPassword: $("#confirm-password").val(),
    accountType: $('input[name="account-type"]:checked').val(),
    terms: $("#terms").is(":checked"),
    newsletter: $("#newsletter").is(":checked"),
  }

  // Validation
  if (!validateRegistrationForm(formData)) {
    return
  }

  startLoading()

  // Simulate API call
  setTimeout(() => {
    // Check if email already exists
    const existingUser = users.find((u) => u.email.toLowerCase() === formData.email.toLowerCase())

    if (existingUser) {
      showAuthError("Cette adresse email est déjà utilisée")
      stopLoading()
      return
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      password: formData.password,
      role: formData.accountType,
      dateInscription: new Date().toISOString().split("T")[0],
      statut: "active",
    }

    users.push(newUser)
    registrationSuccess(newUser)
  }, 2000)
}

function validateRegistrationForm(data) {
  // Check required fields
  if (!data.prenom || !data.nom || !data.email || !data.password) {
    showAuthError("Veuillez remplir tous les champs obligatoires")
    return false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    showAuthError("Veuillez entrer une adresse email valide")
    return false
  }

  // Password validation
  if (data.password.length < 6) {
    showAuthError("Le mot de passe doit contenir au moins 6 caractères")
    return false
  }

  if (data.password !== data.confirmPassword) {
    showAuthError("Les mots de passe ne correspondent pas")
    return false
  }

  // Terms acceptance
  if (!data.terms) {
    showAuthError("Vous devez accepter les conditions d'utilisation")
    return false
  }

  return true
}

function setupPasswordValidation() {
  $("#password").on("input", function () {
    const password = $(this).val()
    const strength = calculatePasswordStrength(password)
    updatePasswordStrength(strength)
  })
}

function calculatePasswordStrength(password) {
  let score = 0

  if (password.length >= 8) score += 25
  if (password.match(/[a-z]/)) score += 25
  if (password.match(/[A-Z]/)) score += 25
  if (password.match(/[0-9]/)) score += 25
  if (password.match(/[^a-zA-Z0-9]/)) score += 25

  if (score <= 25) return "weak"
  if (score <= 50) return "fair"
  if (score <= 75) return "good"
  return "strong"
}

function updatePasswordStrength(strength) {
  const strengthFill = $(".strength-fill")
  const strengthText = $(".strength-text")

  strengthFill.removeClass("weak fair good strong").addClass(strength)

  const messages = {
    weak: "Faible",
    fair: "Moyen",
    good: "Bon",
    strong: "Fort",
  }

  strengthText.text(`Force du mot de passe: ${messages[strength]}`)
}

function setupEmailValidation() {
  $("#email").on("blur", function () {
    const email = $(this).val()
    const validationIcon = $(this).siblings(".validation-icon")

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(email)) {
        validationIcon.removeClass("invalid").addClass("valid")
      } else {
        validationIcon.removeClass("valid").addClass("invalid")
      }
    } else {
      validationIcon.removeClass("valid invalid")
    }
  })
}

function loginSuccess(user) {
  // Save user session
  localStorage.setItem("currentUser", JSON.stringify(user))

  // Show success animation
  showSuccessAnimation("Connexion réussie!")

  // Redirect based on role
  setTimeout(() => {
    if (user.role === "admin") {
      window.location.href = "admin-dashboard.html"
    } else {
      window.location.href = "dashboard.html"
    }
  }, 2000)
}

function registrationSuccess(user) {
  // Show success animation
  showSuccessAnimation("Inscription réussie!", "Bienvenue dans RecipeMaster!")

  // Auto login after registration
  setTimeout(() => {
    localStorage.setItem("currentUser", JSON.stringify(user))
    if (user.role === "admin") {
      window.location.href = "admin-dashboard.html"
    } else {
      window.location.href = "dashboard.html"
    }
  }, 2500)
}

function loginDemo(role) {
  const demoUser = users.find((u) => u.role === role)
  if (demoUser) {
    // Fill form with demo data
    $("#email").val(demoUser.email)
    $("#password").val(demoUser.password)

    // Trigger login
    setTimeout(() => {
      loginSuccess(demoUser)
    }, 500)
  }
}

function handleSocialLogin() {
  showAuthError("Connexion sociale non disponible en mode démo")
}

function startLoading() {
  isLoading = true
  $(".auth-btn").addClass("loading")
  $(".auth-btn").prop("disabled", true)
}

function stopLoading() {
  isLoading = false
  $(".auth-btn").removeClass("loading")
  $(".auth-btn").prop("disabled", false)
}

function showAuthError(message) {
  // Remove existing error
  $(".auth-error").remove()

  // Create error element
  const errorElement = $(`
        <div class="auth-error">
            <span class="error-icon">⚠️</span>
            <span class="error-message">${message}</span>
        </div>
    `)

  // Insert error
  $(".auth-form").prepend(errorElement)

  // Auto remove after 5 seconds
  setTimeout(() => {
    errorElement.fadeOut(() => errorElement.remove())
  }, 5000)
}

function showSuccessAnimation(title, subtitle = "Redirection en cours...") {
  $("#success-animation .success-content h3").text(title)
  $("#success-animation .success-content p").text(subtitle)
  $("#success-animation").fadeIn()
}

function togglePassword(inputId) {
  const input = $(`#${inputId}`)
  const button = input.siblings(".password-toggle")

  if (input.attr("type") === "password") {
    input.attr("type", "text")
    button.text("🙈")
  } else {
    input.attr("type", "password")
    button.text("👁️")
  }
}

// Add error styles
$("<style>")
  .text(`
    .auth-error {
        background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideDown 0.3s ease-out;
    }
    
    .error-icon {
        font-size: 1.2rem;
    }
    
    .error-message {
        flex: 1;
        font-weight: 500;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .input-container.focused .input-icon {
        color: #f5aa20;
        transform: scale(1.1);
    }
    
    .input-container.focused .input-line {
        width: 100%;
    }
`)
  .appendTo("head")
