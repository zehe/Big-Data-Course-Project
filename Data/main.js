$(document).ready(function() {
    $('#weather').change(function(){
    var rain = ['1', '2', '3', '4', '5','6','7','8','9','10','11','12'];
    var snow = ['1','2','3'];
    var temp = ['1', '2', '3','5','6','7','8','9'];
    
    switch($('#weather').val()){
        case 'rain':
            $('#month').html('');
            for(i=0; i<rain.length; i++){
                $('#month').append($('<option/>', { 
                                        value: rain[i],
                                        text : rain[i] 
                }));
            }
            break;
        case 'snow':
             $('#month').html('');
            for(i=0; i<snow.length; i++){
                $('#month').append($('<option/>', { 
                                        value: snow[i],
                                        text : snow[i] 
                }));
            }
            break;           
        case 'temp':
            $('#month').html('');
            for(i=0; i<temp.length; i++){
                $('#month').append($('<option/>', { 
                                        value: temp[i],
                                        text : temp[i] 
                }));
            }
            break;
    }
    });
    
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
var d2dpath = "./rain/place_count/1.csv";
    
//$('#update').click(function(){
//    filepath = "./" + $('#weather').val() + "/range_count" + $('#month').val() + ".csv" ;
//    d2dpath = "./" + $('#weather').val() + "/place_count" + $('#month').val() + ".csv" ;
//});
    

    
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
                  
            svg2.select(".x.axis")
            .call(xAxis)
            .transition()
            .duration(750);
            
            svg2.select(".y.axis")
            .call(yAxis)
            .transition()
            .duration(750);

            }
            
        });
    }
});
    
/*--------------------------------d2d-------------------------------------------------------*/

    var d2dwidth = 1200;
    var	d2dheight = 600;
    var d2dsvg_height = 1000;
    var d2dneighborhood_index = {};
    var d2dneighborhood_array = [];
    var d2dmaxHeight=1;
    var d2dyScale = d3.scale.linear()
				.range([d2dheight,0]);
    var d2dxScale= d3.scale.ordinal().rangeRoundBands([0,d2dwidth],0.5,0);
    var d2dsvg = d3.select("#dtod")
	.attr("width", d2dwidth)
	.attr("height", d2dsvg_height)
	.attr('transform','translate(50,50) rotate(10)')
	.attr('margin','150px 150px 150px 150px');
    var d2dtext_month = d2dsvg.append('text').attr('x',600).attr('y',20).attr('fill','pink').attr('font-size','40px');
    var d2dtext_info = d2dsvg.append('text').attr('x',500).attr('y',120).attr('fill','black ').attr('font-size','20px').attr('fill-width',1);

    var d2dtime = 0;
    var d2doldone;
    var d2dclick_time = 1;
    var d2dweight = {};
    var d2dall_transition = d2dsvg.append('g').attr('class','arc');
    var d2dmonth = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var d2dcolor = ['pink','palegreen','powderblue','peachpuff','cornsilk','darkseagreen','khaki','	salmon','lightseagreen','lightskyblue','thistle','mediumturquoise'];
    
    d3.csv(d2dpath, function(d){
   
        d.count = +d.count;

        if(!d2dneighborhood_index[d.from]){
			d2dneighborhood_array.push(d.from);
			d2dneighborhood_index[d.from] = d2dneighborhood_array.length - 1;
		} 
		if(!d2dneighborhood_index[d.to]){
			d2dneighborhood_array.push(d.to);
			d2dneighborhood_index[d.to] = d2dneighborhood_array.length - 1;
		}
		return d;
        
        
    }, function(d){
        
        var d2dall_neighbor = d;
		var d2dmax = d3.max(d2dall_neighbor,function(d){return d.count;});
		d2dxScale.domain(d2dneighborhood_array);
		var d2dbarchar = d2dsvg.selectAll('rect');
		d2dbarchar.data(d2dneighborhood_array).enter().append('rect')
		.attr('x',function (d,i) {
			// console.log(i);
			return d2dxScale(d);
		})
		.attr('y',d2dheight)
		.attr('width',d2dxScale.rangeBand())
		.attr('height',1)
		.style('fill','pink');
        
        d2dtext_month.text('January');
        
        var d2dpath_package = d2dall_transition.selectAll('.arc').data(d).enter().append('g').attr('class','arc').each(function(d){
           
            var group = d3.select(this);


		  var start_name = d.from;
		  var end_name= d.to;
		  var count = d.count/100;
            
//		  if(d2dneighborhood_index[start_name] > d2dneighborhood_index[end_name]){
//			var tmp = end_name;
//			end_name = start_name;
//			start_name = tmp;
//		  }
            
           //console.log(d2dneighborhood_index);

		  var start = d2dxScale(start_name);
		  var end = d2dxScale(end_name);
		  var r = (end - start) * 0.51;
		  var ry = Math.min(r, 600);
		
		// body...
		
		
		for (var i = 0; i < count/10; i++){
			var path = 'M ' + start + ','+ d2dheight +' A ' + (r + i*2) + ',' + ry + ' 0 0,1 ' + end + ','+ d2dheight +' ';
            
            if(d2dneighborhood_index[start_name] > d2dneighborhood_index[end_name]){
			var single_path = group.append('path')
			.attr('d', path)
			.style('stroke', d2dcolor[11])
			.on('mouseover',function(d){
				d2dtext_info.text('From:  '+d.from + '  To: '+d.to+'\n'+'     Amount: '+d.count);
				d3.select(this).style('stroke', 'red').style('stroke-width',2);

			})
			.on('mouseout',function(d){
				d3.select(this).style('stroke', d2dcolor[11]).style('stroke-width',1)
			})
			.transition()
      		.duration(750)
			.style('fill','none');
            }else{
 			var single_path = group.append('path')
			.attr('d', path)
			.style('stroke', d2dcolor[0])
			.on('mouseover',function(d){
				d2dtext_info.text('From:  '+d.from + '  To: '+d.to+'\n'+'     Amount: '+d.count);
				d3.select(this).style('stroke', 'red').style('stroke-width',2);

			})
			.on('mouseout',function(d){
				d3.select(this).style('stroke', d2dcolor[0]).style('stroke-width',1)
			})
			.transition()
      		.duration(750)
			.style('fill','none');               
            }

			
		}
            
        });
        
    $('#update').click(function(){
        newd2dpath = "./" + $('#weather').val() + "/place_count/" + $('#month').val() + ".csv" ;
        
        d2dtext_month.attr('fill',d2dcolor[$('#month').val()-1]).text(d2dmonth[$('#month').val()-1]);
        
        d3.csv(newd2dpath, function(d){

            d.count = +d.count;

		if(!d2dneighborhood_index[d.from]){
			d2dneighborhood_array.push(d.from);
			d2dneighborhood_index[d.from] = d2dneighborhood_array.length - 1;
		} 
		if(!d2dneighborhood_index[d.to]){
			d2dneighborhood_array.push(d.to);
			d2dneighborhood_index[d.to] = d2dneighborhood_array.length - 1;
		}
		return d;
        }, function(d){
            
            d2dall_transition.selectAll('.arc').remove().transition().delay(200)
            .duration(1050);
	       d2dall_transition.selectAll('.arc').data(d).enter().append('g').attr('class','arc').each(function(d,i){
		var group = d3.select(this);

		var start_name = d.from;
		var end_name= d.to;
		var count = d.count/100;
//		if(d2dneighborhood_index[start_name] > d2dneighborhood_index[end_name]){
//			var tmp = end_name;
//			end_name = start_name;
//			start_name = tmp;
//		}

		var start = d2dxScale(start_name);
		var end = d2dxScale(end_name);
		var r = (end - start) * 0.51;
		var ry = Math.min(r, 600);
		//console.log(start_name);
		
		// body...
		// var grouparc = group.selectAll(".arc path");ß
		for (var i = 0; i < count/10; i++){
			var path = 'M ' + start + ','+ d2dheight +' A ' + (r + i*2) + ',' + ry + ' 0 0,1 ' + end + ','+ d2dheight +' ';
			group.append('path')
			.attr('d', path)
			.on('mouseover',function(d){
				d2dtext_info.text('From:  '+d.from + '  To: '+d.to+'\n'+'     Amount: '+d.count);
				d3.select(this).style('stroke', 'red').style('stroke-width',2);

			})
			.on('mouseout',function(d){
				d3.select(this).style('stroke', d2dcolor[$('#month').val()-1]).style('stroke-width',1)
			})
			.transition()
      		.duration(750)
			// .attr('stroke-width',0.5)
			.style('stroke', d2dcolor[$('#month').val()-1]).style('fill','none');
		}
            
        });
        
        }, function(error,d){console.log(d);});

    });
        
        
        
    },function(error,d){console.log(d);})
    
/*--------------------------------d2d-------------------------------------------------------*/
    
});
