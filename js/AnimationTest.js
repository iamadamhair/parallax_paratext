

document.getElementById("myButton").onclick = function () {
    animateContainer();
}

function Enter(id) {
    $("#".concat(id)).removeClass("exit");
    $("#".concat(id)).removeClass("shiftUp");
    $("#".concat(id)).addClass("enter");
}

function Exit(id) {
    $("#".concat(id)).removeClass("enter");
    $("#".concat(id)).removeClass("shiftUp");
    $("#".concat(id)).addClass("exit");
}

function ShiftUp(id) {
    $("#".concat(id)).removeClass("enter");
    $("#".concat(id)).removeClass("exit");
    $("#".concat(id)).addClass("shiftUp");
}

var buttonCount = 0;
function animateContainer() {
    if (buttonCount == 0) {
        Queue("selenaContainer");
        buttonCount = 1;
    }
    else if (buttonCount == 1) {
        Queue("margotContainer");
        buttonCount = 2;
    }
    else if (buttonCount == 2) {
        Dequeue("selenaContainer");
        buttonCount = 3;
    }
    else if (buttonCount == 3) {
        Dequeue("margotContainer");
        buttonCount = 0;
    }
}

$('#selena').waypoint(function (direction) {
    if (direction == "down")
        Queue("selenaContainer");
}, { offset: '75%' })

$('#selena').waypoint(function (direction) {
    if (direction == "down")
        Dequeue("selenaContainer");
        //Exit("selenaContainer");
}, { offset: '-50%' })

$('#margot').waypoint(function (direction) {
    if (direction == "down")
        Queue("margotContainer");
}, { offset: '75%' })

$('#margot').waypoint(function (direction) {
    if (direction == "down")
        Dequeue("margotContainer");
        //Exit("margotContainer");
}, { offset: '-50%' })


var currentQueue = new Array();
function Queue(id) {
    var item = $("#".concat(id));
    item.css({ top: currentQueue.length * 400 });
    currentQueue.push(id);
    Enter(id);
}

function Dequeue(id) {
    var i = 0;
    var found = false;
    var position = 0;

    for(i = 0; i < currentQueue.length; i++)
    {
        if(!found)
        {
            if (currentQueue[i] == id)
            {
                found = true;
                Exit(currentQueue[i]);
                position = i;
            }
        }
        else
        {
            ShiftUp(currentQueue[i]);
            //$("#".concat(currentQueue[i])).css({ top: (i - 1) * 400 });
        }

    }
    currentQueue.splice(position, 1);
}