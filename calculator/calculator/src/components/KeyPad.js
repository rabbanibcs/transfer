import React, { Component } from 'react'

class KeyPad extends Component {
    render() {
        return (
            <div className='mx-3 mb-3'>
            <div className="row d-grid gap-1  d-md-block " role="group" aria-label="Basic example">
                <button onClick={e=>this.props.click(e.target.value)} value='(' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">(</button>
                <button onClick={e=>this.props.click('CE')} val='CE' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">CE</button>
                <button onClick={e=>this.props.click(')')} val=')' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">)</button>
                <button onClick={e=>this.props.click('C')} val='C' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">C</button>
            </div>
            
            
                <div className="row d-grid gap-1  d-md-block " role="group" aria-label="Basic example">
                <button onClick={e=>this.props.click('7')} val= '7' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">7</button>
                <button onClick={e=>this.props.click('8')} val='8' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">8</button>
                <button onClick={e=>this.props.click('9')} val='9' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">9</button>
                <button onClick={e=>this.props.click('/')} val='/' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">/</button>
            </div>
            <div className="row d-grid gap-1  d-md-block " role="group" aria-label="Basic example">
                <button onClick={e=>this.props.click('4')} val='4' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">4</button>
                <button onClick={e=>this.props.click('5')} val='5' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">5</button>
                <button onClick={e=>this.props.click('6')} val='6' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">6</button>
                <button onClick={e=>this.props.click('*')} val='*' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">x</button>
            </div>
            <div className="row d-grid gap-1  d-md-block " role="group" aria-label="Basic example">
                <button onClick={e=>this.props.click('1')}val='1' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">1</button>
                <button onClick={e=>this.props.click('2')}val='2' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">2</button>
                <button onClick={e=>this.props.click('3')}val='3' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">3</button>
                <button onClick={e=>this.props.click('-')} val='-' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">-</button>
            </div>
            <div className="row d-grid gap-1  d-md-block " role="group" aria-label="Basic example">
                <button onClick={e=>this.props.click('.')} val='.' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">.</button>
                <button onClick={e=>this.props.click('0')} val='0' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">0</button>
                <button onClick={e=>this.props.click('=')} val='=' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">=</button>
                <button onClick={e=>this.props.click('+')} val='+' type="button" className="btn col-3 bg-white btn-lg btn-outline-primary">+</button>
            </div>
            </div>
        )
    }
}

export default KeyPad
