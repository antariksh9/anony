(function(){
	var initDummyData,template,rendered;
	function loadUser1() {
	  	$.get("templates/projectItemTemplate.html",function(template){
	  		var rendered=Mustache.render(template,{"name":"Publishing","desc":"It is a publishing project","members":"3","link":"link1"});
	  		$(document.body).html(rendered);
	  	});
	  	console.log(document.getElementById("link1"));
	  	document.getElementById("link").addEventListener("click",function(){
	  		console.log("chala");
	  		window.history.pushState("state","title","/pageTwo");
	  	});
	  	// $(".link").click(function(){
	  	// 	console.log("chala");
	  	// 	window.history.pushState("state","title","/pageTwo");
	  	// })
	  
	}
	function loadUser2() {
		$.get("templates/projectItemTemplate.html",function(template){
	  		var rendered=Mustache.render(template,{"name":"Paid","desc":"It is a publishing project","members":"3","link":"link"});
	  		$(document.body).html(rendered);
	  	});
	  	$(".link").click(function(){
	  		console.log("chala");
	  		window.history.pushState("state","title","/");
	  	})
	  
	}
	riot.route.start(true);
	riot.route('/',loadUser1);
	riot.route('/pageTwo',loadUser2);
	
	initDummyData=function(){
		projectData = [ p1,p2,p3,p4,p5,p6,p7 ],
		projects = [
			{
				"id":"p1",
				"name":"Publishing",
				"desc":"It is a module which helps user to post in multiple channels at once",
				"members":[m1,m2,m3],
				"tasks":[t1,t2,t3]
			},
			{
				"id":"p2",
				"name":"Paid",
				"desc":"It is a module which helps user to post in multiple channels at once",
				"members":[m1,m2,m3],
				"tasks":[t1,t2,t3]	
			},
			{
				"id":"p3",
				"name":"Core",
				"desc":"It is a module which helps user to post in multiple channels at once",
				"members":[m1,m2,m3],
				"tasks":[t1,t2,t3]	
			},
			{
				"id":"p4",
				"name":"Engagement",
				"desc":"It is a module which helps user to post in multiple channels at once",
				"members":[m1,m2,m3],
				"tasks":[t1,t2,t3]	
			},
			{
				"id":"p5",
				"name":"Distributed",
				"desc":"It is a module which helps user to post in multiple channels at once",
				"members":[m1,m2,m3],
				"tasks":[t1,t2,t3]	
			},
			{
				"id":"p6",
				"name":"Social Selling",
				"desc":"It is a module which helps user to post in multiple channels at once",
				"members":[m1,m2,m3],
				"tasks":[t1,t2,t3]	
			},
			{
				"id":"p7",
				"name":"RTM",
				"desc":"It is a module which helps user to post in multiple channels at once",
				"members":[m1,m2,m3],
				"tasks":[t1,t2,t3]	
			}
		],
		members = [
			{
				"id":"m1",
				"name":"Abhinav Singi"
			},
			{
				"id":"m2",
				"name":"Surbhi Gupta"
			},
			{
				"id":"m3",
				"name":"Pratibha Joshi"
			}
		]
		tasks = [
			{
				"id":"t1",
				"owner":"m1",
				"name":"Publishing View",
				"desc":"Include all channels preview",
				"status":"Done"
			},
			{
				"id":"t2",
				"owner":"m2",
				"name":"Icon Creation",
				"desc":"Needed a new icon set",
				"status":"On Hold"
			},
			{
				"id":"t3",
				"owner":"m3",
				"name":"Publishing View",
				"desc":"Include all channels preview",
				"status":"Done"
			}
		]
	}
})()