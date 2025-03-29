$(document).ready(function () {
  // Function to toggle card details based on payment method
  function toggleCardDetails() {
    if ($('#paymentMethod').val() === 'cod') {
      $('#cardDetails').hide();
      $('#cardNumber, #expiry').prop('required', false);
    } else {
      $('#cardDetails').show();
      $('#cardNumber, #expiry').prop('required', true);
    }
  }

  // Initial call to set card details visibility
  toggleCardDetails();

  // Update card details visibility when payment method changes
  $('#paymentMethod').change(toggleCardDetails);

  // Handle form submission
  $('#checkoutForm').submit(function (event) {
    event.preventDefault();

    alert("Proceeding to payment...");

    // Get customer details
    const customerDetails = {
      name: $('#name').val(),
      phone: $('#phone').val(),
      email: $('#email').val(),
      house: $('#house').val(),
      street: $('#street').val(),
      town: $('#town').val(),
      district: $('#district').val(),
      state: $('#state').val(),
      pin: $('#pin').val(),
      paymentMethod: $('#paymentMethod').val(),
      cardNumber: $('#cardNumber').val(),
      expiry: $('#expiry').val()
    };

    // Get cart items from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Retrieve products array from local storage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Update stock for each product in cart
    cart.forEach(item => {
      let productIndex = products.findIndex(p => p.name === item.name);
      if (productIndex !== -1) {
        if (products[productIndex].stock >= item.qty) {
          products[productIndex].stock -= item.qty;
        } else {
          alert(`Insufficient stock for ${item.name}`);
          return; // Stop the function if any product has insufficient stock
        }
      }
    });

    // Save the updated products stock back to local storage
    localStorage.setItem('products', JSON.stringify(products));

    // Create an order object
    const order = {
      customerDetails: customerDetails,
      products: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.qty
      }))
    };

    // Save the order to local storage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Show success message
    $('#checkoutForm').hide();
    $('#successMessage').fadeIn(1000);

    // Clear the cart
    localStorage.removeItem('cart');

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  });
});