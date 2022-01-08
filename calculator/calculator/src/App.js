import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import KeyPad from './components/KeyPad'
import Display from './components/Display';
import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       display: '',
    }
  }
  reset=e=>{
    this.setState({
      display: '',
    })
  }
  handleClick= (value) =>{

    if(value === 'C'){
      this.reset();
    }else if(value === '='){
      try{
        var display=eval(this.state.display)||'';
      }catch(err){
        var display='Syntax error';
      }
      this.setState({
        display: display,
      }) 

    }else if(value === 'CE'){
      this.setState({
        display: this.state.display.slice(0,-1),
      }) 

    }else{
      console.log(value);
      this.setState({
        display: this.state.display+value,
      }) 

    }
    

  }
  render() {
    return (
      <div className='container ' >
      <div className="row  mt-5 px-0 justify-content-center">
        <div className="col-4 bg-info border rounded">
        <h1 className='text-center py-3 fw-bold text-uppercase text-dark'>Calculator</h1>
        <Display display={this.state.display}/>
        <KeyPad click={this.handleClick}/>
        </div> 
      </div>
             
    </div>
    )
  }
}

export default App

