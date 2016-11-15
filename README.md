# yelpcamp
This is a full stack application built on Node.js, Express and MongoDB. Responsive nature and styling is done with Bootstrap. This site allows for user generating content with comments. A security is in place to prevent changing of content.


## Install Procedures

1. Download/Clone the repository.
2. NPM Install.
3. Setup the following environment variables
       YCAPPDATABASEURL
       YCSESSIONDATABASEURL
       YCSECRETPHRASE
       YCAPPEMAILADDRESS
       YCMAILACCESSKEYID
       YCMAILSECRETACCESSKEY
       YCMAILRATELIMIT
       YCAWSREGION

**Requirements** Node.js, MongoDB and Amazon SES. 

## Background

This site and code were developed as part of the [Udemy: The Web Developer Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/) course. 

**Author:** Tony Lanera

**Date:** Nov 15th, 2016

**Description**

This site is inspired by the yelp site, which allows users to post and submit reviews/comments. An account is required to submit a post and make comments. An indivual can only edit their own posting or comments. A person is also able to reset their password. Comments and Posting are stored in a MongoDB.

**Purpose:**

The purpose of the project was to develop a full stack website which captured user generated content. The project provide experience in developing RESTful Routing, implementing and enforcing a security model, utilizing a NoSQL database, and implementing a responsive design.

**Highlight:**   

This project was primarly a code along exercise during the course. However, I added the following features to the site.
   * Session Cookies stored in MongoDB
   * Require email token verification for Password Reset
   * Various Styling and Layout changes 
