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

        $(".page-link").click(function () {
            let textthis = $(this).text();
            let text = $(".page-link.active").text();
            if (textthis === '<') {
                if (text != 1) {
                    let tmp = parseInt(text) - 1;
                    tmp = ".page-link." + tmp;
                    console.log(tmp);
                    $(".page-link.active").removeClass('active');
                    $(tmp).addClass('active');
                }
            } else
            if (textthis == ">") {
                if (text != 3) {
                    let tmp = parseInt(text) + 1;
                    tmp = ".page-link." + tmp;
                    $(".page-link.active").removeClass('active');
                    $(tmp).addClass('active');
                }
            } else {
                $(".page-link.active").removeClass('active');
                $(this).addClass('active');
            }
        });
        $('[data-toggle="tooltip"]').tooltip();   
    
    });

});
