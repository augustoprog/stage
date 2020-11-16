export interface RootObject {
  totalResultados?: number;
  tamanhoPagina?: number;
  primeiroResultado?: number;
  limitarItensAtivos?: boolean;
  resultadosUnicos?: boolean;
  consultarTotalResultado?: boolean;
  retornarApenasCamposPadrao?: boolean;
  entidadeConsulta?: EntidadeConsulta;
  resultado?: Resultado[];
  cidadaoId?: number;
  nascimento?: string;
}

export interface Cidadao {
  id: number;
}

export interface ServicoUnidade {
  id: number;
  servico: Servico;
  unidadeAtendimento: UnidadeAtendimento;
  numMinDuracao: number;
}

export interface UnidadeAtendimento {
  id: number;
  nome: string;
  sigla: string;
  orgao: Orgao2;
  enderecos: Endereco[];
  endereco: Endereco;
}

export interface Endereco {
  uf: string;
  siglaUf: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  numero: string;
  cep: string;
  complemento: string;
}

export interface Orgao2 {
  id: number;
  nome: string;
  sigla: string;
  unidadeOrganizacional: string;
}

export interface Servico {
  id: number;
  categoria: Categoria;
  sigla: string;
  nome: string;
  descricao: string;
  tempoEntrega: string;
  requisitos: string;
  flagPublicado: boolean;
  flagGratuito: boolean;
  flagTotalmenteOnline: boolean;
}

export interface Categoria {
  id: number;
  orgao: Orgao;
}

export interface Orgao {
  id: number;
  nome: string;
}

export interface EntidadeConsulta {
  pessoa?: Pessoa;
  protocolo?: string;
}

export interface Resultado {
  versao: number;
  id: number;
  agendamento: string;
  horarioAgenda: HorarioAgenda;
  pessoa: Pessoa;
  infosAdicionaisAgendamentos: InfosAdicionaisAgendamento[];
  relacionados: Relacionado[];
  titularParticipa?: boolean;
  status?: string;
  numeroSenha?: string;
  protocolo?: string;
  lembreteEmail?: boolean;
  horariosRelacionados?: HorarioAgenda[];
  ipCidadao?: string;
  usuarioAlteracao?: UsuarioAlteracao;
}

export interface InfosAdicionaisAgendamento {
  agendamento: {};
  valor: string;
  informacaoAdicional: InformacaoAdicional2;
}

export interface InformacaoAdicional2 {
  id: number;
  versao: number;
  nome: string;
  expressao: string;
  tipo: string;
  obrigatorio: boolean;
  mascara: string;
  tamanho: number;
  mensagem: string;
}

export interface HorariosRelacionado {
  versao: number;
  id: number;
  horario: string;
  vagas: number;
}

export interface Relacionado {
  versao: number;
  id: number;
  cidadao: Cidadao;
  nomeCompleto: string;
  nascimento: string | Date;
  infoAdicionaisDTO: InfoAdicionaisDTO;
  portadorDeficiencia: boolean;
  cpf: string;
  selecao: boolean;
}

export interface InfoAdicionaisDTO {
  informacoesAdicionais: InformacoesAdicionais[];
  valoresValidos: boolean;
}

export interface InformacoesAdicionais {
  dependente: Dependente;
  informacaoAdicional: InformacaoAdicional;
  valor: string;
}

export interface InformacaoAdicional {
  id: number;
  versao: number;
  nome: string;
  expressao: string;
  mascara: string;
  mensagem: string;
  obrigatorio: boolean;
  orgao: Orgao;
  servico: Servico;
  tamanho: number;
  tipo: string;
}

export interface Dependente {
  portadorDeficiencia: boolean;
  id: number;
}

export interface Pessoa {
  versao: number;
  id: number;
  cidadao: Cidadao;
  nome: string;
  cpf: string;
  nascimento: string;
  email: string;
  usuarioAlteracao: UsuarioAlteracao;
  telefoneFixo: string;
  telefoneCelular: string;
  selecao?: boolean;
}

export interface Cidadao {
  id: number;
}

export interface HorarioAgenda {
  versao: number;
  id: number;
  agendaUnidade: AgendaUnidade;
  servicoUnidade: ServicoUnidade;
  horario: string;
  vagas: number;
  duracao: number;
  usuarioAlteracao: UsuarioAlteracao;
}

export interface UsuarioAlteracao {
  loginSso: string;
}

export interface ServicoUnidade {
  id: number;
  servico: Servico;
  unidadeAtendimento: UnidadeAtendimento;
  numMinDuracao: number;
}

export interface UnidadeAtendimento {
  id: number;
  nome: string;
  sigla: string;
  orgao: Orgao2;
  enderecos: Endereco[];
  endereco: Endereco;
}

export interface Endereco {
  uf: string;
  siglaUf: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  numero: string;
  cep: string;
  complemento: string;
}

export interface Orgao2 {
  id: number;
  nome: string;
  sigla: string;
  unidadeOrganizacional: string;
}

export interface Servico {
  id: number;
  categoria: Categoria;
  sigla: string;
  nome: string;
  descricao: string;
  tempoEntrega: string;
  requisitos: string;
  flagPublicado: boolean;
  flagGratuito: boolean;
  flagTotalmenteOnline: boolean;
}

export interface Categoria {
  id: number;
  orgao: Orgao;
}

export interface Orgao {
  id: number;
  nome: string;
}

export interface AgendaUnidade {
  versao: number;
  id: number;
}

export interface BuscaDatasAgendamentos {
  data?: Date;
  totalResultados: number;
  primeiroResultado: number;
  tamanhoPagina: number;
  entidadeConsulta: EntidadeConsulta;
  servicoId: number;
  unidadeIds: number[];
}

export interface DatasAgendamento {
  datas: string[];
  dataInicial: string;
  dataFinal: string;
}

export interface AgendamentoNaoComparecidoConsulta {
  totalResultados: number;
  primeiroResultado: number;
  tamanhoPagina: number;
  pessoa: Pessoa;
  consultaPorTilular: boolean;
  servicoId: string;
  orgaoId: number;
  selecao?: boolean;
}
