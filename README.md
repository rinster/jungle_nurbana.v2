# Jungle Nurbana


### Summary
A blogging web-page community where users can share their knowledge on house plant care. Users can maintain their content and favorite other users'. Inspiration is drawn from the Medium Website and the Urban Jungle website. This features a simple but rich user-interface that is fully responsive across all devices. 

Technologies: Angular 6, Express, MongoDB, NodeJS, HTML5/CSS3.

#### Highlighted Features
Overview of main page
![frontpgoverview-min](https://user-images.githubusercontent.com/17129823/48975902-9c872880-f030-11e8-96d8-519083e6f0d5.gif)

<br/>
<br/>

Login/Registration features Angular front-end validations
![loginregis-min](https://user-images.githubusercontent.com/17129823/48975956-2c79a200-f032-11e8-95e1-b5b5e6de43ca.gif)

<br/>
<br/>

Angular confirm delete modals utilizing input and output calls. The input is used to pass on the blog title to children which blog title is to be deleted. Once the user hits the confirm button, an output call is sent to the parent component to re-render the page, thereby having real-time update.
![confirmdeletemodal-min](https://user-images.githubusercontent.com/17129823/48976032-2684c080-f034-11e8-9bd7-9752926fd0af.gif)

<br/>
<br/>

Users can like/save posts to their favorites with a simple toggle button. The user in session will have this data persisted to the database. So when the user is logged in, they will be able to identify posts they have already liked.
![togglelike-min](https://user-images.githubusercontent.com/17129823/48975992-394ac580-f033-11e8-9f34-2ea3a6ac36ad.gif)

<br/>
<br/>

This also features a Angular native wysiwyg editor that allows users to style and edit post content. The content then is then passed through a DOM Sanitizer before being rendered to the browser and to prevent Cross-site scripting (XSS).
![htmleditor-min](https://user-images.githubusercontent.com/17129823/48976035-38666380-f034-11e8-9b66-47841187c94e.gif)

<br/>
<br/>

#### Other Notable Features
* Instagram API 
* Email Subscription functionality with nodemailer
* Edit & Add blog forms come with flash validations 
* On the backend: Angular Custom Pipes

