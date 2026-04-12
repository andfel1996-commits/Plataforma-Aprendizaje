import * as UI from './utilities/interfaz.js';
import addTareaModal from './utilities/addTareaModal.js';
import addTarea from './utilities/addTarea.js';
import imprimir from './utilities/imprimir.js';

if(typeof window === 'object'){
    window.addEventListener('DOMContentLoaded',function(){

        UI.buttonAgregarTarea.addEventListener('click', (e)=>{
            e.preventDefault();
            addTareaModal();
        })

        UI.addTarea.addEventListener('click', (e)=>{
            e.preventDefault();
            addTarea();
        })

        imprimir()
    })
}