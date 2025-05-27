import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor() { }

  validarCPF(cpf: string): boolean {

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    return (
      digito1 === parseInt(cpf.charAt(9)) &&
      digito2 === parseInt(cpf.charAt(10))
    );
  }

  validarCNPJ(cnpj: string): boolean {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    const calcDigito = (base: string, peso: number[]) => {
      let soma = 0;
      for (let i = 0; i < peso.length; i++) {
        soma += parseInt(base.charAt(i)) * peso[i];
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const base = cnpj.slice(0, 12);
    const digito1 = calcDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const digito2 = calcDigito(base + digito1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return (
      digito1 === parseInt(cnpj.charAt(12)) &&
      digito2 === parseInt(cnpj.charAt(13))
    );
  }

  validarCEP(cep: string): boolean {
    const cepLimpo = cep.replace(/\D/g, '');

    if (!/^[0-9]{8}$/.test(cepLimpo) || /^(\d)\1+$/.test(cepLimpo)) {
      return false;
    }

    const cepNumero = parseInt(cepLimpo, 10);

    return cepNumero >= 1000000 && cepNumero <= 99999999;
  }
}
