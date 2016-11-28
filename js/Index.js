var currentStanza = 0;
var darkenStanzaPercentage = "50%";

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
    if($("#".concat(this.id)).css("color") == "rgb(0, 0, 0)") {
        $("#".concat(this.id).concat("Note")).removeClass("exit");
        $("#".concat(this.id).concat("Note")).addClass("enter");
    }

})

$('.containsNote').mouseout(function () {
    //document.getElementById(this.id).style.color = "blue";
    if ($("#".concat(this.id)).css("color") == "rgb(0, 0, 0)") {
        $("#".concat(this.id).concat("Note")).removeClass("enter");
        $("#".concat(this.id).concat("Note")).addClass("exit");
    }
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
    currentStanza = stanzaNumber;
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
            MakeLightGray(stanzaNumber - 1);
            MakeLightGray(stanzaNumber - 2);
            MakeLightGray(stanzaNumber - 3);
        }
        MakeBlack(stanzaNumber);
        MakeBlack(stanzaNumber + 1);
        MakeBlack(stanzaNumber + 2);
        MakeLightGray(stanzaNumber + 3);
        MakeLightGray(stanzaNumber + 4);
        MakeLightGray(stanzaNumber + 5);
    }
}

function DarkenStanzaDown(stanzaNumber) {
        if (stanzaNumber > 0) {
            MakeLightGray(stanzaNumber - 1);
        }
        MakeBlack(stanzaNumber);
}

function DarkenStanzaUp(stanzaNumber) {
        MakeBlack(stanzaNumber - 1);
        MakeLightGray(stanzaNumber);
}

function AnimateUp(number) {
    //if (number != currentStanza) {
        $("#background".concat((number - 1).toString())).removeClass("exit");
        $("#background".concat((number - 1).toString())).addClass("enter");
    //}
}

function AnimateDown(number) {
    $("#background".concat((number - 1).toString())).addClass("exit");
}
