const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
	productList.innerHTML = "";
	
	products.forEach((product) => {
	    const li = document.createElement("li");
	    li.innerHTML = `${product.name} - $${product.price}
		<button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
	    productList.appendChild(li);

		const button = li.querySelector("button");
		button.addEventListener("click", ()=> {
			addToCart(product.id);
		})
	});
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear cart UI

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartList.appendChild(li);
  });

  sessionStorage.setItem("cart", JSON.stringify(cart)); // Save to storage
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}


// Clear cart
function clearCart() {
  cart = [];
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
