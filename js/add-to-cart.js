// Retrieve cart from localStorage (or initialize if empty)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to display cart items
function displayCart() {
  let cartList = document.getElementById("cart-list");
  let totalAmount = 0;
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("total-price").innerText = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.qty;
    totalAmount += itemTotal;

    let cartCard = `
      <div class="col-md-4 mb-3">
          <div class="box">
              <div class="img-box">
                  <img src="${item.image}" alt="${item.name}" style="width:100%;">
              </div>
              <div class="detail-box">
                  <h6>${item.name} <span>₹${item.price}</span></h6>
                  <div class="mb-2">
                      <label for="cart-qty-${index}">Qty:</label>
                      <input type="number" id="cart-qty-${index}" value="${item.qty}" min="1" max="${item.stock}" style="width:60px;" onchange="updateQuantity(${index}, this.value)">
                  </div>
                  <h6>Total: ₹${itemTotal}</h6>
                  <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                      Remove
                  </button>
              </div>
          </div>
      </div>
    `;
    cartList.innerHTML += cartCard;
  });

  document.getElementById("total-price").innerText = `₹${totalAmount}`;
}

// Function to update item quantity in cart (still no stock adjustment here)
function updateQuantity(index, newQty) {
  newQty = parseInt(newQty);
  if (newQty > 0 && newQty <= cart[index].stock) {
    cart[index].qty = newQty;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  } else {
    alert("Invalid quantity!");
  }
}

// Function to remove a product from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Function to clear all items from cart (stock remains unchanged)
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Function to handle checkout
// Adjusts stock only after user confirms the purchase.
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  if(confirm("Are you sure you want to proceed with the purchase?")) {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // For each cart item, adjust stock in the products array
    cart.forEach(item => {
      let productIndex = products.findIndex(p => p.name === item.name);
      if(productIndex !== -1) {
        if(products[productIndex].stock >= item.qty) {
          products[productIndex].stock -= item.qty;
        } else {
          alert(`Insufficient stock for ${item.name}`);
        }
      }
    });

    // Save the updated products stock and clear the cart
    localStorage.setItem("products", JSON.stringify(products));
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Purchase successful!");
    displayCart();
    displayProducts(); // Update index page products stock display
  }
}

// Initialize cart display
displayCart();

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Save cart data before redirecting
    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    // Show alert first
    alert("Redirecting to Checkout...");

    // Wait for 1.5 seconds and then redirect
    setTimeout(() => {
        window.location.href = "checkout.html";
    }, 1500);
}