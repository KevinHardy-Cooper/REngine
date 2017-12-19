/*
  December 18, 2017
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the phone plans
*/

// Importing module
import React from 'react';

// Importing class component
import RecommendedPlans from './RecommendedPlans.jsx';

// This component grabs the phone plans from the backend
export default class Plans extends React.Component {

  // The constructor is called before a component is mounted
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
    };
  }

  // componentDidMount() is invoked immediately after a component is mounted.
  componentDidMount() {

    // GET all plans from mySQL database
    fetch('http://localhost:3000/plans')
    .then(results => {
      return results.json();
    })
    .then(data => {
      this.setState({plans: data});   
    })
  }
    
  render() {

    // Stitching data for passing via props
    var usages = {
      "longDistanceUsage":this.props.longDistanceUsage, 
      "textMsgSentUsage":this.props.textMsgSentUsage, 
      "textMsgReceivedUsage":this.props.textMsgReceivedUsage, 
      "dataUsage":this.props.dataUsage, 
      "localAirtimeUsage":this.props.localAirtimeUsage
    };

    return (
       <div>
          {/* The nested component RecommmendedPlans is to be rendered here, and is passed multiple properties for manipulation */}
          <RecommendedPlans 
            plans={this.state.plans} 
            usages={usages} 
            totalDue={this.props.totalDue}
          />
       </div>
    );
   }
}