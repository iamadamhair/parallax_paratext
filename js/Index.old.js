var currentBackground = 1;
var darkenStanzaPercentage = "40%";

var darkenPercentage = "70%";
var lightenPercentage = "40%";
//var backgroundSlideTime = 1.5;

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

$('.containsNote').mouseover(function () {
    //var note = document.getElementById(this.id.concat("Note"));
    $("#".concat(this.id).concat("Note")).removeClass("exit");
    $("#".concat(this.id).concat("Note")).addClass("enter");

})

$('.containsNote').mouseout(function () {
    //document.getElementById(this.id).style.color = "blue";
    $("#".concat(this.id).concat("Note")).removeClass("enter");
    $("#".concat(this.id).concat("Note")).addClass("exit");
})

$('.stanza').waypoint(function (direction) {
    var stanzaNumber = parseInt((this.element.id).match(/\d+$/)[0], 10);
    if (direction == "down")
    {
        DarkenStanzaDown(stanzaNumber);
        AnimateDown(stanzaNumber);
    }
    else
    {
        DarkenStanzaUp(stanzaNumber);
        AnimateUp(stanzaNumber);
    }
//      DarkenText(this.element.id);
}, { offset: darkenStanzaPercentage })

function MakeBlack(stanzaNumber) {
    $("#stanza".concat((stanzaNumber).toString())).removeClass("lightGray");
    $("#stanza".concat((stanzaNumber).toString())).addClass("black");
}

function MakeLightGray(stanzaNumber) {
    $("#stanza".concat((stanzaNumber).toString())).removeClass("black");
    $("#stanza".concat((stanzaNumber).toString())).addClass("lightGray");
}

function DarkenStanza(stanzaNumber) {
    if (stanzaNumber % 3 == 1) {
        if (stanzaNumber > 3) {
            //document.getElementById("stanza".concat((stanzaNumber - 1).toString())).style.color = "lightgray";
            //document.getElementById("stanza".concat((stanzaNumber - 2).toString())).style.color = "lightgray";
            //document.getElementById("stanza".concat((stanzaNumber - 3).toString())).style.color = "lightgray";
            MakeLightGray(stanzaNumber - 1);
            MakeLightGray(stanzaNumber - 2);
            MakeLightGray(stanzaNumber - 3);
        }
        //document.getElementById("stanza".concat((stanzaNumber).toString())).style.color = "black";
        //document.getElementById("stanza".concat((stanzaNumber + 1).toString())).style.color = "black";
        //document.getElementById("stanza".concat((stanzaNumber + 2).toString())).style.color = "black";
        MakeBlack(stanzaNumber);
        MakeBlack(stanzaNumber + 1);
        MakeBlack(stanzaNumber + 2);
        //document.getElementById("stanza".concat((stanzaNumber + 3).toString())).style.color = "lightgray";
        //document.getElementById("stanza".concat((stanzaNumber + 4).toString())).style.color = "lightgray";
        //document.getElementById("stanza".concat((stanzaNumber + 5).toString())).style.color = "lightgray";
        MakeLightGray(stanzaNumber + 3);
        MakeLightGray(stanzaNumber + 4);
        MakeLightGray(stanzaNumber + 5);
    }
}

function DarkenStanzaDown(stanzaNumber) {
    if (stanzaNumber % 3 == 1) {
        if (stanzaNumber > 3) {
            MakeLightGray(stanzaNumber - 1);
            MakeLightGray(stanzaNumber - 2);
            MakeLightGray(stanzaNumber - 3);
        }
        MakeBlack(stanzaNumber);
        MakeBlack(stanzaNumber + 1);
        MakeBlack(stanzaNumber + 2);
    }
}

function DarkenStanzaUp(stanzaNumber) {
    if (stanzaNumber % 3 == 1) {
        MakeBlack(stanzaNumber);
        MakeBlack(stanzaNumber + 1);
        MakeBlack(stanzaNumber + 2);
        MakeLightGray(stanzaNumber + 3);
        MakeLightGray(stanzaNumber + 4);
        MakeLightGray(stanzaNumber + 5);
    }
}

function AnimateUp(number) {
    var select = Math.floor(number / 3) + number % 3;
    if (number%3 == 1 & select != currentBackground) {
        $("#background".concat((select).toString())).removeClass("exit");
        $("#background".concat((select).toString())).addClass("enter");
    }
    //if (number == 1)
    //    Animate1Up();
    //if (number == 2)
    //    Animate2Down();

}

function AnimateDown(number) {
    var select = Math.floor(number/3) + number%3 - 1;
    if (number % 3 == 1)
    {
        $("#background".concat((select).toString())).addClass("exit");
        currentBackground = select + 1;
    }
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
