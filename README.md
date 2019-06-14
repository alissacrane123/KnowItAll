# Welcome to KnowItAll
KnowItAll is a simple, fun challenge app for friends to fact check each other's statements and keep score. Enter a friend's idiotic statement and add each of your answers, KnowItAll will serve up google results through SERP API & Google Custom Search. Select a winner, and KnowItAll will keep the score. View each of your friends rank, your personal stats, and past challenges.

[Live Demo](https://knowitall-app.herokuapp.com)

## Features
* Add Friends, View Feed of Questions + Answers
* Record Question Challenge data between two users
* Custom Avatar rendering based on Question Statistics
* Question Statistics profile page
* Create/read/delete functionality for Google Custom Search Query

## Technologies
KnowItAll is a team-built web-application utilizing the MERN stack (MongoDB, Express, React, Node.js). 

Other technologies used: 
* Google API
* SERP
* Recharts visualization library
* Axios

## Visuals
![](https://media.giphy.com/media/SUuSit3ghrrLZ2YSZj/giphy.gif)
![](https://media.giphy.com/media/Kd03sqhAC2eSWFR1n7/giphy.gif)
![](https://media.giphy.com/media/iEw5r61Y1vvcpGcMtm/giphy.gif)

## Technical Info

### Pulling Stats for Avatar Rendering
Avatar stat data is both pulled and transformed on the backend in a single query. Data is first filtered to a single relevant user (to filter by an id we create an ObjectId instance). Then the data is grouped and sum columns are calculated. After those sums are calculated we calculate an average percentage based on the data. 

````javascript

router.get("/stats/user/:id", (req, res) => {
  let myId = ObjectId.createFromHexString(req.params.id)
  Answer.aggregate([
    { $match: { author: myId } },
    { $group: {
        _id: "$author",
        Total: { $sum: 1 },
        Correct: { $sum: { $cond: [{ $eq: ["$winner", true] }, 1, 0] } },
       }
    },
    { $project: {
        Total: 1, Correct: 1, AvgPercent: { $toInt: { $multiply: [{ $divide: ["$Correct", "$Total"] }, 100] } }
      }
    }
  ])
    .then(answers => res.json(answers))
    .catch(err => res.status(404).json({ noAnswersFound: 'No answers found' }));
});
````

## Future Features
* Transition to React Native mobile application
* Question Commenting
* Question Feed Filtering
* Suggest User in Friend Search
* Wagers
