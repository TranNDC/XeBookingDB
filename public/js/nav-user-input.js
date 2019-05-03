user={
    name:"Lê Thành Công",
    avatarlink:"/img/user/user.jpg"
}

$(document).ready(() => {

    let navTemplates = $("#navbar-user-template").html();
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("/partials/handlebars-navbar-user-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        Handlebars.registerPartial("navbarUserPartial", $("#navbar-user-detail-template").html());

        $('#nav-container').html(compilednavTemplates(user));

        $("#search-toggle").on('click', function () {
            $("#search-bar").toggle("slide");
        });
    });


})
