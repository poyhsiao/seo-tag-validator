/**
 * rules
 */

const defaultRules = [
  {
    tagName: 'img',
    tagRequired: false,
    maxAvailable: null,
    minAvailable: null,
    attrs: [
      {
        name: 'alt',
        value: null,
        required: true
      }
    ],
    underTag: null
  },
  {
    tagName: 'a',
    tagRequired: false,
    maxAvailable: null,
    minAvailable: null,
    attrs: [
      {
        name: 'rel',
        value: null,
        required: true
      }
    ],
    underTag: null
  },
  {
    tagName: 'title',
    tagRequired: true,
    maxAvailable: null,
    minAvailable: 1,
    attrs: [],
    underTag: 'head'
  },
  {
    tagName: 'meta',
    tagRequired: true,
    maxAvailable: null,
    minAvailable: 1,
    attrs: [
      {
        name: 'name',
        value: 'description',
        required: true
      }
    ],
    underTag: 'head'
  },
  {
    tagName: 'meta',
    tagRequired: true,
    maxAvailable: null,
    minAvailable: 1,
    attrs: [
      {
        name: 'name',
        value: 'keywords',
        required: true
      }
    ]
  },
  {
    tagName: 'strong',
    tagRequired: false,
    maxAvailable: 15,
    minAvailable: null,
    attrs: [],
    underTag: null
  },
  {
    tagName: 'h1',
    tagRequired: false,
    maxAvailable: 1,
    minAvailable: null,
    attrs: [],
    underTag: null
  }
]

class Rules {
  constructor(newRules = []) {
    this.rules = defaultRules.concat(newRules)
  }

  addRule (newRules = []) {
    this.rules = this.rule.concat(newRules)
    return this.rules
  }

  getRule () {
    return this.rules
  }
}

module.exports = {
  Rules
}
