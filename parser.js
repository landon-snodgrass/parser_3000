var urlArray;
var unfilteredArray = [];
function parse() {
    var string = document.getElementById("urlText").value;
    urlArray = urlsToArray(string);
    var numOfFilters = $('.filter');
    var filterArray = getFilters(numOfFilters);
    getUrls(urlArray, filterArray);
}

function urlsToArray(data){
    s = "";
    urlArray = [];
    for(var i = 0; i < data.length; i++) {
        if(data.charAt(i) !== '\n'){
            s += data.charAt(i);
        } else {
            urlArray.push(s);
            s = "";
        }
    }
    urlArray.push(s);
    return urlArray;
}

function getFilters(numOfFilters) {
    filterArray = [];
    for(var i = 0; i < numOfFilters.length; i++){
        filterArray[i] = numOfFilters[i].value;
    }
    return filterArray;
}

function getUrls(urls, filterArray) {
    var filteredUrls = [];
    for(var index = 0; index < filterArray.length; index++){
        filteredUrls[filterArray[index]] = [];
    }
    
    for(var i = 0; i < urls.length; i++){
        for(var j = 0; j < filterArray.length; j++){
            if(urls[i].indexOf(filterArray[j]) !== -1){
                console.log(urls[i] + ' filtered by ' + filterArray[j]);
                filteredUrls[filterArray[j]][i] = urls[i];
            } else {
                console.log("UNFILTERED: " + urls[i]);
                unfilteredArray[i] = urls[i];
            }
        }
    }
    console.log(filteredUrls);
    urlArray = filteredUrls;
    createButtons();
}

function addFilter(){
    $('#filterContainer').append("<div class='filter-holder'><input type='text' class='filter'></div>");
}

function deleteFilter() {
    $('.filter-holder')[$('.filter-holder').length-1].remove();
}

function createButtons() {
    if($('.csv-download')){
        $('.csv-download').each(function(){
            $(this).remove();
        });
    }
    
    $('.filter-holder').each(function(index) {
        var button = document.createElement('input');
        button.className = 'csv-download btn btn-warning';
        button.setAttribute("value", "Filtered by: " + $('.filter')[index].value);
        button.setAttribute("filterName", $('.filter')[index].value)
        button.setAttribute("type", "button");
        $('.button-holder').append(button);
        button.onclick = downloadCsv;
    });
    var unfilteredButton = document.createElement('input');
    unfilteredButton.className = "csv-download btn btn-warning";
    unfilteredButton.setAttribute("value", "Unfiltered");
    unfilteredButton.setAttribute("type", "button");
    $(".button-holder").append(unfilteredButton);
    unfilteredButton.onclick = downloadCsv;
}

function downloadCsv() {
    var code = this.getAttribute('filterName');
    console.log("CODE = " + code);
    var csv = "text\n";
    if(code){
        array = urlArray[code];
        array = array.filter(function(el){
            return el != null;
        });
    } else {
        array = unfilteredArray;
    }
    console.log("ARRAY = " + array);


    array.forEach(function(row) {
        csv += row;
        csv += "\n";
    });
    
    
    console.log("CSV = " + csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = "data:text/csv;charset=utf-8,"+encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = code + " urls.csv";
    hiddenElement.click();
}