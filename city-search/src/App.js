import React, { Component } from 'react';
import './App.css';
import {Button, Form, Row, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function City(props) {

  return (
    props.result.map(res => {
      fetch("http://ctp-zip-api.herokuapp.com/zip/"+res)
        .then(res => res.json())
        .then(d =>{
          console.log(d);
          let state = d;
          // let states += d[0].State
        })
      return (
        <Row className="justify-content-center">
            <Card style={{width: "50%"}}>
              <Card.Body>
                <p>{res}</p>
              </Card.Body>
            </Card>
            
        </Row>

      )
    }
    )
  )
}

function ZipSearchField(props) {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <div>
          <label>City: </label>
          <input type="text" onChange={props.handleSubmit} />
        </div>

        <Button variant="dark" type="submit">Submit</Button>
      </Form>
    </div>
  )

}


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: [],
      cityInput: "",
      state: [],

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }


  handleChange(event) {
    this.setState({
      cityInput: event.target.value
    })
  }



  handleSubmit(event) {

    console.log(event.target.value);
    event.preventDefault();
    
    
    fetch("http://ctp-zip-api.herokuapp.com/city/" + event.target.value.toUpperCase())
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        this.setState({
          result: d

        })

      })
      .catch(err => {
        console.log(err)
        this.setState({
          result: [],
        
        })}
        );
    

  }





  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>

        <div id="center">
          <ZipSearchField handleSubmit={(event) => this.handleSubmit(event)}
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
