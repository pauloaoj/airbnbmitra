import { relationships } from "@/data/airbnbSchema";
import { ArrowRight } from "lucide-react";

export const RelationshipList = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <h3 className="font-semibold text-foreground mb-4">Relacionamentos</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {relationships.map((rel, index) => (
          <div
            key={`${rel.from}-${rel.to}-${index}`}
            className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted/30 transition-colors"
          >
            <span className="font-mono text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded">
              {rel.from}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs font-mono">{rel.fromCardinality}</span>
              <ArrowRight className="w-3 h-3" />
              <span className="text-xs font-mono">{rel.toCardinality}</span>
            </div>
            <span className="font-mono text-xs text-accent bg-accent/10 px-2 py-0.5 rounded">
              {rel.to}
            </span>
            <span className="text-xs text-muted-foreground italic ml-auto">
              {rel.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
