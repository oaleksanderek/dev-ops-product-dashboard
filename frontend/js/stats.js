const totalProducts = document.getElementById("total-products");
const backendInstance = document.getElementById("backend-instance");

async function loadStats() {
  try {
    const response = await fetch("/api/stats");
    const stats = await response.json();

    totalProducts.textContent = stats.total ?? "--";
    backendInstance.textContent = stats.instance ?? "--";
  } catch (error) {
    totalProducts.textContent = "ERR";
    backendInstance.textContent = "ERR";
  }
}

loadStats();