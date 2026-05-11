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

togglePassword.addEventListener('click', () => {
    const isPassword = password.getAttribute('type') === 'password';
    password.setAttribute('type', isPassword ? 'text' : 'password');
    togglePassword.textContent = isPassword ? '🐵' : '🙈';
});

toggleConfirmPassword.addEventListener('click', () => {
    const isPassword = confirmPassword.getAttribute('type') === 'password';
    confirmPassword.setAttribute('type', isPassword ? 'text' : 'password');
    toggleConfirmPassword.textContent = isPassword ? '🐵' : '🙈';
});
