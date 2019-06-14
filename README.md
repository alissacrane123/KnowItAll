# Welcome to KnowItAll
KnowItAll is a simple, fun challenge app for friends to fact check each other's statements and keep score. Enter a friend's idiotic statement and add each of your answers, KnowItAll will serve up google results through Serp Api (which in turn uses Google Custom Search). Select a winner, and KnowItAll will keep the score. View each of your friends rank, your personal stats, and past challenges.

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
* Serp API (uses Google Custom Search)
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

### Serp API
User search entires are first processed to ensure options returned from the API call only relate to the intended question. The data returned from the axios call is then filtered to relevant information that will be rendered on the frontend.

````javaScript

router.get("/:searchQuery", (req, res) => {
  const processedQuery = req.params.searchQuery.split(" ").join("+");
  const queryToUse = processedQuery;

    axios({
      method: "get",
      url: `https://serpapi.com/search.json?q=${
        queryToUse}&location=United+States&hl=en&gl=us&google_domain=google.com&api_key={secretKey}`
    })
      .then(result => {
       res.send(JSON.stringify(result.data.organic_results));
      })
      .catch(err => {
       res.status(400).json(err);
      });
});
````

### Persisting Friend Data through localStorage
Challenges must be attributed to two users. The currentUser can be identified through jwtToken in localStorage, when a challenge is initiated friend data is also set in localStorage. This ensures the data persists until a new friend is challenged, even if the browser is refreshed or closed.

````javaScript

handleStorage(friendAvatar, friend, friendId, userAvatar) {
  localStorage.setItem("friendAvatar", friendAvatar);
  localStorage.setItem("friend", friend);
  localStorage.setItem("userAvatar", userAvatar);
 }

render() {
  return (
    <div className="hover-bigger">
      <div className="container-list-item-md">
        <Link className="container-col-1" to={{ pathname: '/new'}} onClick={() => this.handleStorage(friendAvatar, friend, friendId,  userAvatar)}>
          <ul className="container-list-row-center">
            <li><img src={friendAvatar} height="70"></img></li>
            <li>{friend}</li>
            <li>{score || "0"}%<p className="centered-text">correct</p></li>
          </ul>
        </Link>
      </div>
    </div>
  )
}
````

## Future Features
* Transition to React Native mobile application
* Question Commenting
* Question Feed Filtering
* Suggest User in Friend Search
* Wagers
