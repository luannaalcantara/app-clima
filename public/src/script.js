async function getCoordinates(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
  );
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }
  return data.results[0];
}
async function getWeatherData(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
  );
  const data = await response.json();

  if (!data.current) {
    throw new Error("Não foi possível obter o clima");
  }

  // Aqui usamos o Math.round() para remover as casas decimais antes de salvar ou exibir
  return {
    temperature: Math.round(data.current.temperature_2m),      
    feels_like: Math.round(data.current.apparent_temperature),   
    humidity: Math.round(data.current.relative_humidity_2m),    
    windspeed: Math.round(data.current.wind_speed_10m),        
    weathercode: data.current.weather_code
  };
}
// Retorna o ícone e a descrição em texto com base no código WMO
function getWeatherDetails(code) {
  const weatherCode = Number(code);
  if (weatherCode === 0) return { icon: "☀️", text: "Ensolarado" };
  if (weatherCode <= 3) return { icon: "☁️", text: "Nublado" };
  if (weatherCode <= 48) return { icon: "🌫️", text: "Névoa" };
  if (weatherCode <= 55) return { icon: "🌦️", text: "Chuvisco" };
  if (weatherCode <= 67) return { icon: "🌧️", text: "Chuvoso" };
  if (weatherCode <= 77) return { icon: "❄️", text: "Neve" };
  if (weatherCode <= 82) return { icon: "🌧️", text: "Pancadas de Chuva" };
  if (weatherCode <= 99) return { icon: "⚡", text: "Tempestade" };
  return { icon: "☁️", text: "Instável" };
}

function displayWeather(city, country, weather) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Limpa resultados anteriores

  const { icon, text } = getWeatherDetails(weather.weathercode);

  const card = document.createElement("div");
  card.className = "weather-card-main";

  card.innerHTML = `
    <div class="card-top">
      <div class="location">
        <span>📍</span> ${city}, ${country}
      </div>
      <button class="favorite-btn" title="Favoritar">⭐</button>
    </div>
    
    <div class="card-middle">
      <div class="temp-box">
        <div class="main-temp">${weather.temperature}°</div>
        <div class="condition-text">${text}</div>
      </div>
      <div class="weather-illustration">${icon}</div>
    </div>

    <div class="divider"></div>

    <div class="details-grid">
      <div class="detail-item">
        <span class="detail-label">🌡️ Sensação</span>
        <span class="detail-value">${weather.feels_like}°</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">💧 Umidade</span>
        <span class="detail-value">${weather.humidity}%</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">💨 Vento</span>
        <span class="detail-value">${weather.windspeed} km/h</span>
      </div>
    </div>
  `;

  // Listener dinâmico para favoritar
  card.querySelector(".favorite-btn").addEventListener("click", () => {
    saveFavorite(city, country, weather.temperature, weather.weathercode);
  });

  resultsDiv.appendChild(card);
}

function showError(message) {
  const resultsDiv = document.getElementById("results");
  const error = document.createElement("div");
  error.className = "error";
  error.innerHTML = `⚠️ ${message}`;
  resultsDiv.prepend(error);

  setTimeout(() => error.remove(), 4000);
}

async function getWeather(city) {
  try {
    const location = await getCoordinates(city);
    // Trata códigos de países (ex: BR para Brasil, US para EUA)
    const countryName = location.country_code ? location.country_code.toUpperCase() : location.country;
    
    const weather = await getWeatherData(location.latitude, location.longitude);
    displayWeather(location.name, countryName, weather);
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}

function saveFavorite(city, country, temperature, weathercode) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const alreadyExists = favorites.some(fav => fav.city.toLowerCase() === city.toLowerCase());
  
  if (alreadyExists) return;

  favorites.push({ city, country, temperature, weathercode });
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  const favoritesDiv = document.getElementById("favorites");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favoritesDiv.innerHTML = "";

  if (favorites.length === 0) {
    favoritesDiv.innerHTML = `<p class="empty-message">Nenhuma cidade favoritada.</p>`;
    return;
  }

  favorites.forEach((fav, index) => {
    const { icon } = getWeatherDetails(fav.weathercode);
    const item = document.createElement("div");
    item.className = "favorite-item";

    item.innerHTML = `
      <div class="fav-left">
        <span>📍</span>
        <span>${fav.city}</span>
      </div>
      <div class="fav-right">
        <span>${icon}</span>
        <span class="fav-temp">${fav.temperature}°</span>
        <button class="remove-btn" title="Remover">✕</button>
      </div>
    `;

    item.querySelector(".remove-btn").addEventListener("click", () => {
      removeFavorite(index);
    });

    favoritesDiv.appendChild(item);
  });
}

function removeFavorite(index) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

// Inicializadores globais de eventos
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;
  getWeather(city);
  cityInput.value = "";
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

// Renderiza os favoritos do LocalStorage ao abrir a página
renderFavorites();