interface KeyCloakCredentials {
  secret: string;
}
interface KeyCloakConfig {
  url: string;
  realm: string;
  clientId: string;
  credentials: KeyCloakCredentials;
}

interface Env {
  production: boolean;
  faleConoscoEndpoint: string;

  apiKeyCartaServicos: string;
  cartaServicosEndpoint: string;

  cadEndpoint: string;
  cadPublicoEndpoint: string;
  apikeyCadPublico: string;

  detranConsultaPontuacaoEndpoint: string;
  detranConsultaVeiculoEndpoint: string;
  detranConsultaProtocolEndpoint: string;
  apiKeyDetran: string;

  cadFotoEndpoint: string;

  compesaEndpoint: string;
  apiKeyCompesa: string;

  ctmEndpoint: string;
  apiKeyCtm: string;

  cepEndpoint: string;

  autoCadastro: string;
  alertaCelular: string;

  //rgDigital
  ativarToken: string;
  visualizarRg: any;

  buscaServicosEndpoint: string;
  servicosDestaqueEndpoint: string;

  openStreetMapTileEndpoint: string;
  openStreetMapNominatimEndpoint: string;

  keycloak: KeyCloakConfig;
  ssoActive: true;

  //agendamento
  agendamento: any;
  agendamentoServicos: any;
  maps: any;

  participaUrl: string;

  exibeNotifica: boolean;
  exibeConsultaNFe: boolean;
  exibeAvalia: boolean;
  exibeComprePE: boolean;
  comprePEPage: string;

  sefazNFEEndpoint: string;
  sefazDanfeEndpoint: string;
}

let homolog: Env = {
  apiKeyCartaServicos: "?apikey=8843887d-4312-4d3e-b428-35cac6e64cc7",
  cartaServicosEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/carta-servico/1.0/",
  buscaServicosEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/carta-servico/1.0/servicos/novoBuscaGeral",
  servicosDestaqueEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/carta-servico-homolog/destaque-servicos/1.1/",
  production: false,
  faleConoscoEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/cadastro-cidadao-publico/1.0/fale-conosco",
  detranConsultaPontuacaoEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaPontuacao/1.1/",
  detranConsultaVeiculoEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaVeiculoDados/1.1/",
  detranConsultaProtocolEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaProtocolo/1.0/",
  apiKeyDetran: "?apikey=eda4ee33-785f-4efd-bfff-3a12a739d48e",
  cadEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/cadastro-cidadao/1.0/",
  cadFotoEndpoint: "http://200.238.112.188:8080/cadastro_cidadao/api/",
  cadPublicoEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/cadastro-cidadao-publico/1.0/",
  apikeyCadPublico: "?apikey=8843887d-4312-4d3e-b428-35cac6e64cc7",
  
  compesaEndpoint:
    "http://webservices.compesa.com.br:8080/compesaWebService/services",
  apiKeyCompesa: "9226517c71b3f7b312731720cee72f76",
  ctmEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/gov/grande-recife/1.0/",
  apiKeyCtm: "?apikey=eda4ee33-785f-4efd-bfff-3a12a739d48e",
  cepEndpoint: "http://api.postmon.com.br/v1/cep/",
  autoCadastro:
    "https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/cadastro-cidadao-auto-cadastro/1.0/",
  alertaCelular:
    "https://www.apigtw.pe.gov.br/apiman-gateway/ati-homolog/alerta/2.0/",
  ativarToken:
    "https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/cadastro-cidadao/1.0/check-rg-digital?apikey=8843887d-4312-4d3e-b428-35cac6e64cc7",
  visualizarRg: `https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/cadastro-cidadao/1.0/rg-imagem?apikey=8843887d-4312-4d3e-b428-35cac6e64cc7`,

  openStreetMapTileEndpoint: "https://mapas.pe.gov.br/hot",
  openStreetMapNominatimEndpoint: "https://mapas.pe.gov.br/nominatim",

  keycloak: {
    url: "https://www.sso.pe.gov.br/auth/",
    realm: "cidadao-homo",
    clientId: "teste-portal",
    credentials: {
      secret: "194770f0-6837-44b3-bd6d-15b8377af61b"
    }
  },

  ssoActive: true,

  agendamento: endpoint =>
    `https://www.apigtw.pe.gov.br/apiman-gateway/governo-homolog/agendamento/1.0/${endpoint}?apikey=8843887d-4312-4d3e-b428-35cac6e64cc7`,

  agendamentoServicos: id =>
    `https://www.apigtw.pe.gov.br/apiman-gateway/carta-servico-homolog/servicos/1.0/buscarContando/${id}`,
  maps: endpoint => `http://mapas.pe.gov.br/${endpoint}`,

  participaUrl: 'https://participa-homologacao.pe.gov.br',
  exibeNotifica: false,
  exibeConsultaNFe: true,
  exibeAvalia: false,

  exibeComprePE: true,
  comprePEPage: 'http://delivery-homologacao.pe.gov.br',

  sefazNFEEndpoint: 'https://www.apigtw.pe.gov.br/apiman-gateway/sefaz/consulta-nfe/1.0/api/nfe-info/',
  sefazDanfeEndpoint: 'https://www.apigtw.pe.gov.br/apiman-gateway/sefaz/consulta-nfe/1.0/api/nfe-danfe/',
};

let prod: Env = {
  cartaServicosEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/gov/carta-servico/1.0/",
  buscaServicosEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/gov/carta-servico/1.0/servicos/novoBuscaGeral",
  servicosDestaqueEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/carta-servico/destaque-servicos/1.1/",
  apiKeyCartaServicos: "?apikey=81caf26b-1fd9-4c96-980e-12679b11a07a",
  production: true,
  faleConoscoEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/cidadao/publico/1.1/fale-conosco",
  detranConsultaPontuacaoEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaPontuacao/1.1/",
  detranConsultaVeiculoEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaVeiculoDados/1.1/",
  detranConsultaProtocolEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/detran/ConsultaProtocolo/1.0/",
  apiKeyDetran: "?apikey=eda4ee33-785f-4efd-bfff-3a12a739d48e",
  cadEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/cidadao/cadastro/1.1/",
  //"https://www.apigtw.pe.gov.br/apiman-gateway/cidadao-homolog/cadastro/1.0/",
  cadFotoEndpoint: "http://200.238.112.188:8080/cadastro_cidadao/api/",
  cadPublicoEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/cidadao/publico/1.1/",
  //"https://www.apigtw.pe.gov.br/apiman-gateway/cidadao-homolog/publico/1.0/",
  apikeyCadPublico: "?apikey=a7a9b899-d2f3-46ac-8f34-ee86101af30e",

  //"?apikey=28ebb485-9c94-422a-a481-fcda78c93171",
  compesaEndpoint:
    "http://webservices.compesa.com.br:8080/compesaWebService/services",
  apiKeyCompesa: "9226517c71b3f7b312731720cee72f76",
  ctmEndpoint:
    "https://www.apigtw.pe.gov.br/apiman-gateway/gov/grande-recife/1.0/",
  apiKeyCtm: "?apikey=eda4ee33-785f-4efd-bfff-3a12a739d48e",

  cepEndpoint: "http://api.postmon.com.br/v1/cep/",
  autoCadastro:
    "https://www.apigtw.pe.gov.br/apiman-gateway/cidadao/auto-cadastro/1.1/",
  //"https://www.apigtw.pe.gov.br/apiman-gateway/cidadao-homolog/auto-cadastro/1.0/",
  alertaCelular:
    "https://www.apigtw.pe.gov.br/apiman-gateway/sds/alerta-prod/1.0/",
  //ativarToken: "http://10.238.107.30/rgdigital/api/cidadao/ativar-token",
  ativarToken:
    "https://www.apigtw.pe.gov.br/apiman-gateway/homolog/cadastro/1.0/check-rg-digital?apikey=28ebb485-9c94-422a-a481-fcda78c93171",
  visualizarRg: `https://www.apigtw.pe.gov.br/apiman-gateway/cidadao/cadastro/1.0/rg-imagem?apikey=28ebb485-9c94-422a-a481-fcda78c93171`,

  openStreetMapTileEndpoint: "https://mapas.pe.gov.br/hot",
  openStreetMapNominatimEndpoint: "https://mapas.pe.gov.br/nominatim",

  keycloak: {
    url: "https://www.sso.pe.gov.br/auth/",
    realm: "cidadao",
    clientId: "portal-cidadao",
    credentials: {
      secret: "db0e4fdb-ece8-4e9d-bad3-866eed98e095"
    }
  },

  ssoActive: true,

  agendamento: endpoint =>
    `https://www.apigtw.pe.gov.br/apiman-gateway/governo/agendamento/1.0/${endpoint}?apikey=8843887d-4312-4d3e-b428-35cac6e64cc7`,
  agendamentoServicos: id =>
    `https://www.apigtw.pe.gov.br/apiman-gateway/carta-servico/servicos/1.0/buscarContando/${id}`,
  maps: endpoint => `http://mapas.pe.gov.br/${endpoint}`,

  participaUrl: 'https://participa.pe.gov.br',
  exibeNotifica: false,
  exibeConsultaNFe: true,
  exibeAvalia: false,

  exibeComprePE: true,
  comprePEPage: 'https://comprepe.pe.gov.br',

  sefazNFEEndpoint: 'https://www.apigtw.pe.gov.br/apiman-gateway/sefaz/consulta-nfe/1.0/api/nfe-info/',
  sefazDanfeEndpoint: 'https://www.apigtw.pe.gov.br/apiman-gateway/sefaz/consulta-nfe/1.0/api/nfe-danfe/',
};

export const environment = prod;
