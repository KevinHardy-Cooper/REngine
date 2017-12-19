/*
  December 18, 2017
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the connector between the index.html and App.jsx
*/

import React from 'react';
import ReactDOM from 'react-dom';

// Importing our App component
import App from './Components/App.jsx';

// Rendering the App component via ReactDOM in our index.html div with the 'app' id
ReactDOM.render(<App/>, document.getElementById('app'));