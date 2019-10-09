const yargs = require('yargs');

const argv = yargs.option("iterations", {
        alias: "i",
        description: "Number of iterations to run the aproximation for",
        type: "number"
    })
    .help()
    .alias('help', 'h')
    .argv;

if(argv.iterations && argv.iterations > 0) {
    const n = argv.iterations; 
    const aprox = calculatePI(n);

    console.log("The value of PI is: " + aprox);
    return aprox;
}

/**
 * Calculates PI by subdividing a polygon into another with twice as many sides "n" times
 * The polygons are embedded within a circle of diameter 1
 */
module.exports = function calculatePI(n = 50) {
    return numberOfSidesOfThePolygon(n) * widthOfThePolygonSide(n);
}

function numberOfSidesOfThePolygon(n) {
    return Math.pow(2, n+1);
}


function widthOfThePolygonSide(n) {
    if(n == 1 || n < 1) {
        //Width of the side of a square of diagonal 1
        return Math.sqrt(0.5)
    }

    const previousApproximation = widthOfThePolygonSide(n - 1)

    const base = previousApproximation/2;
    const height = (1 - Math.sqrt(1 - Math.pow(previousApproximation, 2)))/2;

    return Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2));
}
