# KnowItAll
**MERN stack project**
[Live Demo](https://knowitall-app.herokuapp.com)
**KnowItAll** is an application that allows you to challenge your friends to see who’s right. 
Users can see how they rank against friends, track challenges, and see fact challenges in their area.

## Background and Overview
When you are hanging out with a friend and they say something totally off, you kindly correct them. However, they’re pretty sure their right and your wrong. What do you do? Settle it by googling of course. Well, what if you could track all these little challenges. KnowItAll will do it for you! Type in your question and get served the most relevant google and wiki results. Declare an official round winner, and you’ll be able to look back on all your proudest and most idiotic moments!

This will need:
* Make and app that collects data
* Database to store user and search query data
* Integrate Google and Wikipedia APIs
* Construct an app that presents the accumulation resulting matches in a interesting and interactive manor
* Decide how to best facilitate connecting users during challenges, and complexity of handling match winner logic

## Functionality and MVP
* Application with landing page modal for user signup/login
* User Auth
* Page for quickly connecting(challenging) friends, additionally leverage page to reflect leaderboard stats
* Once challenge form has been submitted, serve google and wikipedia search results. Ensure a winner is selected at the end of each challenge. Visual of winner.
* Stats page of prior challenges
* Feed of challenges in your area with comment functionality. Filter to your challenges, your friends challenges, recent challenges, local challenges.
* Production README
#### Bonus Features
* Suggest winnder based on search results of challenge
* Allow challenge functionality without sign-in
* Filtering on stats page

## Technologies and Technical Challenges
KnowItAll’s core application is a streamlined search API of google and wiki results, with a backend built on MongoDB to save user search queries and resulting scores between users. The database will be populated by user input. 

**Web application**

**Google/Wikipedia API**

**Backend: MongoDB/Express**

**Frontend: React/Node.js and D3 visualization library**

### Web Application
The web application will need to facilitate user login and auth. The application will need multiple routes to facilitate the collection and presentation of data both from the database and connected APIs.

#### Technical Challenges:
Ensuring search queries are compatible with two APIs (Google Custom Search API & Wikipedia API). Ensuring returned results of each API are integrated into one response to the user. Testing for acceptable speed of processing and formatting API results, so as not to noticeably interrupt user experience.

### Backend: MongoDB/Express
The user input data will be stored in a relational database. The search results of the API will not be stored, this choice was made to ensure speed of the app and ensure the most up to date search results are served.

#### Technical Challenges:
Connecting the Google API and Wikipedia API to the MongoDB Database (search query)

### Frontend: React/Node.js
The app will have several visualizations, via the stats page and small visual icons on the user profile page. We will use Recharts a charting library built on react components. The visualizations utilized will be a straight angle pie chart, area chart, and a dot line chart. This app will also utilize an animation library, posed to create a animated that plays after each challenge.

#### Technical Challenges:
* Creating visualizations using Recharts
* Fetching data
* Creating animations using posed

#### Things accomplished over the weekend
Things Accomplished Over the Weekend
We worked through the MERN curriculum online and created a User Auth system following the new guidelines. We also generated the frontend skeleton for the app and will begin to add functionality tomorrow.

### Group Members and Work Breakdown

##### Day 1 - Saturday 5/13
* Build login/signup & index feed components - Alissa
* Build stats component & search component - Aubrie
* Build and test routes - Brett/Nate
* Research & test API connections - Brett/Nate

##### Day 2 - Sunday 5/14
* Link backend routes and Google API to frontend components
* Connect React to database
* Add methods to fetch data for components
* Add filters to components

##### Day 3 - Monday 5/15
* Demo login
* CSS polish
* Test & debug

## Resources

### State Shape
```
entities {
  user: { 1: { id: 1,  }
  },
  comments {

  },
  emojis: {

  },
  questions: {

  }, 
  answers: {

  },
  friends: {
  
  }
},
session: {

}, 
errors: {

}, 
ui: {

}
```
### Database Schema
#### Users
| column name     | data type | details                   |
|-----------------|-----------|---------------------------|
| id              | integer   | not null, primary key     |
| username        | string    | not null, indexed         |
| password_digest | string    | not null                  |
| session_token   | string    | not null, indexed, unique |
| location        | string    |                           |
| created_at      | datetime  | not null                  |
| updated_at      | datetime  | not null                  |
* `User` has_many `Comments`, foreign_key: `user_id`
* `User` has_many `Questions`, foreign_key: `user_id`
* `User` has_many `Answers`, foreign_key: `user_id`
* `User` has_many `Friends`, foreign_key: `user_id`

#### Comments
| column name  | data type | details               |
|--------------|-----------|-----------------------|
| id           | integer   | not null, primary key |
| user_id      | integer   | not null, indexed     |
| body         | text      | not null              |
| question_id  | integer   | not null              |
| created_at   | datetime  | not null              |
| update_at    | datetime  | not null              |
* `Comment` belongs_to `User`, foreign_key: `user_id`
* `Comment` belongs_to `Question`, foreign_key: `question_id`

#### Questions
| column name  | data type | details               |
|--------------|-----------|-----------------------|
| id           | integer   | not null, primary key |
| author_id    | integer   | not null, indexed     |
| body         | text      | not null, indexed     |
| created_at   | datetime  | not null              |
| updated_at   | datetime  | not null              |
* `Question` belongs_to `User`, foreign_key: `author_id`
* `Question` has_many `Comments`, foreign_key: `question_id`
* `Question` has_many `Answers`, foreign_key: `question_id`

#### Answers
| column name  | data type | details               |
|--------------|-----------|-----------------------|
| id           | integer   | not null, primary key |
| user_id      | integer   | not null, indexed     |
| question_id  | integer   | not null, indexed     |
| body         | text      | not null              |
| winner       | boolean   | not null              |
| created_at   | datetime  | not null              |
| updated_at   | datetime  | not null              |
* `Answer` belongs_to `User`, foreign_key: `user_id`
* `Answer` belongs_to `Question`, foreign_key: `question_id`

#### Friends
| column name  | data type | details               |
|--------------|-----------|-----------------------|
| id           | integer   | not null, primary key |
| user_id      | integer   | not null, indexed     |
| friend_id    | integer   | not null              |
| created_at   | datetime  | not null              |
| updated_at   | datetime  | not null              |
* `Friend` belongs_to `User`, foreign_key: `user_id`

#### Emojis
| column name  | data type | details               |
|--------------|-----------|-----------------------|
| id           | integer   | not null, primary key |
| author_id    | integer   | not null, indexed     |
| question_id  | integer   | not null, indexed     |
| emoji_id     | string    | not null              |
| created_at   | datetime  | not null              |
| updated_at   | datetime  | not null              |
* `Emoji` belongs_to `User`, foreign_key: `user_id`
* `Emoji` belongs_to `Question`, foreign_key: `user_id`
