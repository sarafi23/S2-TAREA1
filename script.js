const form = document.getElementById('registroForm');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const edad = document.getElementById('edad');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validarCampo = (input, condicion, mensaje) => {
    const errorSpan = document.getElementById(`error-${input.id}`);

    if (condicion) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorSpan.textContent = '';
        return true;
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorSpan.textContent = mensaje;
        return false;
    }
};
nombre.addEventListener('input', () => {
    validarCampo(nombre, nombre.value.trim().length > 2, "El nombre es muy corto");
});

correo.addEventListener('input', () => {
    validarCampo(correo, emailRegex.test(correo.value), "Introduce un correo válido");
});

password.addEventListener('input', () => {
    const tieneNumeros = /\d/.test(password.value);
    validarCampo(password, password.value.length >= 8 && tieneNumeros, "Mínimo 8 caracteres y 1 número");
    if (confirmPassword.value.length > 0) {
        validarCampo(confirmPassword, password.value === confirmPassword.value, "Las contraseñas no coinciden");
    }
});

confirmPassword.addEventListener('input', () => {
    validarCampo(confirmPassword, password.value === confirmPassword.value, "Las contraseñas no coinciden");
});

edad.addEventListener('input', () => {
    const edadVal = parseInt(edad.value, 10);
    validarCampo(edad, edadVal >= 18 && edadVal <= 99, "La edad debe estar entre 18 y 99 años");
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNombreValido = validarCampo(nombre, nombre.value.trim().length > 2, "El nombre es obligatorio");
    const isCorreoValido = validarCampo(correo, emailRegex.test(correo.value), "Correo inválido");
    const tieneNumeros = /\d/.test(password.value);
    const isPassValido = validarCampo(password, password.value.length >= 8 && tieneNumeros, "Contraseña demasiado corta o sin números");
    const isConfirmPassValido = validarCampo(confirmPassword, password.value === confirmPassword.value && confirmPassword.value.length > 0, "Las contraseñas no coinciden");
    const edadVal = parseInt(edad.value, 10);
    const isEdadValida = validarCampo(edad, edadVal >= 18 && edadVal <= 99, "La edad debe estar entre 18 y 99 años");

    if (isNombreValido && isCorreoValido && isPassValido && isConfirmPassValido && isEdadValida) {
        alert("Registro procesado con éxito");
        form.reset();
        [nombre, correo, password, confirmPassword, edad].forEach(el => el.classList.remove('valid'));
    }
});

const iconEye = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const iconEyeClosed = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`;

togglePassword.addEventListener('click', () => {
    const isPassword = password.getAttribute('type') === 'password';
    password.setAttribute('type', isPassword ? 'text' : 'password');
    togglePassword.innerHTML = isPassword ? iconEye : iconEyeClosed;
});

toggleConfirmPassword.addEventListener('click', () => {
    const isPassword = confirmPassword.getAttribute('type') === 'password';
    confirmPassword.setAttribute('type', isPassword ? 'text' : 'password');
    toggleConfirmPassword.innerHTML = isPassword ? iconEye : iconEyeClosed;
});
