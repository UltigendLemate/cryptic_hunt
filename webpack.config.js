const { path } = require("./app");

module.exports = {
    entry: './server.js', // Entry point of your application
    output: {
        filename: 'base.js', // Output file name
        path: __dirname + '/dist' // Output directory path
    }
};

