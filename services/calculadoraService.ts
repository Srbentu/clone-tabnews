import { Calculadora, Resultado } from "../types/calculadora";

export class CalculadoraService {
  somar({ arg1, arg2 }: Calculadora): Resultado {
    return { resultado: arg1 + arg2 };
  }
}
