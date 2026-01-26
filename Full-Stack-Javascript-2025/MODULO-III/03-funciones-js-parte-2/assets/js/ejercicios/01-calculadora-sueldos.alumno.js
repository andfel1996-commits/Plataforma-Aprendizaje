/* ==========================================================
   EJERCICIO 01 (ALUMNO) — CALCULADORA DE SUELDOS
   ========================================================== 
   
    Contexto: 🙌
    Imaginemos que estamos trabajando en una empresa y necesitamos calcular el sueldo neto de los empleados. Cada empleado tiene un sueldo base, puede recibir una serie de bonificaciones adicionales, y tiene un descuento fijo sobre su sueldo bruto (13%).
    
    Consigna: ✍️
    Crear una función que calcule el sueldo neto de un empleado teniendo en cuenta:
    Recibir el nombre del empleado.
    Recibir el sueldo base.
    Recibir un número indefinido de bonificaciones (usando el operador rest ...).
    Aplicar un descuento fijo del 13% sobre el sueldo total.


   */

// TODO: implementar la función según comentarios
function calcularSueldoNeto(nombreEmpleado, sueldoBase, ...bonificaciones) {
  // PASO 1) Validar nombreEmpleado
  // PASO 2) Validar sueldoBase
  // PASO 3) Sumar bonificaciones con reduce (partiendo en 0)
  // PASO 4) sueldoBruto = sueldoBase + totalBonificaciones
  // PASO 5) descuento = sueldoBruto * 0.13
  // PASO 6) sueldoNeto = sueldoBruto - descuento
  // PASO 7) console.log detalle
  // PASO 8) return sueldoNeto
}

// Pruebas (descomenta)
// calcularSueldoNeto("Lucas", 50000, 3000, 2500, 1500);
// calcularSueldoNeto("Sofía", 60000, 10000);
// calcularSueldoNeto("Ariel", 45000);
// calcularSueldoNeto("", 50000, 1000);
