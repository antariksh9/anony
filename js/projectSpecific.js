'use strict';
var projectSpecific= (function(){
	var members=[];
	var head= location.search.split("=")[1];
	head=head.replace("%20"," ");
	var memberClass=function(name){
		this.name=name;
		this.tasks=[{"name":"Publishing View","desc":"It publishes views","status":"On Hold"}];
	}
	var member1=new memberClass("Abhinav Singi");
	var member2=new memberClass("Surbhi Gupta");
	members.push(member1);
	members.push(member2);
	memberClass.prototype.addTask = function(name,desc,status){
		var newTask= new taskClass(name,desc,status);
		this.tasks.push(newTask);
	}
	var taskClass = function(name,desc,status){
		this.name=name;
		this.desc=desc;
		this.status=status;
	}
	taskClass.prototype.giveTaskElement=function(){
		var taskElement=document.createElement("div");
		taskElement.className="task-box";
		var taskHeadStatus=document.createElement("div");
		taskHeadStatus.className="task-head-status";
		var heading=document.createElement("p");
		heading.innerHTML=this.name;
		var button=document.createElement("button");
		button.className="status-button";
		button.innerHTML=this.status;
		taskHeadStatus.appendChild(heading);
		taskHeadStatus.appendChild(button);
		var descrip=document.createElement("p");
		descrip.innerHTML=this.desc;
		taskElement.appendChild(taskHeadStatus);
		taskElement.appendChild(descrip);
		return taskElement
	}
	function addMember(){

	}
	function addTaskToDOM(tasks,memberId){
		var divForTask=document.getElementById(memberId);
		for(var i=0;i<tasks.length;i++){
			var taskForDOM=new taskClass(tasks[i].name,tasks[i].desc,tasks[i].status);
			var taskE=taskForDOM.giveTaskElement();
			divForTask.appendChild(taskE);
		}
	}
	function addHeading(){
		document.getElementById("page-head").innerHTML=head;
	}
	function init(){
		addHeading();
		loadDOM();
	}

	var maincontain=document.getElementById("main-task-container");
	function loadWithMembers(members1){
		for(var i=0;i<members1.length;i++){
			var mainMemberDiv=document.createElement("div");
			mainMemberDiv.className="member-div";
			mainMemberDiv.id=members1[i].name;
			var memberName=document.createElement("div");
			memberName.className="add-member-actual";
			memberName.innerHTML=members1[i].name;
			mainMemberDiv.appendChild(memberName);
			maincontain.appendChild(mainMemberDiv);
			var dotted=document.createElement("div")
			dotted.className="dotted-intersection";
			maincontain.appendChild(dotted);
			addTaskToDOM(members1[i].tasks,members1[i].name);
		}

	}
	function loadWithAddMember(){
		var outer=document.createElement("div");
		outer.id="add-member";
		var text=document.createElement("h6");
		text.style.fontSize="12px";
		text.innerHTML="Add New Member";
		outer.appendChild(text);
		var dotted=document.createElement("div")
		dotted.className="dotted-intersection";
		maincontain.appendChild(outer);
		maincontain.appendChild(dotted);
	}
	function loadDOM(){
		var currentProjects=JSON.parse(sessionStorage.getItem("projects"));
		for(var i=0;i<currentProjects.length;i++) {
			if(currentProjects[i].name==head){
				var currentMembers=currentProjects[i].members;
			}
		}
		loadWithMembers(members);
		loadWithMembers(currentMembers);
		loadWithAddMember();

	}
	return {
		init:init
	};
})();