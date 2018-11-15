import React, { PureComponent, Component } from 'react';
import './App.css';

const Context = React.createContext('default')

class App extends Component {
  state = {
    value: 'original'
  }

  componentDidMount() {
    setTimeout(() => this.setState({value: 'updated' }), 1500)
  }

  render() {
    console.log('rendering app')
    return (
        <div className="App">
          <Context.Provider value={this.state.value}>
            <FirstMiddleMan />
          </Context.Provider>
        </div>

    );
  }
}

const FirstMiddleMan = React.memo(() => { 
  console.log('rendering 1st middle man')
  return <div><SecondMiddleMan /></div>
})



class SecondMiddleMan extends Component {
  render() { 
    console.log('rendering 2nd middle man')
    return <div><ThirdMiddleMan /></div>
  }
}

const ThirdMiddleMan = () => { 
  console.log('rendering 3rd middle man')
  return <div><Consumer /></div>
}

class Consumer extends Component {
  static contextType = Context

  render() {
    console.log('rendering consumer')
    return <div>{this.context}</div>
  }
}

export default App;
