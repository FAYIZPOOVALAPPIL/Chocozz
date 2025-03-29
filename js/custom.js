// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();



// slick slider
$('.chocolate_container').slick({
    infinite: true,
    center: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});

/** google_map js **/

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
function displayProducts() {
            let products = JSON.parse(localStorage.getItem("products")) || [];
            let productList = document.getElementById("product-list");

            productList.innerHTML = "";
            products.forEach((product) => {
                productList.innerHTML += `
                    <div class="box">
                        <div class="img-box">
                            <img src="${product.image}" alt="">
                        </div>
                        <div class="detail-box">
                            <h6>${product.name}</h6>
                            <h5>&#8377;${product.price}</h5>
                            <a href="#">BUY NOW</a>
                        </div>
                    </div>`;
            });
        }



        /**testimonia */

        document.addEventListener('DOMContentLoaded', function() {
          const carouselInner = document.getElementById('testimonialCarousel');
          const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
      
          if (testimonials.length === 0) {
            carouselInner.innerHTML = '<div class="carousel-item active"><p>No testimonials available.</p></div>';
          } else {
            testimonials.forEach((testimonial, index) => {
              const carouselItem = document.createElement('div');
              carouselItem.classList.add('carousel-item');
              if (index === 0) carouselItem.classList.add('active');
      
              carouselItem.innerHTML = `
                <div class="box">
                  <div class="img-box">
                    <img src="${testimonial.image || 'images/client-img.jpg'}" alt="${testimonial.name}">
                  </div>
                  <div class="detail-box">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.text}</p>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                </div>
              `;
      
              carouselInner.appendChild(carouselItem);
            });
          }
      
          // Initialize the carousel
          $('#customCarousel2').carousel();
        });
      
       





// Retrieve cart and wishlist from localStorage (or initialize)
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


// Function to display products on the index page
function displayProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    let isOutOfStock = product.stock == 0;
    let stockDisplay = isOutOfStock 
        ? '<span style="color: red;">Out of Stock</span>' 
        : `<span>${product.stock}</span>`;

    let productCard = `
      <div class="col-md-4   mb-3">
          <div class="box text-center">
              <div class="img-box">
                  <img src="${product.image}" alt="${product.name}" style="width:100%;">
              </div>
              <div class="detail-box">
                  <h6>${product.name} <span>₹${product.price}</span></h6>
                  <label>Stock: ${stockDisplay}</label>
                  <div class="mb-2">
                      <label for="qty-${index}">Qty:</label>
                      <input type="number" id="qty-${index}" value="1" min="1" max="${product.stock}" ${isOutOfStock ? 'disabled' : ''} style="width:60px;">
                  </div>
                  <div class="btn-group">
                      <button class="btn btn-light btn-sm" onclick="buyNow(${index})" ${isOutOfStock ? 'disabled' : ''}>
                          <i class="fas fa-credit-card"></i>
                      </button>
                      <button class="btn btn-light btn-sm" onclick="addToCart(${index})" ${isOutOfStock ? 'disabled' : ''}>
                          <i class="fas fa-shopping-cart"></i> 
                      </button>
                      <button class="btn btn-light btn-sm" onclick="addToWishlist(${index})">
                          <i class="fas fa-heart"></i>
                      </button>
                  </div>
              </div>
          </div>
      </div>
    `;
    productList.innerHTML += productCard;
  });
}

// Function to add product to cart on index page
// Stock is not adjusted here; it remains unchanged until purchase confirmation.
function addToCart(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let qty = parseInt(document.getElementById(`qty-${index}`).value) || 1;

  // Only check if requested quantity is available in stock, without adjusting stock.
  if (products[index].stock >= qty && qty > 0) {
    // Check if product already exists in the cart
    let cartItem = cart.find(item => item.name === products[index].name);
    if (cartItem) {
      cartItem.qty += qty;
    } else {
      cart.push({ ...products[index], qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added ${qty} unit(s) of ${products[index].name} to cart`);
    displayProducts();
  } else {
    alert("Requested quantity not available in stock!");
  }
}

/// Function for immediate purchase (Buy Now) from index page
function buyNow(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let qty = parseInt(document.getElementById(`qty-${index}`).value) || 1;

  if (products[index].stock >= qty && qty > 0) {
      // Retrieve current cart items (or initialize)
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Check if product already exists in the cart
      let cartItem = cart.find(item => item.name === products[index].name);
      if (cartItem) {
          cartItem.qty += qty;
      } else {
          cart.push({ ...products[index], qty });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Redirect to checkout page
      window.location.href = "checkout.html"; 
  } else {
      alert("Requested quantity not available in stock!");
  }
}

// Function to update stock after successful payment
function updateStockAfterPurchase() {
    let checkoutProduct = JSON.parse(localStorage.getItem("checkoutProduct"));
    if (checkoutProduct) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products[checkoutProduct.index].stock -= checkoutProduct.qty;
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.removeItem("checkoutProduct");
    }
}

// Initialize products display
updateStockAfterPurchase();
displayProducts();

// Run stock update when returning to the index page
updateStockAfterPurchase();
displayProducts();

// Function to add product to wishlist
// Function to add a product to the wishlist from the index page
function addToWishlist(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    
    // Check if product already exists in wishlist
    let exists = wishlist.some(item => item.name === products[index].name);
  
    if (!exists) {
      wishlist.push(products[index]);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`Added ${products[index].name} to wishlist`);
    } else {
      alert("This product is already in your wishlist.");
    }
  }
  
  // Initialize products display
  displayProducts();

// Get the product list container
const productList = document.getElementById("product-list");

// Listen for scroll events on the container
productList.addEventListener("scroll", () => {
  // Check if scrolled to the bottom (allowing for slight imprecision)
  if (productList.scrollTop + productList.clientHeight >= productList.scrollHeight - 1) {
    // Smoothly scroll back to the top
    productList.scrollTo({ top: 0, behavior: "smooth" });
  }
});

  

  // contact us details js
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Form values
    let fullName = document.getElementById("fullName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
  
    // Phone number validation (Only digits allowed)
    let phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phoneNumber)) {
      alert("Please enter a valid phone number with only digits.");
      return;
    }
  
    // Fetch existing data
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
    // Add new contact
    contacts.push({ fullName, phoneNumber, email, message });
  
    // Save to LocalStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));
  
    alert("Contact details submitted successfully!");
    document.getElementById("contactForm").reset();
  });




 