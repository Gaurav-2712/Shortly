import { handleRegister } from './script.js';


const RegisterForm = document.getElementById('RegisterForm');
console.log(RegisterForm);
RegisterForm.addEventListener('submit',handleRegister);