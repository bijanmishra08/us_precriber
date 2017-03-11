
Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
    return {
        radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
        },
        stops: [
            [0, color],
            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
        ]
    };
});
function addText() {

	$(".billboard-title").html(main_heading);
	$(".billboard-description").html(sub_heading);

	//$(".billboard").css("background-image","linear-gradient(to right, rgba(51,51,51,.8),rgba(51,51,51,.8)), url('http://placeimg.com/1000/400/tech/grayscale'); background-size: cover;");
	$("#tabHome").html(tab1_text);
	$("#tabSearch").html(tab2_text);
	var ths = "";
	table_heading.forEach(function (d, i) {

		ths = ths + "<th>" + d + "</th>";
	})
	var tr = "<tr>" + ths + "</tr>";

	//$("table thead").html(tr);

	$("#footerText").html(footer_text1 + "<a href='' target='_blank' style='margin-left:9px;'>" + footer_text2 + "</a>");

}

function similarity(s1, s2) {
	var longer = s1;
	var shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	var longerLength = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}
function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	var costs = new Array();
	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;
		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue),
								costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
	
	
	
}



function DrawVenn(zip,l1,l2,l3){
	
	
	
	if(zip=="all"){
		
		$(".nanRes").show();
		$("#container1").children().hide();
		return;
	}
	
	$(".nanRes").hide();
		$("#container1").children().show();
		
		
	var dataMap={
		"Early Adopters":l1,
		"Late Adopters":l2,
		"Laggards":l3
		
	}
	
	
	var chat=new  Highcharts.chart('container1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
		credits: {
				enabled: false
			},
        tooltip: {
			enabled: false,
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
					format: '{point.y}',
                },
                showInLegend: true,
				
            }
			
			
			
			/*,
			series: {
					
					events: {
							click: function (event) {

								//alert(this.name + "----" + zip);
								
								//debugger;

								$("#popupBack").show();
								
								debugger;
								
								var tempData=dataMap[this.name];
								
								
								tempData=jQuery.unique(tempData);
								
								
								var trs="";
			
								tempData.forEach(function(d,i){
				
									trs=trs+"<tr><td>"+d+"</td></tr>"
				
									if(i==tempData.length-1){
										
										$("#uniqPretable").find("tbody").html(trs);
										
										setTimeout(function(){
											$("#uniqPre").show();
											
										},1000)
									}
			
								})
								
								

							}
						}
				}*/
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Early Adopters',
                y: (jQuery.unique(l1)).length
            }, {
                name: 'Late Adopters',
                y: (jQuery.unique(l2)).length
               
            }, {
                name: 'Laggards',
                y: (jQuery.unique(l3)).length
            }],
			  point:{
                  events:{
                      click: function (event) {
                          var name =this.name;
						  
						  	$("#popupBack").show();
								
								var tempData=dataMap[this.name];
								
								
								tempData=jQuery.unique(tempData);
								
								
								var trs="";
			
								tempData.forEach(function(d,i){
				
									trs=trs+"<tr><td>"+d+"</td></tr>"
				
									if(i==tempData.length-1){
										
										$("#uniqPretable").find("tbody").html(trs);
										
										setTimeout(function(){
											$("#uniqPre").show();
											
										},1000)
									}
			
								})
                      }
                  }
              }
        }]
    });
}






/*function DrawVenn(zip,l1,l2,l3) {

	if(zip=="all"){
		
		$("#container1").children().hide();
		return;
	}
	
	
	
	

	(function (H) {
		H.wrap(H.seriesTypes.bubble.prototype, 'alignDataLabel', function (p, point, dataLabel, options, alignTo, isNew) {
			alignTo = alignTo || {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};

			alignTo.x = point.plotX - dataLabel.padding;
			alignTo.y = point.plotY;
			alignTo.width = dataLabel.width;

			H.Series.prototype.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
		});
	}
		(Highcharts))
		
		
		
	var dataMap={
		"Early Adopters":l1,
		"Late Adopters":l2,
		"Laggards":l3
		
	}

	var chart = new Highcharts.Chart("container1", {
			chart: {

				type: 'pie'
			},
			title: {
				text: ''
			},
			credits: {
				enabled: false
			},
			legend: {
				enabled: true
			},
			plotOptions: {
				series: {
					shadow: false,
					borderWidth: 0,
					dataLabels: {
						y: 30,
						x: -6,
						align: 'left',
						enabled: true,
						formatter: function () {
							return this.series.points[0].com;
						},
						style: {
							'width': '100px',
							'text-anchor': 'middle'
						}
					},
					marker: {
						symbol: 'circle',
						radius: 70,
						lineWidth: 1,
					},
					events: {
							click: function (event) {

								//alert(this.name + "----" + zip);
								
								//debugger;

								$("#popupBack").show();
								
								var tempData=dataMap[this.name];
								
								
								tempData=jQuery.unique(tempData);
								
								
								var trs="";
			
								tempData.forEach(function(d,i){
				
									trs=trs+"<tr><td>"+d+"</td></tr>"
				
									if(i==tempData.length-1){
										
										$("#uniqPretable").find("tbody").html(trs);
										
										setTimeout(function(){
											$("#uniqPre").show();
											
										},1000)
									}
			
								})
								
								

							}
						}
				}
					
			},
			xAxis: {
				visible: false,
				min: 0,
				max: 10,
				lineWidth: 0,
				gridLineWidth: 0,
				title: {
					text: ''
				},
				labels: {
					enabled: false
				}
			},
			yAxis: {
				min: 0,
				max: 100,
				lineWidth: 0,
				gridLineWidth: 0,
				title: {
					text: ''
				},
				labels: {
					enabled: false
				}
			},

			series: [{
					color: 'rgba(90,155,212,.5)',
					name: 'Early Adopters',
					data: [{
							x: 4,
							y: 70,
							com: (jQuery.unique(l1)).length
						}
					],
					zIndex: 3
				}, {
					color: 'rgba(241,90,96,.5)',
					name: 'Late Adopters',
					data: [{
							x: 6,
							y: 70,
							com: (jQuery.unique(l2)).length
						}
					],
					zIndex: 3
				}, {
					color: 'rgba(250,250,91,.5)',
					name: 'Laggards',
					data: [{
							x: 5,
							y: 40,
							com: (jQuery.unique(l3)).length
						}
					],
					zIndex: 3
				}
			],
			tooltip: {
				enabled: false
			}
		});
}*/

//var classifiers=["Early_Adopters","Late Adopters","Laggards"];


function DrawBubble(data, zip) {

	(function (H) {
		H.wrap(H.seriesTypes.bubble.prototype, 'alignDataLabel', function (p, point, dataLabel, options, alignTo, isNew) {
			alignTo = alignTo || {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};

			alignTo.x = point.plotX - dataLabel.padding;
			alignTo.y = point.plotY;
			alignTo.z = point.plotz;
			alignTo.width = dataLabel.width;

			H.Series.prototype.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
		});
	}
		(Highcharts))

	var Early_Adopters = data.filter(function (d, i) {

			return d.name == "Early_Adopters";
		})

		var val0 = Early_Adopters[0].data;

	var Late_Adopters = data.filter(function (d, i) {

			return d.name == "Late Adopters";
		})

		var val1 = Late_Adopters[0].data;

	var Laggards = data.filter(function (d, i) {

			return d.name == "Laggards";
		})

		var val2 = Laggards[0].data;

	draw(val0, val1, val2);
	
	function getRadius(r){
		
		/*if(zipCont=="all"){
			
			return r;
		}else{
			
			
			
		}*/
		
		if(r<=15){
			
			
			
				return 20;
			}else{
				
				return r;
			}
		
	}
	
		

	function draw(val0, val1, val2) {
		
		
		var arr = [val0,val1,val2];
		var max = arr.reduce(function(a, b) {
				return Math.max(a, b);
		})
		
		var radiusArry=[];
		
		var indexofMax=arr.indexOf(max);
		
		arr.forEach(function(d,i){
			
			if(i!=indexofMax){
				
				radiusArry[i]=(60/arr[indexofMax])*d;
			}else{
				
				radiusArry[i]=60;
				
			}
			
		})

		/*var r0 = 60;
		r1 = (r0 / val0) * val1;
		r2 = (r0 / val0) * val2;*/
		
		
		
		

		var chart = new Highcharts.Chart("bubble1", {
				chart: {

					type: 'scatter'
				},
				title: {
					text: ''
				},
				credits: {
					enabled: false
				},
				legend: {
					enabled: true
				},
				plotOptions: {
					series: {
						shadow: false,
						borderWidth: 0,
						dataLabels: {
							y: 10,
							x: -6,
							align: 'left',
							enabled: true,
							formatter: function () {
								return this.series.points[0].val;
							},
							style: {
								'width': '100px',
								'text-anchor': 'middle',
								'color': (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							},
							 connectorColor: 'silver'
						},

						events: {
							click: function (event) {

								//alert(this.name + "----" + zip);

								if (zip == "all") {

									alert("First select a zip form the side map to view the prescriber details. ")
									
								}else{
									
									
									var mapText={
										
										"Early Adopters":"Early_Adopters",
										"Late Adopters":"Late Adopters",
										"Laggards":"Laggards"
										
										
									}
									ajaxForPresIncome(zip,mapText[this.name]);
									//alert(zip);
								}

							}
						}

					}
				},
				xAxis: {
					visible: false,
					min: 0,
					max: 10,
					lineWidth: 0,
					gridLineWidth: 0,
					title: {
						text: ''
					},
					labels: {
						enabled: false
					}
				},
				yAxis: {
					min: 0,
					max: 100,
					lineWidth: 0,
					gridLineWidth: 0,
					title: {
						text: ''
					},
					labels: {
						enabled: false
					}
				},
				series: [{
						//color: 'rgba(90,155,212,.5)',
						name: 'Early Adopters',

						data: [{
								x: 4,
								y: 70,
								r: radiusArry[0],
								val: val0
							}
						],
						marker: {
							radius: getRadius(radiusArry[0]),
							symbol: "circle"
						},
						zIndex: 3
					}, {
						//color: 'rgba(241,90,96,.5)',
						name: 'Late Adopters',

						data: [{
								x: 6,
								y: 70,
								r: radiusArry[1],
								val: val1
							}
						],
						marker: {
							radius: getRadius(radiusArry[1]),
							symbol: "circle"
						},

						zIndex: 100
					}, {
						//color: 'rgba(250,250,91,.5)',
						name: 'Laggards',

						data: [{
								x: 5,
								y: 40,
								r: radiusArry[2],
								val: val2
							}
						],
						marker: {
							radius: getRadius(radiusArry[2]),
							symbol: "circle"
						},
						zIndex: 3
					}
				],
				tooltip: {
					enabled: true,
					formatter: function () {

						return this.series.name + "</br>" + " : " + this.series.points[0].val + " , " + "Zip Code : " + zip;
					}
				}
			});
	}

}

function lineChat(data, zip) {

	if (zip == "all") {

		$(".nanRes").show();
		$("#line1").children().hide();
		return;

	}

	data0 = data;

	// d3.csv("./drg_zip_pres.csv",function(error,data0){


	$(".nanRes").hide();
	$("#line1").children().show();

	var keySet = Object.keys(data0[0]);

	var newKey = [];

	keySet.forEach(function (d, i) {

		if (d == "id" || d == "zip3") {}
		else {

			newKey.push(d);
		}
	})

	keySet = newKey;

	var data = data0[0];

	var graphData = [];

	keySet.forEach(function (d, i) {

		graphData.push(parseFloat(data[d]));

	})

	Highcharts.chart('line1', {

		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		xAxis: {
			categories: keySet
		},
		
		yAxis: {
			min: -2,
			max: 3,
		},
		
		
		

		plotOptions: {
			series: {
				marker: {
					radius: 8
				}
			}
		},

		series: [
			  
			{
				
				name:"Value",
				data: graphData
			}
		]
	});

	//})


}

function d3Map(data) {

	data.map(function (d, i) {

		d.pop = (d.zip3_census).toString();
		d.zip = (d.zip3).toString();

		return d;
	})

	tempData0_zipAry = data;

	var width = $("#map").css("width"),
	width = parseInt(width.replace("px", "")) - 100,
	height = $("#map").css("height"),
	height = parseInt(height.replace("px", "")) - 100,
	active = d3.select(null);

	var div = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var projection = d3.geo.albersUsa()
		.scale(500)
		.translate([width / 2, height / 2]);
	var t = projection.translate(); // the projection's default translation
	var s = projection.scale() // the projection's default scale
		var path = d3.geo.path()
		.projection(projection);

	var svg = d3.select("#map").append("svg")
		.attr("width", width + 50)
		.attr("height", height + 80)

		// .on("click", reset);


		svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height + 80)
		.on("click", reset);

	var gradient = svg.append("defs")
		.append("linearGradient")
		.attr("id", "gradient")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "100%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");

	gradient.append("stop")
	.attr("offset", "0%")
	.attr("stop-color", "hsl(152,80%,80%)")
	.attr("stop-opacity", 1);

	gradient.append("stop")
	.attr("offset", "100%")
	.attr("stop-color", "hsl(228,30%,40%)")
	.attr("stop-opacity", 1);

	svg.append("rect")
	.attr("class", "legend")
	.attr("width", "10px")
	.attr("height", "150px")
	.style("fill", "url(#gradient)")
	.style("transform", "translate(0px,40px)");

	svg.append("text")

	.attr("class", "legendTxt")

	.style("color", "black")
	.style("transform", "translate(0px,28px)")
	.text("Low");

	svg.append("text")

	.attr("class", "legendTxt")

	.style("color", "black")
	.style("transform", "translate(0px,165px)")
	.text("High");

	d3.select("#mapFoot").on("click", reset);

	g1 = svg.append("g")
		.style("transform", "translate(40px,50px)")

		var g = g1.append("g")
		.style("stroke-width", "1.5px");

	queue()
	.defer(d3.json, "zips_us_topo.json")
	.await(ready);

	// d3.json("http://bsouthga.github.io/d3-exploder/us.json", function(error, us) {
	// if (error) throw error;

	function ready(error, us) {

		g.selectAll("path")

		.data(topojson.feature(us, us.objects.zip_codes_for_the_usa).features)
		// .data(topojson.feature(us, us.objects.states).features)
		.enter().append("path")
		.attr("data-zip", function (d) {
			return d.properties.zip;
		})
		.attr("data-state", function (d) {
			return d.properties.state;
		})
		.attr("data-name", function (d) {
			return d.properties.name;
		})

		.attr("d", path)
		.attr("class", function (d, i) {

			zip = parseInt(d.properties.zip);

			zip = (zip.toString()).slice(0, 3);

			return "feature " + "class" + zip;

		})
		.attr("stroke", "black")
		.attr("stroke-width", "0.1px")
		.style("fill", function (d) {

			zip = parseInt(d.properties.zip);

			zip = (zip.toString()).slice(0, (zip.toString()).length - 3);

			var filter = tempData0_zipAry.filter(function (o, j) {
					return parseInt(zip) == parseInt(o.zip);

				})

				var color = d3.scaleLinear()
				.domain([0, 4000000])
				.range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
				.interpolate(d3.interpolateHcl);

			if (filter[0] == undefined) {

				d.pop = "Not Avilable";
				return "white";
			} else {
				d.pop = filter[0].pop;
				return color(parseFloat(filter[0].pop));

			}

		})
		.on("click", clicked)
		.on("mouseover", function (d) {
			
			

			d3.select(this).style("stroke-width", "0.5px");

			div.transition()
			.duration(200)
			.style("opacity", .9);

			div.html(function () {

				var name = d.properties.name;
				var state = d.properties.state;
				var zip = d.properties.zip;
				var pop = d.pop;

				return "Name : " + name + "</br>" + "State : " + state + "</br>" + "Zipcode : " + zip + "</br>" + "Polulation: " + pop;

			})
			.style("left", (d3.event.pageX + 50) + "px")
			.style("top", (d3.event.pageY - 28) + "px")

		})
		.on("mouseout", function (d) {

			d3.select(this).style("stroke-width", "0.1px");
			div.transition()
			.duration(500)
			.style("opacity", 0);

		});

	}

	function clicked(d) {

	d3.selectAll(".feature").style("stroke", "black").style("stroke-width", "0.1px");
	
		if (active.node() === this)
			return reset();
		active.classed("active", false);
		active = d3.select(this).classed("active", true).style("stroke", "orange").style("stroke-width", "0.5px");

		var bounds = path.bounds(d),
		dx = bounds[1][0] - bounds[0][0],
		dy = bounds[1][1] - bounds[0][1],
		x = (bounds[0][0] + bounds[1][0]) / 2,
		y = (bounds[0][1] + bounds[1][1]) / 2,
		scale = .9 / Math.max(dx / (width), dy / (height)),
		translate = [(width) / 2 - scale * x, (height) / 2 - scale * y];

		g.transition()
		.duration(750)
		.style("stroke-width", 1.5 / scale + "px")
		.attr("transform", "translate(" + translate + ")scale(" + scale + ")");
		
		
		
		
		zip = parseInt(d.properties.zip);

		zip = (zip.toString()).slice(0, (zip.toString()).length - 3);

		zip = parseInt(zip);
		
		

		zipCont = zip;

		var queryBubble = makequeryforBubble(url.bubble, zipCont);

		ajaxCallsForBubble(queryBubble);

		var tempUrl = makequeryforLine(url.line, zipCont);

		ajax(tempUrl, "line");
		
		
	}

	function reset() {
		
		d3.selectAll(".feature").style("stroke", "black").style("stroke-width", "0.1px");
		
		active.classed("active", false);
		active = d3.select(null);

		g.transition()
		.duration(750)
		.style("stroke-width", "1.5px")
		.attr("transform", "");
		g.selectAll(".mark")
		.attr("transform", function (d) {
			var t = d3.transform(d3.select(this).attr("transform")).translate;
			console.log(t)
			return "translate(" + t[0] + "," + t[1] + ")scale(" + 1 + ")";
		});

		zipCont = "all";

		var queryBubble = makequeryforBubble(url.bubble, zipCont);

		ajaxCallsForBubble(queryBubble);

		var tempUrl = makequeryforLine(url.line, zipCont);

		ajax(tempUrl, "line");

		

	}

}


function ajaxForPresIncome(zip,classifier){
	
	
	var temQuery={"zip3":zip,"classifier":classifier};
	var tempUrl=url.income+"?query="+JSON.stringify(temQuery)
	ajax(tempUrl,"income");
	
	
	
}



