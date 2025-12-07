import { entities, relationships } from "@/data/airbnbSchema";
import { Database, Link2, Key, Table2 } from "lucide-react";

export const Stats = () => {
  const totalAttributes = entities.reduce(
    (sum, e) => sum + e.attributes.length,
    0
  );
  const totalPKs = entities.reduce(
    (sum, e) => sum + e.attributes.filter((a) => a.isPrimaryKey).length,
    0
  );
  const totalFKs = entities.reduce(
    (sum, e) => sum + e.attributes.filter((a) => a.isForeignKey).length,
    0
  );

  const stats = [
    {
      label: "Entidades",
      value: entities.length,
      icon: Table2,
      color: "text-primary",
    },
    {
      label: "Atributos",
      value: totalAttributes,
      icon: Database,
      color: "text-secondary",
    },
    {
      label: "Chaves Primárias",
      value: totalPKs,
      icon: Key,
      color: "text-accent",
    },
    {
      label: "Chaves Estrangeiras",
      value: totalFKs,
      icon: Link2,
      color: "text-entity-review",
    },
    {
      label: "Relacionamentos",
      value: relationships.length,
      icon: Link2,
      color: "text-entity-payment",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "50ms" }}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-lg p-4 text-center"
        >
          <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
