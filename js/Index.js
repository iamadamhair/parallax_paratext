var currentStanza = 0;
var darkenStanzaPercentage = "50%";

var darkenPercentage = "70%";
var lightenPercentage = "40%";

function DarkenText(id) {
    var item = document.getElementById(id);
    item.style.color = "black";
}

function LightenText(id) {
    var item = document.getElementById(id);
    item.style.color = "lightgray";
}

var whiteBoxTime = 250;
var textTime = 250;
var helpImageTime = 500;
var cardBackTextTime = 500;
function AnimateWhiteBox() {
    if (currentStanza == 0) {
        $("#whiteBox").animate({ height: "0" }, whiteBoxTime);
        document.getElementById("whiteBox").style.display = "none";
    }
    else {
        document.getElementById("whiteBox").style.display = "block";
        var clientHeight = document.getElementById('stanza'.concat(currentStanza.toString())).clientHeight;
        $("#whiteBox").animate({ height: clientHeight.toString() }, whiteBoxTime);
    }
    setTimeout(function () {
        if(!flipped)
        ShowStanzaArrow();
    }, whiteBoxTime);
}

/*
$('.stanza').waypoint(function (direction) {
    while (holdOffWayPoint) { };
    var stanzaNumber = parseInt((this.element.id).match(/\d+$/)[0], 10);
    
    setTimeout(function () {
        AnimateWhiteBox();
        setTimeout(function () {
            if (direction == "down") {
                DarkenStanzaDown(stanzaNumber);
                setTimeout(function () {
                    AnimateDown(stanzaNumber);
                    //currentStanza = stanzaNumber;
                    UpdateCurrentStanzaDiv();
                }, textTime);
            }
            else {
                DarkenStanzaUp(stanzaNumber);
                setTimeout(function () {
                    AnimateUp(stanzaNumber);
                    if (stanzaNumber > 0)
                        //currentStanza = stanzaNumber - 1;
                        UpdateCurrentStanzaDiv();
                }, textTime);
            }
        }, whiteBoxTime);
    }, 100);
}, { offset: darkenStanzaPercentage })
*/

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
        MakeBlack(stanzaNumber);
        MakeLightGray(stanzaNumber + 1);
}

function AnimateUp(number) {
    $("#image".concat((number + 1).toString())).removeClass("enter");
    $("#image".concat((number + 1).toString())).addClass("exit");
    $("#image".concat((number + 1).toString()).concat("Back")).removeClass("enterSoft");
    $("#image".concat((number + 1).toString()).concat("Back")).addClass("exitSoft");

    $("#image".concat((number).toString())).removeClass("exit");
    $("#image".concat((number).toString())).addClass("enter");
    $("#image".concat((number).toString()).concat("Back")).removeClass("exitSoft");
    $("#image".concat((number).toString()).concat("Back")).addClass("enterSoft");

    if (flipped | currentStanza == 0)
        AnimateTextUp();

    //RefreshArrows();
}

function AnimateTextUp() {
    
    var stanzaBackPrevious = $("#stanzaBack".concat((currentStanza + 1).toString()));
    var stanzaBack = $("#stanzaBack".concat((currentStanza).toString()));

    stanzaBackPrevious.removeClass("enter");
    stanzaBackPrevious.addClass("exit");

    stanzaBack.removeClass("exit");
    stanzaBack.addClass("enter");

}


var imageHeight = 1080;
var imageWidth = 1100;
function AnimateDown(number) {


    if (number > 0) {
        var image = document.getElementById("actualImage".concat(number.toString()));
        var imageBack = document.getElementById("actualImage".concat(number.toString()).concat("Back"));

        var adjusment = 0;
        if (imageHeight / parseFloat(image.clientHeight) > imageWidth / parseFloat(image.clientWidth)) {
            var height = image.clientHeight;
            adjustment = imageHeight / parseFloat(height);
            image.style.height = imageHeight;
            image.style.width = adjustment * image.clientWidth;
            imageBack.style.height = image.style.height;
            imageBack.style.width = image.style.width;
        }
        else {
            var width = image.clientWidth;
            adjustment = imageWidth / parseFloat(width);
            image.style.width = imageWidth;
            image.style.height = adjustment * image.clientHeight;
            imageBack.style.height = image.style.height;
            imageBack.style.width = image.style.width;
        }

    }

    $("#image".concat((number - 1).toString())).removeClass("enter");
    $("#image".concat((number - 1).toString())).addClass("exit");
    $("#image".concat((number - 1).toString()).concat("Back")).removeClass("enterSoft");
    $("#image".concat((number - 1).toString()).concat("Back")).addClass("exitSoft");

    $("#image".concat((number).toString())).removeClass("exit");
    $("#image".concat((number).toString())).addClass("enter");
    $("#image".concat((number).toString()).concat("Back")).removeClass("exitSoft");
    $("#image".concat((number).toString()).concat("Back")).addClass("enterSoft");
    
    if (flipped) {
            AnimateTextDown();
    }

    //RefreshArrows();
}

function AnimateTextDown() {
    var stanzaBackPrevious = $("#stanzaBack".concat((currentStanza - 1).toString()));
    var stanzaBack = $("#stanzaBack".concat((currentStanza).toString()));

    stanzaBackPrevious.removeClass("enter");
    stanzaBackPrevious.addClass("exit");

    stanzaBack.removeClass("exit");
    stanzaBack.addClass("enter");

}

document.onkeydown = checkKey;
function checkKey(e) {


    e = e || window.event;

    //if (e.keyCode == '16') {
    //    e.preventDefault();
    //    currentStanza = currentStanza - 1;
    //    MoveUp();
    //}
    //else 
    if (e.keyCode == '32') {
        e.preventDefault();

        if (flipped)
            FlipLeft();
        if (rightOut)
            WithdrawShortCard();
        RemoveStanzaArrow();

        $("#image".concat((currentStanza).toString())).removeClass("enter");
        $("#image".concat((currentStanza).toString())).addClass("exit");
        MakeLightGray(currentStanza);
        
        window.scrollTo(0, 0);
        currentStanza = 0;
        AnimateWhiteBox();
    }
    else if (e.keyCode == '37') {
        e.preventDefault();
        if (rightOut)
            WithdrawShortCard();
        else
            FlipLeft();
        //ToggleLeftSide();
    }
    else if (e.keyCode == '38') {
        e.preventDefault();

        MoveUp();
    }
    else if (e.keyCode == '39') {
        e.preventDefault();
        ActivateShortCard();
        //FlipRight();
    }
    else if (e.keyCode == '40') {
        e.preventDefault();

        MoveDown();
    }
}

function MoveUp() {

    if (rightOut) {
        WithdrawShortCard();
        RemoveStanzaArrow();
    }
    else if (flipped)
        RemoveStanzaLeftArrow();
    else
        RemoveStanzaArrow();

    if (currentStanza > 0) {
        currentStanza = currentStanza - 1;
    }

    if (flipped)
        ShowStanzaLeftArrow();

    holdOffWayPoint = true;
    ScrollTo(currentStanza);
    while (holdOffWayPoint) { };

    if (currentStanza == 0 & flipped) {
        $("#card").removeClass('flipped');
        flipped = false;
    }
    
    setTimeout(function () {
        AnimateWhiteBox();
        setTimeout(function () {
            DarkenStanzaUp(currentStanza);
            setTimeout(function () {
                AnimateUp(currentStanza);
            }, textTime);
        }, whiteBoxTime);
    }, 250);
}

function MoveDown() {

    if (rightOut) {
        WithdrawShortCard();
        RemoveStanzaArrow();
    }
    else if (flipped)
        RemoveStanzaLeftArrow();
    else
        RemoveStanzaArrow();

    currentStanza = currentStanza + 1;

    if (flipped)
        ShowStanzaLeftArrow();

    UpdateCurrentStanzaDiv();

    holdOffWayPoint = true;
    ScrollTo(currentStanza);
    while (holdOffWayPoint) { };

    
    setTimeout(function () {
        AnimateWhiteBox();
        setTimeout(function () {
            DarkenStanzaDown(currentStanza);
            setTimeout(function () {
                AnimateDown(currentStanza);
            }, textTime);
        }, whiteBoxTime);
    }, 250);
}

var holdOffWayPoint = false;
function ScrollTo(number) {
    //disableScrollDetection = true;

    if (number == 0) {
        $('html, body').animate({
            scrollTop: $("#titleAn").offset().top - 300
        });
    }
    else {
        $('html, body').animate({
            scrollTop: $("#stanza".concat(number.toString())).offset().top - 475
        });
    }
    holdOffWayPoint = false;
}

var flipped = false;
function FlipRight() {
    if (currentStanza > 0 & !flipped) {
        var stanzaBack = $("#stanzaBack".concat(currentStanza.toString()));

        if (!flipped) {
            var card = $("#card");
            card.addClass('flipped');


            setTimeout(function () {
                stanzaBack.removeClass("exit");
                stanzaBack.addClass("enter");
                flipped = true;
                //RefreshArrows();
            }, helpImageTime);
        }
    }
    else {
        CloudActivate();
    }
}

function FlipLeft() {
    if (currentStanza > 0 & flipped) {
        var stanzaBack = $("#stanzaBack".concat(currentStanza.toString()));

        if (flipped) {
            stanzaBack.removeClass("enter");
            stanzaBack.addClass("exit");

            //setTimeout( function() {
                $("#card").removeClass('flipped');
                flipped = false;
                //RefreshArrows();

                ResetShortCard();
                RemoveStanzaLeftArrow();
                $("#stanzaSmallCardFrame".concat(currentStanza.toString())).removeClass("flipped");
                ShowStanzaArrow();
            //}, cardBackTextTime);
        }
    }
    else {
        CloudActivate();
    }
}

var leftOut = false;
function ToggleLeftSide() {
    var notes = $("#stanza".concat(currentStanza.toString())).find(".note");
    if (notes.length > 0) {
        if (leftOut) {
            for (var i = 0; i < notes.length; i++) {
                $("#".concat(notes[i].id.toString())).removeClass("enter");
                $("#".concat(notes[i].id.toString())).addClass("exit");
            }
        }
        else {
            for (var i = 0; i < notes.length; i++) {
                $("#".concat(notes[i].id.toString())).removeClass("exit");
                $("#".concat(notes[i].id.toString())).addClass("enter");
            }
        }
        leftOut = !leftOut;
    }
    else {
        CloudActivate();
    }
}


var cloudNumber = 0;
function CloudActivate()
{
    cloudNumber++;
    var x = $("#whiteCloud".concat((cloudNumber - 1).toString()));
    var y = x.clone().prop('id', 'whiteCloud'.concat(cloudNumber.toString()));
    y.appendTo(x.parent());
    x.addClass("cloudActivate");

    if(cloudNumber > 1)
    {
        var z = $("#whiteCloud".concat((cloudNumber - 2).toString()));
        z.remove();
    }
}

//$('body').on({
//    'mousewheel': function (e) {
//        e.preventDefault();
//        e.stopPropagation();
//    }
//})

window.addEventListener('mousewheel', function (e) {
    //wDelta = e.wheelDelta < 0 ? 'down' : 'up';
    if (!disableScrollDetection) {
        if (e.wheelDelta < 0) {
            MoveDown();
        } else {
            MoveUp();
        }
        disableScrollDetection = true;
        setTimeout(function () {
            disableScrollDetection = false;
        }, 1000);
    }
});

var disableScrollDetection = false;

function UpdateCurrentStanzaDiv()
{
    document.getElementById("currentStanzaDiv").innerHTML = currentStanza;
}

function ThereIsExtraContent() {
    if (document.getElementById("stanzaBack".concat(currentStanza.toString()))) {
        return true;
    }

    return false;
}

function ShowStanzaArrow() {
    var arrow = $("#stanzaArrow".concat(currentStanza.toString()));
    if(ThereIsExtraContent())
    {
        arrow.removeClass("exit");
        arrow.addClass("enter");
    }
}

function RemoveStanzaArrow() {
    var arrow = $("#stanzaArrow".concat(currentStanza.toString()));
    if (ThereIsExtraContent()) {
        arrow.removeClass("enter");
        arrow.addClass("exit");
        setTimeout(function () { }, 250);
    }
}

function ShowStanzaLeftArrow() {
    var arrowLeft = $("#stanzaArrowLeft".concat(currentStanza.toString()));
    arrowLeft.removeClass("exit");
    arrowLeft.addClass("enter");
}

function RemoveStanzaLeftArrow() {
    var arrowLeft = $("#stanzaArrowLeft".concat(currentStanza.toString()));
    arrowLeft.removeClass("enter");
    arrowLeft.addClass("exit");
}

function BoxLeftArrow() {
    //var leftArrow = $("#stanzaArrowLeft".concat(currentStanza)).find("span")[0];
    //leftArrow.css({ "-webkit-box-shadow": "2px 2px white"});
}

var rightArrowOffset = 10;
function MoveStanzaArrowToCard() {
    var stanzaArrow = $("#stanzaArrow".concat(currentStanza));
    var arrowLeft = stanzaArrow.position().left;
    stanzaArrow.animate({ left: arrowLeft + shortCardWidthNumber + rightArrowOffset }, shortCardWidthTime);
}

function MoveCardArrowToStanza() {
    var stanzaArrow = $("#stanzaArrow".concat(currentStanza));
    var arrowLeft = stanzaArrow.position().left;
    stanzaArrow.animate({ left: arrowLeft - shortCardWidthNumber - rightArrowOffset }, shortCardWidthTime);
}

function ResetStanzaArrow() {
    var stanzaArrow = $("#stanzaArrow".concat(currentStanza));
    var arrowLeft = stanzaArrow.position().left;
    stanzaArrow.css({ "left": (arrowLeft - shortCardWidthNumber - rightArrowOffset).toString(), "opacity": "0" });
    stanzaArrow.removeClass("enter");
}

//function RefreshArrows() {

//    if (!flipped & document.getElementById("stanzaBack".concat(currentStanza.toString())) != undefined) {
//        $("#rightArrow").css({ "opacity": "1" });
//    }
//    else {
//        $("#rightArrow").css({ "opacity": "0" });
//    }

//    if (flipped ) {
//        $("#leftArrow").css({ "opacity": "1" });
//    }
//    else {
//        $("#leftArrow").css({ "opacity": "0" });
//    }
//}

var shortCardWidthTime = 250;
var shortCardWidthNumber = 450;
var shortCardWidth = shortCardWidthNumber.toString().concat("px");
var rightOut = false;
function ActivateShortCard()
{
    var smallCard = $("#stanzaSmallCard".concat(currentStanza.toString()));
    if (flipped | !ThereIsExtraContent())
    {
        CloudActivate();
    }
    else if (rightOut)
    {
        FlipRight();
        ResetStanzaArrow();
        BoxLeftArrow();
        $("#stanzaSmallCardFrame".concat(currentStanza.toString())).addClass("flipped");
        $("#stanzaSmallCardText".concat(currentStanza.toString())).removeClass("enter");
        $("#stanzaSmallCardText".concat(currentStanza.toString())).addClass("exit");
        rightOut = false;

    }
    else
    {
        var stanzaBackText = $("#stanzaBack".concat(currentStanza.toString())).find(".stanzaBack")[0];
        var text = $("#stanzaSmallCardText".concat(currentStanza.toString()))[0];
        
        //var string = stanzaBackText.innerText;
        var string = stanzaBackText.innerHTML;
        var result = "";
        var charactersPerLine = 120;
        var record = true;
        var charactersInLine = 0;
        for (var i = 0; i < string.length; i++)
        {
            if(string[i] == '\n') {
                record = true;
                charactersInLine = 0;
                result = result.concat('\n');
            }
            else if (record) {
                result = result.concat(string[i]);
                charactersInLine++;
                if (charactersInLine == charactersPerLine) {
                    record = false;
                    result = result.concat("...");
                }
            }
        }

        //text.innerText = stanzaBackText.innerText;
        text.innerHTML = result;
        smallCard.css({ "width": shortCardWidth });
        var smallCardHeight = document.getElementById('stanzaSmallCard'.concat(currentStanza.toString())).clientHeight;
        smallCard.css({ "width": "0px", "background-color": "rgba(255,255,255,.6)" });



        var stanzaHeight = document.getElementById('stanza'.concat(currentStanza.toString())).clientHeight;
        smallCard.css({ "height": stanzaHeight.toString() });
        smallCard.animate({ width: shortCardWidth }, shortCardWidthTime);
        smallCard.animate({ height: smallCardHeight }, shortCardWidthTime);
        setTimeout(function () {
            $("#stanzaSmallCardText".concat(currentStanza.toString())).removeClass("exit");
            $("#stanzaSmallCardText".concat(currentStanza.toString())).addClass("enter");
            ShowStanzaLeftArrow();
        }, 2 * shortCardWidthTime);
        setTimeout(function () {
            MoveStanzaArrowToCard();
        }, 250);
        rightOut = true;
    }
}

function WithdrawShortCard() {
    if (flipped)
    {

    }
    else if (rightOut) {
        $("#stanzaSmallCardText".concat(currentStanza.toString())).removeClass("enter");
        $("#stanzaSmallCardText".concat(currentStanza.toString())).addClass("exit");
        RemoveStanzaLeftArrow();

        var smallCard = $("#stanzaSmallCard".concat(currentStanza.toString()));

        var smallCardHeight = document.getElementById('stanzaSmallCard'.concat(currentStanza.toString())).clientHeight;

        var stanzaHeight = document.getElementById('stanza'.concat(currentStanza.toString())).clientHeight;
        MoveCardArrowToStanza();
        smallCard.animate({ height: stanzaHeight }, shortCardWidthTime);
        smallCard.animate({ width: "0" }, shortCardWidthTime);
        rightOut = false;

        setTimeout(function () {
            smallCard.css({ "height": smallCardHeight.toString() });
            document.getElementById('stanzaSmallCard'.concat(currentStanza.toString())).clientHeight = smallCardHeight;
        }, 500);
    }
}

function ResetShortCard()
{
    var smallCard = $("#stanzaSmallCard".concat(currentStanza.toString()));
    smallCard.css({ "width": "0px" });

}
