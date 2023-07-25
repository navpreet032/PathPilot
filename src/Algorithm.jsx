
//https://gist.github.com/Prottoy2938/66849e04b0bac459606059f5f9f3aa1a
//https://codesandbox.io/s/raycast-vehicle-ebr0x?file=/src/App.js
// npx gltfjsx Scene.glb
/**
 * This file contains the implementation of Dijkstra's algorithm on a weighted graph.
 * It exports a function called findPath that takes two arguments, start and end, and returns an array of vertices representing the shortest path from start to end.
 * The graph is represented using an adjacency list and a WeightedGraph class.
 * The function uses a PriorityQueue to keep track of the nodes with the smallest distance from the start node.
 * The function also includes a commented out path function that takes an array of vertices and returns a string representing the path in terms of the routes taken.
 */
class Node {
    constructor(val, priority) {
      this.val = val;
      this.priority = priority;
    }
  }
  
  class PriorityQueue {
    constructor() {
      
      this.values = [];
    }
    enqueue(val, priority) {
      let newNode = new Node(val, priority);
      this.values.push(newNode);
      this.bubbleUp();
    }
    bubbleUp() {
      let idx = this.values.length - 1;
      const element = this.values[idx];
      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        let parent = this.values[parentIdx];
        if (element.priority >= parent.priority) break;
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      }
    }
    dequeue() {
      const min = this.values[0];
      const end = this.values.pop();
      if (this.values.length > 0) {
        this.values[0] = end;
        this.sinkDown();
      }
      return min;
    }
    sinkDown() {
      let idx = 0;
      const length = this.values.length;
      const element = this.values[0];
      while (true) {
        let leftChildIdx = 2 * idx + 1;
        let rightChildIdx = 2 * idx + 2;
        let leftChild, rightChild;

        let swap = null;
  
        if (leftChildIdx < length) {
          leftChild = this.values[leftChildIdx];
          if (leftChild.priority < element.priority) {
            swap = leftChildIdx;
          }
        }
        if (rightChildIdx < length) {
          rightChild = this.values[rightChildIdx];
          if (
            (swap === null && rightChild.priority < element.priority) ||
            (swap !== null && rightChild.priority < leftChild.priority)
          ) {
            swap = rightChildIdx;
          }
        }
        if (swap === null) break;
        this.values[idx] = this.values[swap];
        this.values[swap] = element;
        idx = swap;
      }
    }
  }
  
  //Dijkstra's algorithm only works on a weighted graph.
  
  class WeightedGraph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    Dijkstra(start, finish) {
      const nodes = new PriorityQueue();
      const distances = {};
      const previous = {};
      let path = []; //to return at end
      let smallest;
      //build up initial state
      for (let vertex in this.adjacencyList) {
        if (vertex === start) {
          distances[vertex] = 0;
          nodes.enqueue(vertex, 0);
        } else {
          distances[vertex] = Infinity;
          nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
      }
      // as long as there is something to visit
      while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        if (smallest === finish) {
          //WE ARE DONE
          //BUILD UP PATH TO RETURN AT END
          while (previous[smallest]) {
            path.push(smallest);
            smallest = previous[smallest];
          }
          break;
        }
        if (smallest || distances[smallest] !== Infinity) {
          for (let neighbor in this.adjacencyList[smallest]) {
            //find neighboring node
            let nextNode = this.adjacencyList[smallest][neighbor];
            //calculate new distance to neighboring node
            let candidate = distances[smallest] + nextNode.weight;
            let nextNeighbor = nextNode.node;
            if (candidate < distances[nextNeighbor]) {
              //updating new smallest distance to neighbor
              distances[nextNeighbor] = candidate;
              //updating previous - How we got to neighbor
              previous[nextNeighbor] = smallest;
              //enqueue in priority queue with new priority
              nodes.enqueue(nextNeighbor, candidate);
            }
          }
        }
      }
      return path.concat(smallest).reverse();
    }
  }
  export default function findPath(s,e){
    var graph = new WeightedGraph();
    graph.addVertex("start");

    graph.addVertex("S1_A_Right");
    graph.addVertex("S1_A_Left");
    graph.addVertex("S1_B");
    graph.addVertex("S1_C");
    graph.addVertex("S1_D");

    graph.addVertex("S2_A");
    graph.addVertex("S2_B");
    graph.addVertex("S2_C_Right");
    graph.addVertex("S2_C_Left");
    graph.addVertex("S2_D");

    graph.addVertex("L1");
    graph.addVertex("L2");

    graph.addVertex("P1");
    graph.addVertex("P2");
    graph.addVertex("P3");
    graph.addVertex("P4");

    graph.addVertex("end");
    
  // part START
graph.addEdge("S1_A_Left", "S1_A_Right", 2);
graph.addEdge("start", "S1_A_Right", 5);
graph.addEdge("start", "S1_A_Left", 5);
graph.addEdge("S1_A_Left", "S1_B", 2); // Decreased weight from 2 to 1
graph.addEdge("S1_B", "S1_C", 4); // Decreased weight from 4 to 2
graph.addEdge("S1_C", "S1_D", 4); // Decreased weight from 4 to 2
graph.addEdge("S1_D", "S1_A_Right", 2); // Decreased weight from 2 to 1
graph.addEdge("S1_B", "P1", 2); // Decreased weight from 2 to 1
graph.addEdge("S1_D", "P2", 2); // Decreased weight from 2 to 1

// part MIDDLE
graph.addEdge("P1", "S1_C", 2);
graph.addEdge("P1", "L1", 10);
graph.addEdge("P3", "L1", 10);
graph.addEdge("P3", "S2_A", 2);
graph.addEdge("P3", "S2_B", 2);

graph.addEdge("P2", "S1_C", 2);
graph.addEdge("P2", "L2", 10);
graph.addEdge("P4", "L2", 10);
graph.addEdge("P4", "S2_A", 2);
graph.addEdge("P4", "S2_D", 2);

// part END




graph.addEdge("S2_A", "S2_D", 4);
graph.addEdge("S2_D", "S2_C_Right", 2);
graph.addEdge("end", "S2_C_Right", 5);
graph.addEdge("S2_B", "S2_A", 4);
graph.addEdge("end", "S2_C_Left", 5);
graph.addEdge("S2_C_Right", "S2_C_Left", 2); // Decreased weight from 2 to 1
graph.addEdge("S2_B", "S2_C_Left", 2);
graph.addEdge("S2_B", "P3", 2);
graph.addEdge("S2_D", "P4", 2);
graph.addEdge("S2_A", "P4", 2);

    
    
    
   let ans =graph.Dijkstra(s, e);//"p2", "p3", "p4", "p5"
   
   console.log(ans)
   
   return ans;
  }

  
  
  
   
    
   
  