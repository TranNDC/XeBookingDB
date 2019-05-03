var res={results:[{
    "liscensePlate":"59 V2 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.617",
    "type":"Sleeper non AC",
    "departure":"14:30",
    "arrival":"23:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.618",
    "type":"Semi Sleeper",
    "departure":"15:30",
    "arrival":"0:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.619",
    "type":"Sleeper",
    "departure":"16:30",
    "arrival":"1:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.626",
    "type":"Sleeper",
    "departure":"17:30",
    "arrival":"0:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.636",
    "type":"Sleeper",
    "departure":"18:30",
    "arrival":"23:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.646",
    "type":"Sleeper",
    "departure":"19:30",
    "arrival":"23:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.656",
    "type":"Sleeper",
    "departure":"20:00",
    "arrival":"23:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.556",
    "type":"Sleeper",
    "departure":"20:30",
    "arrival":"23:30",
    "price":"$500"
},
{
    "liscensePlate":"59 V2 65.616",
    "type":"Sleeper",
    "departure":"21:00",
    "arrival":"23:30",
    "price":"$500"
}
]};

$(document).ready(() => {

    let navTemplates = $("#searchResult-template").html();
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("partials/handlebars-search-result-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        Handlebars.registerPartial("searchResultPartial", $("#searchResult-detail-template").html());
        $('#searchResult-container').html(compilednavTemplates(res));

        $('.sleeper:not(.sleeper-disabled)').on('click',function(){
            $(this).toggleClass('sleeper-active');
        });
        function click1(){
            var check = $('#formhome').checkValidity();
            console.log(check);
            if ($("#formhome")[0].checkValidity()) {
                    $('#menu1').addClass('active');
                    $('#home').removeClass('active');
                    $('#menu1').removeClass('fade');
                    $('#home').addClass('fade');
                    $('#amenu1').addClass('active');
                    $('#ahome').removeClass('active');
            }
            else{
                $("#formhome").find(':submit').click();
            }
        }
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
