import { Key, Link2, Circle } from "lucide-react";

const entityColors = [
  { name: "Usuário", color: "entity-user" },
  { name: "Propriedade", color: "entity-property" },
  { name: "Reserva", color: "entity-booking" },
  { name: "Avaliação", color: "entity-review" },
  { name: "Pagamento", color: "entity-payment" },
  { name: "Comodidade", color: "entity-amenity" },
  { name: "Mensagem", color: "entity-message" },
  { name: "Foto", color: "entity-photo" },
];

export const Legend = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <h3 className="font-semibold text-foreground mb-4">Legenda</h3>

      {/* Key types */}
      <div className="space-y-2 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-sm">
          <Key className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Chave Primária (PK)</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link2 className="w-4 h-4 text-secondary" />
          <span className="text-muted-foreground">Chave Estrangeira (FK)</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-sm text-muted-foreground">campo?</span>
          <span className="text-muted-foreground">Campo Nullable</span>
        </div>
      </div>

      {/* Cardinality */}
      <div className="space-y-2 mb-4 pb-4 border-b border-border">
        <p className="text-sm font-medium text-foreground mb-2">Cardinalidade</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">1:1</span>
          <span className="text-muted-foreground">Um para Um</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">1:N</span>
          <span className="text-muted-foreground">Um para Muitos</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">N:N</span>
          <span className="text-muted-foreground">Muitos para Muitos</span>
        </div>
      </div>

      {/* Entity colors */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground mb-2">Entidades</p>
        <div className="grid grid-cols-2 gap-2">
          {entityColors.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <Circle
                className="w-3 h-3"
                fill={`hsl(var(--${item.color}))`}
                stroke="none"
              />
              <span className="text-muted-foreground text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
