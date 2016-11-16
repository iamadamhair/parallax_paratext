
var darkenPercentage = "70%";
var lightenPercentage = "30%";

function DarkenText(id) {
    var item = document.getElementById(id);
    item.style.color = "black";
}

function LightenText(id) {
    var item = document.getElementById(id);
    item.style.color = "lightgray";
}

$('.line').waypoint(function (direction) {
    if(direction == "down")
        DarkenText(this.element.id);
    else
        LightenText(this.element.id);
}, { offset: darkenPercentage })

$('.line').waypoint(function (direction) {
    if(direction == "down")
        LightenText(this.element.id);
    else
        DarkenText(this.element.id);
}, { offset: lightenPercentage })