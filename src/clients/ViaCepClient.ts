export interface ViaCepAddress {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export class ViaCepClient {
  private readonly baseUrl = 'https://viacep.com.br/ws';

  async findByCep(cep: string): Promise<ViaCepAddress> {
    const response = await fetch(`${this.baseUrl}/${cep}/json/`);
    if (!response.ok) {
      throw new Error(`Falha ao consultar CEP: ${response.status}`);
    }
    return response.json() as Promise<ViaCepAddress>;
  }
}
