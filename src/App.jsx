import React from 'react';

class App extends React.Component {

   constructor(props) {
      super(props);
      
      this.state = {
         data: 'Initial data...'
      }

      this.updateState = this.updateState.bind(this);
   };

   updateState(e) {
      this.setState({data: e.target.value});
   }

   render() {
      return (
         <div>
            <Header/>
            <Request/>
            <Form/>
         </div>
      );
   }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>REngine!</h1>
         </div>
      );
   }
}

class Request extends React.Component {
   render() {
      return (
         <div>
            <h2>Please enter your invoice data below...</h2>
         </div>
      );
   }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    
    // Personal Info
    // This will change depending on user
    this.name = 'Mr. T';

    // Plan related
    // This will change depending on plan
    this.plan = 'Canada-Wide Talk + Text 25 Dbl';
    this.servProv = 'Koodo';

    // Final charge
    // This will change depending the invoice
    this.totalDue = 25;
    
    // Billing cycle
    // This will change depending on the billing cycle
    var d = new Date();
    this.startDate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
    this.endDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() - 1) ;

    // Allowances
    // This will change depending on the plan
    this.longDistanceAllowed = 0;
    this.textMsgSentAllowed = Number.POSITIVE_INFINITY;
    this.textMsgReceivedAllowed = Number.POSITIVE_INFINITY;
    this.dataUsageAllowed = 0
    this.localAirtimeAllowed = 200;

    // Usages
    // This will change depending on the usage
    this.longDistance = Math.round(Math.random() * 50);
    this.textMsgSent = Math.round(Math.random() * 4000);
    this.textMsgReceived = Math.round(Math.random() * 4000);
    this.dataUsage = Math.round(Math.random() * 10 * Math.pow(10, 2))/Math.pow(10,2);
    this.localAirtime = Math.round(Math.random() * 500);

    // Usage charges
    // This will change depending on the usage and the charges
    var potentialLongDistanceOverage = this.longDistance - this.longDistanceAllowed;
    this.longDistanceCharge = potentialLongDistanceOverage > 0 ? potentialLongDistanceOverage * 0.50 : 0;
    
    var potentialTextMsgSentOverage = this.textMsgSent - this.textMsgSentAllowed;
    this.textMsgSentCharge = this.textMsgSentAllowed != Number.POSITIVE_INFINITY ? potentialTextMsgSentOverage * 0.25 : 0;

    var potentialTextMsgReceivedOverage = this.textMsgReceived - this.textMsgReceivedAllowed;
    this.textMsgReceivedCharge = this.textMsgReceivedAllowed != Number.POSITIVE_INFINITY ? potentialTextMsgReceivedOverage * 0.25 : 0;
    
    var potentialDataUsageOverage = this.dataUsage - this.dataUsageAllowed;
    this.dataUsageCharge = potentialDataUsageOverage > 0 ? potentialDataUsageOverage * 2 : 0;

    var potentialLocalAirtimeOverage = this.localAirtime - this.localAirtimeAllowed;
    this.localAirtimeCharge = potentialLocalAirtimeOverage > 0 ? potentialLocalAirtimeOverage * 0.5 : 0;

    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert(  'A name was submitted: ' + this.name + '.\n'
          + 'A plan was submitted: ' + this.plan + '.\n'
          + 'A service provider was submitted: ' + this.servProv  + '.\n' 
          + 'The total due was submitted: ' + this.totalDue + '.\n'
          + 'The start date was submitted: ' + this.startDate + '.\n'
          + 'The end date was submitted: ' + this.endDate + '.\n'
          + 'The long distance usage charge was submitted: ' + this.longDistance + '.\n'
          + 'The text messages sent charge was submitted: ' + this.textMsgSent + '.\n' 
          + 'The text messages received charge was submitted: ' + this.textMsgReceived + '.\n' + 'The local airtime usage charge was submitted: ' + this.localAirtime);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Name: {this.name}</p>
        <p>Plan: {this.plan}</p>
        <p>Service Provider: {this.servProv}</p>
        <p>Total Due: ${this.totalDue}</p>
        <p>Billing Cycle Start Date: {this.startDate}</p>
        <p>Billing Cycle End Date: {this.endDate}</p>
        <h3>Usage Charges:</h3>
        <p>Long Distance - Domestic Phone (of {this.longDistanceAllowed}:00): {this.longDistance}:00</p>
        <p><strong>Overage Charge for Long Distance: ${this.longDistanceCharge} @ $0.50 / overage minute of long distance airtime</strong></p>
        <p>Text Msg Sent (of {this.textMsgSentAllowed}): {this.textMsgSent}</p>
        <p><strong>Overage Charge for Text Msg Sent: ${this.textMsgSentCharge} @ $0.25 / overage text message sent</strong></p>
        <p>Text Msg Received (of {this.textMsgReceivedAllowed}): {this.textMsgReceived}</p>
        <p><strong>Overage Charge for Text Received Sent: ${this.textMsgReceivedCharge} @ $0.25 / overage text message received</strong></p>
        <p>Data Usage (of {this.dataUsageAllowed} MB): {this.dataUsage} MB</p>
        <p><strong>Overage Charge for Data: ${this.dataUsageCharge} @ $2.00 / overage MB of data used</strong></p>
        <p>Local Airtime (of {this.localAirtimeAllowed}:00): {this.localAirtime}:00</p>
        <p><strong>Overage Charge for Local Airtime: ${this.localAirtimeCharge} @ $0.5 / overage minute of local airtime</strong></p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default App;