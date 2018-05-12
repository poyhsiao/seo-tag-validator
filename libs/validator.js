/**
 * validator
 */
const cheerio = require('cheerio')
const { Rules } = require('./rules')
const { FileAccess } = require('./utils')

class Validator extends Rules {
  constructor (data = null, selectedRule = '') {
    super()
    this.data = data
    this.selectedRule = (selectedRule !== '') 
      ? [...(new Set(selectedRule.split(',')))]
      : Object.keys(this.rules)
    this.errors = []
    this.$ = (data == null) ? null : cheerio.load(this.data)
  }

  setData (data = null) {
    this.$ = cheerio.load(data)
    return this.$
  }

  getData () {
    return this.data
  }

  getDom () {
    return this.$
  }

  getRules () {
    return this.rules
  }

  setRules (selected = '') {
    if (selected !== '') {
      try {
        this.selectedRule = [...(new Set(selected.split(',')))]
      } catch (err) {
        if (err != null) {
          this.errors.push(`invalid rule selector format`)
          throw this.errors
        }
      }
    } else {
      this.selectedRule = Object.keys(this.ruls)
    }

    return this.selectedRule
  }

  validate (newRules = []) {
    this.rules = this.rules.concat(newRules)
    const errors = []

    if (this.rules.length) {
      this.rules.filter((v, k) => 
        k in this.selectedRule
      ).forEach(rule => {
        const {
          tagName,
          tagRequired,
          maxAvailable,
          minAvailable,
          attrs,
          underTag
        } = rule

        const selector = (underTag != null) ? `${underTag} ${tagName}` : tagName

        /**
         * check if tag should exist
         */
        if (tagRequired === true && !this.$(selector).length) {
          this.errors.push((underTag != null) 
            ? `The HTML without ${tagName} inside <${underTag}> tag` 
            : `The HTML without ${tagName}`)
        }

        /**
         * check attributes
         */
        if (attrs.length) {
          const errorAttr = {}

          attrs.forEach(attr => {
            const {
              name,
              value,
              required
            } = attr

            /**
             * initial error counter
             */
            if (value != null) {
              errorAttr[`${name}=${value}`] = 0
            } else {
              errorAttr[name] = 0
            }
            

            if (required) {
              const newSelector = (value != null) ? `${selector}[${name}="${value}"]` : `${selector}[${name}]`

              if (!this.$(newSelector).length && value != null) {
                errorAttr[`${name}=${value}`] += 1
              }

              if (value == null) {
                errorAttr[name] = this.$(selector).length - this.$(newSelector).length
              }
            }
          })

          for (let k in errorAttr) {
            if (errorAttr[k] > 0) {
              const v = k.split('=')

              if (v[1]) {
                this.errors.push((underTag != null) 
                  ? `There are ${errorAttr[k]} <${tagName}> tag without ${v[0]}="${v[1]}" information inside <${underTag}> tag` 
                  : `There are ${errorAttr[k]} <${tagName}> tag without ${v[0]}="${v[1]}" information`)
              } else {
                this.errors.push((underTag != null) 
                  ? `There are ${errorAttr[k]} <${tagName}> tag without ${v[0]} attribute inside <${underTag}> tag` 
                  : `There are ${errorAttr[k]} <${tagName}> tag without ${v[0]} attribute`)
              }
            }
          }
        }

        /**
         * check tag available range
         */
        if (maxAvailable != null && this.$(selector).length > maxAvailable) {
          this.errors.push((underTag != null) 
          ? `This HTML have more than ${maxAvailable} <${tagName}> tag inside <${underTag}> tag`
          : `This HTML have more than ${maxAvailable} <${tagName}> tag`)
        }

        if (minAvailable != null && this.$(selector).length < minAvailable) {
          this.errors.push((underTag != null) 
            ? `This HTML should have at least ${minAvailable} <${tagName}> tag inside <${underTag}> tag` 
            : `This HTML should have at least ${minAvailable} <${tagName}> tag`)
        }
      })
    }

    return (this.errors.length) ? this.errors : true
  }
}

module.exports = {
  Validator
}
