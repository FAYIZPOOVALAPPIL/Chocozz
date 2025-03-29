






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

