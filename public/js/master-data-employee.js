var res={results:[{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
},
{
    "busID":"B190303",
    "salary":"$500",
    "employeeID":"NV001",
    "name":"Lê Thành Công",
    "position":"Driver"
}

]};

$(document).ready(() => {

    let navTemplates = $("#masterDataEmployee-template").html();
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("/partials/handlebars-master-data-employee-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        Handlebars.registerPartial("masterDataEmployeePartial", $("#master-data-employee-detail-template").html());
        $('#masterDataEmployee-container').html(compilednavTemplates(res));
        
        // $('#a2-btn-step-1').click(function(){
        //     $('#menu1').addClass('active');
        //     $('#home').removeClass('active');
        //     $('#menu1').removeClass('fade');
        //     $('#home').addClass('fade');
        //     $('#amenu1').addClass('active');
        //     $('#ahome').removeClass('active');
        //   });
        //   $('#a2-btn-step-2').click(function(){
        //     $('#menu2').addClass('active');
        //     $('#menu1').removeClass('active');
        //     $('#menu2').removeClass('fade');
        //     $('#menu1').addClass('fade');
        //     $('#amenu2').addClass('active');
        //     $('#amenu1').removeClass('active');
        //   });
    });


})
