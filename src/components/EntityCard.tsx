import { Key, Link2 } from "lucide-react";
import { Entity } from "@/data/airbnbSchema";
import { cn } from "@/lib/utils";

interface EntityCardProps {
  entity: Entity;
  delay?: number;
}

export const EntityCard = ({ entity, delay = 0 }: EntityCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card overflow-hidden opacity-0 animate-fade-in",
        entity.glowClass
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div
        className={cn(
          "px-4 py-3 border-b border-border flex items-center justify-between",
          `bg-${entity.color}/10`
        )}
        style={{
          backgroundColor: `hsl(var(--${entity.color}) / 0.15)`,
        }}
      >
        <div>
          <h3 className="font-semibold text-foreground">{entity.name}</h3>
          <p className="text-xs font-mono text-muted-foreground">{entity.tableName}</p>
        </div>
        <div
          className="w-3 h-3 rounded-full animate-pulse-glow"
          style={{ backgroundColor: `hsl(var(--${entity.color}))` }}
        />
      </div>

      {/* Description */}
      <div className="px-4 py-2 border-b border-border bg-muted/30">
        <p className="text-xs text-muted-foreground">{entity.description}</p>
      </div>

      {/* Attributes */}
      <div className="divide-y divide-border/50">
        {entity.attributes.map((attr) => (
          <div
            key={attr.name}
            className="px-4 py-2 flex items-center gap-3 hover:bg-muted/30 transition-colors group"
          >
            {/* Key indicators */}
            <div className="w-5 flex justify-center">
              {attr.isPrimaryKey && (
                <Key className="w-3.5 h-3.5 text-primary" />
              )}
              {attr.isForeignKey && !attr.isPrimaryKey && (
                <Link2 className="w-3.5 h-3.5 text-secondary" />
              )}
            </div>

            {/* Attribute name */}
            <span
              className={cn(
                "font-mono text-sm flex-1",
                attr.isPrimaryKey && "text-primary font-medium",
                attr.isForeignKey && !attr.isPrimaryKey && "text-secondary",
                !attr.isPrimaryKey && !attr.isForeignKey && "text-foreground"
              )}
            >
              {attr.name}
              {attr.nullable && (
                <span className="text-muted-foreground ml-1">?</span>
              )}
            </span>

            {/* Type */}
            <span className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
              {attr.type}
            </span>
          </div>
        ))}
      </div>

      {/* Foreign key references */}
      {entity.attributes.some((a) => a.isForeignKey) && (
        <div className="px-4 py-2 bg-muted/20 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1">Referências:</p>
          <div className="flex flex-wrap gap-1">
            {entity.attributes
              .filter((a) => a.isForeignKey && a.references)
              .map((attr) => (
                <span
                  key={attr.name}
                  className="text-xs font-mono bg-secondary/20 text-secondary px-2 py-0.5 rounded"
                >
                  {attr.name} → {attr.references}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
