const API_URL = 'https://api.coingecko.com/api/v3/';
const favoritesCards = document.getElementById('favorites-cards');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];


async function fetchFavoriteDetails() {
  if (favorites.length > 0) {
    const response = await fetch(`${API_URL}coins/markets?vs_currency=usd&ids=${favorites.join(',')}`);
    const data = await response.json();
    displayFavoriteCryptos(data);
  } else {
    favoritesCards.innerHTML = '<p class="text-gray-400">No favorites added.</p>';
  }
}


function displayFavoriteCryptos(cryptos) {
  favoritesCards.innerHTML = '';
  cryptos.forEach((crypto) => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 p-4 rounded shadow hover:shadow-lg transition';
    card.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${crypto.image}" alt="${crypto.name} icon" class="w-10 h-10">
        <div>
          <h2 class="text-xl font-bold">${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
          <p class="text-gray-400">$${crypto.current_price.toLocaleString()}</p>
        </div>
      </div>
      <button class="delete-favorite-btn bg-red-500 px-3 py-1 rounded mt-2 hover:bg-red-600" data-id="${crypto.id}">Remove from Favorites</button>
    `;
    favoritesCards.appendChild(card);
  });
}


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-favorite-btn')) {
    const id = e.target.dataset.id;
    const index = favorites.indexOf(id);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Removed from Favorites!');
      fetchFavoriteDetails();  
    }
  }
});


fetchFavoriteDetails();
