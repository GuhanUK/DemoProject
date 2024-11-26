import React, { useCallback, useState } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MarkerType, Panel, ReactFlow } from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import FlowForm from "./Form";
import NewData from "./NewData";

const NewReactFlow = () => {
  const initialNodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Hello" },
      type: "editableNode",
    },
    {
      id: "2",
      position: { x: 100, y: 100 },
      data: { label: "Hello" },
      type: "newData",
    },
  ];

  const initialEdges = [];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeId, setNodeId] = useState(3); // For unique node IDs
  const [nodeName, setNodeName] = useState('');
  // Handlers   for node and edge changes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Add a new node dynamically
  const addNode = () => {
    const newNode = {
      id: nodeId.toString(),
      data: { label: `Dynamic Node ${nodeId}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type: "editableNode",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId(nodeId + 1); // Increment for the next node
  };

  // Reset the graph to its initial state
  const resetGraph = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setNodeId(2);
  };

  // Highlight the second node when the first node is clicked
  const onNodeClick = useCallback((event, node) => {
    if (node.id === "1") {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === "2"
            ? {
                ...n,
                style: { border: "2px solid red", backgroundColor: "#ffcccc" },
              }
            : n
        )
      );
    }
  }, []);

  // Custom node component for editable labels
//   const EditableNode = ({ id, data }) => {
//     const [label, setLabel] = useState(data.label);

//     const handleChange = (e) => {
//       const newLabel = e.target.value;
//       setLabel(newLabel);
//       setNodes((nds) =>
//         nds.map((n) =>
//           n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n
//         )
//       );
//     };

//     return (
//       <div
//         style={{
//           padding: "10px",
//           border: "1px solid #ddd",
//           borderRadius: "5px",
//           backgroundColor: "#fff",
//           textAlign: "center",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <input
//           value={label}
//           onChange={handleChange}
//           style={{
//             width: "100%",
//             border: "1px solid #ccc",
//             padding: "5px",
//             borderRadius: "3px",
//           }}
//         />
//       </div>
//     );
//   };

  // Custom node types
  const nodeTypes = {
    editableNode: FlowForm,
    newData: NewData
  };

  const buttonStyle = {
    margin: "0 10px",
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <>
    
      {/* <div
        style={{ padding: "10px", background: "#f4f4f9", textAlign: "center" }}
      >
        
      </div> */}
      <div className="react-flow-container" style={{ height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          nodeTypes={nodeTypes}
        >
            <Panel>
                <button onClick={addNode} style={buttonStyle}>
                    Add Node
                </button>
                <button onClick={resetGraph} style={buttonStyle}>
                    Reset Graph
                </button>
            </Panel>
            <div className="update-node__controls">
                <label>label:</label>
                <input
                    style={{ border: "1px solid red" }}
                    value={nodeName}
                    onChange={(evt) => {
                        evt.stopPropagation();
                        setNodeName(evt.target.value);
                    }}
                />
            </div>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default NewReactFlow;
