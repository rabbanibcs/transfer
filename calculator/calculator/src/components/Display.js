import React, { Component } from 'react'

class Display extends Component {
    render() {
        return (
            <div id='display' className='row fs-5 bg-white mb-3 px-2 pt-2 mx-1' style={{height:'50px'}}>
                {this.props.display}
            </div>
        )
    }
}

export default Display;
