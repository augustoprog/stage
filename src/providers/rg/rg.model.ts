export interface RG {
  // numeroRg: number;
  // email: string;
  // tokenAtual: TokenObj;
  serial: string;
  secret: string;
  revogado: boolean;
  period: number;
  digits: number;
  issuer: string;
  numeroFicha: number;
  base64: string;
  time: number;
  qrcode: string;
  ativado: boolean;
}

export interface TokenObj {
  serial: string;
  secret: string;
  revogado: boolean;
  period: number;
  digits: number;
  issuer: string;
  numeroFicha: number;
  base64: string;
  time: number;
  qrcode: string;
  ativado: boolean;
}
