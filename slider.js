

$(function() {
  $( "#slider" ).slider({
    min: 1,
    max: 83, 
    value: 0,
    step: 1,
    slide: function(event, ui) {

    if(ui.value == 0) {
      // highlight all explosion points
      // d3.selectAll('.explosionpoint')
      // .style("display","block");

      // change the slider text to appropriate date
      d3.select("#slidertext")
      .text('Attacks During 01/2004 - 12/2009');

    }

    }
  });
});