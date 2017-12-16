// Importing module
import React from 'react';

// App component that will be the master parent component
class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Info/>
            <Form/>
         </div>
      );
   }
}

// This component will contain the title for the page
class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>REngine!</h1>
         </div>
      );
   }
}

// This component provides direction to the viewer
class Info extends React.Component {
   render() {
      return (
         <div>
            <h2>Randomly generated invoice data below..</h2>
         </div>
      );
   }
}

// This component contains randomly generated form data
class Form extends React.Component {
  constructor(props) {
    super(props);
    
    // Personal Info
    // This will change depending on user
    this.name = 'Mr. T';

    // Plan related
    // This will change depending on plan
    this.plan = 'Canada-Wide Talk + Text 25 Dbl';
    this.servProd = 'Koodo';
    
    // Billing cycle
    // This will change depending on the billing cycle
    var d = new Date();
    this.startDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.endDate = d.getFullYear() + "-" + (d.getMonth() + 2) + "-" + (d.getDate() - 1) ;

    // Allowances
    // This will change depending on the plan
    this.longDistanceAllowed = 0;
    this.textMsgSentAllowed = Number.POSITIVE_INFINITY;
    this.textMsgReceivedAllowed = Number.POSITIVE_INFINITY;
    this.dataAllowed = 0
    this.localAirtimeAllowed = 200;

    // Usages
    // This will change depending on the usage
    this.longDistanceUsage = Math.round(Math.random() * 50);
    this.textMsgSentUsage = Math.round(Math.random() * 3000);
    this.textMsgReceivedUsage = Math.round(Math.random() * 3000);
    this.dataUsage = Math.round(Math.random() * 10 * Math.pow(10, 2))/Math.pow(10,2);
    this.localAirtimeUsage = Math.round(Math.random() * 250);

    // Usage charges
    // This will change depending on the usage and the charges
    this.potentialLongDistanceOverage = this.longDistanceUsage - this.longDistanceAllowed;
    this.longDistanceOverageChargeRate = this.potentialLongDistanceOverage > 0 ? this.potentialLongDistanceOverage * 0.50 : 0;
    
    this.potentialTextMsgSentOverage = this.textMsgSentUsage - this.textMsgSentAllowed;
    this.textMsgSentOverageChargeRate = this.textMsgSentAllowed != Number.POSITIVE_INFINITY ? this.potentialTextMsgSentOverage * 0.25 : 0;

    this.potentialTextMsgReceivedOverage = this.textMsgReceivedUsage - this.textMsgReceivedAllowed;
    this.textMsgReceivedOverageChargeRate = this.textMsgReceivedAllowed != Number.POSITIVE_INFINITY ? this.potentialTextMsgReceivedOverage * 0.25 : 0;
    
    this.potentialDataOverage = this.dataUsage - this.dataAllowed;
    this.dataOverageChargeRate = this.potentialDataOverage > 0 ? this.potentialDataOverage * 2 : 0;

    this.potentialLocalAirtimeOverage = this.localAirtimeUsage - this.localAirtimeAllowed;
    this.localAirtimeOverageChargeRate = this.potentialLocalAirtimeOverage > 0 ? this.potentialLocalAirtimeOverage * 0.5 : 0;

    // Final charge
    // This will change depending the invoice
    this.flatRate = 25;
    this.totalDue = this.flatRate + this.longDistanceOverageChargeRate + this.textMsgSentOverageChargeRate + this.textMsgReceivedOverageChargeRate + this.dataOverageChargeRate + this.localAirtimeOverageChargeRate;

    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    console.log("Submitted ;)");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Name: {this.name}</p>
        <p>Plan: {this.plan}</p>
        <p>Service Provider: {this.servProd}</p>
        <p>Total Due: ${this.totalDue}</p>
        <p>Billing Cycle Start Date: {this.startDate}</p>
        <p>Billing Cycle End Date: {this.endDate}</p>
        <h3>Usage Charges:</h3>
        
        {/*Long distance*/}
        <p>Long Distance - Domestic Phone (of {this.longDistanceAllowed}:00): {this.longDistanceUsage}:00</p>
        {this.potentialLongDistanceOverage > 0 ? <p><strong>Overage Charge for Long Distance: ${this.longDistanceOverageChargeRate}</strong> ({this.potentialLongDistanceOverage} overage minutes of long distance @ $0.50 / overage minute)</p> : null}
        
        {/*Text message sent*/}
        <p>Text Msg Sent (of {this.textMsgSentAllowed}): {this.textMsgSentUsage}</p>
        {this.potentialTextMsgSentOverage > 0 ? <p><strong>Overage Charge for Text Msg Sent: ${this.textMsgSentOverageChargeRate}</strong> ({this.potentialTextMsgSentOverage} overage texts sent @ $0.25 / overage message)</p> : null}
        
        {/*Text message received*/}
        <p>Text Msg Received (of {this.textMsgReceivedAllowed}): {this.textMsgReceivedUsage}</p>
        {this.potentialTextMsgReceivedOverage > 0 ? <p><strong>Overage Charge for Text Received Sent: ${this.textMsgReceivedOverageChargeRate}</strong>({this.potentialTextMsgReceivedOverage} overage texts received @ $0.25 / overage message)</p> : null}
        
        {/*Data usage*/}
        <p>Data Usage (of {this.dataAllowed} MB): {this.dataUsage} MB</p>
        {this.potentialDataOverage > 0 ? <p><strong>Overage Charge for Data: ${this.dataOverageChargeRate}</strong> ({this.potentialDataOverage} MB of overage data used @ $2.00 / overage MB)</p> : null}
       
        {/*Local airtime*/}
        <p>Local Airtime (of {this.localAirtimeAllowed}:00): {this.localAirtimeUsage}:00 </p>
        {this.potentialLocalAirtimeOverage > 0 ? <p><strong>Overage Charge for Local Airtime: ${this.localAirtimeOverageChargeRate}</strong>({this.potentialLocalAirtimeOverage} overage minutes of local airtime @ $0.5 / overage minute)</p> : null}

        <input type="submit" value="Submit" />

        <Plans longDistanceUsage={this.longDistanceUsage} textMsgSentUsage = {this.textMsgSentUsage} textMsgReceivedUsage = {this.textMsgReceivedUsage} dataUsage = {this.dataUsage} localAirtimeUsage = {this.localAirtimeUsage}/>
      </form>
    );
  }
}

// This component grabs the phone plans from the backend
class Plans extends React.Component {
  constructor() {
    super();
    this.state = {
      plans: [],
    };
  }

  componentDidMount() {

    // GET all plans
    fetch('http://localhost:3000/plans')
    .then(results => {
        return results.json();
      }).then(data => {
        this.setState({plans: data});   
      })
  }
    
  render() {
      return (
         <div>
            <RecommendedPlans plans={this.state.plans} usages={this.props}/>
         </div>
      );
   }
}

class RecommendedPlans extends React.Component {
   render() {
      /* Now that we have the plans at this.props.plans, and we have the usages via this.props.usages, we can check each usage parameter against each usage, until we find an acceptable plan given the usage */ 

      if (this.props.plans.length == 0){
        return null;
      }
      console.log(this.props.plans);
      console.log(this.props.usages);

      // Creating local variables for props
      var plans = this.props.plans;
      var usages = this.props.usages;

      // These arrays will contain plans that fit the user's usages
      var validPlans = [];

      // Iterating through each plan in plans
      for (var plan in plans) {

        // We want to loop through keys in dictionary and check if any values are equal to "INFINITY"
        for (var key in plans[plan]) {

          // If so, we want to convert this string to a number representing positive infinity
          if (plans[plan][key] === "INFINITY") {
            plans[plan][key] = Number.POSITIVE_INFINITY;
          }
        }

        // These variables reflect the user's usage is less than the allowed usage of that attribute on the plan
        var validLongDistance = usages.longDistanceUsage < plans[plan].longDistanceAllowed;

        var validTextMsgSent = usages.textMsgSentUsage < plans[plan].textMsgSentAllowed;
        
        var validTextMsgReceived = usages.textMsgReceivedUsage < plans[plan].textMsgReceivedAllowed;

        var validData = usages.dataUsage < plans[plan].dataAllowed;

        var validLocalAirtime = usages.localAirtimeUsage < plans[plan].localAirtimeAllowed;

        // If all allowed usages are greater than the user's usages, then add to valid plans
        if (validLongDistance && validTextMsgSent && validTextMsgReceived && validData && validLocalAirtime) {
          validPlans.push(plans[plan]);
        }
      }

      console.log(validPlans);

      return (
         <div>
            <h1>Recommend Plans Here!</h1>
         </div>
      );
   }
}

export default App;