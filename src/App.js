import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ContainerDimensions from 'react-container-dimensions'
import { ReactSVGPanZoom } from 'react-svg-pan-zoom'
import actions from './actions'
import logo from './logo'

class App extends Component {
  render () {
    const { state, actions } = this.props
    const viewerValue = state.get('viewerValue') ? state.get('viewerValue').toJS() : null
    const viewerTool = state.get('viewerTool')

    return (
      <ContainerDimensions>
        <ReactSVGPanZoom
          value={viewerValue}
          onChangeValue={value => actions.setValue(value)}
          tool={viewerTool}
          onChangeTool={tool => actions.selectTool(tool)}
          onMouseDown={event => actions.mouseDown(event.point)}
          onMouseUp={event => actions.mouseUp(event.point)}
          style={{outline: '1px solid black'}}>
          {logo()}
        </ReactSVGPanZoom>
      </ContainerDimensions>
    )
  }
}

function mapStateToProps (state) {
  return {
    state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
