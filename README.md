# Mongo-DB-Project 

## Features


### Badges

## Description 
 This Mongo-DB-Project is focused on creating a secure student administration system. **CRSF (Cross-Site Request Forgery)**, a token which is stored in each of the user's requests. This token is used in the server-side to validate if the user is allowed to make CRUD (CREATE, READ, UPDATE, DELETE) operations to the app's Mongo database.
 One of the middlewares added was **cookie-parser**, which managed the crsf protection and made sure each request had a token before granting access. 
<br>

**IP Whitelisting and Server-side Authent**
This will be added soon, so that only the predefined networks and users can have access and interact with the student adminitration system. Any networks or users that are not whitelisted, will not have access to the server and this will prevent unauthorized external access and interations via requests. 
<br>

**HTML Sanitization**
This security package is added to ensure cross-site scripting is prevented. Attackers may send dangerous scripts that could cause data leaks, hacks, stealing user information, or making requests on behalf of the user logged in. This is prevented by sanitizing any area in the app that allows for input from the user. This is set up to remove malicious event handlers, scripts, or HTML elements that may have external links or content. HTML sanitization allows me to configure which html elements, links, or images as ***safe or unsafe***, if input is unsafe, it will be removed. 

## Table of contents

## Installation

## Screenshots

## Contribution




## License 


