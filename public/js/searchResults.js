// $("#searchResultPartialDiv").data("Chuyens");

function divChange(id) {
    if ($("#seats" + id).text() == '') {
        $('#continueBtn' + id).fadeOut();
    }
    else $('#continueBtn' + id).fadeIn();
}

function addSeats(seat, chuyenId){
    let seatsDiv = $('#seats' + chuyenId).text();
    if (seatsDiv == '') {
        $('#seats' + chuyenId).text(' ' + seat.attr('id'));
    } else {
        $('#seats' + chuyenId).text(seatsDiv + ', ' + seat.attr('id'));
    }

}

function removeSeats(seat, chuyenId) {
    let seatsDiv = $('#seats' + chuyenId).text();

    let pos = seatsDiv.search(' ' + seat.attr('id'));
    let tmp;
    if (pos != 0) {
        tmp = seatsDiv.replace(', ' + seat.attr('id'), '');
    }
    else {
        tmp = seatsDiv.replace(' ' + seat.attr('id'), '');
        if (tmp.length > 0 && tmp[0] == ',') {
            tmp = tmp.substr(1);
        }
    }
    $('#seats' + chuyenId).text(tmp);

}

function getSeatsArray(btn){
    let cBtn = $('#'+btn.id);
    let id = parseInt(cBtn.data("id"));
    let tmp = $('#seats'+id).text();
    tmp = tmp.substr(1);
    let seats = tmp.split(', ');
    seats.sort();
    return seats;
}

function loadSeats(btn){
    let seats = getSeatsArray(btn);
    let htmlPartials=``;
    seats.forEach(seat => {
        htmlPartials += `{{> passengerDetail seat='` +seat+`'}}\n`;
    });
    htmlPartials+=``;
    var template = Handlebars.compile(htmlPartials);
    $('#passangerDetailContainer').append( template());
    
    console.log(template);
    // let id = parseInt($(this).data("id"));
    // let tmp = $('#seats'+id).text();
    // tmp = tmp.substr(1);
    // let seats = tmp.split(', ');
    // console.log($(this));
}



function updateTotal(chuyenId){
    let totalDiv = $('#total'+chuyenId);
    let price = totalDiv.data('price');
    let seatsList = $('#seats'+chuyenId).text();
    if (seatsList == '') totalDiv.text('$0')
    else{
        let numSeats = (seatsList.split(', ')).length;
        price = price * numSeats;
        totalDiv.text('$'+price);
    }

}

$(document).ready(function () {
    let Chuyens = $("#searchResultPartialDiv").data("chuyens");
    let idChuyens = Chuyens.split(";");
    idChuyens.splice(-1, 1);

    idChuyens.forEach(id => {
        let tmp = $('#div' + id).data('seats');
        let seats = tmp.split(';');
        seats.splice(-1, 1);
        seats.forEach(seat => {
            $('#div' + id + " #" + seat).addClass('sleeper-disabled');
        });
    });

    $('.sleeper:not(.sleeper-disabled,.non-toggle),.seater:not(.sleeper-disabled,.non-toggle)').on('click', function () {
        $(this).toggleClass('sleeper-active');
        let tag = $(this).closest('.busDiv').attr('id');
        let chuyenId = tag.substring(3);
        if ($(this).hasClass('sleeper-active')) {
            addSeats($(this), chuyenId);
        }
        else {
            removeSeats($(this),chuyenId);
        }
        divChange(chuyenId);
        updateTotal(chuyenId);
    });



    $(".page-link").click(function () {
        let textthis = $(this).text();
        let text = $(".page-link.active").text();
        if (textthis === '<') {
            if (text != 1) {
                let tmp = parseInt(text) - 1;
                tmp = ".page-link." + tmp;
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



});



