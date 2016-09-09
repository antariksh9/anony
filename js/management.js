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
			child1.className="card white hoverable";
			var child2=document.createElement("div");
			child2.className="card-content black-text";
			var mainChild=document.createElement("span");
			mainChild.className="card-title";
			mainChild.innerHTML=""+task[i].name;
			var para=document.createElement("p");
			para.id="card-text";
			para.innerHTML=""+task[i].desc;
			var member =document.createElement("p");
			member.className="member-info";
			member.innerHTML="Total Members : "+task[i].members;
			child.appendChild(child1);
			child1.appendChild(child2);
			child2.appendChild(mainChild);
			child2.appendChild(para);
			child2.appendChild(member);
			parent.appendChild(child);
		}
		var addChild=document.createElement("div");
		addChild.className="col s4 m4 l4";
		addChild.id="addOverlay";
		var addChild1=document.createElement("div");
		addChild1.className="card white hoverable";
		// addChild1.style.margin="auto";
		addChild1.style.height=document.getElementsByClassName("card white")[task.length-1].offsetHeight;
		var addChild2=document.createElement("div");
		// addChild2.className="card-content gray-text";
		// addChild2.className="valign-wrapper center-align";
		addChild2.className="flexBox";
		//addChild2.style.boxShadow="0 0 5px gray"
		var text=document.createElement("h6");
		text.innerHTML="Create New Project";
		var sign=document.createElement("i");
		sign.className="small material-icons";
		sign.innerHTML="note_add";
		addChild2.appendChild(sign);
		addChild2.appendChild(text);
		addChild1.appendChild(addChild2);
		addChild.appendChild(addChild1);
		parent.appendChild(addChild);

	}
	function createNewProject(){
		var newProject=document.getElementById("overlay-initial");
		//newProject.id="overlay-final";
		$("#overlay-initial").fadeIn(500);
		//newProject.appendTo(document.body);
	}
	function clearDOM(){
		$("#task-container").empty();
	}
	function loadJSON(){
		clearDOM();
		var task=JSON.parse(tasks);
		addTasks(task);
	}
	function fadeout(){
		$("#form-project").find("input[type=text], textarea,select").val("");
		$("#overlay-initial").fadeOut(500);
	}
	function addProject(){
		var title=document.getElementById("title").value;

		var desc=document.getElementById("desc").value;
		var mem=document.getElementById("members-number").value;
		tasks=tasks.substr(0,tasks.length-1)+',{"name":"'+title+'","desc":"'+desc+'","members":"'+mem+'"}]';
		init();
		fadeout();

	}
	function init(){
		loadJSON();
		document.getElementById("addOverlay").addEventListener("click",createNewProject);
		document.getElementById("cross").addEventListener("click",fadeout);
		document.getElementById("cancel-project").addEventListener("click",fadeout);
		document.getElementById("create-new-project").addEventListener("click",addProject);
	}
	return{
		init:init,
		t:tasks
	};

})();