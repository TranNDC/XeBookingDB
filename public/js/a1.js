$('#carouselExample').on('slide.bs.carousel', function (e) {

    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});

// var controller = require('../../controllers/diadiem');
// controller.getAll(function(stations){
//     console.log(stations);
// })


$('input[type=radio][name="searchform-type-trip"]').change(function () {
    if (this.value == '1') {
        $("#searchform-returnday").prop('disabled', true);

    } else if (this.value == '2') {
        $("#searchform-returnday").prop('disabled', false);
    }
});

$('.dropdown-toggle').dropdown();
