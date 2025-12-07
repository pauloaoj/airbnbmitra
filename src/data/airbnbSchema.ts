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
    tableName: "users",
    color: "entity-user",
    glowClass: "entity-glow-user",
    description: "Usuários da plataforma (hóspedes e anfitriões)",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "email", type: "VARCHAR(255)", description: "Email único do usuário" },
      { name: "password_hash", type: "VARCHAR(255)", description: "Hash da senha" },
      { name: "first_name", type: "VARCHAR(100)", description: "Primeiro nome" },
      { name: "last_name", type: "VARCHAR(100)", description: "Sobrenome" },
      { name: "phone", type: "VARCHAR(20)", nullable: true, description: "Telefone" },
      { name: "profile_photo", type: "TEXT", nullable: true, description: "URL da foto" },
      { name: "bio", type: "TEXT", nullable: true, description: "Biografia" },
      { name: "is_host", type: "BOOLEAN", description: "É anfitrião?" },
      { name: "is_verified", type: "BOOLEAN", description: "Verificado?" },
      { name: "created_at", type: "TIMESTAMP", description: "Data de criação" },
      { name: "updated_at", type: "TIMESTAMP", description: "Última atualização" },
    ],
  },
  {
    name: "Propriedade",
    tableName: "properties",
    color: "entity-property",
    glowClass: "entity-glow-property",
    description: "Imóveis listados para aluguel",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "host_id", type: "UUID", isForeignKey: true, references: "users.id", description: "ID do anfitrião" },
      { name: "title", type: "VARCHAR(200)", description: "Título do anúncio" },
      { name: "description", type: "TEXT", description: "Descrição detalhada" },
      { name: "property_type", type: "VARCHAR(50)", description: "Tipo (casa, apto, etc)" },
      { name: "room_type", type: "VARCHAR(50)", description: "Tipo de quarto" },
      { name: "max_guests", type: "INTEGER", description: "Máximo de hóspedes" },
      { name: "bedrooms", type: "INTEGER", description: "Número de quartos" },
      { name: "beds", type: "INTEGER", description: "Número de camas" },
      { name: "bathrooms", type: "DECIMAL(3,1)", description: "Número de banheiros" },
      { name: "price_per_night", type: "DECIMAL(10,2)", description: "Preço por noite" },
      { name: "cleaning_fee", type: "DECIMAL(10,2)", nullable: true, description: "Taxa de limpeza" },
      { name: "address", type: "VARCHAR(255)", description: "Endereço" },
      { name: "city", type: "VARCHAR(100)", description: "Cidade" },
      { name: "state", type: "VARCHAR(100)", description: "Estado" },
      { name: "country", type: "VARCHAR(100)", description: "País" },
      { name: "zip_code", type: "VARCHAR(20)", description: "CEP" },
      { name: "latitude", type: "DECIMAL(10,8)", description: "Latitude" },
      { name: "longitude", type: "DECIMAL(11,8)", description: "Longitude" },
      { name: "is_active", type: "BOOLEAN", description: "Está ativo?" },
      { name: "created_at", type: "TIMESTAMP", description: "Data de criação" },
    ],
  },
  {
    name: "Reserva",
    tableName: "bookings",
    color: "entity-booking",
    glowClass: "entity-glow-booking",
    description: "Reservas feitas pelos hóspedes",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "property_id", type: "UUID", isForeignKey: true, references: "properties.id", description: "ID da propriedade" },
      { name: "guest_id", type: "UUID", isForeignKey: true, references: "users.id", description: "ID do hóspede" },
      { name: "check_in", type: "DATE", description: "Data de entrada" },
      { name: "check_out", type: "DATE", description: "Data de saída" },
      { name: "num_guests", type: "INTEGER", description: "Número de hóspedes" },
      { name: "total_price", type: "DECIMAL(10,2)", description: "Preço total" },
      { name: "status", type: "VARCHAR(20)", description: "Status da reserva" },
      { name: "special_requests", type: "TEXT", nullable: true, description: "Pedidos especiais" },
      { name: "created_at", type: "TIMESTAMP", description: "Data de criação" },
      { name: "updated_at", type: "TIMESTAMP", description: "Última atualização" },
    ],
  },
  {
    name: "Avaliação",
    tableName: "reviews",
    color: "entity-review",
    glowClass: "entity-glow-review",
    description: "Avaliações de propriedades e hóspedes",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "booking_id", type: "UUID", isForeignKey: true, references: "bookings.id", description: "ID da reserva" },
      { name: "reviewer_id", type: "UUID", isForeignKey: true, references: "users.id", description: "ID do avaliador" },
      { name: "reviewee_id", type: "UUID", isForeignKey: true, references: "users.id", description: "ID do avaliado" },
      { name: "property_id", type: "UUID", isForeignKey: true, references: "properties.id", nullable: true, description: "ID da propriedade" },
      { name: "rating", type: "INTEGER", description: "Nota (1-5)" },
      { name: "cleanliness", type: "INTEGER", nullable: true, description: "Nota limpeza" },
      { name: "communication", type: "INTEGER", nullable: true, description: "Nota comunicação" },
      { name: "check_in_rating", type: "INTEGER", nullable: true, description: "Nota check-in" },
      { name: "accuracy", type: "INTEGER", nullable: true, description: "Nota precisão" },
      { name: "location", type: "INTEGER", nullable: true, description: "Nota localização" },
      { name: "value", type: "INTEGER", nullable: true, description: "Nota custo-benefício" },
      { name: "comment", type: "TEXT", description: "Comentário" },
      { name: "created_at", type: "TIMESTAMP", description: "Data de criação" },
    ],
  },
  {
    name: "Pagamento",
    tableName: "payments",
    color: "entity-payment",
    glowClass: "entity-glow-payment",
    description: "Transações financeiras",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "booking_id", type: "UUID", isForeignKey: true, references: "bookings.id", description: "ID da reserva" },
      { name: "payer_id", type: "UUID", isForeignKey: true, references: "users.id", description: "ID do pagador" },
      { name: "amount", type: "DECIMAL(10,2)", description: "Valor total" },
      { name: "currency", type: "VARCHAR(3)", description: "Moeda (BRL, USD)" },
      { name: "payment_method", type: "VARCHAR(50)", description: "Método de pagamento" },
      { name: "status", type: "VARCHAR(20)", description: "Status do pagamento" },
      { name: "transaction_id", type: "VARCHAR(255)", nullable: true, description: "ID da transação" },
      { name: "paid_at", type: "TIMESTAMP", nullable: true, description: "Data do pagamento" },
      { name: "created_at", type: "TIMESTAMP", description: "Data de criação" },
    ],
  },
  {
    name: "Comodidade",
    tableName: "amenities",
    color: "entity-amenity",
    glowClass: "entity-glow-amenity",
    description: "Comodidades disponíveis nas propriedades",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "name", type: "VARCHAR(100)", description: "Nome da comodidade" },
      { name: "icon", type: "VARCHAR(50)", nullable: true, description: "Ícone" },
      { name: "category", type: "VARCHAR(50)", description: "Categoria" },
    ],
  },
  {
    name: "Propriedade_Comodidade",
    tableName: "property_amenities",
    color: "entity-amenity",
    glowClass: "entity-glow-amenity",
    description: "Relação N:N entre propriedades e comodidades",
    attributes: [
      { name: "property_id", type: "UUID", isPrimaryKey: true, isForeignKey: true, references: "properties.id", description: "ID da propriedade" },
      { name: "amenity_id", type: "UUID", isPrimaryKey: true, isForeignKey: true, references: "amenities.id", description: "ID da comodidade" },
    ],
  },
  {
    name: "Foto",
    tableName: "photos",
    color: "entity-photo",
    glowClass: "entity-glow-photo",
    description: "Fotos das propriedades",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "property_id", type: "UUID", isForeignKey: true, references: "properties.id", description: "ID da propriedade" },
      { name: "url", type: "TEXT", description: "URL da imagem" },
      { name: "caption", type: "VARCHAR(255)", nullable: true, description: "Legenda" },
      { name: "is_primary", type: "BOOLEAN", description: "É foto principal?" },
      { name: "order_index", type: "INTEGER", description: "Ordem de exibição" },
      { name: "created_at", type: "TIMESTAMP", description: "Data de upload" },
    ],
  },
  {
    name: "Mensagem",
    tableName: "messages",
    color: "entity-message",
    glowClass: "entity-glow-message",
    description: "Mensagens entre usuários",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "sender_id", type: "UUID", isForeignKey: true, references: "users.id", description: "ID do remetente" },
      { name: "receiver_id", type: "UUID", isForeignKey: true, references: "users.id", description: "ID do destinatário" },
      { name: "booking_id", type: "UUID", isForeignKey: true, references: "bookings.id", nullable: true, description: "ID da reserva" },
      { name: "content", type: "TEXT", description: "Conteúdo da mensagem" },
      { name: "is_read", type: "BOOLEAN", description: "Foi lida?" },
      { name: "created_at", type: "TIMESTAMP", description: "Data de envio" },
    ],
  },
  {
    name: "Lista de Desejos",
    tableName: "wishlists",
    color: "entity-user",
    glowClass: "entity-glow-user",
    description: "Listas de propriedades favoritas",
    attributes: [
      { name: "id", type: "UUID", isPrimaryKey: true, description: "Identificador único" },
      { name: "user_id", type: "UUID", isForeignKey: true, references: "users.id", description: "ID do usuário" },
      { name: "name", type: "VARCHAR(100)", description: "Nome da lista" },
      { name: "created_at", type: "TIMESTAMP", description: "Data de criação" },
    ],
  },
  {
    name: "Item Lista de Desejos",
    tableName: "wishlist_items",
    color: "entity-user",
    glowClass: "entity-glow-user",
    description: "Propriedades em listas de desejos",
    attributes: [
      { name: "wishlist_id", type: "UUID", isPrimaryKey: true, isForeignKey: true, references: "wishlists.id", description: "ID da lista" },
      { name: "property_id", type: "UUID", isPrimaryKey: true, isForeignKey: true, references: "properties.id", description: "ID da propriedade" },
      { name: "added_at", type: "TIMESTAMP", description: "Data de adição" },
    ],
  },
];

export const relationships: Relationship[] = [
  { from: "users", to: "properties", fromCardinality: "1", toCardinality: "N", label: "hospeda" },
  { from: "users", to: "bookings", fromCardinality: "1", toCardinality: "N", label: "faz reserva" },
  { from: "properties", to: "bookings", fromCardinality: "1", toCardinality: "N", label: "recebe" },
  { from: "bookings", to: "reviews", fromCardinality: "1", toCardinality: "N", label: "gera" },
  { from: "bookings", to: "payments", fromCardinality: "1", toCardinality: "1", label: "tem" },
  { from: "users", to: "reviews", fromCardinality: "1", toCardinality: "N", label: "escreve" },
  { from: "properties", to: "reviews", fromCardinality: "1", toCardinality: "N", label: "recebe" },
  { from: "properties", to: "photos", fromCardinality: "1", toCardinality: "N", label: "possui" },
  { from: "properties", to: "property_amenities", fromCardinality: "1", toCardinality: "N", label: "tem" },
  { from: "amenities", to: "property_amenities", fromCardinality: "1", toCardinality: "N", label: "está em" },
  { from: "users", to: "messages", fromCardinality: "1", toCardinality: "N", label: "envia" },
  { from: "users", to: "wishlists", fromCardinality: "1", toCardinality: "N", label: "cria" },
  { from: "wishlists", to: "wishlist_items", fromCardinality: "1", toCardinality: "N", label: "contém" },
  { from: "properties", to: "wishlist_items", fromCardinality: "1", toCardinality: "N", label: "está em" },
  { from: "users", to: "payments", fromCardinality: "1", toCardinality: "N", label: "paga" },
];
