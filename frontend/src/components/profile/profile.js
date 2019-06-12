import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, LineChart, Line, Label
} from 'recharts';

let dateFormat = require('dateformat');

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUserQuestions(this.props.currentUser.id);
    this.props.fetchUserAnswers(this.props.currentUser.id)
  }

  render() {
    let rightAnswers;
    let wrongAnswers;
    let totalAnswers;
    let barData;
    let dates;
    let lineData;
    let ttlRight;
    let yourQuestions;
    let winnerQuestions;
    let color;
    let text;

    if (!this.props.answers.all[0] || !this.props.questions.user[0]) {
      // return null;
      return (
        <div className="profile-header">
          <div className="prof-header">Welcome, {this.props.currentUser.username}!</div>
        </div>
      )
    } else {
      winnerQuestions = this.props.answers.all.map(answer => ( {[answer.question]: [answer.winner] } ));
      winnerQuestions = winnerQuestions.reduce(function (result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

      
      yourQuestions = this.props.questions.user.slice(0,18).map(question => {
        {color = (`${winnerQuestions[question._id]}` === 'true') ? '#FFE050' : '#FE518A' }

        return (
        <div key={question.id} style={{cursor: 'default'}} className="question-item-container" id={`${winnerQuestions[question._id]}`}>
          <div className="question-body">
            {question.body}
          </div>

          <p style={{ color: color}}>{(`${winnerQuestions[question._id]}` === 'true') ? 'Won' : 'Lost' }</p>
        </div>)}
    );
    }

    if (!this.props.answers.all[0]) {
      rightAnswers = 0;
    } else {
      totalAnswers = this.props.answers.all.length;
      rightAnswers = this.props.answers.all.reduce(function(total,x){return x['winner']===true ? total+1 : total}, 0)
      wrongAnswers = totalAnswers - rightAnswers;
      dates = [...new Set(this.props.answers.all.map(item => dateFormat(item.date, "fullDate")))];
      barData = dates.reverse().map(date => { return {
         name: date,
        right: this.props.answers.all.reduce(function (total, x) { return x['winner'] === true && dateFormat(x['date'], "fullDate")===date ? total+1 : total}, 0),
        wrong: this.props.answers.all.reduce(function (total, x) { return x['winner'] === false && dateFormat(x['date'], "fullDate")===date ? total+1 : total}, 0),
        amt: this.props.answers.all.reduce(function (total, x) { return dateFormat(x['date'], "fullDate")===date ? total+1 : total}, 0),
      }});
      lineData = dates.map(date => {
        ttlRight = this.props.answers.all.reduce(function (total, x) { return x['winner'] === true && dateFormat(x['date'], "fullDate") <= date ? total + 1 : total }, 0);
        let ttlAmt = this.props.answers.all.reduce(function (total, x) { return dateFormat(x['date'], "fullDate") <= date ? total + 1 : total }, 0);
        return {
          name: date,
          Score: parseInt((ttlRight / ttlAmt) * 100),
          amt: ttlAmt
        }
      });
    }

    const pieData = [
      { name: 'Right', value: rightAnswers }, { name: 'Wrong', value: wrongAnswers }
    ];

    return (
      <div className="body-container">
        <div className="profile-header">
          <div className="prof-header">Welcome, {this.props.currentUser.username}!</div>
        </div>
        <div className="profile-container">
          <div className="charts-container">
            <h3>Total Answers</h3>
            <div className="pie-chart-container"></div>
            <PieChart width={450} height={300} margin={{ top: 15, right: 40, left: 40, bottom: 0 }}>
              <Pie startAngle={180} endAngle={0} data={pieData} cx={200} cy={200} outerRadius={160} fill="#FFE050"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index
                }) => {
                  const RADIAN = Math.PI / 180;
                  // eslint-disable-next-line
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  // eslint-disable-next-line
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  // eslint-disable-next-line
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="rgb(150, 137, 137)"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {pieData[index].name} ({value})
                </text>
                  );
                }}
              />
            </PieChart>
            
            <h3>Daily Rank</h3>
            <LineChart width={600} height={400} data={lineData}
              margin={{ top: 15, right: 50, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis>
                <Label
                  value="# Answers"
                  fill="rgb(150, 137, 137)"
                  position="insideLeft"
                  angle={-90}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Score" stroke="rgb(150, 137, 137)" dot={
                ({
                  cx,
                  cy,
                  value
                }) => {
                  if (value > 75) {
                    return (
                      <svg x={cx - 10} y={cy - 10} width={100} height={100} viewBox="0 0 1024 1024" ><path d="m452 136v361c0 8.402344-6.597656 15-15 15s-15-6.597656-15-15v-361c0-8.402344 6.597656-15 15-15s15 6.597656 15 15zm0 0" fill="#68544f" /><path d="m452 136v361c0 8.402344-6.597656 15-15 15v-391c8.402344 0 15 6.597656 15 15zm0 0" fill="#53433f" /><path d="m482 196c0 8.402344-6.597656 15-15 15h-60c-8.402344 0-15-6.597656-15-15s6.597656-15 15-15h60c8.402344 0 15 6.597656 15 15zm0 0" fill="#68544f" /><path d="m482 196c0 8.402344-6.597656 15-15 15h-30v-30h30c8.402344 0 15 6.597656 15 15zm0 0" fill="#53433f" /><path d="m369.199219 345.097656-17.097657 64.203125c-13.203124 23.699219-34.300781 43.597657-58.601562 55.597657l-90.902344 45.601562c-2.097656.898438-4.199218 1.5-6.597656 1.5s-4.5-.601562-6.597656-1.5l-90.902344-45.601562c-24.300781-11.996094-45.398438-31.898438-58.597656-55.597657l-17.101563-64.199219c-.300781-13.199218 1.5-26.398437 5.097657-39l32.5-110.101562h271.203124l32.5 110.097656c3.597657 12.601563 5.398438 25.804688 5.097657 39zm0 0" fill="#efe2dd" /><path d="m369.199219 345.097656-17.097657 64.203125c-13.203124 23.699219-34.300781 43.597657-58.601562 55.597657l-90.902344 45.601562c-2.097656.898438-4.199218 1.5-6.597656 1.5v-316h135.601562l32.5 110.097656c3.597657 12.601563 5.398438 25.804688 5.097657 39zm0 0" fill="#cdbfba" /><path d="m331 196h-270.601562l1.203124-4.199219c.296876-1.5 1.199219-2.699219 1.796876-4.199219l46.800781-69.902343-70.898438-27.898438c-5.699219-2.101562-9.300781-7.800781-9.300781-13.800781s3.601562-12.699219 9.300781-14.800781l151-60c1.800781-.898438 3.597657-1.199219 5.699219-1.199219 4.800781 0 9.601562 2.402344 12.597656 6.597656l120 181c1.5 2.402344 2.402344 5.402344 2.402344 8.402344zm0 0" fill="#da90f8" /><path d="m331 196h-135v-196c4.800781 0 9.601562 2.402344 12.597656 6.597656l120 181c1.5 2.402344 2.402344 5.402344 2.402344 8.402344zm0 0" fill="#b760ea" /><path d="m331 196v43.199219c0 33.300781-13.199219 64.5-37.199219 87.601562l-21.300781 29.699219h-153l-21.300781-29.699219c-24-23.101562-37.199219-54.300781-37.199219-87.601562v-43.199219zm0 0" fill="#ffcebf" /><path d="m331 196v43.199219c0 33.300781-13.199219 64.5-37.199219 87.601562l-21.300781 29.699219h-76.5v-160.5zm0 0" fill="#ffb99c" /><path d="m437 0c-41.398438 0-75 34.601562-75 76s33.601562 75 75 75 75-33.601562 75-75-33.601562-76-75-76zm0 0" fill="#b7dc3c" /><path d="m166 333.5625c-8.289062 0-15-6.707031-15-15v-47.5625h-15c-8.289062 0-15-6.710938-15-15s6.710938-15 15-15h30c8.289062 0 15 6.710938 15 15v62.5625c0 8.292969-6.710938 15-15 15zm0 0" fill="#68544f" /><path d="m256 271h-30c-8.289062 0-15-6.710938-15-15s6.710938-15 15-15h30c8.289062 0 15 6.710938 15 15s-6.710938 15-15 15zm0 0" fill="#53433f" /><path d="m377 196c0 8.402344-6.597656 15-15 15h-332c-8.402344 0-15-6.597656-15-15s6.597656-15 15-15h332c8.402344 0 15 6.597656 15 15zm0 0" fill="#ffa4ff" /><path d="m362 211h-166v-30h166c8.402344 0 15 6.597656 15 15s-6.597656 15-15 15zm0 0" fill="#da90f8" /><path d="m392 346c0 41.398438-34.601562 75-76 75h-75c-18 0-33.898438-8.101562-45-20.699219-11.101562 12.597657-27 20.699219-45 20.699219h-75c-41.398438 0-76-33.601562-76-75 0-8.402344 6.597656-15 15-15h.300781c36.898438 0 73-10.5 114.398438-26.101562 6.902343-2.699219 14.101562-3.898438 21.300781-3.898438 18 0 33.898438 8.101562 45 20.699219 11.101562-12.597657 27-20.699219 45-20.699219 7.199219 0 14.398438 1.199219 21.300781 3.898438 41.398438 15.601562 77.5 26.101562 114.398438 26.101562h.300781c8.402344 0 15 6.597656 15 15zm0 0" fill="#fff5f5" /><path d="m392 346c0 41.398438-34.601562 75-76 75h-75c-18 0-33.898438-8.101562-45-20.699219v-78.601562c11.101562-12.597657 27-20.699219 45-20.699219 7.199219 0 14.398438 1.199219 21.300781 3.898438 41.398438 15.601562 77.5 26.101562 114.398438 26.101562h.300781c8.402344 0 15 6.597656 15 15zm0 0" fill="#efe2dd" /><path d="m512 76c0 41.398438-33.601562 75-75 75v-151c41.398438 0 75 34.601562 75 76zm0 0" fill="#a6d22e" /></svg>
                    )
                  } else if (value > 50) {
                    // Icon made by https://commons.wikimedia.org/wiki/File:Emoji_u1f98e.svg
                    return (<svg x={cx - 10} y={cy - 10} width={480} height={480} fill="green" viewBox="0 0 1024 1024">
                              <path d="M49.5,100.62c-1.41,0.83-6.26,5.39-7.17,6.83c-0.96,1.51-1.07,3.37-1.03,5.11 c0.14,5.47-0.74,13.02-6.13,12.1c-4.11-0.7-1.8-8.63-1.2-11.32c0.87-3.94-2-2.49-2.76-2.09c-2.54,1.32-9.15,7.34-11.54,0.84 c-2.2-6,6.13-6.61,8.41-7.14c2.4-0.56,2.32-2.61,0.89-3.6c-2.73-1.88-8.97-4.52-6.35-9.44c2.25-4.22,8.64,0.02,10.27,2.69 c0.83,1.36,1.44,3.39,2.75,4.35c1.3,0.95,2.88,0.22,4.16-0.43c0.95-0.48,1.85-1.05,2.76-1.6c1.73-1.47,2.83-3.55,2.83-6.92 c0-3.04-3.53-6.83-5-9.25c-2.5-4.12-1.87-7.53-2.89-9.06c-0.89-1.34-2.8-1.29-4.77-1.86c-2.51-0.56-3.9-0.4-6,1.3 c-1.55,1.26-3.07,3-4.07,4.76c-1.08,1.92-1.4,4.18-2.54,6.09c-1.54,2.56-4.48,4.56-7.42,3.19c-2.7-1.26-3.05-4.28-1.38-6.58 c1.47-2.03,3.71-2.94,4.91-5.26c1.01-1.95-0.58-2.77-2.8-2.19c-2.4,0.62-10.17,3.04-10.17-3.04c0-5.99,7.07-4.52,10.11-4 c2.28,0.39,2.36-1.5,1.61-2.47c-1.86-2.4-7.56-8.5-4.13-10.81c6.54-4.4,9.66,6,10.13,8.72c0.62,3.57,5.94,4.04,9.15,2.28 c3.15-1.94,4.41-5.42,3.17-9.07C32,49,27.96,44.93,24.43,44.14C14.11,41.85,12.89,31.62,13.2,22.08c0.17-5.09,2.65-15.88,4.97-17.44 c4.31-2.91,12.77-0.63,18.39,1.44c7.68,2.82,14.25,7.42,15.35,18.07c0.44,4.26-2.46,9.13-1.35,13.32c1.02,3.82,4.11,9.55,8.79,5.21 c1.31-1.67,4.76-5.88,5.2-8.05c0.4-1.99-0.09-5.39-0.88-7.17c-1.48-3.34-1.76-10.15,1.91-10.54c6.16-0.66,3.7,9.8,3.98,11.32 c0.21,1.1,1.81,2.5,3.51,1.29c2.85-2.02,5.31-8.44,8.84-4.93c4.7,4.66-3.03,8.53-4.56,9.58c-2.17,1.49-1.61,3.62,0.13,3.79 c2.26,0.21,10.28-0.53,8.58,5.73c-1.49,5.48-7.09,1.72-10.15,0.07c-3.53-1.91-5.29-2.53-8.79,0.51c-0.73,0.63-2.41,3.78-3.14,4.86 c-1.03,2.01-1.01,4.11,1.13,5.05c1.86,0.82,3.96,2.29,5.5,3.76c2.91,2.77,4.27,6.06,5.12,8.14c1.12,2.75,2.82,3.73,5.36,3.64 c1.97-0.15,4.86-1.55,6.48-2.85c1.87-1.51,2.79-3.72,3.27-6.01c0.63-2.99,0.76-4.15,1.16-7.18c0.24-1.81,0.17-6.85,4.22-6.35 c5.29,0.64,2.15,9.33,1.67,11.09c-0.32,1.15,0.56,2.05,2.38,1.72c1.79-0.32,8.1-5.99,10.16-0.04c1.79,5.2-5.83,5.81-8.64,6.86 c-1.52,0.57-2.15,2.29,0.55,3.36c2.63,1.04,10.06,5.03,5.72,9.28c-4.53,4.43-10.07-4.02-12.55-6.49 c-3.02-3.01-11.95,4.19-13.14,7.39c-1.03,4.6,1.15,8.65,3.38,12.88c3.13,5.93,5.29,10.36,10.72,13.48 c5.26,3.03,8.98,4.29,14.57,2.63c4.97-1.48,7.01-6.12,6.35-10.66c-0.43-2.96-3.37-6.58-8.53-4.93c-2.66,0.85-5.23,2.58-6.27,1.4 c-1.67-1.89,4.13-6.08,8.5-6.97c6.38-1.3,12.86,2.54,13.57,9.43c0.95,9.21-4.89,18.39-12.71,20.86c-11.17,3.53-21.2,1.04-30.06-2.36 c-5.57-2.14-14.47-6.48-19.18-9.71C60.07,104.71,53.39,98.65,49.5,100.62z"/>
                            </svg>);                      
                  } else if (value > 25) {
                    return (<svg x={cx - 10} y={cy - 10} width={110} height={110} fill="brown" viewBox="0 0 1024 1024">
                              <path d="m270.417969 159.042969c-7.460938-12.457031-15.617188-23.265625-23.171875-31.605469-54.28125-59.972656-38.796875-110.566406-97.21875-124.152344-113.847656-26.480468-165.246094 142.566406-146.117188 224.324219 19.132813 81.757813 74.433594 178.324219 185.832032 160.980469 15.636718-2.4375 55.878906-23.625 68.269531-45.308594l21.535156-52.382812c17.664063-42.960938 14.742187-92-9.128906-131.855469zm0 0" fill="#f0c382" /><path d="m99.007812 134.578125c-2.113281 0-4.226562-.808594-5.839843-2.421875l-8.257813-8.257812c-3.226562-3.226563-3.226562-8.453126 0-11.679688 3.226563-3.230469 8.453125-3.230469 11.679688 0l8.257812 8.257812c3.226563 3.226563 3.226563 8.453126 0 11.679688-1.613281 1.613281-3.726562 2.421875-5.839844 2.421875zm0 0" fill="#e3aa75" /><path d="m107.269531 76.757812h-.082031c-4.566406 0-8.261719-3.699218-8.261719-8.261718 0-4.558594 3.695313-8.257813 8.261719-8.257813s8.300781 3.699219 8.300781 8.257813c0 4.5625-3.652343 8.261718-8.21875 8.261718zm0 0" fill="#f7d291" /><path d="m132.046875 175.875h-.078125c-4.566406 0-8.261719-3.695312-8.261719-8.257812s3.695313-8.261719 8.261719-8.261719c4.5625 0 8.296875 3.699219 8.296875 8.261719s-3.652344 8.257812-8.21875 8.257812zm0 0" fill="#f7d291" /><path d="m57.789062 159.355469h-.078124c-4.566407 0-8.261719-3.699219-8.261719-8.257813 0-4.5625 3.695312-8.261718 8.261719-8.261718 4.5625 0 8.296874 3.699218 8.296874 8.261718.003907 4.558594-3.652343 8.257813-8.21875 8.257813zm0 0" fill="#e3aa75" /><path d="m49.839844 219.363281c-20.496094-41.726562-25.882813-114.371093-6.824219-170.882812-36.878906 50.875-50.488281 130.46875-39.105469 179.128906 19.132813 81.757813 74.433594 178.324219 185.832032 160.980469 15.636718-2.4375 55.878906-23.625 68.269531-45.308594l2.65625-6.460938c-101.3125 36.128907-174.578125-43.644531-210.828125-117.457031zm0 0" fill="#e3aa75" /><path d="m363.324219 186.199219c-17.160157 3.945312-32.851563 9.519531-46.988281 16.742187-18.828126 9.625-35.0625 23.644532-48.613282 39.882813-8.941406 10.714843-16.851562 22.34375-22.539062 35.089843-6.253906 14.011719-10.953125 29.550782-14.019532 46.636719-14.453124 80.53125 50.476563 140.417969 128.027344 140.417969 77.550782 0 152.808594-62.867188 152.808594-140.417969s-45.429688-162.097656-148.675781-138.351562zm0 0" fill="#f0c382" /><path d="m397.183594 198.644531c31.132812 0 55.898437 12.933594 73.609375 38.4375 15.6875 22.59375 24.6875 54.476563 24.6875 87.46875 0 64.84375-64.960938 123.898438-136.289063 123.898438-36.132812 0-70.28125-15.035157-91.34375-40.214844-13.117187-15.679687-27.304687-42.417969-20.421875-80.765625 2.796875-15.589844 7.121094-29.996094 12.84375-42.820312 4.589844-10.289063 11.175781-20.507813 20.136719-31.242188 13.082031-15.675781 27.703125-27.707031 43.449219-35.753906 12.804687-6.542969 27.328125-11.710938 43.171875-15.355469 10.535156-2.421875 20.683594-3.652344 30.15625-3.652344" fill="#fff6d8" /><path d="m371.582031 430.898438c-36.132812 0-70.28125-15.035157-91.34375-40.214844-13.117187-15.679688-27.304687-42.417969-20.421875-80.765625 2.796875-15.589844 7.117188-29.996094 12.84375-42.820313 1.75-3.929687 4-8.0625 6.355469-12.003906-8.160156 10.039062-14.429687 19.878906-18.746094 29.554688-5.722656 12.824218-10.046875 27.234374-12.84375 42.820312-6.882812 38.347656 7.308594 65.089844 20.421875 80.769531 21.0625 25.179688 55.210938 40.210938 91.34375 40.210938 50.253906 0 97.273438-29.1875 120.714844-69.183594-25.582031 30.714844-65.78125 51.632813-108.324219 51.632813zm0 0" />
                            </svg>);
                  } else {
                    // Icon made by https://www.freepik.com from www.flaticon.com
                    return (<svg x={cx - 10} y={cy - 10} width={90} height={90} viewBox="0 0 1024 1024" >
                              <path d="m464.867188 415.601562h-417.734376c-26.378906 0-47.132812-21.480468-47.132812-47.132812 0-21.1875 8.246094-41.089844 23.214844-56.0625 11.363281-11.371094 25.585937-18.859375 41.050781-21.800781v-18.539063c0-38.582031 27.707031-70.8125 64.269531-77.84375v-18.558594c0-38.875 28.125-71.300781 65.097656-77.996093 6.691407-54.847657 53.40625-97.667969 110.535157-97.667969 8.285156 0 15.015625 6.714844 15.015625 15v82.820312c36.570312 7.03125 64.285156 39.273438 64.285156 77.863282v18.539062c36.558594 7.03125 64.265625 39.261719 64.265625 77.84375v18.539063c15.46875 2.941406 29.691406 10.433593 41.054687 21.804687 14.964844 14.96875 23.210938 34.871094 23.210938 56.039063 0 25.554687-20.640625 47.152343-47.132812 47.152343zm0 0" fill="#c25c3d" /><path d="m447.734375 290.605469v-18.539063c0-38.578125-27.707031-70.8125-64.269531-77.84375v-18.539062c0-38.589844-27.710938-70.832032-64.28125-77.859375v-82.824219c0-8.285156-6.730469-15-15.015625-15-17.285157 0-33.613281 3.925781-48.167969 10.910156v404.691406h208.863281c26.492188 0 47.136719-21.59375 47.136719-47.152343 0-21.167969-8.246094-41.070313-23.214844-56.039063-11.359375-11.371094-25.582031-18.859375-41.050781-21.804687zm0 0" fill="#aa4730" /><path d="m287.050781 97.820312h32.132813v-30h-32.132813c-8.285156 0-15 6.71875-15 15 0 8.285157 6.714844 15 15 15zm0 0" fill="#784132" /><path d="m304.199219 179.222656c0-8.28125-6.714844-15-15-15h-159.832031c-.542969 3.738282-.835938 7.558594-.835938 11.441406v18.558594h160.667969c8.285156 0 15-6.714844 15-15zm0 0" fill="#aa4730" /><path d="m256 194.222656h33.199219c8.285156 0 15-6.714844 15-15 0-8.28125-6.714844-15-15-15h-33.199219zm0 0" fill="#784132" /><path d="m446.894531 260.605469h-288.363281c-8.28125 0-15 6.71875-15 15 0 8.285156 6.71875 15 15 15h289.203125v-18.539063c0-3.890625-.296875-7.714844-.839844-11.460937zm0 0" fill="#aa4730" /><path d="m256 260.605469v30h191.734375v-18.539063c0-3.890625-.296875-7.714844-.839844-11.460937zm0 0" fill="#784132" />
                            </svg>);
                  }
                }
                } 
              />
            </LineChart>
            <div className="pie-margin"></div>
            <h3>Daily Answers Breakdown</h3>
            <BarChart
              width={600}
              height={400}
              data={barData}
              margin={{
                top: 15, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis>
                <Label
                  value="# Answers"
                  fill="rgb(150, 137, 137)"
                  position="insideLeft"
                  angle={-90}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="wrong" stackId="a" fill="#FE518A" />
              <Bar dataKey="right" stackId="a" fill="#FFE050" />
            </BarChart>
          </div>
          <div className="index-questions-container2" id="profile-questions-container">
            <div className="index-header-container" >
              <div className="index-header">
                Questions Asked Listed Below:
              </div>
            </div>

            <div className="questions-container">
              {yourQuestions}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);


