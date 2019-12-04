import React from 'react';
import './App.css';
import Goods from './Goods';
import Inputs from './Inputs';

function App() {
  const [isUser, setUser] = React.useState(false);

  const set = () => {
    setUser(true)
  }

  return (
    <div className="main">
        {isUser ? <Goods /> : <Inputs set={set} />}
    </div>
  );
}

export default App;
