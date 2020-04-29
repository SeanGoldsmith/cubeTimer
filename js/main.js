var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');
var userTimes = [];
var calcTimes = [];
var visibleTimeList = document.getElementById('timesList');
var mo3 = document.getElementById("mo3");
var ao5 = document.getElementById("ao5");
var a07 = document.getElementById("ao7");
var scrambleHolder = document.getElementById("scramble");

var watch = new StopWatch(timer);

scrambleHolder.innerHTML=randomScramble();

window.addEventListener("keydown",function (e){
    if(e.keyCode==32){
        if (watch.isOn) {
            watch.stop();
            calcTimes.push(watch.timeOut()[1]);
            var newLen = userTimes.push(watch.timeOut()[0]);
            addUserTime(watch.timeOut()[0],newLen);
            runCalcs(calcTimes);
            scrambleHolder.innerHTML=randomScramble();
        }
        else {
            watch.start();
        }
    }
    
});

function rebuildTimesList(list) {
    list.innerHTML="";
    for(i=0;i<userTimes.length;i++) {
        addUserTime(userTimes[i],i+1);
    }
}

function deleteTime(time) {
    var index = time.index;
    userTimes.splice(index,1);
    calcTimes.splice(index,1);
    time.remove();
    rebuildTimesList(visibleTimeList);
    runCalcs(calcTimes);
}

function addUserTime(Time,len) {
    var newTime = document.createElement("li");
    newTime.setAttribute("id","element" + (len -1).toString());
    newTime.onclick = () => deleteTime(newTime);
    newTime.setAttribute("index",len-1);
    newTime.innerHTML=(Time);
    visibleTimeList.appendChild(newTime);
}

// Rubiks cube average times remove the fastest and slowest
// time before calculating.


// Have to populate a copy array this way because
// javascript objects are passed by reference. 
// I cannot remove values from calcTimes[] as it
// will make later averages impossible.
function createCalcList(calcTimes) {
    var calcList = [];
    for(i=0; i < calcTimes.length; i++){
        calcList.push(calcTimes[i]);
    }
    return calcList;
}

function runCalcs(calcTimes) {
    if(calcTimes.length >= 7) {
        ao7.innerHTML=watch.timeFormatter(averageOfSeven(createCalcList(calcTimes)));
        ao5.innerHTML=watch.timeFormatter(averageOfFive(createCalcList(calcTimes)));
        mo3.innerHTML=watch.timeFormatter(meanOfThree(createCalcList(calcTimes)));
    }
    else if (calcTimes.length < 7 && calcTimes.length >=5) {
        ao7.innerHTML="N/A";
        ao5.innerHTML=watch.timeFormatter(averageOfFive(createCalcList(calcTimes)));
        mo3.innerHTML=watch.timeFormatter(meanOfThree(createCalcList(calcTimes)));
    }
    else if (calcTimes.length < 5 && calcTimes.length >=3) {
        ao7.innerHTML="N/A";
        ao5.innerHTML="N/A";
        mo3.innerHTML=watch.timeFormatter(meanOfThree(createCalcList(calcTimes)));
    }
    else {
        ao7.innerHTML="N/A";
        ao5.innerHTML="N/A";
        mo3.innerHTML="N/A";
    }
    

}

function meanOfThree(listOfTimes) {
     
    if(listOfTimes.length >= 3) {
        var sum = 0;
        while(listOfTimes.length > 3) {
            listOfTimes.shift();
        }
        for(i=0; i < listOfTimes.length; i ++) {
            sum += listOfTimes[i];
        }
        return (sum/listOfTimes.length);
    }
    else {
        console.log("N/A");
        return "N/A";
    }
}

function averageOfX(listOfTimes,total) {
    var sum = 0;
    while(listOfTimes.length > total) {
        listOfTimes.shift();
    }
    listOfTimes.sort((a,b)=>a-b);
    listOfTimes.pop();
    listOfTimes.shift();
    for(i=0; i < listOfTimes.length; i ++) {
        sum += listOfTimes[i];
    }
    return sum/listOfTimes.length;
}

function averageOfFive(listOfTimes) {
    return averageOfX(listOfTimes,5);
}


function averageOfSeven(listofTimes) {
    return averageOfX(listofTimes,7);
}

function clearTimes() {
    visibleTimeList.innerHTML = "";
    userTimes = [];
    calcTimes = [];
    
}
    



// function formatTimes(timesList) {
//     var result = ""
//     timesList.forEach(element => {
//         result += element + "<br> ";
//     });
//     return result;
// }

// Start and stop buttons are not needed. User should be using Spacebar.

// toggleBtn.addEventListener('click', function() {
//     if (watch.isOn) {
//         watch.stop();
//         toggleBtn.textContent="Start";
//     }
//     else {
//         watch.start();
//         toggleBtn.textContent="Stop";
//     }
// });

// resetBtn.addEventListener('click', function () {
//     watch.reset();
// });