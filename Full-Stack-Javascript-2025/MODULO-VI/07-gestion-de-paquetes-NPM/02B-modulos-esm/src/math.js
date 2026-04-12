

export function sumar(a, b){
        return a + b;
}

export function restar(a, b){
        return a - b;
}

export function multiplicar(a, b){
        return a * b;
}

export function dividir(a, b){
        // Buen hábito: validar antes de dividir
        if (b === 0) return null;
        return a / b;
}
    

