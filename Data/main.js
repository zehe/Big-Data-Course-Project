$(document).ready(function() {
    var margin = {top: 40, right: 40, bottom: 30, left: 140},
    width = 560 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Parse the date / time
//var	parseDate = d3.time.format("%Y-%m").parse;

var x = d3.scale.ordinal().rangeRoundBands([0,width],.5);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
    
var filepath = "./rain/range_count/1.csv";
    
$('#update').click(function(){
    filepath = "./" + $('#weather').val() + "/range_count" + $('#month').val() + ".csv" ;
});
    

    
d3.csv(filepath,  function(error, data) {

    data.forEach(function(d) {
        d.range = d.range;
        d.count = +d.count;
    });
    
    x.domain(data.map(function(d) { return d.range; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height+5) + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 8)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Count");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.range); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); });
    
    svg.selectAll("bar").data(data).exit().remove(); 
    
    $('#update').click(function(){
        filepath = "./" + $('#weather').val() + "/range_count/" + $('#month').val() + ".csv" ;
        console.log(filepath);
        
        updateData(filepath);

    });
    
    function updateData(path){
        
        d3.csv(path, function(error, data){
            
            if(error) {
                alert("This Dataset is not Exist!!!")
            }else{
                data.forEach(function(d) {
                d.range = d.range;
                d.count = +d.count;
                });
         
            x.domain(data.map(function(d) { return d.range; }));
            y.domain([0, d3.max(data, function(d) { return d.count; })]);
            
            var svg2 = d3.select("#chart").data(data);
            
            var bar = svg.selectAll(".bar")
            .data(data, function(d){ return d.range;});
            
            bar.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.range); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); });
            
            bar.exit().remove();
            
            bar
            .attr("x", function(d) { return x(d.range); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); });
            
//            svg2.selectAll("bar")
//            .attr("x", function(d) { return x(d.range); })
//            .attr("width", x.rangeBand())
//            .attr("y", function(d) { return y(d.count); })
//            .attr("height", function(d) { return height - y(d.count); })
//            .transition()
//            .duration(750);
//            
            svg2.select(".x.axis")
            .call(xAxis)
            .transition()
            .duration(750);
            
            svg2.select(".y.axis")
            .call(yAxis)
            .transition()
            .duration(750);
//             
//            svg2.exit().remove();
            }
            
        });
    }
});
    
    
    
});