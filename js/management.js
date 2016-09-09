var management=(function(){
	var tasks = '[{"name" : "Publishing", "desc" : "It is a module which helps use to post in multiple channel at once" , "members":"12"},'+
	'{"name" : "Paid", "desc" : "It is a module which helps use to post in multiple channel at once" , "members":"12"},'+
	'{"name" : "Core", "desc" : "It is a module which helps use to post in multiple channel at once" , "members":"12"},'+
'{"name" : "Engagement", "desc" : "It is a module which helps use to post in multiple channel at once" , "members":"12"},'+
'{"name" : "Distributed", "desc" : "It is a module which helps use to post in multiple channel at once" , "members":"12"},'+
'{"name" : "Social Selling", "desc" : "It is a module which helps use to post in multiple channel at once" , "members":"12"},'+
'{"name" : "RTM", "desc" : "It is a module which helps use to post in multiple channel at once" , "members":"12"}]';

	function addTasks(task){
		var parent=document.getElementById("task-container");
		// <div class="card white">
  //           <div class="card-content black-text">
  //             <span class="card-title">Card Title</span>
  //             <p id="card-text">I am a very simple card. I am good at containing small bits of information.
  //            </p>

  //           </div>
  //         </div>
		for(i=0;i<task.length;i++){
			var child=document.createElement("div");
			child.className="col s4 m4 l4";
			var child1=document.createElement("div");
			child1.className="card white";
			var child2=document.createElement("div");
			child2.className="card-content black-text";
			var mainChild=document.createElement("span");
			mainChild.className="card-title";
			mainChild.innerHTML=""+task[i].name;
			var para=document.createElement("p");
			para.id="card-text";
			para.innerHTML=""+task[i].desc;
			child.appendChild(child1);
			child1.appendChild(child2);
			child2.appendChild(mainChild);
			child2.appendChild(para);
			parent.appendChild(child);
		}

	}
	function loadJSON(){
		var task=JSON.parse(tasks);
		addTasks(task);
	}
	return{
		hello : loadJSON
	};

})();