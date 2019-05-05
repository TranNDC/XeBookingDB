$(document).ready(function () {
    var objToday = new Date(),
        weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        dayOfWeek = weekday[objToday.getDay()],
        domEnder = function () {
            var a = objToday;
            if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
            a = parseInt((a + "").charAt(1));
            return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th"
        }(),
        dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear();
    var today = dayOfWeek + ", " + dayOfMonth + " of " + curMonth + ", " + curYear;

    document.getElementById("date").innerHTML += today;

    //column chart
    google.charts.load('current', {
        packages: ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(drawColColors);



    //line chart
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(drawChartLine);


    //donut
    google.charts.load("current", {
        packages: ["corechart"]
    });
    google.charts.setOnLoadCallback(drawChartDonut);

    google.charts.setOnLoadCallback(drawChartBusType);

    google.charts.setOnLoadCallback(drawChartBusRoute);

});

function drawChartBusRoute() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['New York - Dallas',52],
        ['Ho Chi Minh - Dallas', 24],
        ['Dallas - Ho Chi Minh', 14],
        ['Other',10]
    ]);

    var options = {
        colors: ['#d70303','#56c568','#3fa2f7','#999999'],
        pieSliceText: "none",
        animation: {
            duration: 1000,
            easing: 'in',
            startup: true
        },
        backgroundColor: 'transparent'

    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_busroute'));
    chart.draw(data, options);
}



function drawChartBusType() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Normal',30],
        ['Air', 30],
        ['Sleeper', 40]
    ]);

    var options = {
        colors: ['#999999', '#d70303','#56c568'],
        pieHole: 0.6,
        legend: "none",
        pieSliceText: "none",
        animation: {
            duration: 1000,
            easing: 'in',
            startup: true
        },
        backgroundColor: 'transparent'

    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_bustype'));
    chart.draw(data, options);
}


function drawChartDonut() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Visit but not book bus', 30],
        ['Visit then book bus', 70]
    ]);

    var options = {
        colors: ['#999999', '#d70303'],
        pieHole: 0.6,
        legend: "none",
        pieSliceText: "none",
        animation: {
            duration: 1000,
            easing: 'in',
            startup: true
        },
        backgroundColor: 'transparent'

    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_donut'));
    chart.draw(data, options);

    // initial value
    var percent = 0;
    // start the animation loop
    var handler = setInterval(function () {
        // values increment
        percent += 1;
        // apply new values
        data.setValue(0, 1, percent);
        data.setValue(1, 1, 100 - percent);
        // update the pie
        chart.draw(data, options);
        // check if we have reached the desired value
        if (percent >= 30)
            // stop the loop
            clearInterval(handler);
    }, 30);
}

function drawColColors() {
    var data = google.visualization.arrayToDataTable([
        ['Day', 'USD'],
        ['May 1', 10],
        ['May 2', 14],
        ['May 3', 16],
        ['May 4', 22],
        ['May 6', 24],
        ['May 7', 12],
        ['May 8', 25],
        ['Today', 10],

    ]);

    var options = {
        title: 'Recently revenue',
        colors: ['#d70303'],
        hAxis: {
            title: 'Day of month',

        },
        vAxis: {
            title: 'Revenue every day'
        },
        animation: {
            duration: 1000,
            easing: 'out',
            startup: true
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_col'));
    chart.draw(data, options);
}


function drawChartLine() {
    var data = google.visualization.arrayToDataTable([
        ['Day', 'Number'],
        ['May 1', 10],
        ['May 2', 14],
        ['May 3', 16],
        ['May 4', 22],
        ['May 6', 24],
        ['May 7', 12],
        ['May 8', 25],
        ['Today', 10],

    ]);

    var options = {
        title: 'Recently number of booking bus',
        colors: ['#d70303'],
        hAxis: {
            title: 'Day of month',

        },
        vAxis: {
            title: 'Revenue every day'
        },
        animation: {
            duration: 1000,
            easing: 'out',
            startup: true
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_line'));
    chart.draw(data, google.charts.Line.convertOptions(options));
}