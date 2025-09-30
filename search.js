const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");

let products = [];

// Загружаем все товары один раз
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
  })
  .catch(err => console.error("Ошибка загрузки product.json:", err));

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  resultsContainer.innerHTML = "";

  if (!query) {
    resultsContainer.style.display = "none";
    return;
  }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = "<p>No results found</p>";
    resultsContainer.style.display = "block";
    return;
  }

  matches.slice(0, 5).forEach(item => {
    const div = document.createElement("div");
    div.classList.add("search-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <span>${item.name} - $${item.price}</span>
    `;
    div.addEventListener("click", () => {
      window.location.href = `product.html?id=${item.id}`;
    });
    resultsContainer.appendChild(div);
  });

  resultsContainer.style.display = "block";
});

// Закрывать подсказки при клике вне
document.addEventListener("click", (e) => {
  if (!resultsContainer.contains(e.target) && e.target !== searchInput) {
    resultsContainer.style.display = "none";
  }
});
