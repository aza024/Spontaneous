let loggedIn;
let user; 
let long = 0;
let lat = 0; 

const signupSuccess = (json) => {
    let tokenJson = {token: json.token, user: json.result[0]}
    saveStuff(tokenJson)
}

onSuccess = (response) => {
    let googleMapRes = JSON.stringify(response)
    let parsed = JSON.parse(googleMapRes)
    
    //get longitude and latitude
    let lat = parsed.results[0].geometry.bounds.northeast.lat
    let lng = parsed.results[0].geometry.bounds.northeast.lng
    
    Cookies.set("lng", lng)
    Cookies.set("lat", lat)
}

$(document).ready(() => {
    $('#location').on('submit',(e) => {
        e.preventDefault();
        let zipCodeData = $('#zipCode').val()
        
        Cookies.set("zipCode", zipCodeData);

        let endpoint = `http://maps.googleapis.com/maps/api/geocode/json?address=13413&sensor=false&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg`
        
        $.ajax({
            dataType: 'json',   
            method: 'GET',
            url: endpoint,
            success: onSuccess,
            error: (response) => {
                console.log('ERROR:' + JSON.stringify(response))
            }
        })
    })
})//end doc.ready

let allInterests = [
    "tech", "family", "hw", "sf", "learning", "photo", "fd", "writing", "lc","music", "move", "lgbtq", "film", "sfg", "beliefs", "art", "bc", "dance","pets","hc", "fb", "cb", "social"
]

let userInterests = [];

for (let i = 0; i < allInterests.length; i++){
    let interest = allInterests[i]
    document.getElementById(interest).onclick = () => {
        if ( this.checked ) {
            userInterests.push($(this).attr("data-id") );
        } else {
            let index = userInterests.indexOf($(this).attr("data-id") )
            userInterests.splice(index,1)
        }   
    };
}

$('form').submit((e) => {
    e.preventDefault()
    let username = Cookies.get('username') 
    let id = $("data-id").val()

    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/interests",
        data: {
            username: username, 
            interests: userInterests
        },
        success: () => {
            $('#submitBtn').on('click', () => { 
                window.location.replace('/profile')
            }) 
        },
        error: console.log('Error: Interests not submitted')
    }) 
})
