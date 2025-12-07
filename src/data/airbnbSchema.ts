export interface Attribute {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: string;
  nullable?: boolean;
  description?: string;
}

export interface Entity {
  name: string;
  tableName: string;
  color: string;
  glowClass: string;
  attributes: Attribute[];
  description: string;
}

export interface Relationship {
  from: string;
  to: string;
  fromCardinality: "1" | "N";
  toCardinality: "1" | "N";
  label: string;
}

export const entities: Entity[] = [
  {
    name: "Usuário",
    tableName: "usuario",
    color: "entity-user",
    glowClass: "entity-glow-user",
    description: "Usuários da plataforma (hóspedes e anfitriões)",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "email", type: "VARCHAR(255)", description: "Email único do usuário" },
      { name: "senha_hash", type: "VARCHAR(255)", description: "Hash da senha" },
      { name: "primeiro_nome", type: "VARCHAR(100)", description: "Primeiro nome" },
      { name: "sobrenome", type: "VARCHAR(100)", description: "Sobrenome" },
      { name: "telefone", type: "VARCHAR(20)", nullable: true, description: "Telefone" },
      { name: "foto_perfil", type: "TEXT", nullable: true, description: "URL da foto" },
      { name: "biografia", type: "TEXT", nullable: true, description: "Biografia" },
      { name: "eh_anfitriao", type: "BOOLEAN", description: "É anfitrião?" },
      { name: "eh_verificado", type: "BOOLEAN", description: "Verificado?" },
      { name: "criado_em", type: "TIMESTAMP", description: "Data de criação" },
      { name: "atualizado_em", type: "TIMESTAMP", description: "Última atualização" },
    ],
  },
  {
    name: "Propriedade",
    tableName: "propriedade",
    color: "entity-property",
    glowClass: "entity-glow-property",
    description: "Imóveis listados para aluguel",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "anfitriao_id", type: "UUID", isForeignKey: true, references: "usuario.id", description: "ID do anfitrião" },
      { name: "titulo", type: "VARCHAR(200)", description: "Título do anúncio" },
      { name: "descricao", type: "TEXT", description: "Descrição detalhada" },
      { name: "tipo_propriedade", type: "VARCHAR(50)", description: "Tipo (casa, apto, etc)" },
      { name: "tipo_quarto", type: "VARCHAR(50)", description: "Tipo de quarto" },
      { name: "max_hospedes", type: "INTEGER", description: "Máximo de hóspedes" },
      { name: "quartos", type: "INTEGER", description: "Número de quartos" },
      { name: "camas", type: "INTEGER", description: "Número de camas" },
      { name: "banheiros", type: "DECIMAL(3,1)", description: "Número de banheiros" },
      { name: "preco_noite", type: "DECIMAL(10,2)", description: "Preço por noite" },
      { name: "taxa_limpeza", type: "DECIMAL(10,2)", nullable: true, description: "Taxa de limpeza" },
      { name: "endereco", type: "VARCHAR(255)", description: "Endereço" },
      { name: "cidade", type: "VARCHAR(100)", description: "Cidade" },
      { name: "estado", type: "VARCHAR(100)", description: "Estado" },
      { name: "pais", type: "VARCHAR(100)", description: "País" },
      { name: "cep", type: "VARCHAR(20)", description: "CEP" },
      { name: "latitude", type: "DECIMAL(10,8)", description: "Latitude" },
      { name: "longitude", type: "DECIMAL(11,8)", description: "Longitude" },
      { name: "esta_ativo", type: "BOOLEAN", description: "Está ativo?" },
      { name: "criado_em", type: "TIMESTAMP", description: "Data de criação" },
    ],
  },
  {
    name: "Reserva",
    tableName: "reserva",
    color: "entity-booking",
    glowClass: "entity-glow-booking",
    description: "Reservas feitas pelos hóspedes",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "propriedade_id", type: "UUID", isForeignKey: true, references: "propriedade.id", description: "ID da propriedade" },
      { name: "hospede_id", type: "UUID", isForeignKey: true, references: "usuario.id", description: "ID do hóspede" },
      { name: "data_entrada", type: "DATE", description: "Data de entrada" },
      { name: "data_saida", type: "DATE", description: "Data de saída" },
      { name: "num_hospedes", type: "INTEGER", description: "Número de hóspedes" },
      { name: "preco_total", type: "DECIMAL(10,2)", description: "Preço total" },
      { name: "status", type: "VARCHAR(20)", description: "Status da reserva" },
      { name: "pedidos_especiais", type: "TEXT", nullable: true, description: "Pedidos especiais" },
      { name: "criado_em", type: "TIMESTAMP", description: "Data de criação" },
      { name: "atualizado_em", type: "TIMESTAMP", description: "Última atualização" },
    ],
  },
  {
    name: "Avaliação",
    tableName: "avaliacao",
    color: "entity-review",
    glowClass: "entity-glow-review",
    description: "Avaliações de propriedades e hóspedes",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "reserva_id", type: "UUID", isForeignKey: true, references: "reserva.id", description: "ID da reserva" },
      { name: "avaliador_id", type: "UUID", isForeignKey: true, references: "usuario.id", description: "ID do avaliador" },
      { name: "avaliado_id", type: "UUID", isForeignKey: true, references: "usuario.id", description: "ID do avaliado" },
      { name: "propriedade_id", type: "UUID", isForeignKey: true, references: "propriedade.id", nullable: true, description: "ID da propriedade" },
      { name: "nota", type: "INTEGER", description: "Nota (1-5)" },
      { name: "nota_limpeza", type: "INTEGER", nullable: true, description: "Nota limpeza" },
      { name: "nota_comunicacao", type: "INTEGER", nullable: true, description: "Nota comunicação" },
      { name: "nota_checkin", type: "INTEGER", nullable: true, description: "Nota check-in" },
      { name: "nota_precisao", type: "INTEGER", nullable: true, description: "Nota precisão" },
      { name: "nota_localizacao", type: "INTEGER", nullable: true, description: "Nota localização" },
      { name: "nota_custo_beneficio", type: "INTEGER", nullable: true, description: "Nota custo-benefício" },
      { name: "comentario", type: "TEXT", description: "Comentário" },
      { name: "criado_em", type: "TIMESTAMP", description: "Data de criação" },
    ],
  },
  {
    name: "Pagamento",
    tableName: "pagamento",
    color: "entity-payment",
    glowClass: "entity-glow-payment",
    description: "Transações financeiras",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "reserva_id", type: "UUID", isForeignKey: true, references: "reserva.id", description: "ID da reserva" },
      { name: "pagador_id", type: "UUID", isForeignKey: true, references: "usuario.id", description: "ID do pagador" },
      { name: "valor", type: "DECIMAL(10,2)", description: "Valor total" },
      { name: "moeda", type: "VARCHAR(3)", description: "Moeda (BRL, USD)" },
      { name: "metodo_pagamento", type: "VARCHAR(50)", description: "Método de pagamento" },
      { name: "status", type: "VARCHAR(20)", description: "Status do pagamento" },
      { name: "transacao_id", type: "VARCHAR(255)", nullable: true, description: "ID da transação" },
      { name: "pago_em", type: "TIMESTAMP", nullable: true, description: "Data do pagamento" },
      { name: "criado_em", type: "TIMESTAMP", description: "Data de criação" },
    ],
  },
  {
    name: "Comodidade",
    tableName: "comodidade",
    color: "entity-amenity",
    glowClass: "entity-glow-amenity",
    description: "Comodidades disponíveis nas propriedades",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "nome", type: "VARCHAR(100)", description: "Nome da comodidade" },
      { name: "icone", type: "VARCHAR(50)", nullable: true, description: "Ícone" },
      { name: "categoria", type: "VARCHAR(50)", description: "Categoria" },
    ],
  },
  {
    name: "Propriedade_Comodidade",
    tableName: "propriedade_comodidade",
    color: "entity-amenity",
    glowClass: "entity-glow-amenity",
    description: "Relação N:N entre propriedades e comodidades",
    attributes: [
      { name: "propriedade_id", type: "UUID", isPrimaryKey: true, isForeignKey: true, references: "propriedade.id", description: "ID da propriedade" },
      { name: "comodidade_id", type: "UUID", isPrimaryKey: true, isForeignKey: true, references: "comodidade.id", description: "ID da comodidade" },
    ],
  },
  {
    name: "Foto",
    tableName: "foto",
    color: "entity-photo",
    glowClass: "entity-glow-photo",
    description: "Fotos das propriedades",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "propriedade_id", type: "UUID", isForeignKey: true, references: "propriedade.id", description: "ID da propriedade" },
      { name: "url", type: "TEXT", description: "URL da imagem" },
      { name: "legenda", type: "VARCHAR(255)", nullable: true, description: "Legenda" },
      { name: "eh_principal", type: "BOOLEAN", description: "É foto principal?" },
      { name: "ordem", type: "INTEGER", description: "Ordem de exibição" },
      { name: "criado_em", type: "TIMESTAMP", description: "Data de upload" },
    ],
  },
  {
    name: "Mensagem",
    tableName: "mensagem",
    color: "entity-message",
    glowClass: "entity-glow-message",
    description: "Mensagens entre usuários",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "remetente_id", type: "UUID", isForeignKey: true, references: "usuario.id", description: "ID do remetente" },
      { name: "destinatario_id", type: "UUID", isForeignKey: true, references: "usuario.id", description: "ID do destinatário" },
      { name: "reserva_id", type: "UUID", isForeignKey: true, references: "reserva.id", nullable: true, description: "ID da reserva" },
      { name: "conteudo", type: "TEXT", description: "Conteúdo da mensagem" },
      { name: "foi_lida", type: "BOOLEAN", description: "Foi lida?" },
      { name: "criado_em", type: "TIMESTAMP", description: "Data de envio" },
    ],
  },
  {
    name: "Lista de Desejos",
    tableName: "lista_desejos",
    color: "entity-user",
    glowClass: "entity-glow-user",
    description: "Listas de propriedades favoritas",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "usuario_id", type: "UUID", isForeignKey: true, references: "usuario.id", description: "ID do usuário" },
      { name: "nome", type: "VARCHAR(100)", description: "Nome da lista" },
      { name: "criado_em", type: "TIMESTAMP", description: "Data de criação" },
    ],
  },
  {
    name: "Item Lista de Desejos",
    tableName: "item_lista_desejos",
    color: "entity-user",
    glowClass: "entity-glow-user",
    description: "Propriedades em listas de desejos",
    attributes: [
      { name: "lista_desejos_id", type: "UUID", isPrimaryKey: true, isForeignKey: true, references: "lista_desejos.id", description: "ID da lista" },
      { name: "propriedade_id", type: "UUID", isPrimaryKey: true, isForeignKey: true, references: "propriedade.id", description: "ID da propriedade" },
      { name: "adicionado_em", type: "TIMESTAMP", description: "Data de adição" },
    ],
  },
];

export const relationships: Relationship[] = [
  { from: "usuario", to: "propriedade", fromCardinality: "1", toCardinality: "N", label: "hospeda" },
  { from: "usuario", to: "reserva", fromCardinality: "1", toCardinality: "N", label: "faz reserva" },
  { from: "propriedade", to: "reserva", fromCardinality: "1", toCardinality: "N", label: "recebe" },
  { from: "reserva", to: "avaliacao", fromCardinality: "1", toCardinality: "N", label: "gera" },
  { from: "reserva", to: "pagamento", fromCardinality: "1", toCardinality: "1", label: "tem" },
  { from: "usuario", to: "avaliacao", fromCardinality: "1", toCardinality: "N", label: "escreve" },
  { from: "propriedade", to: "avaliacao", fromCardinality: "1", toCardinality: "N", label: "recebe" },
  { from: "propriedade", to: "foto", fromCardinality: "1", toCardinality: "N", label: "possui" },
  { from: "propriedade", to: "propriedade_comodidade", fromCardinality: "1", toCardinality: "N", label: "tem" },
  { from: "comodidade", to: "propriedade_comodidade", fromCardinality: "1", toCardinality: "N", label: "está em" },
  { from: "usuario", to: "mensagem", fromCardinality: "1", toCardinality: "N", label: "envia" },
  { from: "usuario", to: "lista_desejos", fromCardinality: "1", toCardinality: "N", label: "cria" },
  { from: "lista_desejos", to: "item_lista_desejos", fromCardinality: "1", toCardinality: "N", label: "contém" },
  { from: "propriedade", to: "item_lista_desejos", fromCardinality: "1", toCardinality: "N", label: "está em" },
  { from: "usuario", to: "pagamento", fromCardinality: "1", toCardinality: "N", label: "paga" },
];
