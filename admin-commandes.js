// Admin Orders Management
let currentPage = 1
const itemsPerPage = 10
let filteredOrders = []
let allOrders = []
let currentEditingId = null

const $ = window.jQuery // Declare the $ variable

// Sample orders data
const ordersData = [
  {
    id: "ORD-001",
    client: "Sophie Martin",
    clientEmail: "sophie.martin@example.com",
    recipes: [
      { name: "Risotto aux Truffes", quantity: 1, price: 29.99 }
    ],
    total: 29.99,
    status: "completed",
    date: "2024-03-15T10:30:00",
    paymentMethod: "card",
    paymentStatus: "paid"
  },
  {
    id: "ORD-002",
    client: "Pierre Dubois",
    clientEmail: "pierre.dubois@example.com",
    recipes: [
      { name: "Ramen Authentique", quantity: 1, price: 24.99 },
      { name: "Cake au Chocolat", quantity: 1, price: 19.99 }
    ],
    total: 44.98,
    status: "processing",
    date: "2024-03-15T11:15:00",
    paymentMethod: "card",
    paymentStatus: "paid"
  },
  {
    id: "ORD-003",
    client: "Marie Leroy",
    clientEmail: "marie.leroy@example.com",
    recipes: [
      { name: "Tarte Tatin Premium", quantity: 1, price: 19.99 }
    ],
    total: 19.99,
    status: "pending",
    date: "2024-03-15T12:00:00",
    paymentMethod: "card",
    paymentStatus: "pending"
  },
  {
    id: "ORD-004",
    client: "Jean Dupont",
    clientEmail: "jean.dupont@example.com",
    recipes: [
      { name: "Bouillabaisse Marseillaise", quantity: 1, price: 34.99 }
    ],
    total: 34.99,
    status: "completed",
    date: "2024-03-15T13:45:00",
    paymentMethod: "card",
    paymentStatus: "paid"
  },
  {
    id: "ORD-005",
    client: "Emma Rousseau",
    clientEmail: "emma.rousseau@example.com",
    recipes: [
      { name: "Cake aux Fruits Secs", quantity: 1, price: 24.99 },
      { name: "Cake aux Fruits Rouges", quantity: 1, price: 22.99 }
    ],
    total: 47.98,
    status: "cancelled",
    date: "2024-03-15T14:20:00",
    paymentMethod: "card",
    paymentStatus: "refunded"
  }
]

$(document).ready(() => {
  initializeOrdersPage()
  setupEventListeners()
})

function initializeOrdersPage() {
  allOrders = [...ordersData]
  filteredOrders = [...allOrders]
  updateStats()
  displayOrders()
  setupPagination()
}

function setupEventListeners() {
  // Search functionality
  $("#order-search").on("input", debounce(handleSearch, 300))
  
  // Filter functionality
  $("#status-filter, #period-filter").on("change", handleFilters)
  $("#date-from, #date-to").on("change", handleFilters)
  
  // Select all checkbox
  $("#select-all").on("change", function() {
    const isChecked = $(this).is(":checked")
    $(".order-checkbox").prop("checked", isChecked)
  })
  
  // Modal close
  $(".modal-close").on("click", closeModal)
  
  // Status form submission
  $("#status-form").on("submit", handleStatusSubmit)
}

function updateStats() {
  const totalOrders = allOrders.length
  const pendingOrders = allOrders.filter((o) => o.status === "pending").length
  const completedOrders = allOrders.filter((o) => o.status === "completed").length
  const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0)
  
  $("#total-orders").text(totalOrders)
  $("#pending-orders").text(pendingOrders)
  $("#completed-orders").text(completedOrders)
  $("#total-revenue").text(`€${totalRevenue.toFixed(2)}`)
}

function handleSearch() {
  const searchTerm = $("#order-search").val().toLowerCase()
  applyFilters(searchTerm)
}

function handleFilters() {
  applyFilters()
}

function applyFilters(searchTerm = "") {
  const statusFilter = $("#status-filter").val()
  const periodFilter = $("#period-filter").val()
  const dateFrom = $("#date-from").val()
  const dateTo = $("#date-to").val()
  
  filteredOrders = allOrders.filter((order) => {
    const matchesSearch = searchTerm === "" || 
      order.id.toLowerCase().includes(searchTerm) ||
      order.client.toLowerCase().includes(searchTerm) ||
      order.recipes.some((recipe) => recipe.name.toLowerCase().includes(searchTerm))
    
    const matchesStatus = statusFilter === "" || order.status === statusFilter
    
    let matchesPeriod = true
    if (periodFilter) {
      const orderDate = new Date(order.date)
      const now = new Date()
      
      switch (periodFilter) {
        case "today":
          matchesPeriod = orderDate.toDateString() === now.toDateString()
          break
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesPeriod = orderDate >= weekAgo
          break
        case "month":
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
          matchesPeriod = orderDate >= monthAgo
          break
        case "year":
          const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
          matchesPeriod = orderDate >= yearAgo
          break
      }
    }
    
    let matchesDateRange = true
    if (dateFrom || dateTo) {
      const orderDate = new Date(order.date)
      if (dateFrom) {
        const fromDate = new Date(dateFrom)
        matchesDateRange = matchesDateRange && orderDate >= fromDate
      }
      if (dateTo) {
        const toDate = new Date(dateTo)
        toDate.setHours(23, 59, 59)
        matchesDateRange = matchesDateRange && orderDate <= toDate
      }
    }
    
    return matchesSearch && matchesStatus && matchesPeriod && matchesDateRange
  })
  
  currentPage = 1
  displayOrders()
  setupPagination()
}

function displayOrders() {
  const container = $("#orders-tbody")
  container.empty()
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageOrders = filteredOrders.slice(startIndex, endIndex)
  
  if (pageOrders.length === 0) {
    container.append(`
      <tr>
        <td colspan="10" class="empty-state">
          <h3>Aucune commande trouvée</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </td>
      </tr>
    `)
    return
  }
  
  pageOrders.forEach((order) => {
    container.append(createOrderRow(order))
  })
}

function createOrderRow(order) {
  const statusClass = order.status === "completed" ? "status-completed" : 
                     order.status === "processing" ? "status-processing" : 
                     order.status === "cancelled" ? "status-processing" : "status-pending"
  
  const statusText = {
    "pending": "En Attente",
    "processing": "En Traitement",
    "completed": "Terminée",
    "cancelled": "Annulée"
  }
  
  const paymentText = {
    "paid": "Payé",
    "pending": "En Attente",
    "refunded": "Remboursé"
  }
  
  const recipesText = order.recipes.map((recipe) => 
    `${recipe.name} (x${recipe.quantity})`
  ).join(", ")
  
  return `
    <tr>
      <td>
        <input type="checkbox" class="order-checkbox" value="${order.id}">
      </td>
      <td><strong>${order.id}</strong></td>
      <td>${order.client}</td>
      <td>${recipesText}</td>
      <td>${order.recipes.reduce((sum, recipe) => sum + recipe.quantity, 0)}</td>
      <td><strong>€${order.total.toFixed(2)}</strong></td>
      <td>${formatDate(order.date)}</td>
      <td>
        <span class="status-badge ${statusClass}">${statusText[order.status]}</span>
      </td>
      <td>
        <span class="status-badge ${order.paymentStatus === "paid" ? "status-completed" : "status-pending"}">
          ${paymentText[order.paymentStatus]}
        </span>
      </td>
      <td>
        <button class="btn-action" onclick="viewOrder('${order.id}')">👁️</button>
        <button class="btn-action" onclick="updateOrderStatus('${order.id}')">✏️</button>
      </td>
    </tr>
  `
}

function setupPagination() {
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const container = $("#page-numbers")
  container.empty()
  
  for (let i = 1; i <= totalPages; i++) {
    const pageClass = i === currentPage ? "page-number active" : "page-number"
    container.append(`<span class="${pageClass}" onclick="goToPage(${i})">${i}</span>`)
  }
}

function goToPage(page) {
  currentPage = page
  displayOrders()
  setupPagination()
}

function previousPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1)
  }
}

function nextPage() {
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  if (currentPage < totalPages) {
    goToPage(currentPage + 1)
  }
}

function viewOrder(orderId) {
  const order = allOrders.find((o) => o.id === orderId)
  if (!order) return
  
  const statusText = {
    "pending": "En Attente",
    "processing": "En Traitement",
    "completed": "Terminée",
    "cancelled": "Annulée"
  }
  
  const paymentText = {
    "paid": "Payé",
    "pending": "En Attente",
    "refunded": "Remboursé"
  }
  
  $("#order-details-content").html(`
    <div style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h3>Commande ${order.id}</h3>
          <p>${order.client} - ${order.clientEmail}</p>
        </div>
        <div>
          <span class="status-badge ${order.status === "completed" ? "status-completed" : "status-pending"}">
            ${statusText[order.status]}
          </span>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div>
          <h4>Détails de la Commande</h4>
          <p><strong>Date:</strong> ${formatDate(order.date)}</p>
          <p><strong>Total:</strong> €${order.total.toFixed(2)}</p>
          <p><strong>Méthode de paiement:</strong> ${order.paymentMethod}</p>
          <p><strong>Statut du paiement:</strong> 
            <span class="status-badge ${order.paymentStatus === "paid" ? "status-completed" : "status-pending"}">
              ${paymentText[order.paymentStatus]}
            </span>
          </p>
        </div>
        <div>
          <h4>Recettes Commandées</h4>
          ${order.recipes.map((recipe) => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>${recipe.name} (x${recipe.quantity})</span>
              <span>€${recipe.price.toFixed(2)}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `)
  
  $("#order-details-modal").show()
}

function updateOrderStatus(orderId) {
  const order = allOrders.find((o) => o.id === orderId)
  if (!order) return
  
  currentEditingId = orderId
  $("#new-status").val(order.status)
  $("#status-note").val("")
  $("#status-modal").show()
}

function handleStatusSubmit(e) {
  e.preventDefault()
  
  const newStatus = $("#new-status").val()
  const note = $("#status-note").val()
  
  const orderIndex = allOrders.findIndex((o) => o.id === currentEditingId)
  if (orderIndex !== -1) {
    allOrders[orderIndex].status = newStatus
    if (note) {
      allOrders[orderIndex].statusNote = note
    }
    
    applyFilters()
    updateStats()
    showNotification("Statut de la commande mis à jour", "success")
  }
  
  closeModal()
}

function clearFilters() {
  $("#order-search").val("")
  $("#status-filter").val("")
  $("#period-filter").val("")
  $("#date-from").val("")
  $("#date-to").val("")
  applyFilters()
}

function exportOrders() {
  // Simulate export functionality
  showNotification("Export en cours...", "success")
  setTimeout(() => {
    showNotification("Export terminé", "success")
  }, 2000)
}

function refreshOrders() {
  // Simulate refresh functionality
  showNotification("Commandes actualisées", "success")
}

function closeModal() {
  $(".modal").hide()
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", { 
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
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

// Add orders-specific styles
$("<style>")
  .text(`
    .client-info {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }
    
    .client-name {
        font-weight: 500;
        color: #2c3e50;
    }
    
    .client-email {
        font-size: 0.8rem;
        color: #7f8c8d;
    }
    
    .recipes-info {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: help;
    }
    
    .payment-badge {
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
        text-transform: uppercase;
    }
    
    .payment-pending {
        background: #fff3cd;
        color: #856404;
    }
    
    .payment-paid {
        background: #d4edda;
        color: #155724;
    }
    
    .payment-failed {
        background: #f8d7da;
        color: #721c24;
    }
    
    .payment-refunded {
        background: #cce7ff;
        color: #004085;
    }
    
    .order-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #ecf0f1;
    }
    
    .order-id-section {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .order-id-section h2 {
        color: #2c3e50;
        margin: 0;
    }
    
    .order-date {
        color: #7f8c8d;
        font-size: 0.9rem;
    }
    
    .order-sections {
        display: grid;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .section h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }
    
    .client-details p,
    .payment-details p {
        margin-bottom: 0.5rem;
        color: #2c3e50;
    }
    
    .recipes-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .recipe-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .recipe-info {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }
    
    .recipe-price {
        color: #7f8c8d;
        font-size: 0.9rem;
    }
    
    .recipe-total {
        font-weight: bold;
        color: #27ae60;
        font-size: 1.1rem;
    }
    
    .order-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding-top: 1rem;
        border-top: 2px solid #ecf0f1;
    }
    
    @media (max-width: 768px) {
        .order-header {
            flex-direction: column;
            gap: 1rem;
        }
        
        .order-id-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .recipe-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .order-actions {
            flex-direction: column;
        }
    }
`)
  .appendTo("head")
