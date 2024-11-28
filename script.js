const API_URL = 'https://api.coingecko.com/api/v3/';
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const cryptoCards = document.getElementById('crypto-cards');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Fetch Crypto Data
async function fetchCryptos(query = '') {
  const response = await fetch(`${API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`);
  const data = await response.json();
  const filteredData = query ? data.filter((coin) => coin.name.toLowerCase().includes(query.toLowerCase())) : data;
  displayCryptos(filteredData);
}

// Display Crypto Cards
function displayCryptos(cryptos) {
  cryptoCards.innerHTML = '';
  cryptos.forEach((crypto) => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 p-4 rounded shadow hover:shadow-lg transition';
    card.innerHTML = `
      <div class="flex items-center gap-3 cursor-pointer" onclick="viewDetails('${crypto.id}')">
        <img src="${crypto.image}" alt="${crypto.name} icon" class="w-10 h-10">
        <div>
          <h2 class="text-xl font-bold">${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
          <p class="text-gray-400">$${crypto.current_price.toLocaleString()}</p>
        </div>
      </div>
      <button class="favorite-btn bg-indigo-500 px-3 py-1 rounded mt-2 hover:bg-indigo-600" data-id="${crypto.id}">Add to Favorites</button>
    `;
    cryptoCards.appendChild(card);
  });
}

// Add to Favorites
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('favorite-btn')) {
    const id = e.target.dataset.id;
    const cryptoName = e.target.closest('.bg-gray-800').querySelector('h2').textContent.trim();  // Get the crypto name
    
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${cryptoName} has been added to Favorites!`);  // Show the name in the alert
    }
  }
});

// Search Functionality
searchBtn.addEventListener('click', () => {
  const query = searchInput.value;
  fetchCryptos(query);
});

// View Crypto Details
function viewDetails(id) {
  // Here, you can either open a modal or redirect to a detailed page
  window.location.href = `details.html?id=${id}`;
}

// Initialize
fetchCryptos();
