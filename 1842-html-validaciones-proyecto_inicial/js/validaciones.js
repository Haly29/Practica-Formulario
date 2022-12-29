export function valida(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput);
    }
}

const tipoErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
];

const mensajesError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vacio'
    },
    email: {
        valueMissing: 'Este campo no puede estar vacio',
        typeMismatch: 'El correo es invalido'
    },
    password: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra mayúscula, una letra minúscula, debe tener al menos un número y no puede contener caracteres especiales'
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacio',
        customError: 'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El formato requerido es xxxxxxxxxx 10 números',
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres',
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La ciudad debe contener entre 3 a 30 caracteres',
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El estado debe contener entre 3 a 30 caracteres',
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input){
    let mensaje = '';
    tipoErrores.forEach(error => {
        if (input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoInput][error]);
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if(!mayorEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 años de edad';
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;

}