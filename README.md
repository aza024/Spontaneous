<h1> Spontaneous </h1>
   Spontaneous is a responsive full-stack application that allows users to sign up for an account that generates 
   three random Meetups from a list of interest they selected in profile creation. 

<h2> Existing Features </h2>
  <ul>
    <li> Account creation comprised of a name, e-mail, and password that are validated for accuracy and completion and       hashed using BCrypt</li>
    <li> Users can enter their zip code and search for Meetups in a specific location </li>
    <li> Generate and display three random meetups to users based on individually customized profile </li>
    <li> Save and remove Meetups to customized list </li>
    <li> "Decide For Me" option that selects from list of random Meetup list </li>
  </ul>

<h2> Technologies Used </h2>

<ul>
  <li> HTML/CSS </li>
  <li> Javascript </li>
  <li> .AJAX </li>
  <li> Mongo </li>
  <li> Mongoose </li>
  <li> Node </li>
  <li> geoCoding using GoogleMaps API to turn a zip code into longitude and latitude </li>
  <li> API Key signatures to access Meetup's API </li>
</ul>

<h2> API's Used </h2>

<ul>
  <li> Meetup.com </li>
  <li> Google Maps - Geocoding </li>
</ul>

<h2> User Story </h2>

<p> Upon visiting Spontaneous, a user will have the option to "Log In" to their account or "Sign Up" to a new account. </p>

<img width="1419" alt="Spontaneous Home" src="https://user-images.githubusercontent.com/38674075/48965620-a861e480-ef75-11e8-8982-4ed6b9aa6f90.png">

<p> If a user decides to "Sign Up", they will be brought to the "Interests" page where they can select as many Meetup categories as they'd like for their Zip Code </p>

<img width="1145" alt="Interests" src="https://user-images.githubusercontent.com/38674075/48965621-a861e480-ef75-11e8-86f9-98a9343a9642.png">

<p> When a user logs in, they will be brought to their profile page where three randomly generated Meetups based on their preferences. If a user still can't decide, they can choose to have the app decide for them. Users can also save and remove Meetups from their profile. </p>

<img width="781" alt="User Profile Page" src="https://user-images.githubusercontent.com/38674075/48965616-a009a980-ef75-11e8-9824-39c7f6f90404.png">


<h2> Planned Features/Opportunites for Improvments </h2>

<ul>
  <li> Email users reminders about their upcoming Meetups and remove Meetups that have an expired date </li>
  <li> Replace Cookies with JWT tokens for improved security </li>
  <li> Create comments section that allows users add, delete, and edit a comment, and reply to comments of other users 
  for specific Meetup's they've attended </li>
  <li> Embed Comments in User Schema </li>
  <li> Add an "Attended" section for users to track which Meetups they've attended </li>
  <li> Utilize controllers to keep code clean and organized </li>
  <li> Secure Meetup API data with OAuth instead of API Key signatures </li>
  <li> Optimize .ajax calls and routes </li>
  <li> Fix ability for user to log in </li>
  <li> Implement feature for users to edit/update Zip Code and interest selection </li>
  <li> Include interactive link to the meetup on Meetup.com </li>
  <li> Remove HTML from AJAX response </li>
  <li> Add error handling for undefined AJAX responses </li>
  <li>Enhance Mobile Responsivness </li>
  <li> Add conditional user meessages for direction and clarification to improve user experience </li>
</ul>

<h2> Authors </h2>
  Andrea Piazza in collaboration with Francisco Sandoval 

<h2> Acknowledgments </h2>
  Special thanks to Justin Castilla and Dalton Hart for their support and assistance for Spontaneous!
