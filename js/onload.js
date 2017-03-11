var zipCont="all";


$(function(){


		$("#mask").show();


	addText();
	
	

	
	var options="";
	
	/* d3.csv("./spl.csv",function(error,data0){
		 
		
			data0=data0.sort(function(a, b) {
					var textA = a.x.toUpperCase();
						var textB = b.x.toUpperCase();
						return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});
			
			data0.forEach(function(d,i){
				
				options=options+'<option value="'+d.x+'">'+d.x+'</option>';
			})
			
			$('#e1').append(options);
			
			
			setTimeout(function(){
				$("#e1").select2();
				
					$("#filterbtn").on("click",function(){
		
		
			var tempClass=$(this).attr("class");
			
		
			
			if(tempClass=="btnin"){
				$("#filterbtn").removeClass("btnin").addClass("btnout");
				$("#filterPnl").removeClass("pnlin").addClass("pnlout");
				
			}else{
				
				$("#filterbtn").removeClass("btnout").addClass("btnin");
					$("#filterPnl").removeClass("pnlout").addClass("pnlin");
			}
		
	})
				
			},300)
			
		})*/
    
$("#popupBack").on("click",function(){
				
				$("#popupBack").hide();
				$("#popup").hide();
				
				$("#uniqPre").hide();
				
				
			})	
	


var queryBubble=makequeryforBubble(url.bubble,zipCont);


ajaxCallsForBubble(queryBubble);




ajax(url.map,"map")	;
	
	
	
	
	//DrawBubble("all");
  
   // DrawVenn();
	
	//lineChat();
	
	


	
  
})


var keyArryMap={
	
				"Early_Adopters":0,
				"Late Adopters":1,
				"Laggards":2
	
}

var UniqPreData=[];


var dataforBubble=[];

var count=0;


var globalBubbleData=[];


var redirect={
		"bubble":function(data,key){
			
			
			count++;
			
			var temp={"data":data.length,"name":key};
			
			
			
			if(zipCont!="all"){
				
				var tempUniqArry=[];
			
				data.forEach(function(d,i){
					tempUniqArry.push(d["pri_spcl_desc"]);
					if(data.length-1==i){
						
						UniqPreData[keyArryMap[key]]=tempUniqArry;
						
					}
					
				})
				
				
				
				
				
				if(count%3==0){
					
					
					var UniqPreData1= UniqPreData.slice();
					
					/*var result = UniqPreData1.shift().reduce(function(res, v) {
									if (res.indexOf(v) === -1 && UniqPreData.every(function(a) {
										return a.indexOf(v) !== -1;
									})) res.push(v);
									return res;
								 }, []);*/
								 
					var common=[];			 
								 
					var result1=intersect([UniqPreData1[0],UniqPreData1[1]]);

					var result2=intersect([UniqPreData1[1],UniqPreData1[2]]);
					
					var result3=intersect([UniqPreData1[0],UniqPreData1[2]]);

					
					var result1=jQuery.unique(result1);
					var result2=jQuery.unique(result2);
					var result3=jQuery.unique(result3);
					
					
					result1.forEach(function(d,i){
						if(common.indexOf(d)==-1){
							
							common.push(d);
						}
						
					});
					
					result2.forEach(function(d,i){
						if(common.indexOf(d)==-1){
							
							common.push(d);
						}
						
					})
					
					result3.forEach(function(d,i){
						if(common.indexOf(d)==-1){
							
							common.push(d);
						}
						
					})
					

					
					
					var uniqEA = UniqPreData[0].filter(function(d,i){
										
										return (common.indexOf(d)==-1);
						
								})
						
					var uniqLA = UniqPreData[1].filter(function(d,i){
										
										return (common.indexOf(d)==-1);
						
								})
					
					var uniqLG = UniqPreData[2].filter(function(d,i){
										
										return (common.indexOf(d)==-1);
						
								})
								
								
								
								
								
					DrawVenn(zipCont,uniqEA,uniqLA,uniqLG)


								
								
						

				}
				
			}else{
				
				
				$("#container1").children().remove();
			}
			
			
			
			
			
			
			dataforBubble.push(temp);
			
			if(count==3){
					
					globalBubbleData=dataforBubble;
			}
			
		
			if(dataforBubble.length==3){
				
					
				DrawBubble(dataforBubble,zipCont);
			}
			
			$("#mask").hide();
				
			
		},
		
		"map":function(data){
			
		
			d3Map(data);
		},
		"line":function(data){
			
			
			lineChat(data,zipCont);
		},
		"income":function(data){
			
			$("#popupBack").show();
			
			$("#popupBack").on("click",function(){
				
				$("#popupBack").hide();
				$("#popup").hide();
				
				$("#uniqPre").hide();
				
				
			})
			
			var trs="";
			
			data.forEach(function(d,i){
				
				trs=trs+"<tr><td>"+d.ims_rxer_id+"</td><td>"+d.pri_spcl_desc+"</td><td>"+d.zip3+"</td><td>"+d.zip3_median_income+"</td><td>"+d.min+"</td><td>"+d.max+"</td></tr>"
				
				if(i==data.length-1){
					
					$("#popupTable").find("tbody").html(trs);
					
					setTimeout(function(){
						$("#popup").show();
						
					},1000)
				}
			
			})
			
			
			
			
			
			
		}
	
}


ajaxBubbleCount=0;

function ajax(url,fun,key){
	
	
	
	if(zipCont=="all"){
		
		if(fun=="bubble"){
			ajaxBubbleCount++;
			
			
			if(globalBubbleData.length==3){
				
				
				//redirect[fun](globalBubbleData,key);
				
				DrawBubble(globalBubbleData,zipCont);
				$("#container1").children().remove();
				
				return ;
			}
			
		}
		
		
	}
	
		
	
	
		$.ajax({
			url: url,
			method:"GET",
			ContentType: "application/json",
			success: function(data){
				
				redirect[fun](data,key);
				
			},
			error:function(err){
				
				console.log(err);
			}
			
		});
	
}


	
	
	var baseUrl="http://localhost:3500";

var dbConf={
	
	"db":"us_precriber",
	"total_prescribers_data":"total_prescribers_data",
	"zip_census":"zip_census",
	"zip_prescriber_income":"zip_prescriber_income",
	"zip_prescribers_data":"zip_prescribers_data",
	"zip_prescribtion_rate":"zip_prescribtion_rate"
	
}


var url={
	
		"bubble":baseUrl+"/"+dbConf.db+"/"+dbConf.total_prescribers_data,
		"map":baseUrl+"/"+dbConf.db+"/"+dbConf.zip_census,
		"line":baseUrl+"/"+dbConf.db+"/"+dbConf.zip_prescribtion_rate,
		"income":baseUrl+"/"+dbConf.db+"/"+dbConf.zip_prescriber_income
		
	
}

var classifiers=["Early_Adopters","Late Adopters","Laggards"];



function makequeryforBubble(url,val){
	
	var query=[];
	
	var mainUrl;
	
		classifiers.forEach(function(d,i){
			
			if(val=="all"){
				
				var temQuery={"classifier":d};
				 mainUrl=url+"?query="+JSON.stringify(temQuery)+"&count";
				
			}else{
				var temQuery={"zip3":val,"classifier":d};
				mainUrl=url+"?query="+JSON.stringify(temQuery);
				
			}
			
			
			
			var temp={"url":mainUrl,"classifier":d}
			query.push(temp);
			
		})
		
		return query;
	
}


function makequeryforLine(url,val){
	
	
			var mainUrl;
			
			if(val=="all"){
				
				
				mainUrl=url;
				
				
			}else{
				var temQuery={"zip3":val};
				mainUrl=url+"?query="+JSON.stringify(temQuery);
				
				
			}
			
			
			
			
		return mainUrl;
	
}



function ajaxCallsForBubble(queryBubble){
	
	dataforBubble=[];
	
	queryBubble.forEach(function(d,i){
	
			ajax(d.url,"bubble",d.classifier)
	
	})
	
}

function intersect(ar)
{
    if (ar == null) return false;

    var a = new Array();

    if (ar.length == undefined) // Associative Array
    {
        for (var i in ar)
         a.push(ar[i]);
    }
    else
     a = ar;

    if (a.length == 1) return false; // Single array ? Nothing to intersect with

    var common = new Array();
    function loop(a, index, s_index, e_index)
    {
        if (index == null) index = 0;
        if (s_index == null) s_index = 0;
        if (e_index == null) e_index = a[index].length;
        if (index == a.length - 1) return;

        for (var i = s_index; i < e_index; i++)
        {
            if (common.indexOf(a[index][i]) != -1) continue;
            for (var j = 0; j < a[index + 1].length; j++)
            {
                if (a[index][i] != a[index+1][j]) continue;
                loop(a, index + 1, j, j + 1);
                if (index + 1 == a.length - 1) { common.push(a[index][i]); break; }
            }
        }
    }

    loop(a);
    return common;
}

