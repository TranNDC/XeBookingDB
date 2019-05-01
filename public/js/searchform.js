$(document).ready(() => {

    let navTemplates = $("#searchform-template").html();
    console.log(navTemplates);
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("/public/partials/handlebars-searchform-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        Handlebars.registerPartial("searchformPartial", $("#searchform-detail-template").html());

        $('#searchform-container').html(compilednavTemplates());


        $('input[type=radio][name="searchform-type-trip"]').change(function () {
            if (this.value == '1') {
                $("#searchform-returnday").prop('disabled', true);

            } else if (this.value == '2') {
                $("#searchform-returnday").prop('disabled', false);
            }
        });

    });


})
