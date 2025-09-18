import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';


  static getTextError(errors: ValidationErrors){

        for (const key of Object.keys(errors)){
            switch(key){
            case 'required':
                return 'Este campo es requerido';

            case 'minlength':
                return `Minimo de ${ errors['minlength'].requiredLength} caracteres`;

            case 'min':
                return `Valor minimo de ${errors['min'].min}`;

            case 'email':
                return `El valor ingresado no es un correo electronico`

            case 'emailTaken':
                return `El correo electronico ya esta siendo utilizado por otra persona`

            case 'noStrider':
                return `No se puede usar el username de strider en la app`

            case 'pattern':
                if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
                return 'El valor ingresado no luce como un correo electronico'
                }

                return 'Error de patron contra expresion regular'

            default: 
                return 'Error de validacion no controlado'
            }
        }
        return null;
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {

        if (!form.controls[fieldName]) return null;

        const errors = form.controls[fieldName].errors ?? {};

        return FormUtils.getTextError(errors);
    }
}


