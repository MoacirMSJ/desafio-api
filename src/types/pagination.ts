export interface ParametrosPaginacao {
  pagina: number;
  limite: number;
}

export interface ResultadoPaginado<T> {
  dados: T[];
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}
