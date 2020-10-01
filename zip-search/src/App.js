import React, { Component } from 'react';
import './App.css';


function City(props) {
  // for loop for result state array
  // <h3>{result[0].props.Location.}
return(
    props.result.map(res => {
      return(
      <div class="center">
          <h4>{res.LocationText}</h4>
          <ul>
            <li>State: {res.State}  </li>
            <li>Location: {res.Lat},{res.Long}</li>
            <li>Population (estimated): {res.EstimatedPopulation}</li>
            <li>Total Wages: {res.TotalWages}</li>
          </ul>
          
      </div>
        )
      }
    )
  )
}

function ZipSearchField(props) {  
  return(
  <div>  
   <form onSubmit={props.handleSubmit}>
      <div>
          <label>Zip Code: </label>
          <input type="text" onChange={props.handleSubmit}/>
      </div>

      <button type="submit">Submit</button>
           </form>
  </div>
  )

}


class App extends Component {

    constructor(props){
      super(props);

      this.state = {
          result: [],
          zipCodeInput: "",
          
      }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        
    }

    handleChange(event){
      this.setState({
        zipCodeInput: event.target.value
      })
    }

   

    handleSubmit(event){
    
      console.log(event.target.value);
      event.preventDefault();
      fetch("http://ctp-zip-api.herokuapp.com/zip/"+event.target.value)
        .then((res) => res.json())
        .then((d) => {
            console.log(d);
            this.setState({
                result: d 
                
            })
          
        })
        .catch(err => console.log(err)); 
         
    }

    



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>

        <div id="center">
          <ZipSearchField handleSubmit={(event) => this.handleSubmit(event) }
          handleChange={(event) => this.handleChange(event)}
        />
        </div>

        <div>
          <City 
            result={this.state.result}
          />
          
        </div>
      </div>
    );
  }
}

export default App;
