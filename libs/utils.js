/**
 * all utils
 */

const fs = require('fs')

// const rules = new Rules

class FileAccess {
  constructor (source = null, stype = 'file', target = null, ttype = 'file') {
    this.source = source
    this.stype = stype
    this.target = target
    this.ttype = ttype
  }

  setSource (source = null, stype = 'file') {
    this.source = source || this.source
    this.stype = stype || this.stype

    return {
      source,
      stype
    }
  }

  read (source = null, stype = 'file') {
    if (stype === 'stream') {
      return new Promise((resolve, reject) => {
        const f = source || this.source

        f.on('data', chunk => {
          chunks.push(chunk)
        })
  
        f.once('error', err => {
          return reject(err)
        })
  
        f.once('end', () => {
          return resolve(Buffer.concat(chunks))
        })
      })
    }

    return new Promise((resolve, reject) => {
      const f = source || this.source

      fs.readFile(f, 'utf8', (err, dat) => {
        if (err != null) {
          return reject(err)
        }

        return resolve(dat)
      })
    })
  }

  write (target = null, ttype = 'file', data = null) {
    if (ttype === 'stream') {
      return new Promise((resolve, reject) => {
        const f = target || this.target

        f.once('error', err => {
          return reject(err)
        })
        
        f.once('finish', () => {
          return resolve()
        })

        f.write(data, 'utf8')
        f.end()
      })
    }

    return new Promise((resolve, reject) => {
      const f = target || this.target

      fs.writeFile(file, data, 'utf8', err => {
        if (err != null) {
          return reject(err)
        }

        return resolve()
      })
    })
  }

  console (data = []) {
    return console.log(data.join("\n"))
  }
}

module.exports = {
  FileAccess
}
