document.addEventListener("DOMContentLoaded", function () {
  let operaciones = document.getElementById("operaciones");
  let resultado = document.getElementById("resultado");
  let limiteDigitos = 20;
  let resultadoMostrado = false;
  let errorActivo = false;
  let operacionActual = "";
  let numeroActual = "0";
  let operador = "";

  function actualizarPantalla() {
    operaciones.textContent =
      (operacionActual + " " + operador).trim() || "\u00A0";
    resultado.textContent = numeroActual.replace(".", ",");
    if (numeroActual == "Infinity") {
      resultado.textContent = "Out of scope";
      errorActivo = true;
    } else if (numeroActual == "NaN") {
      resultado.textContent = "Syntax Error";
      errorActivo = true;
    } else {
      errorActivo = false;
    }
  }

  function limpiarTodo() {
    operacionActual = "";
    numeroActual = "0";
    operador = "";
    resultadoMostrado = false;
    errorActivo = false;
    actualizarPantalla();
  }

  function borrarOperaciones() {
    operacionActual = "";
    operador = "";
    resultadoMostrado = false;
    errorActivo = false;
    actualizarPantalla();
  }

  function borrarUltimo() {
    if (errorActivo) {
      limpiarTodo();
      return;
    }
    if (numeroActual.length <= 1) {
      numeroActual = "0";
    } else {
      numeroActual = numeroActual.slice(0, -1);
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
        return parseFloat(num2) || "NaN";
    }
  }

  function cambiarSigno() {
    if (errorActivo) return;
    if (numeroActual !== "0" && numeroActual !== "") {
      numeroActual = (parseFloat(numeroActual) * -1).toString();
      resultadoMostrado = false;
      actualizarPantalla();
    }
  }

  function convertirPorcentaje() {
    if (errorActivo) return;
    if (numeroActual !== "" && numeroActual !== "0") {
      numeroActual = (parseFloat(numeroActual) / 100).toString();
      resultadoMostrado = true;
      actualizarPantalla();
    }
  }

  function elevarCuadrado() {
    if (errorActivo) return;
    if (numeroActual !== "" && numeroActual !== "0") {
      numeroActual = Math.pow(parseFloat(numeroActual), 2).toString();
      resultadoMostrado = true;
      actualizarPantalla();
    }
  }

  function calcularRaiz() {
    if (errorActivo) return;
    if (numeroActual !== "" && numeroActual !== "0") {
      numeroActual = Math.sqrt(parseFloat(numeroActual)).toString();
      resultadoMostrado = true;
      actualizarPantalla();
    }
  }

  function agregarComa() {
    if (errorActivo) return;
    if (!numeroActual.includes(".")) {
      if (numeroActual === "") {
        numeroActual = "0.";
      } else {
        numeroActual += ".";
      }
      resultadoMostrado = false;
      actualizarPantalla();
    }
  }

  document.querySelectorAll(".numero").forEach(function (boton) {
    boton.addEventListener("click", function () {
      let valor = boton.textContent.trim();
      if (errorActivo) return;
      if (resultadoMostrado) {
        numeroActual = valor;
        resultadoMostrado = false;
        actualizarPantalla();
        return;
      }
      let digitos = numeroActual.replace(/[^0-9]/g, "");
      if (digitos.length < limiteDigitos) {
        if (numeroActual === "0") {
          numeroActual = valor;
        } else {
          numeroActual += valor;
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
          operacionActual = parcial.toString();
        } else {
          operacionActual = numeroActual;
        }
        numeroActual = "0";
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
      numeroActual = resultadoOperacion.toString();
      operacionActual = "";
      operador = "";
      actualizarPantalla();
      resultadoMostrado = true;
    }
  });

  document.getElementById("borrar-todo").addEventListener("click", limpiarTodo);
  document
    .getElementById("borrar-operaciones")
    .addEventListener("click", borrarOperaciones);
  document.getElementById("borrar-uno").addEventListener("click", borrarUltimo);
  document.getElementById("negativo").addEventListener("click", cambiarSigno);
  document
    .getElementById("porcentaje")
    .addEventListener("click", convertirPorcentaje);
  document.getElementById("elevar2").addEventListener("click", elevarCuadrado);
  document.getElementById("raiz").addEventListener("click", calcularRaiz);
  document.getElementById("coma").addEventListener("click", agregarComa);

  actualizarPantalla();
});