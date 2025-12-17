import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { entities, relationships } from "@/data/airbnbSchema";
import { Key, Link } from "lucide-react";

const entityColorMap: Record<string, string> = {
  "entity-user": "#3b82f6",
  "entity-property": "#10b981",
  "entity-booking": "#f59e0b",
  "entity-review": "#8b5cf6",
  "entity-payment": "#ef4444",
  "entity-amenity": "#06b6d4",
  "entity-photo": "#ec4899",
  "entity-message": "#6366f1",
  "entity-location": "#f97316",
};

const EntityNode = ({ data }: { data: { entity: typeof entities[0] } }) => {
  const { entity } = data;
  const bgColor = entityColorMap[entity.color] || "#6b7280";

  return (
    <div
      className="rounded-lg shadow-lg border-2 min-w-[200px] bg-card"
      style={{ borderColor: bgColor }}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <Handle type="target" position={Position.Left} className="!bg-primary" />
      
      <div
        className="px-3 py-2 rounded-t-md font-bold text-white text-sm"
        style={{ backgroundColor: bgColor }}
      >
        {entity.name}
      </div>
      
      <div className="p-2 text-xs max-h-[200px] overflow-y-auto">
        {entity.attributes.slice(0, 6).map((attr) => (
          <div
            key={attr.name}
            className="flex items-center gap-1 py-0.5 text-foreground"
          >
            {attr.isPrimaryKey && (
              <Key className="w-3 h-3 text-yellow-500" />
            )}
            {attr.isForeignKey && !attr.isPrimaryKey && (
              <Link className="w-3 h-3 text-blue-400" />
            )}
            <span className={attr.isPrimaryKey ? "font-semibold" : ""}>
              {attr.name}
            </span>
            <span className="text-muted-foreground ml-auto text-[10px]">
              {attr.type.split("(")[0]}
            </span>
          </div>
        ))}
        {entity.attributes.length > 6 && (
          <div className="text-muted-foreground text-center mt-1">
            +{entity.attributes.length - 6} campos
          </div>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
      <Handle type="source" position={Position.Right} className="!bg-primary" />
    </div>
  );
};

const nodeTypes = {
  entity: EntityNode,
};

// Posições organizadas para melhor visualização
const nodePositions: Record<string, { x: number; y: number }> = {
  usuario: { x: 500, y: 0 },
  // Hierarquia de localização
  pais: { x: -300, y: 0 },
  estado: { x: -300, y: 150 },
  cidade: { x: -300, y: 300 },
  // Propriedade
  propriedade: { x: 100, y: 200 },
  reserva: { x: 500, y: 400 },
  // Avaliações bidirecionais
  avaliacao_propriedade: { x: 800, y: 350 },
  avaliacao_hospede: { x: 800, y: 500 },
  // Outros
  pagamento: { x: 500, y: 620 },
  comodidade: { x: -100, y: 500 },
  propriedade_comodidade: { x: 100, y: 500 },
  foto: { x: 100, y: 400 },
  mensagem: { x: 800, y: 200 },
  lista_desejos: { x: 800, y: 0 },
  item_lista_desejos: { x: 1050, y: 150 },
};

export const DiagramView = () => {
  const initialNodes: Node[] = useMemo(() => {
    return entities.map((entity) => ({
      id: entity.tableName,
      type: "entity",
      position: nodePositions[entity.tableName] || { x: 0, y: 0 },
      data: { entity },
    }));
  }, []);

  const initialEdges: Edge[] = useMemo(() => {
    return relationships.map((rel, index) => ({
      id: `edge-${index}`,
      source: rel.from,
      target: rel.to,
      label: `${rel.fromCardinality}:${rel.toCardinality} ${rel.label}`,
      type: "smoothstep",
      animated: true,
      style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
      labelStyle: { 
        fill: "hsl(var(--foreground))", 
        fontSize: 10,
        fontWeight: 500,
      },
      labelBgStyle: { 
        fill: "hsl(var(--card))", 
        fillOpacity: 0.9,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "hsl(var(--primary))",
      },
    }));
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[700px] rounded-lg border border-border overflow-hidden bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
      >
        <Background color="hsl(var(--muted-foreground))" gap={20} size={1} />
        <Controls className="!bg-card !border-border" />
        <MiniMap
          nodeColor={(node) => {
            const entity = entities.find((e) => e.tableName === node.id);
            return entity ? entityColorMap[entity.color] || "#6b7280" : "#6b7280";
          }}
          className="!bg-card !border-border"
        />
      </ReactFlow>
    </div>
  );
};
