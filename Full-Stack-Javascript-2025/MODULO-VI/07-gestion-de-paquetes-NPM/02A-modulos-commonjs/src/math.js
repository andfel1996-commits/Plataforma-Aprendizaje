  /**
 * 02a-modulos-commonjs/src/math.cjs (CommonJS)
 * ------------------------------------------------------------
 * CommonJS usa:
 *  - module.exports para exportar
 *  - require(...) para importar
 *
 * Nota: usamos extensión .cjs para forzar CommonJS incluso si alguien
 * tiene configuraciones ESM en su entorno.
 */
  
  module.exports = {

    sumar(a, b) {
        return a + b;
    },

    restar(a, b) {
        return a - b;
    },

    multiplicar(a, b) {
        return a * b;
    },

    dividir(a, b) {
        // Buen hábito: validar antes de dividir
        if (b === 0) return null;
        return a / b;
    }
    
  }
