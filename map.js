

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 8])
    .on("zoom", move);

var mapDiv = $("#map");

var width = window.innerWidth,
    height = window.innerHeight;

var color = d3.scale.ordinal()
    .range(colorbrewer.Blues[9]);


//initialize tooltip
var tooltip = d3.select("#map").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

var projection = d3.geo.mercator()
    // .scale((width + 1) / 2 / Math.PI)
    .scale(1000)
    .translate([width / 2, height*1.8])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);


var g = svg.append("g");


d3.json("data/world-topo.json", function(error, world) {

  var countries = topojson.feature(world, world.objects.countries).features;

  d3.csv("data/Earthquakes_Europe-1901-1983.csv", function(error, data) {

    var events = data;

    draw(countries, events);

  });
  

});

function draw(countries, events) {
  
  var opacity = 1.0;
  var country = g.selectAll(".country").data(countries);

  country.enter().insert("path")
      .attr("class", "country")
      .attr("d", path)
      // .attr("id", function(d,i) { return d.id; })
      // .attr("title", function(d,i) { return d.properties.name; })
      .style("fill", function(d, i) { 

        return color(d.properties.name); 

      });


               
                
                
            
          


    g.selectAll(".country")
      .data(events)
      .enter()
      .insert("circle")
      .attr("transform", function(d) {
        return "translate(" + projection([d.x, d.y]) + ")";
      })
      .style("fill", "red")
      .attr("r", 3)
            //tooltip
            .on("mousemove", function(d) {  

                tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);

                tooltip.html(d.country+"/"+d.place+"/"+d.year+"/"+d.magnitude+"/"+d.intensity)
                        .style("left", (d3.mouse(svg.node())[0] + 30) + "px")     
                        .style("top", (d3.mouse(svg.node())[1] + 15) + "px"); 

               
            })
            .on("mouseout", function(d) {

                tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
              });
      // .style("fill-opacity", 0.5)
      // .style("stroke", "red")
      // .style("stroke-opacity", 0.5);
    // .transition()
    //   .duration(2000)
    //   .ease(Math.sqrt)
    //   .attr("r", function(d){
    //     return d.magnitude;
    //   })
    //   .style("fill-opacity", 1e-6)
    //   .style("stroke-opacity", 1e-6)
    //   // .remove()
    //   .each("end", function() {

    //     d3.select(this)
    //       .style("fill-opacity", 0.1);

    //   });

 

 //...
       


           
  

}

function move() {

  var t = d3.event.translate;
  var s = d3.event.scale;  
  var h = height;
  
  // t[0] = Math.min(width / 2 * (s - 1), Math.max(width / 2 * (1 - s), t[0]));
  // t[1] = Math.min(height / 2 * (s - 1) + h * s, Math.max(height / 2 * (1 - s) - h * s, t[1]));

  // t[0] = Math.max((width / 2)*(1 - s), Math.min((width / 2)*(s - 1)));
  // t[1] = Math.max(0, Math.min(0, t[1]));

  // console.log(s + ", " + t[0]/s + ", " + t[1]/s);



  zoom.translate(t);
  g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

}

function identity(d) { return d; }

