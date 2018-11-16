//global variables
let randomIntr;
const apiKey = "3b72576a30795b1d47673a2f3f2837"
var zipCode = Cookies.get("zipCode")
    console.log(zipCode)

//global functions
function createSucc(user){    
    console.log(user.user._id)
    window.location.reload()
}
function commSucc(json){
    console.log("ANDREA")
    allComments = json
    $("#comDisp").append(data)
    console.log(data)
}


$(document).ready(function(){
    //retrive cookies holding geoCoding data
    var username = Cookies.get("username")
    console.log("username"+ username)
    var lng = parseFloat(Cookies.get("lng"));
    var lat = parseFloat(Cookies.get("lat"));
    console.log("long,lat",lng,lat)

    $.ajax({
        dataType: 'json',
        method:'GET',
        data: {username: username},
        url: "http://localhost:3000/userInterests",
        success:function(response){
            console.log("User Interests Retrieved")
            console.log("response",response)
            var userInterests = JSON.stringify(response.interests)
                console.log(userInterests)
            var parseInterests = JSON.parse(userInterests)

            //generate a random integer to display data to user.
            //Params: min - 0, max - max number returned from Meetup API containing interests from user with zip code. 
            
            function randomIntrNum(min,max)
            {
                var random = 
                Math.floor(Math.random() * (max - min)) + min;
                var parsedIntrs = JSON.parse(userInterests)
                randomIntr = parsedIntrs[random]
                return randomIntr
            }
            //Select a random user interest 
            //Param: user interest from ./interest page
            function randomInterest(userIntr){
                for(let i = 0; i < parseInterests.length; i++){
                    var intID = parseInterests[i] 
                } 
                const maxNumIntr = parseInterests.length;
                const minNumIntr = 0;
                randomIntrNum(maxNumIntr, minNumIntr)
            }   
            randomInterest(userInterests)

        //Meetup endpoint with key signatures
       var meetupEndpoint = `https://api.meetup.com/find/groups?photo-host=public&key=${apiKey}&zip=${zipCode}&page=200&sig_id=262151934&lon=${lng}&lat=${lat}&sig=bf5dea4ce46167a373aeadc7cecfb4d7ee8db16e&callback=?&sign=true`

            //using parameters from user - get response from Meetups API
            $.ajax({
                dataType: 'json',   
                method: 'GET',
                url: meetupEndpoint,
                success: onSuccess,
                error: function(response){
                    console.log('Error:' + JSON.stringify(response))
                }
            })
        },
        error: function(response){
            console.log('Error:' + JSON.stringify(response))   
        }
    })  
    
})//end doc.ready

//When the .AJAX call is successful, get data and length for random functions
function onSuccess(response){
    
    var meetupJSONResponse = response.data;
    let maxLen = meetupJSONResponse.length;

    console.log(response)

//calculate random number
function randomNum(min,max,interval)
{
    interval = 1;
    let random = Math.floor(Math.random()*(max-0+interval)/interval);
    return random*interval+min;
}
    var num1 = randomNum(0,maxLen); 
    var num2 = randomNum(0,maxLen); 
    var num3 = randomNum(0,maxLen);  

     //make sure duplicate meetups don't appear
    if(num1 === num2 || num1 === num3 && num1 != maxLen){
        num1++
    }
        else if(num2 === num3 && num2 != maxLen){
            num2++ 
        }
        else if(num1 === num2 || num1 === num3 && num1=== maxLen){
            num1--
        }
        else if(num2 === num3 && num2 === maxLen){
            num2--
        }
//generate HTML
    //List Meetups
    $("#list").append(
        `<li> 
            <h2>Meetup 1 </h2>
                <h5>Name: </h5> 
                ${meetupJSONResponse[num1].name}<br>
                <h5>Link: </h5> 
                ${meetupJSONResponse[num1].link} 
                <h5>Description: </h5> 
                ${meetupJSONResponse[num1].description} <br> 
                <button class = addBtn id=btn1 value=add>Add</button>
            </div> 
        </li>`)

    $("#list").append(
        `<li> 
        <h2>Meetup 2</h2> 
            <h5>Name:</h5>
            ${meetupJSONResponse[num2].name}<br> 
            <h5>Link: </h5> ${meetupJSONResponse[num2].link}  
            <h5>Description: </h5> ${meetupJSONResponse[num2].description} 
            <button class = addBtn id=btn2 value=add>Add</button>
            <br>
        </li>`)

        $("#list").append(
        `<h2>Meetup 3 </h2>
            <h5>Name:</h5> 
            ${meetupJSONResponse[num3].name}<br>      
            <h5>Link:</h5> ${meetupJSONResponse[num3].link}
            <h5>Description: </h5> ${meetupJSONResponse[num3].description} 
            <button class = addBtn id=btn3 value=add>Add</button> 
        </li>`)    

function addMeetup(num){
    $("#savedMeetup").append("<li class = " + num + ">" + "<h6>" + "Name: " + "</h6>" + JSON.stringify(meetupJSONResponse[num].name +
    "</li>" +
    "<li class = " + num + ">" + "<h6>" + "Link: " + "</h6>" + meetupJSONResponse[num].link + "</li>" +
    "<button class = " + num + "id=removeBtn value=delete>Remove</button>" + "<hr class=" + num + ">"))
}

//Remove meetup from schema
function removeMeetup(num){
    $('#removeBtn').on('click',function(){
        var username = Cookies.get("username")
        console.log("username for meetupID remove: ", username)
        var meetupId = meetupJSONResponse[num].id
        $("."+num).hide()
    })
}

  
    
    //add button  - save meetup ID to profile
    $("#btn1").on('click',function(e){
        var username = Cookies.get("username")
        var meetupId = meetupJSONResponse[num1].id
        e.preventDefault()
        $.ajax({
            method: "put",
            url: "http://localhost:3000/profile",
            data: {
                username: username, 
                meetupId: meetupId 
            },
            success:console.log("Success:"+username+meetupId),
            error: (response)=>{console.log('Error:' + JSON.stringify(response))}
        })     
        addMeetup(num1)
        removeMeetup(num1)
        $(this).hide() 
    })

    $("#btn2").on('click',function(e){
        var username = Cookies.get("username")
        var meetupId = meetupJSONResponse[num1].id
        e.preventDefault();
        $.ajax({
            method: "put",
            url: "http://localhost:3000/profile",
            data: {
                username: username, 
                meetupId: meetupId 
            },
            success:console.log("Success:"+username+meetupId),
            error: (response)=>{console.log('Error:' + JSON.stringify(response))}
        })     
        addMeetup(num2)
        removeMeetup(num2)
        $(this).hide()
    })

    $("#btn3").on('click',function(e){
        var username = Cookies.get("username")
        var meetupId = meetupJSONResponse[num1].id
        e.preventDefault();
        $.ajax({
            method: "put",
            url: "http://localhost:3000/profile",
            data: {
                username: username, 
                meetupId: meetupId 
            },
            success:console.log("Success:"+username+meetupId),
            error: (response)=>{console.log('Error:' + JSON.stringify(response))}
        })     
        addMeetup(num3)
        removeMeetup(num3)
        $(this).hide()
    })

    // Select one of the three random meetups. 
    $('.decide').on('click',()=>{
        let randMtp =  Math.floor(Math.random() * (3)) + 1;
        let text = `<h3 class = "blue">We picked Meetup ${randMtp}. Have Fun!</h3>`
            $('.ourPick').append(text)
            $('.decide').hide() 
    })
}

