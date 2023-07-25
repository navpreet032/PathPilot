# PathPilot

PathPilot is a web application that allows users to find the shortest path between two points and control a hover board to travel along that path. The application is built using React and Redux, and uses Dijkstra's algorithm to find the shortest path between two points on a grid.

## Features

- Find the shortest path between two points on a grid using Dijkstra's algorithm
- Control a hover board to travel along the path
- User interface for selecting starting and ending points, and controlling the hover board
- Built using React and Redux

## Installation
To install My Project, follow these steps:

1. Clone the repository from GitHub
2. Install the necessary dependencies using npm install
3. Run the application using npm start

## Usage
1. Click on the path and it will be assigned ad start point.
2. When you click on second part of path it will be assigned as end point.
3. Now a shortest path will be found and use can use `W,S,A,D` ⌨ keys to move the Hoverboard.
4. After the shortest path is Found and you click on any part of route the selected path will  be cleared  
5. Repeat step 1,2 to find new path.