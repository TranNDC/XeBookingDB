var res={results:[{
    "busID":"B190303",
    "date":"30 Aug 2019",
    "liscensePlate":"59 V2 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Đà Lạt",
    "toLocation":"Hồ Chí Minh",
    "status":0 //0 == unused , 1 == used
    
},
{
    "busID":"B190303",
    "date":"30 Jul 2019",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Hồ Chí Minh",
    "toLocation":"Cần Thơ",
    "status":0 //0 == unused , 1 == used
},
{
    "busID":"B190303",
    "date":"30 Apr 2019",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Hồ Chí Minh",
    "toLocation":"Cần Thơ",
    "status":1 //0 == unused , 1 == used
},
{
    "busID":"B190303",
    "date":"30 Feb 2019",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Hồ Chí Minh",
    "toLocation":"Đà Lạt",
    "status":1 //0 == unused , 1 == used
},
{
    "busID":"B190303",
    "date":"30 Jan 2019",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Hồ Chí Minh",
    "toLocation":"Cần Thơ",
    "status":1 //0 == unused , 1 == used
},
{
    "busID":"B190303",
    "date":"30 Apr 208",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Hồ Chí Minh",
    "toLocation":"Đà Lạt",
    "status":1 //0 == unused , 1 == used
},
{
    "busID":"B190303",
    "date":"30 Apr 2017",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Đà Lạt",
    "toLocation":"Cần Thơ",
    "status":1 //0 == unused , 1 == used
},
{
    "busID":"B190303",
    "date":"30 Apr 2017",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Đà Lạt",
    "toLocation":"Cần Thơ",
    "status":1 //0 == unused , 1 == used
},
{
    "busID":"B190303",
    "date":"30 Apr 2017",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Đà Lạt",
    "toLocation":"Cần Thơ",
    "status":1 //0 == unused , 1 == used
},
{
    "busID":"B190303",
    "date":"30 Apr 2017",
    "liscensePlate":"59 V4 65.616",
    "type":"Sleeper",
    "departure":"13:30",
    "arrival":"23:30",
    "price":"$500",
    "fromLocation":"Đà Lạt",
    "toLocation":"Cần Thơ",
    "status":1 //0 == unused , 1 == used
}

]};

$(document).ready(() => {

    let navTemplates = $("#masterData-template").html();
    let compilednavTemplates = Handlebars.compile(navTemplates);
    $.ajax("/partials/handlebars-master-data-partial.html").done((navDetail) => {
        $("body").append(navDetail);
        Handlebars.registerPartial("masterDataPartial", $("#master-data-detail-template").html());
        $('#masterData-container').html(compilednavTemplates(res));
        
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
