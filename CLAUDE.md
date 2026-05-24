# Silvoraa Codebase Instructions

## Graph-First Rule (token savings)

A graphify knowledge graph has been built for this codebase. **Always query the graph before reading source files.**

Graph location: `graphify-out/graph.json`
Report: `graphify-out/GRAPH_REPORT.md`
Interactive viz: `graphify-out/graph.html`

### How to query the graph

```python
import json
from pathlib import Path
from networkx.readwrite import json_graph

data = json.loads(Path('graphify-out/graph.json').read_text())
G = json_graph.node_link_graph(data, edges='links')

# Find nodes matching a term
term = 'your search term'
matches = [(n, d) for n, d in G.nodes(data=True) if term.lower() in d.get('label','').lower()]

# Get neighbors of a node
for neighbor in G.neighbors('node_id'):
    edge = G.edges['node_id', neighbor]
    print(G.nodes[neighbor].get('label'), '--', edge.get('relation'), '-->', neighbor)
```

Only read source files directly when:
- The graph lacks enough detail to answer the question
- The user explicitly asks to read a specific file
- You need exact line numbers for an edit
