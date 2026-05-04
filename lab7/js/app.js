document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const catalogLink = document.getElementById("catalog-link");

  catalogLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadCategories();
  });

  function loadCategories() {
    fetch("data/categories.json")
      .then((response) => response.json())
      .then((categories) => {
        let html = '<h2>Item\'s</h2><div class="list-group mb-3">';

        categories.forEach((category) => {
          html += `<a href="#" class="list-group-item list-group-item-action category-link" data-shortname="${category.shortname}">
                                ${category.name} <small class="text-muted">(${category.notes})</small>
                             </a>`;
        });

        html += "</div>";
        html +=
          '<button id="specials-btn" class="btn btn-warning">Specials (Random category)</button>';

        mainContent.innerHTML = html;

        document.querySelectorAll(".category-link").forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            loadCategoryItems(e.currentTarget.getAttribute("data-shortname"));
          });
        });

        document
          .getElementById("specials-btn")
          .addEventListener("click", () => {
            const randomIndex = Math.floor(Math.random() * categories.length);
            const randomCategory = categories[randomIndex].shortname;
            loadCategoryItems(randomCategory);
          });
      })
      .catch((error) => console.error("Error:", error));
  }

  function loadCategoryItems(categoryShortname) {
    fetch(`data/${categoryShortname}.json`)
      .then((response) => response.json())
      .then((data) => {
        let html = `<h2>${data.categoryName}</h2><div class="row">`;

        data.items.forEach((item) => {
          html += `
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <img src="https://placehold.co/200x200?text=${item.shortname}" class="card-img-top" alt="${item.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text">${item.description}</p>
                                    <p class="card-text"><strong>Ціна: ${item.price}</strong></p>
                                </div>
                            </div>
                        </div>
                    `;
        });

        html += "</div>";
        mainContent.innerHTML = html;
      })
      .catch((error) => console.error("Error:", error));
  }
});
