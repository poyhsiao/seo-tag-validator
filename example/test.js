/**
 * test script
 */

const path = require('path')
const { FileAccess } = require('../libs/utils')
const { Validator } = require('../libs/validator')

const testFile = path.join(__dirname, 'test.html')
const fa = new FileAccess(testFile)
const validator = new Validator()

fa.read()
.then(dat => {
  /**
   * set source data
   */
  validator.setData(dat)
  /**
   * set only applied validate rule
   */
  validator.setRules('1,4')
  fa.console(validator.validate())
})
