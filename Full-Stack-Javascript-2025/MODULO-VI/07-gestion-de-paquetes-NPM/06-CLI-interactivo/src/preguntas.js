export function preguntasCalculadora(){
    
    return [{
        type:"list",
        name : "operacion",
        message: "Qué operación deseas realizar?",
        choices:[
            {name:"Sumar", value:"sumar"},
            {name:"Restar", value:"restar"},
            {name:"Multiplicar", value:"multiplicar"},
            {name:"Dividir", value:"dividir"}
        ]
    },
    {
        type:"input",
        name:"a",
        message: "Ingresa el número A:",
        validate(input){
            const n = Number(input)
            return Number.isFinite(n) ? true : "Debes ingresar un número válido"
        },
        filter(input){
            return Number(input)
        }
    },
    {
        type:"input",
        name:"b",
        message:"Ingresa el número B:",
        validate(input){
            const n = Number(input)
            return Number.isFinite(n) ? true : "Debes ingresar un número válido";
        },
        filter(input){
            return Number(input);
        }
    }
]
}