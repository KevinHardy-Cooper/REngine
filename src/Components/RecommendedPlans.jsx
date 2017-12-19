/*
  December 18, 2017
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the recommended plans for the user's usage
*/

// Importing module
import React from 'react';

// Importing class component
import IdealPlan from './IdealPlan.jsx';

// This component will contain the recommended phone plans that can contain the user's usage habits without charging for overages 
export default class RecommendedPlans extends React.Component {

   render() {

      /* Now that we have the plans at this.props.plans, and we have the usages via this.props.usages, we can check each usage parameter against each usage, until we find an acceptable plan given the usage */ 

      // Checking if there are any plans in the passed-in properties via Plans component, if not then return
      if (this.props.plans.length == 0){
        return null;
      }

      // Creating local variables for props
      var plans = this.props.plans;
      var usages = this.props.usages;
      var totalDue = this.props.totalDue;

      // This array will contain plans that fit the user's usages
      var validPlans = [];

      for (var plan in plans) {

        // We want to loop through keys in dictionary and check if any values are equal to "INFINITY"
        for (var key in plans[plan]) {

          // If so, we want to convert this string to a number representing positive infinity
          if (plans[plan][key] === "INFINITY") {
            plans[plan][key] = Number.POSITIVE_INFINITY;
          }
        }

        // These variables reflect if the user's usage is less than the allowed usage of that attribute on the plan, and thus deemed "valid"
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

      return (
         <div>
            <h1>Recommended Plans Below:</h1>
            <ul>
            {/* For each plan in validPlans, map each to a list item given their index key, and output the service provider and the plan name */}
          	{
              	validPlans.map(
              		function(validPlan, index) {
                		return 
                			<li key={ index }>
                          	{ validPlan.servProd }, &nbsp; { validPlan.plan }
                       		</li>;
              		}
      			)
          	}
            </ul>

            {/* The nested component IdealPlan is to be rendered here, and is passed multiple properties for manipulation */}
            <IdealPlan 
            	recommendedPlans={validPlans} 	
            	usages={usages} 
            	totalDue={totalDue}
        	/>
         </div>
      );
   }
}