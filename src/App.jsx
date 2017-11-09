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
    this.longDistanceCharge = this.potentialLongDistanceOverage > 0 ? this.potentialLongDistanceOverage * 0.50 : 0;
    
    this.potentialTextMsgSentOverage = this.textMsgSentUsage - this.textMsgSentAllowed;
    this.textMsgSentCharge = this.textMsgSentAllowed != Number.POSITIVE_INFINITY ? this.potentialTextMsgSentOverage * 0.25 : 0;

    this.potentialTextMsgReceivedOverage = this.textMsgReceivedUsage - this.textMsgReceivedAllowed;
    this.textMsgReceivedCharge = this.textMsgReceivedAllowed != Number.POSITIVE_INFINITY ? this.potentialTextMsgReceivedOverage * 0.25 : 0;
    
    this.potentialDataOverage = this.dataUsage - this.dataAllowed;
    this.dataCharge = this.potentialDataOverage > 0 ? this.potentialDataOverage * 2 : 0;

    this.potentialLocalAirtimeOverage = this.localAirtimeUsage - this.localAirtimeAllowed;
    this.localAirtimeCharge = this.potentialLocalAirtimeOverage > 0 ? this.potentialLocalAirtimeOverage * 0.5 : 0;

    // Final charge
    // This will change depending the invoice
    var baseRate = 25;
    this.totalDue = baseRate + this.longDistanceCharge + this.textMsgSentCharge + this.textMsgReceivedCharge + this.dataCharge + this.localAirtimeCharge;

    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  alert("hi");
    event.preventDefault();
    // On submit of the form, send a POST request with the data to the server.

    fetch('http://localhost:3000/invoices').then(function(response) {
       alert(JSON.stringify(response));
      alert(JSON.stringify(response.json()));
        return response.json();
      }).then(function(body) {
      alert(JSON.stringify(body));
        console.log(body);
      });

    //, { 
        /*method: 'POST',
        data: {
          name: this.name,
          plan: this.plan, 
          servProd: this.servProd, 
          flatRate: this.flatRate, 
          totalDue: this.totalDue, 
          startDate: this.startDate, 
          endDate: this.endDate, 
          longDistanceAllowed: this.longDistanceAllowed, 
          longDistanceUsage: this.longDistanceUsage, 
          longDistanceOverageChargeRate: this.longDistanceOverageCharges, 
          textMsgSentAllowed: this.textMsgSentAllowed, 
          textMsgSentUsage: this.textMsgSentUsage, 
          textMsgSentOverageChargeRate: this.textMsgSentOverageChargeRate, 
          textMsgReceivedAllowed: this.textMsgReceivedAllowed, 
          textMsgReceivedUsage: this.textMsgReceivedUsage, 
          textMsgReceivedOverageChargeRate: this.textMsgReceivedOverageChargeRate, 
          dataAllowed: this.dataAllowed, 
          dataUsage: this.dataUsage, 
          dataOverageChargeRate: this.dataOverageChargeRate, 
          localAirtimeAllowed: this.localAirtimeAllowed, 
          localAirtimeUsage: this.localAirtimeUsage, 
          localAirtimeOverageChargeRate: this.localAirtimeOverageChargeRate
        }*/

      //})
      /*.then(function(response) {
      alert(JSON.stringify(response));
      alert(JSON.stringify(response.json()));
        return response.json();
      }).then(function(body) {
      alert(JSON.stringify(body);
        console.log(body);
      });*/
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
        
        {/*Long distance*/}
        <p>Long Distance - Domestic Phone (of {this.longDistanceAllowed}:00): {this.longDistanceUsage}:00</p>
        {this.potentialLongDistanceOverage > 0 ? <p><strong>Overage Charge for Long Distance: ${this.longDistanceCharge}</strong> ({this.potentialLongDistanceOverage} overage minutes of long distance @ $0.50 / overage minute)</p> : null}
        
        {/*Text message sent*/}
        <p>Text Msg Sent (of {this.textMsgSentAllowed}): {this.textMsgSentUsage}</p>
        {this.potentialTextMsgSentOverage > 0 ? <p><strong>Overage Charge for Text Msg Sent: ${this.textMsgSentCharge}</strong> ({this.potentialTextMsgSentOverage} overage texts sent @ $0.25 / overage message)</p> : null}
        
        {/*Text message received*/}
        <p>Text Msg Received (of {this.textMsgReceivedAllowed}): {this.textMsgReceivedUsage}</p>
        {this.potentialTextMsgReceivedOverage > 0 ? <p><strong>Overage Charge for Text Received Sent: ${this.textMsgReceivedCharge}</strong>({this.potentialTextMsgReceivedOverage} overage texts received @ $0.25 / overage message)</p> : null}
        
        {/*Data usage*/}
        <p>Data Usage (of {this.dataAllowed} MB): {this.dataUsage} MB</p>
        {this.potentialDataOverage > 0 ? <p><strong>Overage Charge for Data: ${this.dataCharge}</strong> ({this.potentialDataOverage} MB of overage data used @ $2.00 / overage MB)</p> : null}
       
        {/*Local airtime*/}
        <p>Local Airtime (of {this.localAirtimeAllowed}:00): {this.localAirtimeUsage}:00 </p>
        {this.potentialLocalAirtimeOverage > 0 ? <p><strong>Overage Charge for Local Airtime: ${this.localAirtimeCharge}</strong>({this.potentialLocalAirtimeOverage} overage minutes of local airtime @ $0.5 / overage minute)</p> : null}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default App;