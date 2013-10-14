$(function() {
        
    // Bind the swipeleftHandler callback function to the swipe event on div.box
  $(document).on("swiperight", "div.swipeToClear", function() {
    $( event.target ).hide();
  }); 
  
        
});
