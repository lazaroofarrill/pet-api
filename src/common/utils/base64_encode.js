const fs = require('fs')


function base64_encode(file) {
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


let file = process.argv[2]
console.log(base64_encode(file))
