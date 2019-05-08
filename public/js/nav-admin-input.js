user={
    name:"Lê Thành Công",
    avatarlink:"/img/user/user.jpg"
}

$(document).ready(() => {

    let navTemplates = $("#navbar-admin-template").html();
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("/partials/handlebars-navbar-admin-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        Handlebars.registerPartial("navbarAdminPartial", $("#navbar-admin-detail-template").html());

        $('#nav-container').html(compilednavTemplates(user));

        $("#search-toggle").on('click', function () {
            $("#search-bar").toggle("slide");
        });
    });


})
