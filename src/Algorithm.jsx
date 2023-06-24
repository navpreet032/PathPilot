
//https://gist.github.com/Prottoy2938/66849e04b0bac459606059f5f9f3aa1a
//https://codesandbox.io/s/raycast-vehicle-ebr0x?file=/src/App.js
// npx gltfjsx Scene.glb
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
    graph.addVertex("S1_A");
    graph.addVertex("S1_B");
    graph.addVertex("S1_C");
    graph.addVertex("S1_D");
    graph.addVertex("S1_A");
    graph.addVertex("S1_B");
    graph.addVertex("S1_C");
    graph.addVertex("S1_D");
    graph.addVertex("L1");
    graph.addVertex("L2");
    graph.addVertex("P1");
    graph.addVertex("P2");
    graph.addVertex("P3");
    graph.addVertex("P4");
    graph.addVertex("end");
    
  
    graph.addEdge("start", "S1_A", 5);
    graph.addEdge("S1_A", "S1_B", 4);
    graph.addEdge("S1_B", "S1_C", 4);
    graph.addEdge("S1_C", "S1_D", 4);
    graph.addEdge("S1_D", "S1_A", 4);
  
    
    
    
   let ans =graph.Dijkstra(s, e);//"p2", "p3", "p4", "p5"
   
   console.log(ans)
   
   return ans;
  }
//    function path(s='p2',e='p6'){
//     let arr=Map('start','S1_C')
//     console.log(arr)
//     var res=""
//     var data={"p1 p2":"r_1","p2 p1":"r_1","p1 p4":"r_4","p1 p6":"r_7","p2 p3":"r_2","p3 p2":"r_2","p3 p4":"r_3","p4 p1":"r_4","p4 p3":"r_3","p4 p5":"r_5","p5 p6":"r_6","p5 p4":"r_5","p6 p5":"r_6","p6 p1":"r_7"}
//     for(let i=0;i<(arr.length)-1;i++){
//      res= res+" "+data[(arr[i]+" "+arr[i+1])];
//      console.log(res)
//   }
  
//   return res;
//   }
  
  
  
   
    
   
  