// require('app.env').config()
const signupSuccess = (json) => {
    console.log(json)
    let tokenJson = {token: json.token, user: json.result[0]}
    console.log(tokenJson)
    saveStuff(tokenJson)
}
let loggedIn;
let user; 

var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

$(document).ready(function(){
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: meetupEndpoint,
        success: onSuccess,
        error: function(response){
            console.log('Error:', response)
        }
    })
})//end doc.ready

function onSuccess(response){
    var meetupJSONResponse = JSON.stringify(response)
    console.log('success ' + meetupJSONResponse)
}

var allInterests = [
    "tech",
    "family",
    "hw",
    "sf",
    "learning",
    "photo",
    "fd",
    "writing",
    "lc",
    "music",
    "move",
    "lgbtq",
    "film",
    "sfg",
    "beliefs",
    "art",
    "bc",
    "dance",
    "pets",
    "hc",
    "fb",
    "cb",
    "social"
]

var userInterests = [];

for(let i = 0; i < allInterests.length; i++){
    let interest = allInterests[i]
    document.getElementById(interest).onclick = function(){
    if ( this.checked ) {
        userInterests.push(interest);
        console.log(userInterests)
    } else {
       let index =  userInterests.indexOf(interest)
        userInterests.splice(index,1)
    }
};
}

$('form').submit(function(e) {
    e.preventDefault()
    console.log(userInterests)
    // app.put({interests: userInterests})  
    $.ajax({
        method: "put",
        url: "localhost:3000/interests",
        data: {
            username: 'jane', //pass user in from index.html, may use email instead
            meetupId: 3 //get from intrests.html
        }
    })     
})
