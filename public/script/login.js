import { handleLogin } from './script.js';

const loginForm = document.getElementById('loginForm');
console.log(loginForm);
loginForm.addEventListener('submit',handleLogin);