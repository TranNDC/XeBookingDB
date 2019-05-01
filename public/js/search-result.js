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
    console.log(navTemplates);
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("partials/handlebars-search-result-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        console.log(navDetail);
        Handlebars.registerPartial("searchResultPartial", $("#searchResult-detail-template").html());
        $('#searchResult-container').html(compilednavTemplates(res));

    });


})
