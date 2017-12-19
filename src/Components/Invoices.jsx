/*
  December 18, 2017
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the invoices for the user
*/

// Importing module
import React from 'react';

// Importing component, Plans will be a child component
import Plans from './Plans.jsx';

// This component contains data reflecting invoices from a phone company
export default class Invoices extends React.Component {

  // The constructor is called before a component is mounted
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
    };

    // Initializing variables that we will be using in the render method
    this.totalDue = 0;
    this.longDistanceUsage = 0;
    this.textMsgSentUsage = 0; 
    this.textMsgReceivedUsage = 0; 
    this.dataUsage = 0; 
    this.localAirtimeUsage = 0;
  }

  /*
    componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  */
  componentDidMount() {

    // GET all invoices, returning the results in JSON format, then setting the state property invoices to these results
    fetch('http://localhost:3000/invoices')
    .then(results => {
      return results.json();
    })
    .then(data => {
      this.setState({invoices: data});   
    })
  }

  render() {

    // We only want to render to the DOM if invoices are returned 
    if (this.state.invoices.length != 0) {

      // Creating a local variable to be used for invoices
      var invoices = this.state.invoices;

      // Initializing summations that will be averaged out and used as the user's "habit" data
      var totalDueSummation = 0;
      var longDistanceUsageSummation = 0;
      var textMsgSentUsageSummation = 0;
      var textMsgReceivedUsageSummation = 0;
      var dataUsageSummation = 0;
      var localAirtimeUsageSummation = 0;

      // To be used for calculating the averages
      var len = invoices.length;


      // For each invoice in the invoices, we want to get summations of usage fields and total amounts due
      for (var invoice in invoices) {
        totalDueSummation += parseFloat(invoices[invoice].totalDue);
        longDistanceUsageSummation += parseInt(invoices[invoice].longDistanceUsage);
        textMsgSentUsageSummation += parseInt(invoices[invoice].textMsgSentUsage);
        textMsgReceivedUsageSummation += parseInt(invoices[invoice].textMsgReceivedUsage);
        dataUsageSummation += parseInt(invoices[invoice].dataUsage);
        localAirtimeUsageSummation += parseInt(invoices[invoice].localAirtimeUsage);
      }

      // Calculating the averages of each summation... These are our user's habits
      this.totalDue = totalDueSummation / len;
      this.longDistanceUsage = Math.round(longDistanceUsageSummation / len);
      this.textMsgSentUsage = Math.round(textMsgSentUsageSummation / len);
      this.textMsgReceivedUsage = Math.round(textMsgReceivedUsageSummation / len);
      this.dataUsage = dataUsageSummation / len;
      this.localAirtimeUsage = Math.round(localAirtimeUsageSummation / len);
    
    
      return (
        <div>
          {/* The nested component Plans is to be rendered here, and is passed multiple properties for manipulation */}
          <Plans 
            totalDue={this.totalDue} 
            longDistanceUsage={this.longDistanceUsage} 
            textMsgSentUsage = {this.textMsgSentUsage} 
            textMsgReceivedUsage = {this.textMsgReceivedUsage} 
            dataUsage = {this.dataUsage} 
            localAirtimeUsage = {this.localAirtimeUsage}
          />
        </div>
      );
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}