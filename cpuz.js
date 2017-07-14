let os = require('os');

console.log(os.freemem());
console.log(os.freemem() / os.totalmem() * 100);