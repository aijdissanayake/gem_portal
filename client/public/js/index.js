import React from 'react'
import ReactDOM from 'react-dom'
import request from 'request-promise'

const styles = {
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '1%',
    width: '50%'
  },
  placeholder: {
    borderTop: '1.5px solid black',
    padding: '5px',
    marginBottom: '0.5%',
    width: '100%'
  },
  textRight: {
    textAlign: 'right'
  },
  smallMargin: {
    marginBottom: '0',
    marginTop: '0'
  }
}

class TypeListHolder extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      types: []
    }
    this.loadList = this.loadList.bind(this);
    this.handleTypeSubmit = this.handleTypeSubmit.bind(this);
    this.removeType = this.removeType.bind(this);
  }

  componentDidMount(){
    this.loadList();
  }

  loadList(){
    console.log("requesting");
    request('http://localhost:3000/get/all_types').then(types =>{ 
      this.setState({types: JSON.parse(types)}); console.log(this.state);
    });
    
  }  

  handleTypeSubmit(event){

    let value = this.inputElement.value ;

    if(value) {
      request('http://localhost:3000/add_type/'+value).then(
        response =>{
        console.log('saved');
      }
      );
    }
    this.loadList();
    this.inputElement.value = "";
    event.preventDefault();
    
  }

  removeType(event){

    let value = event.target.value

     request('http://localhost:3000/remove_type/'+value).then(
        response =>{
          this.loadList();
          console.log('removed');
          
        });

    
    event.preventDefault();
  }

  render(){
    let {types} = this.state
    return <div>
      <h3 className="text-center">Gem Types</h3>

      <form style={styles.center} className="input-group" onSubmit={this.handleTypeSubmit} >
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button" onClick={this.handleTypeSubmit}>Save</button>
        </span>
        <input className="form-control" type="text" ref={inputElement => this.inputElement = inputElement} placeholder="Enter Reminder" />
      </form>
      
      {types.length >=1}
      {types.map(({value,date}) => <div key={date} style={styles.center}>
      {value} <button className="btn btn-secondary" type="button" value={value} onClick={this.removeType}>Remove</button>
      </div>)}

    </div>
  }
}

ReactDOM.render(<TypeListHolder />, document.getElementById('root'));