// Retrieve wishlist from localStorage (or initialize)
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Function to display wishlist products
function displayWishlist() {
  let wishlistContainer = document.getElementById("wishlist-container");
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p class='text-center text-muted'>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach((product, index) => {
    let productCard = `
      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" class="card-img-top slide-transition-img" alt="${product.name}">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${product.name}</h6>
            <p class="card-text">Price: ₹${product.price}</p>
            <button class="btn btn-danger btn-sm mt-auto" onclick="removeFromWishlist(${index})">
              <i class="fas fa-trash"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `;
    wishlistContainer.innerHTML += productCard;
  });
}

// Function to remove a product from the wishlist
function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  displayWishlist();
}

// Initialize wishlist display
displayWishlist();
