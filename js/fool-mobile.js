$(function() {    
    $(document).on("swiperight", "div.swipeToClear", function() {
        $( event.target ).hide();
    });        

    $(document).on("change", "#selectHomeScreen", function() {
        text = $(this).text();
        if (text == "Trade Alerts") {
            $('homeScreenSelector').css("background-color", "#BB0000");
        } else if (text == "Latest News") {
            $('homeScreenSelector').css("background-color", "#55AA22");
        } else if (text == "My Stocks") {
            $('homeScreenSelector').css("background-color", "#0077AA");
        }
    });
});
