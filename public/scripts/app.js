$('#signUpBtn').on('click', () => { 
    let data = {
        username: $('#subName').val(),
        email: $('#subEmail').val(),
        password:$('#subPass').val(),
        interests:[]
    }
    
    Cookies.set("username", $('#subName').val());

    $.ajax({
        method: "POST",
        url: "/signup",
        data: data,
        success: (response) => {
            console.log('INFO: ' + JSON.stringify(response))
        },
        error: (response) => {
            console.log("ERROR: ", JSON.stringify(response))
        },
    })
    window.location.replace('/interests');
})