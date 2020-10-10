const { rejects } = require('assert');
const { FILE } = require('dns');
const fs = require('fs');
const { resolve } = require('path');


function myReadFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data.toString())
            }
        })
    })
}

const FILES_TO_READ_PATH = "./filesToRead.txt"

myReadFile(FILES_TO_READ_PATH)
    .then(content => content.split('\r\n'))
    .then(paths => paths.forEach(path => {
        myReadFile(path)
            .then(content => console.log(`content of ${path} is: \n\t${content}\n`))
            .catch(err => console.log(`content of ${path} is unavailable because of: \n\t${err}\n`))
    })
    )
    .catch(err => console.log(err))