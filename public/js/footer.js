$(document).ready(() => {

    let navTemplates = $("#footer-template").html();
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("/partials/handlebars-footer-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        Handlebars.registerPartial("footerPartial", $("#footer-detail-template").html());

        $('#footer-container').html(compilednavTemplates());
    });


})

