import { Database, GitBranch, Home } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                Airbnb DER
              </h1>
              <p className="text-sm text-muted-foreground">
                Diagrama de Entidade e Relacionamento
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GitBranch className="w-4 h-4" />
            <span className="font-mono">v1.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};
