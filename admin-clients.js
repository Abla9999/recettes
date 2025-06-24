// Admin Clients Management
let currentPage = 1
const itemsPerPage = 10
let filteredClients = []
let allClients = []
let currentEditingId = null

const $ = window.jQuery // Declare the $ variable

// Sample client data
const clientsData = [
  {
    id: 1,
    prenom: "Sophie",
    nom: "Martin",
    email: "sophie.martin@example.com",
    telephone: "06 12 34 56 78",
    type: "user",
    status: "active",
    dateInscription: "2024-01-15",
    recettesAchetees: 12,
    totalDepense: 299.99,
    avatar: "https://ui-avatars.com/api/?name=Sophie+Martin&background=3498db&color=fff"
  },
  {
    id: 2,
    prenom: "Pierre",
    nom: "Dubois",
    email: "pierre.dubois@example.com",
    telephone: "06 23 45 67 89",
    type: "chef",
    status: "active",
    dateInscription: "2024-01-20",
    recettesAchetees: 0,
    totalDepense: 0,
    avatar: "https://ui-avatars.com/api/?name=Pierre+Dubois&background=e74c3c&color=fff"
  },
  {
    id: 3,
    prenom: "Marie",
    nom: "Leroy",
    email: "marie.leroy@example.com",
    telephone: "06 34 56 78 90",
    type: "user",
    status: "active",
    dateInscription: "2024-02-01",
    recettesAchetees: 8,
    totalDepense: 199.99,
    avatar: "https://ui-avatars.com/api/?name=Marie+Leroy&background=2ecc71&color=fff"
  },
  {
    id: 4,
    prenom: "Jean",
    nom: "Dupont",
    email: "jean.dupont@example.com",
    telephone: "06 45 67 89 01",
    type: "user",
    status: "inactive",
    dateInscription: "2024-01-10",
    recettesAchetees: 3,
    totalDepense: 79.99,
    avatar: "https://ui-avatars.com/api/?name=Jean+Dupont&background=9b59b6&color=fff"
  },
  {
    id: 5,
    prenom: "Emma",
    nom: "Rousseau",
    email: "emma.rousseau@example.com",
    telephone: "06 56 78 90 12",
    type: "user",
    status: "active",
    dateInscription: "2024-03-15",
    recettesAchetees: 5,
    totalDepense: 129.99,
    avatar: "https://ui-avatars.com/api/?name=Emma+Rousseau&background=f39c12&color=fff"
  }
]

$(document).ready(() => {
  initializeClientsPage()
  setupEventListeners()
})

function initializeClientsPage() {
  allClients = [...clientsData]
  filteredClients = [...allClients]
  updateStats()
  displayClients()
  setupPagination()
}

function setupEventListeners() {
  // Search functionality
  $("#client-search").on("input", debounce(handleSearch, 300))
  
  // Filter functionality
  $("#status-filter, #type-filter").on("change", handleFilters)
  
  // Select all checkbox
  $("#select-all").on("change", function() {
    const isChecked = $(this).is(":checked")
    $(".client-checkbox").prop("checked", isChecked)
  })
  
  // Modal close
  $(".modal-close").on("click", closeModal)
  
  // Form submission
  $("#client-form").on("submit", handleClientSubmit)
}

function updateStats() {
  const totalClients = allClients.length
  const newClients = allClients.filter((client) => {
    const clientDate = new Date(client.dateInscription)
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    return clientDate > monthAgo
  }).length
  const activeClients = allClients.filter((client) => client.status === "active").length
  const avgSpending = allClients.length > 0 ? 
    (allClients.reduce((sum, client) => sum + client.totalDepense, 0) / allClients.length).toFixed(2) : 0
  
  $("#total-clients").text(totalClients)
  $("#new-clients").text(newClients)
  $("#active-clients").text(activeClients)
  $("#avg-spending").text(`€${avgSpending}`)
}

function handleSearch() {
  const searchTerm = $("#client-search").val().toLowerCase()
  applyFilters(searchTerm)
}

function handleFilters() {
  applyFilters()
}

function applyFilters(searchTerm = "") {
  const statusFilter = $("#status-filter").val()
  const typeFilter = $("#type-filter").val()
  
  filteredClients = allClients.filter((client) => {
    const matchesSearch = searchTerm === "" || 
      client.prenom.toLowerCase().includes(searchTerm) ||
      client.nom.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm)
    
    const matchesStatus = statusFilter === "" || client.status === statusFilter
    const matchesType = typeFilter === "" || client.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })
  
  currentPage = 1
  displayClients()
  setupPagination()
}

function displayClients() {
  const container = $("#clients-tbody")
  container.empty()
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageClients = filteredClients.slice(startIndex, endIndex)
  
  if (pageClients.length === 0) {
    container.append(`
      <tr>
        <td colspan="10" class="empty-state">
          <h3>Aucun client trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </td>
      </tr>
    `)
    return
  }
  
  pageClients.forEach((client) => {
    container.append(createClientRow(client))
  })
}

function createClientRow(client) {
  const statusClass = client.status === "active" ? "status-completed" : 
                     client.status === "inactive" ? "status-pending" : "status-processing"
  const statusText = {
    "active": "Actif",
    "inactive": "Inactif",
    "suspended": "Suspendu"
  }
  
  const typeText = {
    "user": "Utilisateur",
    "chef": "Chef",
    "admin": "Administrateur"
  }
  
  return `
    <tr>
      <td>
        <input type="checkbox" class="client-checkbox" value="${client.id}">
      </td>
      <td>
        <img src="${client.avatar}" alt="${client.prenom} ${client.nom}" 
             style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"
             onerror="this.style.display='none'">
      </td>
      <td>${client.prenom} ${client.nom}</td>
      <td>${client.email}</td>
      <td>${typeText[client.type]}</td>
      <td>${formatDate(client.dateInscription)}</td>
      <td>${client.recettesAchetees}</td>
      <td>€${client.totalDepense}</td>
      <td>
        <span class="status-badge ${statusClass}">${statusText[client.status]}</span>
      </td>
      <td>
        <button class="btn-action" onclick="viewClient(${client.id})">👁️</button>
        <button class="btn-action" onclick="editClient(${client.id})">✏️</button>
        <button class="btn-danger" onclick="deleteClient(${client.id})">🗑️</button>
      </td>
    </tr>
  `
}

function setupPagination() {
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const container = $("#page-numbers")
  container.empty()
  
  for (let i = 1; i <= totalPages; i++) {
    const pageClass = i === currentPage ? "page-number active" : "page-number"
    container.append(`<span class="${pageClass}" onclick="goToPage(${i})">${i}</span>`)
  }
}

function goToPage(page) {
  currentPage = page
  displayClients()
  setupPagination()
}

function previousPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1)
  }
}

function nextPage() {
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  if (currentPage < totalPages) {
    goToPage(currentPage + 1)
  }
}

function openAddClientModal() {
  currentEditingId = null
  $("#modal-title").text("Ajouter un Client")
  $("#client-form")[0].reset()
  $("#client-modal").show()
}

function editClient(clientId) {
  const client = allClients.find((c) => c.id === clientId)
  if (!client) return
  
  currentEditingId = clientId
  $("#modal-title").text("Modifier le Client")
  
  // Fill form with client data
  $("#client-prenom").val(client.prenom)
  $("#client-nom").val(client.nom)
  $("#client-email").val(client.email)
  $("#client-telephone").val(client.telephone)
  $("#client-type").val(client.type)
  $("#client-status").val(client.status)
  $("#client-notes").val(client.notes || "")
  
  $("#client-modal").show()
}

function viewClient(clientId) {
  const client = allClients.find((c) => c.id === clientId)
  if (!client) return
  
  const statusText = {
    "active": "Actif",
    "inactive": "Inactif",
    "suspended": "Suspendu"
  }
  
  const typeText = {
    "user": "Utilisateur",
    "chef": "Chef",
    "admin": "Administrateur"
  }
  
  $("#client-details-content").html(`
    <div style="padding: 2rem;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <img src="${client.avatar}" alt="${client.prenom} ${client.nom}" 
             style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;"
             onerror="this.style.display='none'">
        <div>
          <h3>${client.prenom} ${client.nom}</h3>
          <p>${client.email}</p>
          <span class="status-badge ${client.status === "active" ? "status-completed" : "status-pending"}">
            ${statusText[client.status]}
          </span>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <h4>Informations Personnelles</h4>
          <p><strong>Téléphone:</strong> ${client.telephone}</p>
          <p><strong>Type de compte:</strong> ${typeText[client.type]}</p>
          <p><strong>Date d'inscription:</strong> ${formatDate(client.dateInscription)}</p>
        </div>
        <div>
          <h4>Statistiques</h4>
          <p><strong>Recettes achetées:</strong> ${client.recettesAchetees}</p>
          <p><strong>Total dépensé:</strong> €${client.totalDepense}</p>
        </div>
      </div>
    </div>
  `)
  
  $("#client-details-modal").show()
}

function deleteClient(clientId) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce client?")) {
    allClients = allClients.filter((c) => c.id !== clientId)
    applyFilters()
    updateStats()
    showNotification("Client supprimé avec succès!", "success")
  }
}

function handleClientSubmit(e) {
  e.preventDefault()
  
  const formData = {
    prenom: $("#client-prenom").val(),
    nom: $("#client-nom").val(),
    email: $("#client-email").val(),
    telephone: $("#client-telephone").val(),
    type: $("#client-type").val(),
    status: $("#client-status").val(),
    notes: $("#client-notes").val()
  }
  
  if (currentEditingId) {
    // Update existing client
    const index = allClients.findIndex((c) => c.id === currentEditingId)
    if (index !== -1) {
      allClients[index] = { ...allClients[index], ...formData }
      showNotification("Client modifié avec succès!", "success")
    }
  } else {
    // Add new client
    const newClient = {
      id: Math.max(...allClients.map((c) => c.id)) + 1,
      ...formData,
      dateInscription: new Date().toISOString().split("T")[0],
      recettesAchetees: 0,
      totalDepense: 0,
      avatar: `https://ui-avatars.com/api/?name=${formData.prenom}+${formData.nom}&background=3498db&color=fff`
    }
    allClients.push(newClient)
    showNotification("Client ajouté avec succès!", "success")
  }
  
  closeModal()
  applyFilters()
  updateStats()
}

function clearFilters() {
  $("#client-search").val("")
  $("#status-filter").val("")
  $("#type-filter").val("")
  applyFilters()
}

function exportClients() {
  // Simulate export functionality
  showNotification("Export en cours...", "success")
  setTimeout(() => {
    showNotification("Export terminé", "success")
  }, 2000)
}

function closeModal() {
  $(".modal").hide()
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", { 
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric" 
  })
}

function showNotification(message, type = "success") {
  const notification = $(`
    <div class="notification ${type}" style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : "#ef4444"};
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
  `)
  
  $("body").append(notification)
  
  setTimeout(() => {
    notification.css("transform", "translateX(0)")
  }, 100)
  
  setTimeout(() => {
    notification.css("transform", "translateX(100%)")
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
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

// Add additional styles
$("<style>")
  .text(`
    .client-avatar {
        border-radius: 50%;
        object-fit: cover;
    }
    
    .client-avatar-large {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .client-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #ecf0f1;
    }
    
    .client-info h2 {
        margin-bottom: 0.5rem;
        color: #2c3e50;
    }
    
    .client-email {
        color: #7f8c8d;
        margin-bottom: 0.5rem;
    }
    
    .client-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .stat-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #ecf0f1;
    }
    
    .stat-label {
        font-weight: bold;
        color: #2c3e50;
    }
    
    .stat-value {
        color: #7f8c8d;
    }
    
    .client-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .type-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.2rem 0.5rem;
        background: #f8f9fa;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    .empty-state {
        text-align: center;
        padding: 3rem;
        color: #7f8c8d;
    }
    
    .empty-state h3 {
        margin-bottom: 1rem;
        color: #2c3e50;
    }
`)
  .appendTo("head")
