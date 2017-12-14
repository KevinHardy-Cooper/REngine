import React from 'react';
import ReactDOM from 'react-dom';

// Importing our App component
import App from './App.jsx';

// Rendering the App component via ReactDOM in our index.html div with the 'app' id
ReactDOM.render(<App/>, document.getElementById('app'));