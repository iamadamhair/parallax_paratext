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

function AnimateWhiteBox() {
    if (currentStanza == 0) {
        $("#whiteBox").animate({ height: "0" }, 500);
        document.getElementById("whiteBox").style.display = "none";
    }
    else {
        document.getElementById("whiteBox").style.display = "block";
        var clientHeight = document.getElementById('stanza'.concat(currentStanza.toString())).clientHeight;
        $("#whiteBox").animate({ height: clientHeight.toString() }, 500);
    }
}

$('.stanza').waypoint(function (direction) {
    var stanzaNumber = parseInt((this.element.id).match(/\d+$/)[0], 10);
    if (direction == "down")
    {
        DarkenStanzaDown(stanzaNumber);
        AnimateDown(stanzaNumber);
        currentStanza = stanzaNumber;
    }
    else
    {
        DarkenStanzaUp(stanzaNumber);
        AnimateUp(stanzaNumber);
        if(stanzaNumber > 0)
            currentStanza = stanzaNumber - 1;
    }
    UpdateCurrentStanza();
    AnimateWhiteBox();
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

var clicked = false;
function Click() {
    if (clicked) {
        $("#image0").removeClass("flip");
        $("#image0").addClass("flipBack");
    }
    else {
        $("#image0").removeClass("flipBack");
        $("#image0").addClass("flip");
    }
    clicked = !clicked;
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
    $("#image".concat((number).toString())).removeClass("enter");
    $("#image".concat((number).toString())).addClass("exit");
    $("#image".concat((number).toString()).concat("Back")).removeClass("enterSoft");
    $("#image".concat((number).toString()).concat("Back")).addClass("exitSoft");

    $("#image".concat((number - 1).toString())).removeClass("exit");
    $("#image".concat((number - 1).toString())).addClass("enter");
    $("#image".concat((number - 1).toString()).concat("Back")).removeClass("exitSoft");
    $("#image".concat((number - 1).toString()).concat("Back")).addClass("enterSoft");
}

var imageHeight = 1055;
function AnimateDown(number) {
    $("#image".concat((number - 1).toString())).removeClass("enter");
    $("#image".concat((number - 1).toString())).addClass("exit");
    $("#image".concat((number - 1).toString()).concat("Back")).removeClass("enterSoft");
    $("#image".concat((number - 1).toString()).concat("Back")).addClass("exitSoft");

    if (number > 0) {
        var image = document.getElementById("actualImage".concat(number.toString()));
        var imageBack = document.getElementById("actualImage".concat(number.toString()).concat("Back"));
        var height = image.clientHeight;
        var adjustment = imageHeight / parseFloat(height);
        image.style.height = imageHeight;
        image.style.width = adjustment * image.clientWidth;
        imageBack.style.height = image.style.height;
        imageBack.style.width = image.style.width;
    }

    $("#image".concat((number).toString())).removeClass("exit");
    $("#image".concat((number).toString())).addClass("enter");
    $("#image".concat((number).toString()).concat("Back")).removeClass("exitSoft");
    $("#image".concat((number).toString()).concat("Back")).addClass("enterSoft");
}

document.onkeydown = checkKey;
function checkKey(e) {

    e.preventDefault();

    e = e || window.event;

    if (e.keyCode == '38') {
        currentStanza = currentStanza - 1;
        ScrollTo(currentStanza);
        UpdateCurrentStanza();
    }
    else if (e.keyCode == '39') {
        Flip();
    }
    else if (e.keyCode == '40') {
        currentStanza = currentStanza + 1;
        ScrollTo(currentStanza);
        UpdateCurrentStanza();
    }
}

function ScrollTo(number) {
    if (number == 0) {
        $('html, body').animate({
            scrollTop: $("#titleAn").offset().top - 300
        }, 500);
    }
    else {
        $('html, body').animate({
            scrollTop: $("#stanza".concat(number.toString())).offset().top - 500
        }, 500);
    }
}

function UpdateCurrentStanza()
{
    //var text = document.getElementById("currentStanza");
    //text.innerHTML = currentStanza.toString();
}

var flipped = false;
function Flip() {
    if (flipped) {
        $("#card").removeClass('flipped');
    }
    else {
        $("#card").addClass('flipped');
    }
    flipped = !flipped;
}