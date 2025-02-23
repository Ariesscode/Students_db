# Mongo-DB-Project 

## Features


### Badges

## Description 
 This Mongo-DB-Project is focused on creating a secure student administration system. **CRSF (Cross-Site Request Forgery)**, a security measure to prevent attackers (hackers) impersonating a logged-in user. Third-party site, domains, malicious users  have a way of tricking the user's browser into making unwanted requests. 
 One of the middlewares used, **cookie-parser**, which manages the crsf protection, the token is stored in a hidden element or a cookie in the user's browser, once the logged in user visits the site. This unique token is sent with each requests a user performs to make sure the user's token and the server token match. If the token does not match, the requests won't be made. This solves the problem for third-party attempts of using another logged in user's session cookies to make unauthorized requests.
<br>

**IP Whitelisting and Server-side Authent**
This will be added soon, so that only the predefined networks, domains, users can have access to the app. Any networks or users that are not whitelisted, will not have access to the the site or server and this will prevent unauthorized external access and interations via requests. 
<br>

**HTML Sanitization**
This security package is added to ensure cross-site scripting is prevented. Attackers may send dangerous scripts that could cause data leaks, hacks, stealing user information, or making requests on behalf of the user logged in. This is prevented by sanitizing any area in the app that allows for input from the user. This is set up to remove malicious event handlers, scripts, or HTML elements that may have external links or content. HTML sanitization allows me to configure which html elements, links, or images as ***safe or unsafe***, if input is unsafe, it will be removed. 

## Table of contents

## Installation

## Screenshots

## Contribution




## License 


