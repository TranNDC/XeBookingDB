function exceptValue(inp, arr) {

    if (inp.id == "toInput") {
        let tmp = $("#fromInput").val();
        if (tmp) {
            let pos = arr.map(function (e) {
                return e.ten;
            }).indexOf(tmp);
            if (pos >= 0)
                arr.splice(pos, 1);
        }
    } else if (inp.id == "fromInput") {
        let tmp = $("#toInput").val();
        let tmpId = $("#fromInput").data("id");
        if (tmp) {
            let pos = arr.map(function (e) {
                return e.ten;
            }).indexOf(tmp);
            if (pos >= 0)
                arr.splice(pos, 1);
        }
    }

}

function xoadau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}


function autocomplete(inp, arrMain) {
    var arr = JSON.parse(JSON.stringify(arrMain))
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        exceptValue(inp, arr);
        for (i = 0; i < arr.length; i++) {
            if (xoadau(arr[i].ten.substr(0, val.length).toUpperCase()) == xoadau(val.toUpperCase())) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].ten.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].ten.substr(val.length);
                // b.innerHTML = arr[i].ten;
                b.innerHTML += "<input id='inputComplete" + i + "' type='hidden' value='" + arr[i].ten + "' data-id='" + arr[i].id + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    $("#" + inp.id).data("id", this.getElementsByTagName("input")[0].dataset.id);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("blur", (e) => {
        let tmp = $("#" + inp.id).val();
        let pos = arr.map(function (e) {
            return e.ten;
        }).indexOf(tmp);

        if (pos < 0) {
            $("#" + inp.id).val("");
            $("#" + inp.id).data("id", "");
            // closeAllLists();
        }
    });

    inp.addEventListener("focus", function (e) {
        var a, b, i, val = this.value;
        if (val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        exceptValue(inp, arr);
        for (i = 0; i < arr.length; i++) {
            b = document.createElement("DIV");
            b.innerHTML = arr[i].ten;
            b.innerHTML += "<input id='inputComplete" + i + "' type='hidden' value='" + arr[i].ten + "' data-id='" + arr[i].id + "'>";
            b.addEventListener("click", function (e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                $("#" + inp.id).data("id", this.getElementsByTagName("input")[0].dataset.id);
                closeAllLists();
            });
            a.appendChild(b);
        }

    }, false);

    inp.addEventListener("keydown", function (e) {
        $("#" + inp.id).data("id", "");
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { //up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementById(inp.id + "autocomplete-list");
        if (x && elmnt != x && elmnt != inp) {
            x.parentNode.removeChild(x);
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


function updateHeader(url) {
    let type = ['departure', 'desc'];
    let query = getPageNumber('order', url);
    if (query != 1)
        type = query.split('_');

    let newActive = $('#header' + type[0]);
    $('.listHeader').each(function () {
        let href = $(this).attr('href');

        if ($(this).attr('id') == newActive.attr('id')) {
            let html = (newActive.text());
            if (type[1] == 'asc') html += '<i class="fas fa-arrow-up ml-1"></i>';
            else html += '<i class="fas fa-arrow-down ml-1"></i>';
            $(this).html(html);
            href = href.replace(type[1], getOppositeOrder(type[1]));
        }

        let newhref = getNewHref('order', url, href);
        $(this).attr('href', newhref);

    });

    switch (type[0]) {
        case 'licenseplate': {
            $('.active-filter').removeClass('active-filter');
            $('#headerlicenseplate').addClass('active-filter');
            $('.licensePlateData').addClass('active-filter');
            break;
        }
        case 'busroute': {
            $('.active-filter').removeClass('active-filter');
            $('#headerbusroute').addClass('active-filter');
            $('.busRouteData').addClass('active-filter');
            break;
        }
        case 'departure': {
            $('.active-filter').removeClass('active-filter');
            $('#headerdeparture').addClass('active-filter');
            $('.departureData').addClass('active-filter');
            break;
        }
        case 'minutemove': {
            $('.active-filter').removeClass('active-filter');
            $('#headerminutemove').addClass('active-filter');
            $('.minuteMovingData').addClass('active-filter');

            break;
        }
        case 'price': {
            $('.active-filter').removeClass('active-filter');
            $('#headerprice').addClass('active-filter');
            $('.priceData').addClass('active-filter');
            break;
        }

        default:
            break;
    }
}

function getOppositeOrder(ord) {
    return ord == 'asc' ? 'desc' : 'asc';
}

function getNewHref(pattern, url, hreff) {
    let href = hreff.substr(1);
    if (url.search('\\?') < 0) return hreff;
    let uri = url.substr(url.search('masterdata?') + 10);
    console.log(uri);

    if (uri.search(pattern) >= 0) {
        lists = uri.substr(1).split('&');
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].search(pattern) >= 0) {
                lists[i] = href;

            }
        }
        uri = '?' + lists.join('&');
    } else {
        uri += '&' + href;
    }
    return uri;
}


function getPageNumber(pattern, url) {
    if (url.search('\\?') < 0) return 1;

    let uri = url.substr(url.search('masterdata') + 10);

    if (uri.search(pattern) >= 0) {
        let tmp = uri.substr(uri.search(pattern) + pattern.length + 1);
        tmp1 = tmp.search('&');
        let page;
        if (tmp1 >= 1)
            page = tmp.substr(0, tmp1);
        else
            page = tmp;
        return page;
    } else {
        return 1;
    }
}


$(document).ready(function () {
    var listName = $('#station-container').data('station');

    var tmp = listName.split(";");
    var stations = [];
    tmp.forEach(element => {
        let tmp2 = element.split('-');
        let station = {
            ten: tmp2[0],
            id: tmp2[1]
        }
        stations.push(station);
    });
    stations.splice(-1, 1);

    stationstmp = stations;

    autocomplete(document.getElementById("fromInputM"), stations);
    autocomplete(document.getElementById("toInputM"), stations);



    let url = window.location.href
    updateHeader(url);
    let nPage = getPageNumber('page', url);
    let n = $('ul.pagination li a').length;
    let i = 0;
    $('ul.pagination li a').each(function () {
        let text = 0;
        if (i == 0) {
            if (nPage == 1) {
                $(this).parent().addClass('disabled');
                text = 0;
            } else text = nPage - 1;
        } else if (i == n - 1) {
            if (nPage == n - 1) {
                $(this).parent().addClass('disabled');
                text = 0;
            } else text = parseInt(nPage) + 1;
        } else
            text = i;
        if (text != 0) {
            let href = '?page=' + text;
            let newhref = getNewHref('page', url, href);
            $(this).attr('href', newhref);
        }
        i++;
    });

});