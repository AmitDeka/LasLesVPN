// Testimonial Slider
$("#testimonialsCards").slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  appendDots: $(".slick-slider-dots"),
  prevArrow: $(".slick-slider-previousBtn"),
  nextArrow: $(".slick-slider-nextBtn"),
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
