// Admin Dashboard Management
let salesChart, revenueChart, ordersChart, clientsChart, recipesChart;

const $ = window.jQuery; // Declare the $ variable

// Sample data for dashboard
const dashboardData = {
    totalRevenue: 15847.50,
    totalOrders: 342,
    totalClients: 156,
    totalRecipes: 89,
    avgOrderValue: 46.35,
    conversionRate: 3.2,
    avgRating: 4.7,
    activeChefs: 12,
    
    recentOrders: [
        {
            id: "ORD-001",
            client: "Sophie Martin",
            recipe: "Risotto aux Truffes",
            amount: 29.99,
            status: "completed",
            time: "Il y a 5 min"
        },
        {
            id: "ORD-002",
            client: "Pierre Dubois",
            recipe: "Ramen Authentique",
            amount: 24.99,
            status: "processing",
            time: "Il y a 12 min"
        },
        {
            id: "ORD-003",
            client: "Marie Leroy",
            recipe: "Tarte Tatin Premium",
            amount: 19.99,
            status: "pending",
            time: "Il y a 18 min"
        },
        {
            id: "ORD-004",
            client: "Jean Dupont",
            recipe: "Bouillabaisse Marseillaise",
            amount: 34.99,
            status: "completed",
            time: "Il y a 25 min"
        }
    ],
    
    topRecipes: [
        {
            id: 1,
            title: "Risotto aux Truffes",
            chef: "Chef Marco",
            sales: 45,
            revenue: 1349.55,
            rating: 4.9
        },
        {
            id: 2,
            title: "Ramen Authentique",
            chef: "Chef Yuki",
            sales: 38,
            revenue: 949.62,
            rating: 4.8
        },
        {
            id: 3,
            title: "Tarte Tatin Premium",
            chef: "Chef Pierre",
            sales: 32,
            revenue: 639.68,
            rating: 4.7
        },
        {
            id: 4,
            title: "Bouillabaisse Marseillaise",
            chef: "Chef Antoine",
            sales: 28,
            revenue: 979.72,
            rating: 4.6
        }
    ],
    
    newClients: [
        {
            id: 1,
            name: "Emma Rousseau",
            email: "emma@example.com",
            joinDate: "2024-03-15",
            avatar: "https://ui-avatars.com/api/?name=Emma+Rousseau&background=3498db&color=fff"
        },
        {
            id: 2,
            name: "Lucas Bernard",
            email: "lucas@example.com",
            joinDate: "2024-03-14",
            avatar: "https://ui-avatars.com/api/?name=Lucas+Bernard&background=e74c3c&color=fff"
        },
        {
            id: 3,
            name: "Camille Moreau",
            email: "camille@example.com",
            joinDate: "2024-03-13",
            avatar: "https://ui-avatars.com/api/?name=Camille+Moreau&background=2ecc71&color=fff"
        },
        {
            id: 4,
            name: "Hugo Petit",
            email: "hugo@example.com",
            joinDate: "2024-03-12",
            avatar: "https://ui-avatars.com/api/?name=Hugo+Petit&background=9b59b6&color=fff"
        }
    ],
    
    activities: [
        {
            type: "order",
            message: "Nouvelle commande de Sophie Martin",
            time: "Il y a 5 min",
            icon: "🛒"
        },
        {
            type: "client",
            message: "Emma Rousseau s'est inscrite",
            time: "Il y a 15 min",
            icon: "👥"
        },
        {
            type: "recipe",
            message: "Chef Marco a publié une nouvelle recette",
            time: "Il y a 32 min",
            icon: "📚"
        },
        {
            type: "payment",
            message: "Paiement de 29.99€ reçu",
            time: "Il y a 45 min",
            icon: "💰"
        },
        {
            type: "review",
            message: "Nouvelle évaluation 5⭐ pour Risotto aux Truffes",
            time: "Il y a 1h",
            icon: "⭐"
        }
    ]
};

$(document).ready(() => {
    initializeDashboard();
    setupEventListeners();
});

function initializeDashboard() {
    loadUserInfo();
    updateMainStats();
    loadRecentOrders();
    loadTopRecipes();
    loadNewClients();
    loadActivityFeed();
    initializeCharts();
    updateQuickStats();
}

function setupEventListeners() {
    $('#chart-period').on('change', updateSalesChart);
    
    // Auto-refresh every 30 seconds
    setInterval(refreshDashboard, 30000);
}

function loadUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.prenom) {
        $('#admin-name').text(`${currentUser.prenom} ${currentUser.nom}`);
    }
}

function updateMainStats() {
    $('#total-revenue').text(`€${dashboardData.totalRevenue.toLocaleString()}`);
    $('#total-orders').text(dashboardData.totalOrders.toLocaleString());
    $('#total-clients').text(dashboardData.totalClients.toLocaleString());
    $('#total-recipes').text(dashboardData.totalRecipes.toLocaleString());
}

function updateQuickStats() {
    $('#avg-order-value').text(`€${dashboardData.avgOrderValue}`);
    $('#conversion-rate').text(`${dashboardData.conversionRate}%`);
    $('#avg-rating').text(dashboardData.avgRating);
    $('#active-chefs').text(dashboardData.activeChefs);
}

function loadRecentOrders() {
    const container = $('#recent-orders');
    container.empty();
    
    dashboardData.recentOrders.forEach(order => {
        container.append(createOrderElement(order));
    });
}

function createOrderElement(order) {
    const statusClass = order.status === 'completed' ? 'status-completed' : 
                       order.status === 'processing' ? 'status-processing' : 'status-pending';
    
    return `
        <div class="order-item">
            <div class="item-info">
                <h4>${order.id} - ${order.client}</h4>
                <p>${order.recipe}</p>
            </div>
            <div class="item-meta">
                <div class="amount">€${order.amount}</div>
                <div class="time">${order.time}</div>
                <span class="status-badge ${statusClass}">${order.status}</span>
            </div>
        </div>
    `;
}

function loadTopRecipes() {
    const container = $('#top-recipes');
    container.empty();
    
    dashboardData.topRecipes.forEach((recipe, index) => {
        container.append(createRecipeElement(recipe, index + 1));
    });
}

function createRecipeElement(recipe, rank) {
    return `
        <div class="recipe-item">
            <div class="item-info">
                <h4>#${rank} ${recipe.title}</h4>
                <p>${recipe.chef} • ${recipe.sales} ventes</p>
            </div>
            <div class="item-meta">
                <div class="amount">€${recipe.revenue}</div>
                <div class="recipe-rating">⭐ ${recipe.rating}</div>
            </div>
        </div>
    `;
}

function loadNewClients() {
    const container = $('#new-clients');
    container.empty();
    
    dashboardData.newClients.forEach(client => {
        container.append(createClientElement(client));
    });
}

function createClientElement(client) {
    return `
        <div class="client-item">
            <div class="item-avatar">
                <img src="${client.avatar}" alt="${client.name}" onerror="this.style.display='none'">
            </div>
            <div class="item-info">
                <h4>${client.name}</h4>
                <p>${client.email}</p>
            </div>
            <div class="item-meta">
                <div class="time">${formatDate(client.joinDate)}</div>
            </div>
        </div>
    `;
}

function loadActivityFeed() {
    const container = $('#activity-feed');
    container.empty();
    
    dashboardData.activities.forEach(activity => {
        container.append(createActivityElement(activity));
    });
}

function createActivityElement(activity) {
    return `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `;
}

function initializeCharts() {
    initializeSalesChart();
    initializeMiniCharts();
}

function initializeSalesChart() {
    const ctx = document.getElementById('sales-chart').getContext('2d');
    const data = generateSalesData(30);
    
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Ventes (€)',
                data: data.sales,
                borderColor: '#fbbf24',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Commandes',
                data: data.orders,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function initializeMiniCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            datasets: [{
                data: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
                borderColor: '#fbbf24',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            elements: {
                point: { radius: 0 }
            }
        }
    });

    // Orders Chart
    const ordersCtx = document.getElementById('orders-chart').getContext('2d');
    ordersChart = new Chart(ordersCtx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            datasets: [{
                data: [25, 35, 28, 42, 38, 45, 40],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            elements: {
                point: { radius: 0 }
            }
        }
    });

    // Clients Chart
    const clientsCtx = document.getElementById('clients-chart').getContext('2d');
    clientsChart = new Chart(clientsCtx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            datasets: [{
                data: [8, 12, 10, 15, 13, 18, 16],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            elements: {
                point: { radius: 0 }
            }
        }
    });

    // Recipes Chart
    const recipesCtx = document.getElementById('recipes-chart').getContext('2d');
    recipesChart = new Chart(recipesCtx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            datasets: [{
                data: [3, 5, 2, 7, 4, 6, 5],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            elements: {
                point: { radius: 0 }
            }
        }
    });
}

function generateSalesData(days) {
    const labels = [];
    const sales = [];
    const orders = [];
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }));
        
        // Generate realistic data
        const baseSales = 400 + Math.random() * 200;
        const baseOrders = 15 + Math.random() * 10;
        
        sales.push(Math.round(baseSales));
        orders.push(Math.round(baseOrders));
    }
    
    return { labels, sales, orders };
}

function updateSalesChart() {
    const days = parseInt($('#chart-period').val());
    const data = generateSalesData(days);
    
    salesChart.data.labels = data.labels;
    salesChart.data.datasets[0].data = data.sales;
    salesChart.data.datasets[1].data = data.orders;
    salesChart.update();
}

function refreshDashboard() {
    // Simulate data refresh
    updateMainStats();
    updateQuickStats();
    showNotification('Dashboard actualisé', 'success');
}

function refreshActivity() {
    // Simulate activity refresh
    loadActivityFeed();
    showNotification('Activité actualisée', 'success');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = $(`
        <div class="notification ${type}" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
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
    
    // Animate in
    setTimeout(() => {
        notification.css('transform', 'translateX(0)');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.css('transform', 'translateX(100%)');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add dashboard-specific styles
$('<style>').text(`
    .welcome-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 3rem;
        margin-bottom: 2rem;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    
    .welcome-content h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        animation: slideInLeft 0.8s ease-out;
    }
    
    .welcome-content p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }
    
    .quick-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .quick-btn {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 1rem 2rem;
        border-radius: 15px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .quick-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .welcome-illustration {
        position: relative;
        width: 200px;
        height: 200px;
    }
    
    .floating-chef {
        font-size: 4rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: bounce 2s infinite;
    }
    
    .floating-food {
        font-size: 2rem;
        position: absolute;
        animation: float 3s ease-in-out infinite;
    }
    
    .floating-food:nth-child(2) {
        top: 20%;
        left: 20%;
        animation-delay: 0s;
    }
    
    .floating-food:nth-child(3) {
        top: 20%;
        right: 20%;
        animation-delay: 1s;
    }
    
    .floating-food:nth-child(4) {
        bottom: 20%;
        left: 30%;
        animation-delay: 2s;
    }
    
    .main-stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .stat-card {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
    }
    
    .stat-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #f39c12, #e67e22);
    }
    
    .stat-card.revenue::before {
        background: linear-gradient(90deg, #27ae60, #2ecc71);
    }
    
    .stat-card.orders::before {
        background: linear-gradient(90deg, #3498db, #5dade2);
    }
    
    .stat-card.clients::before {
        background: linear-gradient(90deg, #e74c3c, #ec7063);
    }
    
    .stat-card.recipes::before {
        background: linear-gradient(90deg, #9b59b6, #bb8fce);
    }
    
    .stat-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
    }
    
    .stat-info h3 {
        font-size: 2.5rem;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }
    
    .stat-info p {
        color: #7f8c8d;
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }
    
    .stat-change {
        font-size: 0.9rem;
        font-weight: bold;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
    }
    
    .stat-change.positive {
        background: #d5f4e6;
        color: #27ae60;
    }
    
    .stat-change.negative {
        background: #fadbd8;
        color: #e74c3c;
    }
    
    .stat-chart {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        width: 80px;
        height: 40px;
        opacity: 0.7;
    }
    
    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .dashboard-card {
        background: white;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .dashboard-card.large {
        grid-column: span 2;
    }
    
    .dashboard-card.full-width {
        grid-column: 1 / -1;
    }
    
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 2px solid #f8f9fa;
        background: #f8f9fa;
    }
    
    .card-header h3 {
        color: #2c3e50;
        font-size: 1.3rem;
        margin: 0;
    }
    
    .view-all-btn {
        color: #f39c12;
        text-decoration: none;
        font-weight: bold;
        font-size: 0.9rem;
        transition: color 0.3s ease;
    }
    
    .view-all-btn:hover {
        color: #e67e22;
    }
    
    .card-content {
        padding: 1.5rem;
    }
    
    .order-item, .recipe-item, .client-item, .activity-item {
        padding: 1rem;
        border-bottom: 1px solid #f8f9fa;
        transition: background 0.3s ease;
    }
    
    .order-item:hover, .recipe-item:hover, .client-item:hover, .activity-item:hover {
        background: #f8f9fa;
    }
    
    .order-item:last-child, .recipe-item:last-child, .client-item:last-child, .activity-item:last-child {
        border-bottom: none;
    }
    
    .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .order-id {
        font-weight: bold;
        color: #2c3e50;
    }
    
    .order-amount {
        font-weight: bold;
        color: #27ae60;
        font-size: 1.1rem;
    }
    
    .order-details {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        margin-bottom: 0.5rem;
    }
    
    .client-name {
        font-weight: 500;
        color: #2c3e50;
    }
    
    .recipe-name {
        color: #7f8c8d;
        font-size: 0.9rem;
    }
    
    .order-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .order-time {
        color: #95a5a6;
        font-size: 0.8rem;
    }
    
    .recipe-item {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .recipe-rank {
        font-size: 1.5rem;
        font-weight: bold;
        min-width: 40px;
    }
    
    .recipe-title {
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 0.3rem;
    }
    
    .recipe-chef {
        color: #7f8c8d;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .recipe-stats {
        display: flex;
        gap: 1rem;
        font-size: 0.8rem;
    }
    
    .recipe-sales {
        color: #3498db;
    }
    
    .recipe-revenue {
        color: #27ae60;
        font-weight: bold;
    }
    
    .recipe-rating {
        color: #f39c12;
    }
    
    .client-item {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .client-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .client-name {
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 0.3rem;
    }
    
    .client-email {
        color: #7f8c8d;
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
    }
    
    .client-date {
        color: #95a5a6;
        font-size: 0.8rem;
    }
    
    .activity-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .activity-icon {
        font-size: 1.5rem;
        min-width: 30px;
    }
    
    .activity-message {
        color: #2c3e50;
        margin-bottom: 0.3rem;
    }
    
    .activity-time {
        color: #95a5a6;
        font-size: 0.8rem;
    }
    
    .system-status {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .status-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .status-label {
        font-weight: 500;
        color: #2c3e50;
    }
    
    .status-indicator {
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    .status-indicator.online {
        background: #d5f4e6;
        color: #27ae60;
    }
    
    .status-indicator.warning {
        background: #fff3cd;
        color: #856404;
    }
    
    .status-indicator.offline {
        background: #fadbd8;
        color: #e74c3c;
    }
    
    .quick-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .quick-stat {
        text-align: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 10px;
    }
    
    .quick-stat-number {
        display: block;
        font-size: 1.8rem;
        font-weight: bold;
        color: #f39c12;
        margin-bottom: 0.5rem;
    }
    
    .quick-stat-label {
        color: #7f8c8d;
        font-size: 0.9rem;
    }
    
    .chart-controls {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    
    .chart-controls select {
        padding: 0.5rem 1rem;
        border: 2px solid #ecf0f1;
        border-radius: 8px;
        background: white;
        cursor: pointer;
    }
    
    .refresh-btn {
        background: #f39c12;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.3s ease;
    }
    
    .refresh-btn:hover {
        background: #e67e22;
    }
    
    .activity-section {
        margin-top: 2rem;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, -50%) translateY(0);
        }
        40% {
            transform: translate(-50%, -50%) translateY(-20px);
        }
        60% {
            transform: translate(-50%, -50%) translateY(-10px);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }
    
    @media (max-width: 1200px) {
        .dashboard-card.large {
            grid-column: span 1;
        }
        
        .main-stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
    }
    
    @media (max-width: 768px) {
        .welcome-section {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
        }
        
        .welcome-content h1 {
            font-size: 2rem;
        }
        
        .welcome-illustration {
            width: 150px;
            height: 150px;
            margin-top: 2rem;
        }
        
        .dashboard-grid {
            grid-template-columns: 1fr;
        }
        
        .quick-stats {
            grid-template-columns: 1fr;
        }
        
        .quick-actions {
            justify-content: center;
        }
    }
`).appendTo('head');
