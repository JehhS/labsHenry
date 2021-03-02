import Moment from "moment";

export function validateEmptyField(userData, p){
  let errors = {};
  if (!userData.firstName) {
    errors.firstName = 'Debes ingresar un nombre';
  } else if (userData.firstName && userData.firstName.length < 2) {
    errors.firstName = 'El nombre es muy corto';
  }
  
  if (!userData.lastName) {
    errors.lastName = 'Debes ingresar un apellido';
  } else if (userData.lastName && userData.lastName.length < 2) {
    errors.lastName = 'El apellido es muy corto';
  }
  
  if (!userData.dateOfBirth) {
    errors.dateOfBirth = 'Debes ingresar tu fecha de nacimiento';
  } else if (userData.dateOfBirth && userData.dateOfBirth.length < 2) {
    errors.lastName = 'El apellido es muy corto';
  }
  
  if (!userData.email) {
    errors.email = 'Debes ingresar un email';
  }
  
  if (!userData.address) {
    errors.address = 'Debes ingresar una dirección';
  } else if (userData.address && userData.address.length < 2) {
    errors.address = 'La dirección es muy corta';
  }
  
  if (!userData.city) {
    errors.city = 'Debes ingresar una Ciudad';
  } else if(userData.city && userData.city.length < 2) {
    errors.city = 'El nombre de la ciudad es muy corto';
  }
  
  if (!userData.state) {
    errors.state = 'Debes ingresar una Provincia';
  } else if (userData.state && userData.state.length < 2) {
    errors.state = 'El nombre de la Provincia es muy corto';
  }
  
  if (!userData.country) {
    errors.country = 'Debes ingresar un País';
  } else if (userData.country && userData.country.length < 2) {
    errors.country = 'El nombre del País es muy corto';
  }
  
  if (!userData.nationality) {
    errors.nationality = 'Debes ingresar tu nacionalidad';
  } else if (userData.nationality && userData.nationality.length < 2) {
    errors.nationality = 'Ingrese una nacionalidad válida';
  }
  
  if (!userData.cellphone) {
    errors.cellphone = 'Debes ingresar una teléfono';
  }
  
  return Object.assign(p, errors);
}

export function updateValidate (userData) {
  let errors = {};
  
  if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = 'Ingrese un email valido';
  }
  
  if (userData.cellphone && !validaNumericos(userData.cellphone)) {
    errors.cellphone = 'Ingresa un numero válido';
  }
  return errors;
}

export function validaNumericos(value){
  for(let i=0; i<value.length;i++){
    let code = value.charCodeAt(i);
    if(code < 48 || code > 57){
      return false;
    }
  }
  return true;
}


export function formatDate(date) {
  let formatDate = new Moment(date);
  return formatDate.format('DD/MM/YYYY')
}
