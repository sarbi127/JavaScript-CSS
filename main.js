

var cc = [];
var clicked = [], clickedall = false;

var map1 = new map();

var sp1;

var pc1;


cc.watch("Australia", function (id, oldval, newval) {
    console.log( "o." + id + " changed from " + oldval + " to " + newval );
    sp1 = new sp();
    pc1 = new pc();

    return newval;
});