var directions = ["U","U'","U2","D","D'","D2","F","F'","F2","B","B'","B2","L","L'","L2","R","R'","R2"];

var hold = "";
var current = "";

function randomNumber(min,max) {
    return Math.round(Math.random() * (max-min) + min);
}

function randomScramble() {
    var scramble = [];
    for(i=0;i<20;i++) {
        current = directions[randomNumber(0,directions.length-1)].toString();
        if(current[0] != hold[0]) {  //This check insures that another move of the same face
            scramble.push(current);  //is not the next direction. 
            hold = current; //(example: F2 F would just be F'. This is what we don't want.)
        }
        else {
            i--;
        }

    }
    //text.innerHTML=scramble.join(" ");
    return scramble.join(" ");
}