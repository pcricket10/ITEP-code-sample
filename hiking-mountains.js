function findPeak(matrix) {
    let highest = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[0].length; k++) {
            if (matrix[i][k] > highest) {
                highest = matrix[i][k];
            }
        }
    }

    return highest;
}

function findStarts(matrix) {
    let starts = [];

    // Top Row
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] == 0) {
            starts.push([0, i])
        }
    }

    // Bottom Row
    for (let i = 0; i < matrix[matrix.length - 1].length; i++) {
        if (matrix[matrix.length - 1][i] == 0) {
            starts.push([matrix.length - 1, i])
        }
    }

    // Left except first and last
    for (let i = 1; i < matrix.length - 1; i++) {
        if (matrix[i][0] == 0) {
            starts.push([i, 0])
        }
    }

    // Right except first and last
    for (let i = 1; i < matrix.length - 1; i++) {
        if (matrix[i][matrix[0].length - 1] == 0) {
            starts.push([i, matrix[0].length - 1])
        }
    }

    return starts;
}

function findNeighbors(node, matrix) {
    const neighbors = []
    const row = node[0];
    const col = node[1]
    // Check top
    if (row > 0 && Math.abs(matrix[row - 1][col] - matrix[row][col]) <= 1) neighbors.push([row - 1, col]);
    // Check top right
    if (row > 0 && col < matrix.length - 1 && Math.abs(matrix[row - 1][col + 1] - matrix[row][col]) <= 1) neighbors.push([row - 1, col + 1]);
    // Check right
    if (col < matrix[0].length - 1 && Math.abs(matrix[row][col + 1] - matrix[row][col]) <= 1) neighbors.push([row, col + 1]);
    // Check bottom right
    if (row < matrix.length - 1 && col < matrix.length - 1 && Math.abs(matrix[row + 1][col + 1] - matrix[row][col]) <= 1) neighbors.push([row + 1, col + 1]);
    // Check bottom
    if (row < matrix.length - 1 && Math.abs(matrix[row + 1][col] - matrix[row][col]) <= 1) neighbors.push([row + 1, col]);
    // Check bottom left
    if (row < matrix.length - 1 && col > 0 && Math.abs(matrix[row + 1][col - 1] - matrix[row][col]) <= 1) neighbors.push([row + 1, col - 1]);
    // Check left
    if (col > 0 && Math.abs(matrix[row][col - 1] - matrix[row][col]) <= 1) neighbors.push([row, col - 1]);
    // Check top left
    if (row > 0 && col > 0 && Math.abs(matrix[row - 1][col - 1] - matrix[row][col]) <= 1) neighbors.push([row - 1, col - 1]);
    // Return neighbors
    return neighbors;
}
//traverse the path keeping track of visited nodes

function pathTraversal(node, matrix, visited, peak) {
    const queue = [node];
    visited.add(node.toString())
    const row = node[0];
    const col = node[1];
    while (queue.length > 0) {
        let currentNode = queue.shift()
        let currRow = currentNode[0]
        let currCol = currentNode[1]
        if (matrix[currRow][currCol] === peak) return true
        const neighbors = findNeighbors(currentNode, matrix);
        neighbors.forEach(neighbor => {
            if (!visited.has(neighbor.toString())) {
                queue.push(neighbor)
                visited.add(neighbor.toString())
            }
        });

    }
    return false;

}

function identifyPath(mountain) {
    // Find the peak
    const peak = findPeak(mountain);
    // Find the start
    const starts = findStarts(mountain);
    const visited = new Set()


    // Traverse from the starts and try to get to the top
    let correctPath = false;
    starts.forEach(start => {
        visited.add(start.toString())

        const traversal = pathTraversal(start, mountain, visited, peak)
        if (traversal) correctPath = start;
    });
    return correctPath;
}

// Uncomment for local testing

// Example 0
// const mountain_0 = [
//     [1, 2, 4],
//     [4, 5, 9],
//     [5, 7, 6]
// ];

// console.log(findNeighbors([2, 0], mountain_0)) // <- Expect '[ [ 1, 0 ], [ 1, 1 ] ]'

// // Example 1
// const mountain_1 = [
//     [1, 0, 1, 1],
//     [2, 3, 2, 1],
//     [0, 2, 4, 1],
//     [3, 2, 3, 1]
// ];

// test_visited = new Set()
// console.log(pathTraversal([0, 1], mountain_1, test_visited, 4)) // <- Expect 'true
// console.log("!!!")
// console.log(identifyPath(mountain_1)) // <- Expect '[ 0, 1 ]'

// // Example 2
// const mountain_2 = [
//     [0, 2, 1, 1],
//     [2, 2, 3, 1],
//     [1, 1, 1, 1],
//     [1, 0, 1, 1]
// ];

// console.log(identifyPath(mountain_2)) // <- Expect '[ 3, 1 ]'

// // Example 3
// const mountain_3 = [
//     [0, 1, 2, 0],
//     [5, 1, 3, 2],
//     [4, 1, 2, 1],
//     [3, 4, 3, 1]
// ];

// console.log(identifyPath(mountain_3)) // <- Expect '[ 0, 0 ]'



/*************DO NOT MODIFY UNDER THIS LINE ***************/

module.exports = [identifyPath, findNeighbors, pathTraversal];
