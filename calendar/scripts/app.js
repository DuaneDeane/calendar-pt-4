
var visible = false;
var important = false;
var showIcon = '<i class="fas fa-eye"></i>'
var hideIcon = '<i class="fas fa-eye-slash"></i>'
var UI = {};
var taskList = [];

function showDetails() {
    console.log("btn clicked!");

    if(!visible) {
        UI.backRight.removeClass("hide");
        UI.backRight.addClass("split right");
        UI.btnShow.html(hideIcon + "Hide details");
        visible = true;
    }
    else {
        UI.backRight.addClass("hide");
        UI.backRight.removeClass("split right");
        UI.btnShow.html(showIcon + "Show details");
        visible = false;
    }
}

function toggleImportant() {
    if(!important) {
        UI.btnImportant.removeClass('far');
        UI.btnImportant.addClass("fas active");
        important = true;
    }
    else {
        UI.btnImportant.removeClass("fas active");
        UI.btnImportant.addClass("far");
        important = false;
    }
}

function saveTask() {
    var title = UI.txtTitle.val()
    var date = UI.txtDate.val()
    var description = UI.txtDescription.val()
    var alert = UI.txtAlert.val()
    var location = UI.txtLocation.val()

    if(!date) {
        $("#alertError").removeClass('hide');

        setTimeout(() => {$("#alertError").addClass('hide')},3000);
    }

    var task = new Task(title,important,date,description,alert,location)
    taskList.push(task);
    clearForm();

    console.log(taskList);

    // save the task on the backend
    $.ajax({
        url: 'http://fsdi.azurewebsites.net/api/tasks',
        type: 'POST',
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res) {

            res.dueDate = new Date(res.dueDate);
            res.createdOn = new Date(res.createdOn);
            displayTask(res);

            $("#alertSuccess").removeClass('hide');

            setTimeout(function(res){
                $("#alertSuccess").addClass('hide');
            },3000);
        },
        error: function(details) {
            console.log("Error", details);
        }
    });
}

function testGet() {
    $.ajax({
        url: 'http://restclass.azurewebsites.net/api/test',
        type: 'GET',
        success: function(response) {
            console.log("req succeed", response);
        },
        error: function(details) {
            console.log("Error :(", details);
        }
    });
}

function clearForm() {
   $(".control").val('');
   UI.btnImportant.removeClass("fas active");
   UI.btnImportant.addClass("far");
}

function loadTask() {
    $.ajax({
        url: 'http://fsdi.azurewebsites.net/api/tasks',
        type: 'GET',
        success: list => {
            let myTasks = list.filter(task => task.user === 'Duane');
            
            for(let i=0; i<myTasks.length; i++) {

                myTasks[i].dueDate = new Date(myTasks[i].dueDate);
                myTasks[i].createdOn = new Date(myTasks[i].createdOn);

                displayTask(myTasks[i]);
            }
        },
        error: details => {
            console.log("Error", details);
        }
    });
}

function displayTask(task) {
    var syntax = 
    `<div class='task'>
        <i class="far fa-circle check"></i>

        <label class='task-title'>${task.title}</lablel>
        <label class='task-description'>${task.description}</label>

        <label class='task-title'>${task.dueDate.toLocaleDateString() + ' ' + task.dueDate.toLocaleTimeString()}</label>

    </div>`;

    $("#pendingTasks").append(syntax);
}

function init() {
    console.log("main page");

    loadTask();

    UI = {
        btnShow: $("#btnShow"),
        btnImportant: $("#btnImportant"),
        secForm: $("#secForm"),
        backRight: $("#backRight"),
        btnSave: $("#btnSave"),
        txtTitle: $("#txtTitle"),
        txtDate: $("#txtDate"),
        txtDescription: $("#txtDescription"),
        txtAlert: $("#txtAlert"),
        txtLocation: $("#txtLocation")
    };

    // get data from servers
    // hook events
    UI.btnShow.click(showDetails);
    UI.btnImportant.click(toggleImportant);
    UI.btnSave.click(saveTask);
}


window.onload = init;