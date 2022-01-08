import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';



class Mymodal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            activeItem: this.props.activeItem,
        }
    }
    
    handleChange=(e)=>{
      let {name,value} = e.target;
      if(e.target.type === 'checkbox'){
        console.log(e.target.checked)
        value = e.target.checked
      }
        
      
      const activeItem = {...this.state.activeItem, [name]:value};
    this.setState({activeItem})
    // console.log(activeItem)
    }
    

    render() {
        const { toggle , onSave } = this.props;
        return (            
    <div>      
      <Modal isOpen={true} toggle={toggle} className='modal-lg'>
        <ModalHeader toggle={toggle}>Add Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title" >Title</Label>
              <Input
              type="text"
              id="todo-title"
              name="title"
              value={this.state.activeItem.title}
              onChange={this.handleChange}
              placeholder="Enter Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Description</Label>
              <Input
                type="text"
                id="todo-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Description"
              />
            </FormGroup>
            <FormGroup >
              <Label >Date  </Label>
                <Input
                  type="date"
                  name="date"
                  value ={this.state.activeItem.date}
                  onChange={this.handleChange}
                />
                
            </FormGroup>
            <FormGroup >
              <Label >Time  </Label>
                <Input
                  type="time"
                  name="time"
                  value ={this.state.activeItem.time}
                  onChange={this.handleChange}
                />
                
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
          
        </ModalFooter>
      </Modal>
    </div>
        )
    }
}

export default Mymodal
