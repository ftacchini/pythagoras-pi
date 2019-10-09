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

module.exports = function calculatePI(n = 50) {
    return calculatPolygonSideAmount(n) * calculatePolygonSideWidth(n);
}

function calculatPolygonSideAmount(n) {
    return Math.pow(2, n+1);
}


function calculatePolygonSideWidth(n) {
    if(n == 1 || n < 1) {
        return Math.sqrt(0.5)
    }

    const previousApproximation = calculatePolygonSideWidth(n - 1)

    const width = previousApproximation/2;
    const height = (1 - Math.sqrt(1 - Math.pow(previousApproximation, 2)))/2;

    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
}
