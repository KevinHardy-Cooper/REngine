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
    this.state = {value: '', name: '', plan: '', servProv: '', totalDue: 0, startDate: '', endDate: '', longDistance: 0, textMsgSent: 0, textMsgReceived: 0, dataUsage: 0, localAirtime: 0
   };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleServiceProviderChange = this.handleServiceProviderChange.bind(this);
    this.handleTotalDueChange = this.handleTotalDueChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleLongDistanceChange = this.handleLongDistanceChange.bind(this);
    this.handleTextMsgSentChange = this.handleTextMsgSentChange.bind(this);
    this.handleTextMsgReceivedChange = this.handleTextMsgReceivedChange.bind(this);
    this.handleDataUsageChange = this.handleDataUsageChange.bind(this);
    this.handleLocalAirtimeChange = this.handleLocalAirtimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePlanChange(event) {
    this.setState({plan: event.target.value});
  }

  handleServiceProviderChange(event) {
    this.setState({servProv: event.target.value});
  }

  handleTotalDueChange(event) {
    this.setState({totalDue: event.target.value});
  }

  handleStartDateChange(event) {
    this.setState({startDate: event.target.value});
  }

  handleEndDateChange(event) {
    this.setState({endDate: event.target.value});
  }
  handleLongDistanceChange(event) {
    this.setState({longDistance: event.target.value});
  }

  handleTextMsgSentChange(event) {
    this.setState({textMsgSent: event.target.value});
  }

  handleTextMsgReceivedChange(event) {
    this.setState({textMsgReceived: event.target.value});
  }

  handleDataUsageChange(event) {
    this.setState({dataUsage: event.target.value});
  }

  handleLocalAirtimeChange(event) {
    this.setState({localAirtime: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name + '.\nA plan was submitted: ' + this.state.plan + '.\nA service provider was submitted: ' + this.state.servProv  + '.\nThe total due was submitted: ' + this.state.totalDue + '.\nThe start date was submitted: ' + this.state.startDate + '.\nThe end date was submitted: ' + this.state.endDate + '.\nThe long distance usage charge was submitted: ' + this.state.longDistance + '.\nThe text messages sent charge was submitted: ' + this.state.textMsgSent + '.\nThe text messages received charge was submitted: ' + this.state.textMsgReceived + '.\nThe local airtime usage charge was submitted: ' + this.state.localAirtime);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <br/>
        <label>
          Plan:
          <input type="text" value={this.state.plan} onChange={this.handlePlanChange} />
        </label>
        <br/>
        <label>
          Service Provider:
          <input type="text" value={this.state.servProv} onChange={this.handleServiceProviderChange} />
        </label>
        <br/>
        <label>
          Total Due:
          <input type="number" value={this.state.totalDue} onChange={this.handleTotalDueChange} />
        </label>
        <br/>
         <label>
          Billing Cycle Start Date:
          <input type="date" value={this.state.startDate} onChange={this.handleStartDateChange} />
        </label>
        <br/>
         <label>
          Billing Cycle End Date:
          <input type="date" value={this.state.endDate} onChange={this.handleEndDateChange} />
        </label>
        <br/>
        <h3>Usage Charges:</h3>
        <label>
         Long Distance - Domestic Phone:
          <input type="number" value={this.state.longDistance} onChange={this.handleLongDistanceChange} />
        </label>
        <br/>
        <label>
         Text Msg Sent:
          <input type="number" value={this.state.textMsgSent} onChange={this.handleTextMsgSentChange} />
        </label>
        <br/>
        <label>
         Text Msg Received:
          <input type="number" value={this.state.textMsgReceived} onChange={this.handleTextMsgReceivedChange} />
        </label>
        <br/>
        <label>
         Data Usage:
          <input type="number" value={this.state.dataUsage} onChange={this.handleDataUsageChange} />
        </label>
        <br/>
        <label>
         Local Airtime:
          <input type="number" value={this.state.localAirtime} onChange={this.handleLocalAirtimeChange} />
        </label>
        <br/>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default App;