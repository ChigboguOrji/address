'use strict';
console.log('Address form');
/**
 * @param {string} first_name Person first name
 * @param {string} last_name Person last name
 * @param {string} email Person email
 * @param {number} phone Person phone
 * @param {number} homephone Person home phone
 * @param {number} kin Person next of kin
 * 
 */

var
  form = document.querySelector('form'),
  // form elements
  firstName = document.querySelector('#first_name'),
  lastName = document.querySelector('#last_name'),
  email = document.querySelector('#email'),
  phone = document.querySelector('#phone'),
  homephone = document.querySelector('#homephone'),
  kin = document.querySelector('#kin');

form.addEventListener('submit', addToAddress, false);

function addToAddress(e) {
  console.log('Before submitting');
  var
    first = firstName.value.trim(),
    last = lastName.value.trim() || '',
    mail = email.value.trim(),
    tel1 = phone.value,
    tel2 = homephone.value || '',
    nKin = kin.value.trim() || '';

  if (!first || !mail || !tel1) {
    e.preventDefault();
    console.log('First name, email, phone required');
    return false
  }

  var phoneRegex = /^\d*$/;

  if (!phoneRegex.test(tel1)) {
    e.preventDefault();
    console.log('Phone must be a number');
    return false
  }

  if (tel2 !== '' || null) {
    if (!phoneRegex.test(tel2)) {
      e.preventDefault();
      console.log('Home phone must be a number');
      return false
    }
  }
  console.log('After submitting');
  return true
}