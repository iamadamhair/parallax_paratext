

document.getElementById("myButton").onclick = function () {
    animateContainer();
}

function Enter(id) {
    var item = document.getElementById(id);
    TweenLite.to(item, 1, { right: "+=200", ease: Power3.easeOut });
    //$("#".concat(id)).removeClass("exit");
    //$("#".concat(id)).removeClass("shiftUp");
    //$("#".concat(id)).addClass("enter");
}

function Exit(id) {
    var item = document.getElementById(id);
    TweenLite.to(item, 1, {
        right:"-=200", ease: Power3.easeOut,
        onComplete: function () {
            TweenMax.to(selena, 0, { top: 50, ease: Power3.easeOut });
        }
    });
    //$("#".concat(id)).removeClass("enter");
    //$("#".concat(id)).removeClass("shiftUp");
    //$("#".concat(id)).addClass("exit");
}

function ShiftUp(id) {
    var item = document.getElementById(id);
    TweenLite.to(item, 1, { top:"-=250", ease: Power3.easeOut });
    //$("#".concat(id)).removeClass("enter");
    //$("#".concat(id)).removeClass("exit");
    //$("#".concat(id)).addClass("shiftUp");
}

var buttonCount = 0;
function animateContainer() {
    var selena = document.getElementById("selenaContainer");
    if (buttonCount == 0) {
        TweenLite.to(selena, 1, { right:"+=300", ease: Power3.easeOut });
        buttonCount = 1;
    }
    else if (buttonCount == 1) {
        TweenLite.to(selena, 1, { top: 200, ease: Power3.easeOut });
        buttonCount = 2;
    }
    else if (buttonCount == 2) {
        TweenLite.to(selena, 1, {
            right: -300, ease: Power3.easeOut,
            onComplete: function () {
                TweenMax.to(selena, 0, { top: 0, ease: Power3.easeOut });
            }
        });
        buttonCount = 0;
    }

    /*
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
    */
}

$('#selena').waypoint(function (direction) {
    if (direction == "down")
        Queue("selenaContainer");
}, { offset: '85%' })

$('#selena').waypoint(function (direction) {
    if (direction == "down")
        Dequeue("selenaContainer");
}, { offset: '-10%' })

$('#margot').waypoint(function (direction) {
    if (direction == "down")
        Queue("margotContainer");
}, { offset: '85%' })

$('#margot').waypoint(function (direction) {
    if (direction == "down")
        Dequeue("margotContainer");
}, { offset: '-10%' })

$('#olivia').waypoint(function (direction) {
    if (direction == "down")
        Queue("oliviaContainer");
}, { offset: '85%' })

$('#olivia').waypoint(function (direction) {
    if (direction == "down")
        Dequeue("oliviaContainer");
}, { offset: '-10%' })


var currentQueue = new Array();
function Queue(id) {
    var item = $("#".concat(id));
    item.css({ top: currentQueue.length * 250 + 50 });
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

