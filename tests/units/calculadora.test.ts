import { CalculadoraService } from "../../services/calculadoraService";

test("somar 2 + 2", () => {
  const calculadora = new CalculadoraService();
  const resultado = calculadora.somar({ arg1: 2, arg2: 2 });
  expect(resultado).toEqual({ resultado: 4 });
});
