import { useState } from 'react';
import './App.css';

function App() {
  const [partyLevel,setPartyLevel] = useState(1)
  const [monsterCRArr, setMonsterCRArr] = useState([1,2,3])

  return (<div className="App">
  <InputBox inputText={partyLevel} setInputText={setPartyLevel} />
  <MonsterCRsGrid monsterCRArr={monsterCRArr} setMonsterCRArr={setMonsterCRArr} />
  <p>Difficulty</p>
  <p>{monsterCRArr}</p>
  </div>)
}

export default App;

const InputBox = (props) => {

  const {inputText, setInputText} = props;
  const handleTextChange = (event) => {
    setInputText(event.target.value);
  }
  return (
    <div className='_partyLevelBox'>
      <p>Party Level</p>
      <input className='_partyLevelInput' value={inputText} onChange={handleTextChange}></input>
    </div>
  );
}

const MonsterCRsGrid = (props) => {
  const {monsterCRArr, setMonsterCRArr} = props;

  const addNewCRVal =(value) => {
    const values = [...monsterCRArr]
    values.push(value)
    setMonsterCRArr(values)
  }

  return (
    <div className="_monsterCRsGrid">
      {monsterCRArr.map((monsterCRVal,index) => {
      const focusField = (index) => {
        
      }
      const setMonsterCRVal = (value) => {
        const values = [...monsterCRArr]
        values[index]= value
        setMonsterCRArr(values)
      }

        return (
          <MonsterCRInput monsterCRVal={monsterCRVal} setMonsterCRVal={setMonsterCRVal} />
        )
      })}
      <MonsterCRInput monsterCRVal={""} setMonsterCRVal={addNewCRVal} />
    </div>
  )
}

const MonsterCRInput = (props) => {
  const {monsterCRVal, setMonsterCRVal} = props;
  const onValChange = (event) => {
    setMonsterCRVal(event.target.value)
  }

  return <input placeholder='CR' value={monsterCRVal} onChange={onValChange}/>
}

