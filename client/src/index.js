import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home';
// import App from './App';
import Greeting from './Greeting';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


ReactDOM.render(<Home />, document.getElementById('root'));
// ReactDOM.render(<Greeting />, document.getElementById('root'));




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
