document.addEventListener("DOMContentLoaded", function () {
  let operaciones = document.getElementById("operaciones");
  let resultado = document.getElementById("resultado");
  let limiteDigitos = 20;
  let resultadoMostrado = false;
  let errorActivo = false;
  let operacionActual = 0;
  let numeroActual = 0;
  let operador = "";

  function actualizarPantalla() {
    if (operacionActual === 0 && operador === "") {
      operaciones.textContent = "\u00A0";
    } else {
      operaciones.textContent = (operacionActual + " " + operador).trim();
    }
    resultado.textContent = numeroActual.toString().replace(".", ",");
    if (numeroActual === Infinity) {
      resultado.textContent = "Out of scope";
      errorActivo = true;
    } else if (isNaN(numeroActual)) {
      resultado.textContent = "Syntax Error";
      errorActivo = true;
    } else {
      errorActivo = false;
    }
  }

  function limpiarTodo() {
    operacionActual = operador = "";
    numeroActual = 0;
    resultadoMostrado = false;
    errorActivo = false;
    actualizarPantalla();
  }

  function borrarOperaciones() {
    operacionActual = operador = "";
    resultadoMostrado = false;
    errorActivo = false;
    actualizarPantalla();
  }

  function borrarUltimo() {
    if (errorActivo) {
      limpiarTodo();
      return;
    }
    let texto = numeroActual.toString();
    if (texto.length <= 1) {
      numeroActual = 0;
    } else {
      numeroActual = parseFloat(texto.slice(0, -1)) || 0;
    }
    resultadoMostrado = false;
    actualizarPantalla();
  }

  function calcular() {
    let num1 = parseFloat(operacionActual) || 0;
    let num2 = parseFloat(numeroActual) || 0;
    switch (operador) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      case "^":
        return num1 ** num2;
      default:
        return num2;
    }
  }

  function cambiarSigno() {
    if (errorActivo) return;
    if (numeroActual !== 0) {
      numeroActual = numeroActual * -1;
      resultadoMostrado = false;
      actualizarPantalla();
    }
  }

  function convertirPorcentaje() {
    if (errorActivo) return;
    if (numeroActual !== 0) {
      numeroActual = numeroActual / 100;
      resultadoMostrado = true;
      actualizarPantalla();
    }
  }

  function elevarCuadrado() {
    if (errorActivo) return;
    if (numeroActual !== 0) {
      numeroActual = Math.pow(numeroActual, 2);
      resultadoMostrado = true;
      actualizarPantalla();
    }
  }

  function calcularRaiz() {
    if (errorActivo) return;
    if (numeroActual !== 0) {
      numeroActual = Math.sqrt(numeroActual);
      resultadoMostrado = true;
      actualizarPantalla();
    }
  }

  function agregarComa() {
    if (errorActivo) return;
    let texto = numeroActual.toString();
    if (!texto.includes(".")) {
      texto += ".";
      numeroActual = parseFloat(texto);
      resultadoMostrado = false;
      actualizarPantalla();
    }
  }

  document.querySelectorAll(".numero").forEach(function (boton) {
    boton.addEventListener("click", function () {
      let valor = boton.textContent.trim();
      if (errorActivo) return;
      if (resultadoMostrado) {
        numeroActual = parseFloat(valor);
        resultadoMostrado = false;
        actualizarPantalla();
        return;
      }
      let texto = numeroActual.toString();
      let digitos = texto.replace(/[^0-9]/g, "");
      if (digitos.length < limiteDigitos) {
        if (numeroActual === 0 && !texto.includes(".")) {
          numeroActual = parseFloat(valor);
        } else {
          numeroActual = parseFloat(texto + valor);
        }
        actualizarPantalla();
      }
    });
  });

  document.querySelectorAll(".operador").forEach(function (boton) {
    boton.addEventListener("click", function () {
      if (errorActivo) return;
      let nuevoOperador = boton.textContent.trim();
      if (numeroActual !== "") {
        if (operacionActual && operador) {
          let parcial = calcular();
          operacionActual = parcial;
        } else {
          operacionActual = numeroActual;
        }
        numeroActual = 0;
      }
      operador = nuevoOperador;
      resultadoMostrado = true;
      actualizarPantalla();
    });
  });

  document.getElementById("igual").addEventListener("click", function () {
    if (errorActivo) return;
    if (operador !== "") {
      let resultadoOperacion = calcular();
      operaciones.textContent =
        operacionActual + " " + operador + " " + numeroActual + " =";
      numeroActual = resultadoOperacion;
      operacionActual = operador = "";
      actualizarPantalla();
      resultadoMostrado = true;
    }
  });

  document.getElementById("borrar-todo").addEventListener("click", limpiarTodo);
  document.getElementById("borrar-operaciones").addEventListener("click", borrarOperaciones);
  document.getElementById("borrar-uno").addEventListener("click", borrarUltimo);
  document.getElementById("negativo").addEventListener("click", cambiarSigno);
  document.getElementById("porcentaje").addEventListener("click", convertirPorcentaje);
  document.getElementById("elevar2").addEventListener("click", elevarCuadrado);
  document.getElementById("raiz").addEventListener("click", calcularRaiz);
  document.getElementById("coma").addEventListener("click", agregarComa);

  actualizarPantalla();
});