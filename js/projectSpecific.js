'use strict';
var projectSpecific= (function(){
	var members=[];
	var drop=false;
	var dropPressed=false;
	var currentCreatedMember;
	var currentStatusMember;
	var projects=JSON.parse(sessionStorage.getItem("projects"));
	var head= location.search.split("=")[1];
	head=head.replace("%20"," ");
	var myProjectMembers = giveMyMembers();
	var memberClass=function(name,tasks){
		this.name=name;
		this.tasks=tasks;
	}
	//var member1=new memberClass("Abhinav Singi",[]);
	// var member2=new memberClass("Surbhi Gupta",[]);
	//members.push(member1);
	// members.push(member2);
	memberClass.prototype.addTask = function(name,desc,status){
		var newTask= new taskClass(name,desc,status);
		this.tasks.push(newTask);
	}
	memberClass.prototype.giveTask = function(){
		return this.tasks;
	}
	memberClass.prototype.alterTaskStatus = function(name,status){
		for(var i=0;i<this.tasks.length;i++){
			if(this.tasks[i].name===name){
				this.tasks[i].status=status;
				break;
			}
		}
	}
	var taskClass = function(name,desc,status){
		this.name=name;
		this.desc=desc;
		this.status=status;
	}
	function giveMemberElement(name){
		for(var i=0;i<members.length;i++){
			if(members[i].name===name){
				return members[i];
				break;
			}
		}
	}
	function updateMemberListSession(){
		var currentSession=sessionStorage.getItem("projects");
		currentSession=JSON.parse(currentSession);
		for(var i=0;i<currentSession.length;i++){
			if(currentSession[i].name===head){
				currentSession[i].members=members;
			}
		}
		var currentSession1=JSON.stringify(currentSession);
		sessionStorage.setItem("projects",currentSession1);
	}
	// HAVE TO LINK THE PARENT OF EVERY TASK WITH IT AS WE HAVE TO CHANGE THA VALUES IN REVERSE DIRECTIONS AS WELL 
	function showDropdown(){
		currentStatusMember=[this.parentNode.parentNode.parentNode,this.parentNode];
		if(!drop && !dropPressed){
			var coord=this.parentNode;
			var list=document.getElementById("dropdown-status");
			var right=coord.offsetLeft+$(coord).width();
			var top = coord.offsetTop+$(coord).height() - 3;
			var left=right-$(list).width(); 
			if(left<0)
			{
				left=0;
			}
			list.style.position="absolute";
			list.style.top=top+'px';
			list.style.left=left+'px';
			$("#dropdown-status").slideDown('fast');
			drop=true;
			dropPressed=true;
			var button=$(this);
			$(document).mouseup(function(e)
			{
    			var container = $("#dropdown-status");
    			
   	 			if (!container.is(e.target) && container.has(e.target).length === 0 && !button.is(e.target)) 
    			{

					$("#dropdown-status").slideUp('fast');
					drop=false;
					dropPressed=false;
					
    			}

			});

		}
		else if(!drop && dropPressed){
			dropPressed=false;
		}
		else if(drop && dropPressed){
			$("#dropdown-status").slideUp('fast');
			drop=false;
			dropPressed=false;
		}
		
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
		button.addEventListener("click",showDropdown);
		button.innerHTML=this.status;
		if(this.status === 'On Hold'){
			taskElement.style.borderLeft="1px solid blue";
			button.style.backgroundColor = "blue";
		}
		else if(this.status === 'In Process'){
			taskElement.style.borderLeft="1px solid yellow";
			button.style.backgroundColor = "yellow";
		}
		if(this.status === 'Sent'){
			taskElement.style.borderLeft="1px solid red";
			button.style.backgroundColor = "red";
		}
		taskHeadStatus.appendChild(heading);
		taskHeadStatus.appendChild(button);
		var descrip=document.createElement("p");
		descrip.innerHTML=this.desc;
		taskElement.appendChild(taskHeadStatus);
		taskElement.appendChild(descrip);
		return taskElement
	}
	function giveMyMembers(){
		for(var i=0;i<projects.length;i++){
			if(projects[i].name === head){
				myProjectMembers=projects[i].members;
				return myProjectMembers;
			}
		}
	}
	function addMemberInitial(){
		for(var i=0;i<myProjectMembers.length;i++){
			var newMember = new memberClass(myProjectMembers[i].name,myProjectMembers[i].tasks);
			members.push(newMember);
		}
	}
	function createNewTask(){
		currentCreatedMember=this.id;
		$("#overlay-initial-task").fadeIn(500);
	}
	function addTaskToDOM(tasks,memberId){
		var divForTask=document.getElementById(memberId);
		for(var i=0;i<tasks.length;i++){
			var taskForDOM=new taskClass(tasks[i].name,tasks[i].desc,tasks[i].status);
			var taskE=taskForDOM.giveTaskElement();
			divForTask.appendChild(taskE);
		}
		var addTaskDiv= document.createElement("div");
		addTaskDiv.className="addtask-box";
		addTaskDiv.id=memberId;
		addTaskDiv.addEventListener("click",createNewTask);
		var text=document.createElement("h6");
		text.innerHTML="Create Task";
		var sign=document.createElement("i");
		sign.className="small material-icons";
		sign.innerHTML="note_add";
		addTaskDiv.appendChild(sign);
		addTaskDiv.appendChild(text);
		divForTask.appendChild(addTaskDiv);
	}
	function addHeading(){
		document.getElementById("page-head").innerHTML=head;
	}
	function fadeout(){
		$("#form-project").find("input[type=text], textarea,select").val("");
		$("#overlay-initial-task").fadeOut(500);
	}
	function fadeMember(){
		$("#form-project-member").find("input[type=text], textarea,select").val("");
		$("#overlay-initial-member").fadeOut(500);	
	}
	function addTask(){
		//console.log(currentCreatedMember);
		var memberCurrent;
		for(var i=0;i<members.length;i++){
			if(members[i].name===currentCreatedMember){
				memberCurrent=members[i];
				break;
			}
		}
		var title=document.getElementById("title").value;
		var desc=document.getElementById("desc").value;
		var status=document.getElementById("members-number").value;
		memberCurrent.addTask(title,desc,status);
		updateMemberListSession();
		clearDOM();
		loadDOM();
		fadeout();
	}
	function clearDOM(){
		//$('#main-task-container').find('*').not('.do-not-remove').remove();
		$("#main-task-container > *:not('.do-not-remove')").remove();

	}
	function createNewMember(){
		var name=document.getElementById("title-member").value;
		var tasks=[];
		var memberToAdd=new memberClass(name,tasks);
		members.push(memberToAdd);
		updateMemberListSession();
		clearDOM();
		loadDOM();
		fadeMember();
	}
	function changeStatus(){
		var newStatus=$(this).attr("value");
		$("#dropdown-status").slideUp('fast');
		drop=false;
		dropPressed=false;
		var memberStatusChanged=giveMemberElement(currentStatusMember[0].id);
		var parentName=$(currentStatusMember[1]).find("p")[0].innerHTML;
		memberStatusChanged.alterTaskStatus(parentName,newStatus);
		updateMemberListSession();
		clearDOM();
		loadDOM();
	}
	function init(){
		addHeading();
		addMemberInitial();
		updateMemberListSession();
		clearDOM();
		loadDOM();
		document.getElementById("cross").addEventListener("click",fadeout);
		document.getElementById("cancel-project").addEventListener("click",fadeout);
		document.getElementById("create-new-project").addEventListener("click",addTask);
		document.getElementById("cancel-member").addEventListener("click",fadeMember);
		document.getElementById("cross-member").addEventListener("click",fadeMember);
		document.getElementById("create-new-member").addEventListener("click",createNewMember);
		$("#dropdown-status li").click(changeStatus);
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
	function addNewMember(){
		$("#overlay-initial-member").fadeIn(500);
	}
	function loadWithAddMember(){
		var outer=document.createElement("div");
		outer.id="add-member";
		outer.addEventListener("click",addNewMember);
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
		// var currentProjects=JSON.parse(sessionStorage.getItem("projects"));
		// for(var i=0;i<currentProjects.length;i++) {
		// 	if(currentProjects[i].name==head){
		// 		var currentMembers=currentProjects[i].members;
		// 	}
		// }
		loadWithMembers(members);
		//loadWithMembers(currentMembers);
		loadWithAddMember();

	}
	return {
		init:init
	};
})();