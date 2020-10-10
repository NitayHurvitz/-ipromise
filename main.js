const fs = require('fs');

function myReadFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const FILES_TO_READ_PATH = "./filesToRead.txt"

myReadFile(FILES_TO_READ_PATH)
    .then(content => content.split('\r\n'))
    .then(paths => Promise.all(paths.map(path => myReadFile(path)))
        .then(content => console.log(`content is: \n\t${content}\n`))
        .catch(err => console.log(`content is unavailable because of: \n\t${err}\n`))
    )
    .catch(err => console.log(err))