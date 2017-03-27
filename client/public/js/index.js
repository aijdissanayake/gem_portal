import React from 'react'
import ReactDOM from 'react-dom'
import request from 'request-promise'

const styles = {
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
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

class ListHolder extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      types: []
    }
    this.loadList = this.loadList.bind(this);
  }

  loadList(){
    console.log("requesting");
    request('http://localhost:3000/get/all_types').then(types =>{ this.setState({types: JSON.parse(types)}); console.log(this.state);});
    console.log("returned");
    
  }

  componentDidMount(){
    this.loadList();
  }

  handleTypeSubmit(event){
    let value = this.inputElement.value ;

    if(value){
      request('http:localhost:3000/add')
    }
  }

  render(){
    let {types} = this.state
    return <div>

      {types.length >=1 && <h3 className="text-center">  Gem Types </h3>}
      {types.map(({value,date}) => <div key={date} style={styles.center}>
      {value}
      </div>)}

    </div>
  }
}

ReactDOM.render(<ListHolder />, document.getElementById('root'));