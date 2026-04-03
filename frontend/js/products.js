const productList = document.getElementById("product-list");
const productForm = document.getElementById("product-form");
const formMessage = document.getElementById("form-message");

async function loadProducts() {
  try {
    const response = await fetch("/api/items");
    const items = await response.json();

    if (!items.length) {
      productList.innerHTML = "<p>No products available.</p>";
      return;
    }

    productList.innerHTML = items.map(item => `
      <div class="product-item">
        <h4>${item.name}</h4>
        <p class="product-meta">Price: ${item.price}</p>
        <p class="product-meta">Quantity: ${item.quantity}</p>
        <p class="product-meta">ID: ${item.id}</p>
      </div>
    `).join("");
  } catch (error) {
    productList.innerHTML = `<p class="error">Could not load products.</p>`;
  }
}

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  formMessage.textContent = "";
  formMessage.classList.remove("error");

  try {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        quantity: Number(quantity)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      formMessage.textContent = data.error || "Could not add product.";
      formMessage.classList.add("error");
      return;
    }

    formMessage.textContent = "Product added successfully.";
    productForm.reset();
    loadProducts();
  } catch (error) {
    formMessage.textContent = "Server connection error.";
    formMessage.classList.add("error");
  }
});

loadProducts();