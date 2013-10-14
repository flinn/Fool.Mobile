$(function() {    
    $(document).on("swiperight", "div.swipeToClear", function() {
        $( event.target ).hide();
    });        

    $(document).on("change", "#selectHomeScreen", function() {
        text = $(this).val();
        if (text == "homePageTradeAlerts") {
            $('#homeScreenSelector').find('div.ui-btn').css("background", "#BB0000");
        } else if (text == "homePageLatestNews") {
            $('#homeScreenSelector').find('div.ui-btn').css("background", "#55AA22");
        } else if (text == "homePageMyStocks") {
            $('#homeScreenSelector').find('div.ui-btn').css("background", "#0077AA");
        }
    });
});
