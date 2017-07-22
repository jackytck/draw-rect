import React, { Component } from 'react'
import ContainerDimensions from 'react-container-dimensions'
import { ReactSVGPanZoom } from 'react-svg-pan-zoom'
import logo from './logo'

class App extends Component {
  render () {
    return (
      <ContainerDimensions>
        <ReactSVGPanZoom
          style={{outline: '1px solid black'}}>
          {logo()}
        </ReactSVGPanZoom>
      </ContainerDimensions>
    )
  }
}

export default App
