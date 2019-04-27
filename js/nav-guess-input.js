$(document).ready(() => {

    let navTemplates = $("#navbar-guess-template").html();
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("/partials/handlebars-navbar-guess-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        Handlebars.registerPartial("navbarGuessPartial", $("#navbar-guess-detail-template").html());

        $('#nav-container').html(compilednavTemplates());

        $("#search-toggle").on('click', function () {
            $("#search-bar").toggle("slide");
        });
    });


})

