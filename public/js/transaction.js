function getNewHref(pattern, url, hreff) {
    let href = hreff.substr(1);
    if (url.search('\\?')<0) return hreff;
    let uri = url.substr(url.search('transaction?') + 11);

    if (uri.search(pattern) >= 0) {
        lists = uri.substr(1).split('&');
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].search(pattern) >= 0) {
                lists[i] = href;

            }
        }
        uri = '?' + lists.join('&');
    }
    else {
        uri += '&' + href;
    }
    return uri;
}

function getPageNumber(pattern, url) {
    if (url.search('\\?')<0) return 1;
     
    let uri = url.substr(url.search('transaction') + 11);
    console.log(uri);
    if (uri.search(pattern) >= 1) {
        let tmp = uri.substr(uri.search(pattern) + pattern.length + 1);
        tmp1 = tmp.search('&');
        let page;
        if (tmp1 >= 1)
            page = tmp.substr(0, tmp1);
        else
            page = tmp;
        console.log(page);
        
        return page;
    }
    else {
        return 1;
    }
}

function getOppositeOrder(ord) {
    return ord == 'asc' ? 'desc' : 'asc';
}

function updateHeader(url) {
    let type = ['time', 'desc'];
    let query = getPageNumber('order', url);
    console.log(query);
    if (query != 1)
        type = query.split('_');

    let newActive = $('#header' + type[0]);
    $('.listHeader').each(function () {
        let href = $(this).attr('href');

        if ($(this).attr('id') == newActive.attr('id')) {
            console.log(newActive);
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
        case 'licensePlate': {
            $('.active-filter').removeClass('active-filter');
            $('#headerlicensePlate').addClass('active-filter');
            $('.licensePlateData').addClass('active-filter');
            break;
        }
        case 'transactionid': {
            $('.active-filter').removeClass('active-filter');
            $('#headertransactionid').addClass('active-filter');
            $('.transactionidData').addClass('active-filter');
            break;
        }
        case 'userid': {
            $('.active-filter').removeClass('active-filter');
            $('#headeruserid').addClass('active-filter');
            $('.useridData').addClass('active-filter');
            break;
        }
        case 'busid': {
            $('.active-filter').removeClass('active-filter');
            $('#headerbusid').addClass('active-filter');
            $('.busidData').addClass('active-filter');
            break;
        }
        case 'userphone': {
            $('.active-filter').removeClass('active-filter');
            $('#headeruserphone').addClass('active-filter');
            $('.userphoneData').addClass('active-filter');
            break;
        }
        case 'departure': {
            $('.active-filter').removeClass('active-filter');
            $('#headerdeparture').addClass('active-filter');
            $('.departureData').addClass('active-filter');
            break;
        }
        case 'time': {
            $('.active-filter').removeClass('active-filter');
            $('#headertime').addClass('active-filter');
            $('.timeData').addClass('active-filter');

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

$(document).ready(function () {
    let url = window.location.href
    let nPage = getPageNumber('page',url);
    let n = $('ul.pagination li a').length;
    let i = 0;
    $('ul.pagination li a').each(function () {
      let text = 0;
      if (i == 0) {
        if (nPage == 1) {
          $(this).parent().addClass('disabled');
          text = 0;
        }
        else text = nPage - 1;
      } else if (i == n - 1) {
          if (nPage == n - 1) {
            $(this).parent().addClass('disabled');
            text = 0;
          }
          else text = parseInt(nPage) + 1;
        } else
          text = i;
      if (text != 0) {
        let href = '?page=' + text;
        let newhref = getNewHref('page',url, href);
        $(this).attr('href', newhref);
      }
      i++;
    });
    updateHeader(url);
    
  });