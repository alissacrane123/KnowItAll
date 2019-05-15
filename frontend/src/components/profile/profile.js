import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  PieChart, Pie, Sector, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
let dateFormat = require('dateformat');

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserAnswers(this.props.currentUser.id);
  }

  render() {
    let rightAnswers;
    let wrongAnswers;
    let totalAnswers;
    let barData;
    let dates;

    if (!this.props.answers.all[0]) {
      rightAnswers = 0;
    } else {
      totalAnswers = this.props.answers.all.length;
      rightAnswers = this.props.answers.all.reduce(function(total,x){return x['winner']==true ? total+1 : total}, 0)
      wrongAnswers = totalAnswers - rightAnswers;
      dates = [...new Set(this.props.answers.all.map(item => dateFormat(item.date)))];
      barData = dates.map(date => { return {
         name: date,
         right: this.props.answers.all.reduce(function(total,x){return x['winner']==true && x['date']==date ? total+1 : total}, 0),
         wrong: this.props.answers.all.reduce(function(total,x){return x['winner']==false && x['date']==date ? total+1 : total}, 0),
         amt: this.props.answers.all.reduce(function(total,x){return x['date']==date ? total+1 : total}, 0),
      }})
    }

    const pieData = [
      { name: 'Right', value: {rightAnswers} }, { name: 'Wrong', value: {wrongAnswers} }
    ];

    return (
      <div className="profile-container">
        <div>LOGO</div>
        <div>TotalAnswers: {totalAnswers}</div>
        <div>RightAnswers: {rightAnswers}</div>
        <div>WrongAnswers: {wrongAnswers}</div>
        <div>Dates: {dates}</div>

        <PieChart width={800} height={400}>
          <Pie startAngle={180} endAngle={0} data={pieData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
        </PieChart>
        {/* <BarChart
          width={500}
          height={300}
          data={barData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="right" stackId="a" fill="#8884d8" />
          <Bar dataKey="wrong" stackId="a" fill="#82ca9d" />
        </BarChart> */}
      </div>
    );
  }
}

export default withRouter(Profile);