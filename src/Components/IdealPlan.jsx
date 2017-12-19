/*
  December 18, 2017
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the pièce de résistance, the ideal plan for the user's usage
*/

// Importing module
import React from 'react';

// This component contains the best plan for the user
export default class IdealPlan extends React.Component {

  constructor(props) {
    super(props);

    // Creating local variables for passed in properties
    this.recommendedPlans = this.props.recommendedPlans;
    this.usages = this.props.usages;
  }


  render() {
    // We're gonna find the recommended plan with the lowest flat rate
    var min = 1000000;
    var minIndex = 0;

    for (var plan in this.recommendedPlans) {
      if (parseInt(this.recommendedPlans[plan].flatRate) < min) {
        min = this.recommendedPlans[plan].flatRate
        minIndex = plan;
      }
    }

    // We now have the idealPlan by finding the recommended plan with the lowest flat rate
    var idealPlan = this.recommendedPlans[minIndex];

    /* Usage charges for each category
      First, find the difference between the usage and the allowed usage
      If the difference is positive, that means that the user used more than they were allowed, and the charge is applied to their usage that went over what they were allowed.
      If the difference is negative, that means that the user did not use more than they were allowed, and do not get charged.
    */

    this.potentialLongDistanceOverage = this.usages.longDistanceUsage - idealPlan.longDistanceAllowed;
    this.longDistanceOverageChargeRate = this.potentialLongDistanceOverage > 0 ? this.potentialLongDistanceOverage * parseFloat(idealPlan.longDistanceOverageChargeRate) : 0;

    
    this.potentialTextMsgSentOverage = this.usages.textMsgSentUsage - idealPlan.textMsgSentAllowed;
    this.textMsgSentOverageChargeRate = idealPlan.textMsgSentAllowed != Number.POSITIVE_INFINITY ? this.potentialTextMsgSentOverage * parseFloat(idealPlan.textMsgSentOverageChargeRate) : 0;


    this.potentialTextMsgReceivedOverage = this.usages.textMsgReceivedUsage - idealPlan.textMsgReceivedAllowed;
    this.textMsgReceivedOverageChargeRate = idealPlan.textMsgReceivedAllowed != Number.POSITIVE_INFINITY ? this.potentialTextMsgReceivedOverage * parseFloat(idealPlan.textMsgReceivedOverageChargeRate) : 0;

   
    this.potentialDataOverage = this.usages.dataUsage - idealPlan.dataAllowed;
    this.dataOverageChargeRate = this.potentialDataOverage > 0 ? this.potentialDataOverage * parseFloat(idealPlan.dataOverageChargeRate) : 0;


    this.potentialLocalAirtimeOverage = this.usages.localAirtimeUsage - idealPlan.localAirtimeAllowed;
    this.localAirtimeOverageChargeRate = this.potentialLocalAirtimeOverage > 0 ? this.potentialLocalAirtimeOverage * parseFloat(idealPlan.localAirtimeOverageChargeRate) : 0;


    // Final charge
    this.flatRate = parseInt(idealPlan.flatRate);
    this.totalDue = this.flatRate + this.longDistanceOverageChargeRate + this.textMsgSentOverageChargeRate + this.textMsgReceivedOverageChargeRate + this.dataOverageChargeRate + this.localAirtimeOverageChargeRate;

    // If the user saves money through this recommended plan, display the breakdown and how much they save
    if (this.totalDue < this.props.totalDue) {
      return (
         <div>
          <h1>Ideal Plan</h1>  
          <p>Total Due: ${this.totalDue}</p>
          <h3>Usage Charges:</h3>
          
          {/*Long distance*/}
          <p>Long Distance - Domestic Phone (of {idealPlan.longDistanceAllowed}:00): {this.usages.longDistanceUsage}:00</p>
          {this.potentialLongDistanceOverage > 0 ? <p><strong>Overage Charge for Long Distance: ${this.longDistanceOverageChargeRate}</strong> ({this.potentialLongDistanceOverage} overage minutes of long distance @ $0.50 / overage minute)</p> : null}

          {/*Text message sent*/}
          <p>Text Msg Sent (of {idealPlan.textMsgSentAllowed}): {this.usages.textMsgSentUsage}</p>
          {this.potentialTextMsgSentOverage > 0 ? <p><strong>Overage Charge for Text Msg Sent: ${this.textMsgSentOverageChargeRate}</strong> ({this.potentialTextMsgSentOverage} overage texts sent @ $0.25 / overage message)</p> : null}


          {/*Text message received*/}
          <p>Text Msg Received (of {idealPlan.textMsgReceivedAllowed}): {this.usages.textMsgReceivedUsage}</p>
          {this.potentialTextMsgReceivedOverage > 0 ? <p><strong>Overage Charge for Text Received Sent: ${this.textMsgReceivedOverageChargeRate}</strong>({this.potentialTextMsgReceivedOverage} overage texts received @ $0.25 / overage message)</p> : null}

          {/*Data usage*/}
          <p>Data Usage (of {idealPlan.dataAllowed} MB): {this.usages.dataUsage} MB</p>
          {this.potentialDataOverage > 0 ? <p><strong>Overage Charge for Data: ${this.dataOverageChargeRate}</strong> ({this.potentialDataOverage} MB of overage data used @ $2.00 / overage MB)</p> : null}

          {/*Local airtime*/}
          <p>Local Airtime (of {idealPlan.localAirtimeAllowed}:00): {this.usages.localAirtimeUsage}:00 </p>
          {this.potentialLocalAirtimeOverage > 0 ? <p><strong>Overage Charge for Local Airtime: ${this.localAirtimeOverageChargeRate}</strong>({this.potentialLocalAirtimeOverage} overage minutes of local airtime @ $0.5 / overage minute)</p> : null}

          {/*Money Saved*/}
          <p>Money Saved: ${Math.round(100*(this.props.totalDue - this.totalDue))/100}/month</p>
         </div>
      );
    } else {
      return (
       <div>
          <p>No recommended plans from Koodo</p>        
       </div>
      );
    }
  }
}