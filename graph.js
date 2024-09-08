module.exports = {
    graph: {
        'A': { 'B': 5, 'C': 7 },
        'B': { 'A': 5, 'D': 15, 'E': 20 },
        'C': { 'A': 7, 'D': 5, 'E': 35 },
        'D': { 'B': 15, 'C': 5, 'F': 20 },
        'E': { 'B': 20, 'C': 35, 'F': 10 },
        'F': { 'D': 20, 'E': 10 }
    },

    dijkstra: function(graph, source, destination) {
        const visited = new Set();
        const distances = {};
        const previous = {};

        // Initialize distances with Infinity and previous with null
        for (const vertex in graph) {
            distances[vertex] = Infinity;
            previous[vertex] = null;
        }
        distances[source] = 0;

        while (true) {
            let minDistance = Infinity;
            let minVertex = null;

            // Find the unvisited vertex with the smallest distance
            for (const vertex in distances) {
                if (!visited.has(vertex) && distances[vertex] < minDistance) {
                    minDistance = distances[vertex];
                    minVertex = vertex;
                }
            }

            if (minVertex === null) break;

            // Update distances and previous for neighbors of minVertex
            for (const neighbor in graph[minVertex]) {
                const distance = distances[minVertex] + graph[minVertex][neighbor];
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    previous[neighbor] = minVertex;
                }
            }

            visited.add(minVertex);
        }

        // Construct the shortest path from source to destination
        const shortestPath = [];
        let currentVertex = destination;
        while (currentVertex !== null) {
            shortestPath.unshift(currentVertex);
            currentVertex = previous[currentVertex];
        }

        return shortestPath;
    }
};
