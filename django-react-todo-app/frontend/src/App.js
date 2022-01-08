
import './App.css';
import React, { Component } from 'react';
import Mymodal from './Mymodal';
import axios from 'axios';


class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      viewCompleted: false,
      todoList: [],

      modal: false,
      activeItem: {
        title: "",
        description: "",
        date:'',
        completed: false,
      },

    }
  }


  componentDidMount(){
    this.todoList();
  }


  todoList = ()=>{
    axios
    .get('/api/todo/')
    .then((list)=>this.setState({todoList:list.data}))
    .catch((err)=>console.log(err));

    // console.log('todo list getting')
  };


  toggle = ()=>{    
    this.setState({
      modal: !this.state.modal,
    })
  }

  createItem = () => {
    const item = { title: "", description: "",  date:'', completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
    // try calling this.toggle method
  };

  handleSubmit = (item) => {
    this.toggle();
    if(item.id){
      axios
          .put(`/api/todo/${item.id}/`, item)
          .then(()=>this.todoList())
    }else{
      axios
      .post('/api/todo/',item)
      .then(this.todoList());
    }
  };

  handleDelete = (item)=>{
    // console.log(item.id);
    axios
        .delete(`/api/todo/${item.id}/`)
        .then((res)=>this.todoList())
  }
  handleEdit = (item)=>{    
      this.setState({ activeItem: item, modal: !this.state.modal });
  }
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted? 'nav-link active':'nav-link'}
          onClick={() => this.displayCompleted(true)}
        >
          <b>Complete</b>
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >
          <b>Incomplete</b>
        </span>
      </div>
    );
  };
  
  renderItems= (e)=>{
    const newItems=this.state.todoList.filter(
      (item,i)=> item.completed === this.state.viewCompleted  //check
    )

    return (
      newItems.map(
        (item,i)=>(

          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">

          <div>
            
            <div className='badge bg-info my-0  '>On {item.date} At {item.time}</div>
            <h4 className="text-capitalize">{item.title}</h4>          
            <p>{item.description}</p>
          </div>
          
          <div className='d-flex ml-2'>
          <button onClick={()=>{this.handleEdit(item)}}
          className="btn btn-primary mr-4">
            Edit
          </button>
          <button onClick={()=>{this.handleDelete(item)}} 
          className="btn btn-danger">
            Delete
          </button>
          </div>
          
          </li>


        )
      )
    )

  }

  render() {
    return (
      <main className="container col-7 mt-2">
        <h1 className='text-uppercase text-center'>Todo app</h1>
        <div className="row">
          <div className="col">
            <div className="card ">
            <button id='task' 
            className="btn btn-secondary text-uppercase p-2"
            onClick={this.createItem}
            
            >
              Add Task
            </button>
            {this.renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
            {this.renderItems()}
            </ul>
            </div>

            
          </div>
        </div>
        {this.state.modal ? <Mymodal
                            activeItem={this.state.activeItem}
                            toggle={this.toggle}
                            onSave={this.handleSubmit}
                          /> : null}
      </main>
    );
  }
}

export default App;



