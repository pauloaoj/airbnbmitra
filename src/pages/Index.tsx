import { useState } from "react";
import { Header } from "@/components/Header";
import { EntityCard } from "@/components/EntityCard";
import { Legend } from "@/components/Legend";
import { RelationshipList } from "@/components/RelationshipList";
import { Stats } from "@/components/Stats";
import { DiagramView } from "@/components/DiagramView";
import { entities } from "@/data/airbnbSchema";
import { LayoutGrid, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [viewMode, setViewMode] = useState<"cards" | "diagram">("cards");

  return (
    <div className="min-h-screen bg-background blueprint-grid">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <section className="mb-8">
          <Stats />
        </section>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className="gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            Cartões
          </Button>
          <Button
            variant={viewMode === "diagram" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("diagram")}
            className="gap-2"
          >
            <GitBranch className="w-4 h-4" />
            Diagrama Visual
          </Button>
        </div>

        {viewMode === "diagram" ? (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Diagrama de Entidade e Relacionamento
            </h2>
            <DiagramView />
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <Legend />
              <RelationshipList />
            </aside>

            {/* Entity Cards Grid */}
            <section className="lg:col-span-3">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Entidades do Sistema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entities.map((entity, index) => (
                  <EntityCard
                    key={entity.tableName}
                    entity={entity}
                    delay={300 + index * 100}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Diagrama de Entidade e Relacionamento • Airbnb Clone • {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
