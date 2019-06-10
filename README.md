# KnowItAll


[Live Demo](https://knowitall-app.herokuapp.com)
**KnowItAll** is an application that allows you to challenge your friends to see who’s right. 
Users can see how they rank against friends, track challenges, and see fact challenges in their area.
Implemented using MongoDB Express.js React-Redux and Node.js
## Background and Overview
When you are hanging out with a friend and they say something totally off, you kindly correct them. However, they’re pretty sure they are right and you're wrong. What do you do? Settle it by googling of course. Well, what if you could track all these little challenges. KnowItAll will do it for you! Type in your question and get served the most relevant google results. Declare an official round winner, and you’ll be able to look back on all your proudest and most idiotic moments!

This will need:
* App that collects data
* Database to store user and search query data
* Integrate Google and API
* Construct an app that presents the accumulation resulting matches in a interesting and interactive manor
* Decide how to best facilitate connecting users during challenges, and complexity of handling match winner logic

## Technologies and Technical Challenges
KnowItAll’s core application is a streamlined search API of google results, with a backend built on MongoDB to save user search queries and resulting scores between users. The database will be populated by user input. 

**Web application**

**Google API**

**Backend: MongoDB/Express**

**Frontend: React/Node.js and Recharts visualization library**

### Web Application
The web application will need to facilitate user login and auth. The application will need multiple routes to facilitate the collection and presentation of data both from the database and connected API.

#### Technical Challenges:
Ensuring returned results of the Google Custom Search API are integrated into one response to the user. Ensure any input into the search will return relevant results, require at least one character. Testing for acceptable speed of processing and formatting API results, so as not to noticeably interrupt user experience.

### Backend: MongoDB/Express
The user input data will be stored in a relational database. The search results of the API will not be stored, this choice was made to ensure speed of the app and ensure the most up to date search results are served.

#### Technical Challenges:
Connecting the Google API to the MongoDB Database (search query)

### Frontend: React/Node.js
The app will have several visualizations, via the stats page and small visual icons on the user profile page. We will use Recharts a charting library built on react components. The visualizations utilized will be a straight angle pie chart, area chart, and a dot line chart.

#### Technical Challenges:
* Creating visualizations using Recharts
* Fetching data

#### Things accomplished over the weekend
Things Accomplished Over the Weekend
We worked through the MERN curriculum online and created a User Auth system following the new guidelines. We also generated the frontend skeleton for the app and will begin to add functionality tomorrow.
