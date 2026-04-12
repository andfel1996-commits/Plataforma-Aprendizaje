
/**
 * 
 * @param {*} obj 
 * @param {*} fieldsParam 
 * @returns 
 * 
 * const guitar = { id: '123', name: 'Ibanez', brand: 'Ibanez', color: 'Purple', price: 1500 }
 * const filtered = filterFields( guitar, 'id, name, brand')
 * Resultado : {id:'123, name:'Ibanez', brand:'Ibanez'}
 * 
 */

export const filterFields = ( obj, fieldsParam ) => {

    // console.log('[filterFields] FieldsParams recibido:' , fieldsParam );

    if(!fieldsParam){
        console.log('[filterFields] sin filterFields, se devuelve el objeto completo:', obj )
        return obj
    }

    const fields = fieldsParam
        .split(',')
        .map( field => field.trim())
        .filter( field => field) // Elimina los campos vacios

    // console.log('[filterFields] fileds procesados-->', fields );
    
    // Si despues de limpiar  no queda ningún campo limpio devolvenos el objeto
    if(fields.length === 0){
        // console.log( '[filterFields] fields vacios, se devuelve el ob jeto completo', obj )
        return obj
    }

    // Vamos a recorrer cada campo pedido y construimos un nuevo objeto filtrado
    // Sólo copimos la propiedad si existe en el obj para evitar claves inexistentes
    const result = fields.reduce((filtered, field) => {
        if(field in obj){
            filtered[field] = obj[field]
        }
        // Devolvemos el acumulador para que reduce continue con el siguiente campo
        return filtered
    }, {})
    // console.log('[filterFields] objeto filtrado final:', result )
    return result
}