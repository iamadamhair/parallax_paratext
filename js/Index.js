
var darkenStanzaPercentage = "40%";

var darkenPercentage = "70%";
var lightenPercentage = "40%";
var backgroundSlideTime = 1.5;

function DarkenText(id) {
    var item = document.getElementById(id);
    item.style.color = "black";
}

function LightenText(id) {
    var item = document.getElementById(id);
    item.style.color = "lightgray";
}

//$('.line').waypoint(function (direction) {
//    if(direction == "down")
//        DarkenText(this.element.id);
//    else
//        LightenText(this.element.id);
//}, { offset: darkenPercentage })

//$('.line').waypoint(function (direction) {
//    if (direction == "down")
//        LightenText(this.element.id);
//    else
//        DarkenText(this.element.id);
//}, { offset: lightenPercentage })

$('.stanza').waypoint(function (direction) {
    var stanzaNumber = parseInt((this.element.id).match(/\d+$/)[0], 10);
    DarkenStanza(stanzaNumber);
    if (direction == "down")
        AnimateDown(stanzaNumber);
    else
        AnimateUp(stanzaNumber);
//      DarkenText(this.element.id);
}, { offset: darkenStanzaPercentage })


function DarkenStanza(stanzaNumber) {
    if(stanzaNumber > 0)
    {
        document.getElementById("stanza".concat((stanzaNumber - 1).toString())).style.color = "lightgray";
    }
    document.getElementById("stanza".concat((stanzaNumber + 1).toString())).style.color = "lightgray";
    document.getElementById("stanza".concat((stanzaNumber).toString())).style.color = "black";
}

function AnimateUp(number) {
    if (number > 1) {
        $("#background".concat((number - 1).toString())).removeClass("exit");
        $("#background".concat((number - 1).toString())).addClass("enter");
    }
    //if (number == 1)
    //    Animate1Up();
    //if (number == 2)
    //    Animate2Down();

}

function AnimateDown(number) {
    $("#background".concat((number - 1).toString())).addClass("exit");
    //if (number == 1)
    //    Animate1Down();
    //if (number == 2)
    //    Animate2Down();
}

//function Animate1Up() {
//    $("#church").removeClass("exit");
//    $("#church").addClass("enter");
//    //var church = document.getElementById("church");
//    //TweenLite.to(church, backgroundSlideTime, { left: "0" }); //, ease: Power3.easeOut });
//}

//function Animate2Down() {
//    //var church = document.getElementById("church");
//    $("#church").addClass("exit");
//    //TweenLite.to(church, backgroundSlideTime, { left: "-1920" }); //, ease: Power3.easeOut });
//}
