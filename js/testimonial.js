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