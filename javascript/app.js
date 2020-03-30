var firebaseConfig = {
    apiKey: "  ",
    authDomain: "fire-train-14629.firebaseapp.com",
    databaseURL: "https://fire-train-14629.firebaseio.com",
    projectId: "fire-train-14629",
    storageBucket: "fire-train-14629.appspot.com",
    messagingSenderId: "1071244068175",
    appId: "1:1071244068175:web:11a429bbc046a3438a313a",
    measurementId: "G-Q2GWZGWZ4V" 
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

var trainName = "were";   
var destination;
var firstTrainTime;
var frequency;
var minutesAway = 0;
var database = firebase.database();
//database.ref().on("value", function(snapshot) {

function scheduleTrain (){
    event.preventDefault();
     trainName = document.getElementById("train-name").value;
    //alert(trainName);
    destination = document.getElementById("destination").value; //Getting elements from my webpage.
   // alert(destination);
    firstTrainTime = document.getElementById("military-time").value;
   // alert(firstTrainTime);
    frequency = document.getElementById("frequency").value;
    //alert(frequency);

    //alert ("getting ready for database");
    //pushing to database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
    document.getElementById("train-name").innerHTML = " ";
  
   alert("You got to the bottom without failing!"); 
};

database.ref().on("child_added", function(childSnapshot){
    //alert("Running code here!");
    var timeTrainArrives;
    var minutesAway;
    firstTrainTime = childSnapshot.val().firstTrainTime;
    destination = childSnapshot.val().destination;
    trainName = childSnapshot.val().trainName;
    frequency = childSnapshot.val().frequency;
    minutesAway = calcMinAway(firstTrainTime, frequency);
    timeTrainArrives = moment().add(minutesAway, "minutes");
    timeTrainArrives = moment(timeTrainArrives).format("HH:mm");
    $("#add-row").append("<tr><td>" + trainName +
    "</td><td>" + destination + 
    "</td><td>" + frequency + 
    "</td><td>" + timeTrainArrives +    
    "</td><td>" + minutesAway +  "</td></tr>");
});

function calcMinAway(firstTrainTime, frequency){
    var firstTrainYesterday = moment(firstTrainTime, "hh:mm").subtract(1, "days");
    var diffMinutes = moment().diff(moment(firstTrainYesterday), "minutes");
    var remainder = diffMinutes % frequency;
    var minAway = frequency - remainder;
    return (minAway); 
    //alert(firstTrainYesterday);
}

function minutesDiff () {
    alert("Do you see me now?");
    var timeNowHours = currentTime.getHours();
    var timeNowMinutes = currentTime.getMinutes();
    alert (timeNowHours);
    alert (timeNowMinutes);
    
    
}


  //what time is it now - next arrival time 
