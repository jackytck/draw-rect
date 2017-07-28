import {
  Record,
  Map,
  fromJS
} from 'immutable'

const Guide = Record({
  id: '',
  type: '',
  properties: Map()
}, 'Guide')

const DefaultGuides = new Map({
  'h1': new Guide({
    id: 'h1',
    type: 'horizontal-streak',
    properties: fromJS({
      step: 20,
      colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd']
    })
  }),
  'v1': new Guide({
    id: 'v1',
    type: 'vertical-streak',
    properties: fromJS({
      step: 20,
      colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd']
    })
  })
})

const Scene = Record({
  width: 3000,
  height: 2000,
  guides: new Map()
}, 'Scene')

export default Scene({
  guides: DefaultGuides
})
