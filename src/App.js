import React, { Component } from 'react';
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
            <FirstMiddleManMemo />
          </Context.Provider>
        </div>

    );
  }
}

// if this is not memo the entire tree will re-render
const FirstMiddleManMemo = React.memo(() => { 
  console.log('rendering 1st middle man', true)
  return <div><SecondMiddleMan memo /></div>
})

const FirstMiddleMan = () => { 
  console.log('rendering 1st middle man', false)
  return <div><SecondMiddleMan /></div>
}

class SecondMiddleMan extends Component {
  render() { 
    console.log('rendering 2nd middle man', !!this.props.memo)
    return <div>
      <ThirdMiddleMan memo={this.props.memo}/>
    </div>
  }
}

const ThirdMiddleMan = ({memo}) => { 
  console.log('rendering 3rd middle man', !!memo)
  return <div><Consumer memo={memo}/></div>
}

class Consumer extends Component {
  static contextType = Context

  render() {
    console.log('rendering consumer', !!this.props.memo)
    return <div>{this.context}</div>
  }
}

export default App;
