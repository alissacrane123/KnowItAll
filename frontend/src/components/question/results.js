import React from 'react';

class Result extends React.Component {
  
  render() {
    let { result } = this.props;

    return (
      <div key={result.position} className="result-container">
        <ul className="result-data-container">
          <li className="result-title">
            {result.title}
          </li>
          <li className="result-date">
            {result.date}
          </li>
        </ul>
        <section className="result-body-container">
          <p className="result-item-body">{result.snippet}</p>
        </section>
      </div>
    )
  }
}

export default Result;