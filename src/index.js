import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

$('#basic-nav-dropdown').removeClass('dropdown-toggle');

$(function () {
  $('.dropdown').on('show.bs.dropdown', function (e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  });

  // ADD SLIDEUP ANIMATION TO DROPDOWN //
  $('.dropdown').on('hide.bs.dropdown', function (e) {
    e.preventDefault();
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(400, function () {
      $('.dropdown').removeClass('show');
      $('.dropdown-menu').removeClass('show');
      $('.dropdown').find('.dropdown-toggle').attr('aria-expanded', 'false');
    });
  });
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
