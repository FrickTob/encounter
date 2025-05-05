import {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { multiplyByMultiplier, getXPThreshFromCR, getXPThreshFromLevel } from './DifficultyCalcs';

const EncounterDifficulties = {
  0: "Trivial",
  1: "Easy",
  2: "Medium",
  3: "Hard",
  4: "Deadly"
}

const InputGridTypes = {
  PARTY_LEVEL: 1,
  MONSTER_CR: 2
}
const PARTY_LEVEL_ARR_STR_KEY = "partyLevelArrStr"
const MONSTER_CR_ARR_STR_KEY = "monsterCRArrStr"

function App() {
  let levelArrayStartValue = JSON.parse(localStorage.getItem(PARTY_LEVEL_ARR_STR_KEY))
  let crArrayStartValue = JSON.parse(localStorage.getItem(MONSTER_CR_ARR_STR_KEY))
  if (levelArrayStartValue === null) {
    levelArrayStartValue = [{value: "", count: ""}]
  }
  if (crArrayStartValue === null) {
    crArrayStartValue = [{value: "", count: ""}]
  }
  const [partyLevelArr,setPartyLevelArr] = useState(levelArrayStartValue)
  const [monsterCRArr, setMonsterCRArr] = useState(crArrayStartValue)

  const [partyXPThresh, setPartyXPThresh] = useState({easy: 0, medium: 0, hard: 0, deadly: 0})
  const [monsterXP, setMonsterXP] = useState(0)

  const [encounterDifficulty, setEncounterDifficulty] = useState(0)

  const [invalidReason, setInvalidReason] = useState("")

  useEffect(() => {
    const vals = {...partyLevelArr}
    vals.easy = partyLevelArr.reduce((acc, level) => acc + (getXPThreshFromLevel(1,level.value) * level.count),0)
    vals.medium = partyLevelArr.reduce((acc, level) => acc + (getXPThreshFromLevel(2,level.value) * level.count),0)
    vals.hard = partyLevelArr.reduce((acc, level) => acc + (getXPThreshFromLevel(3,level.value) * level.count),0)
    vals.deadly = partyLevelArr.reduce((acc, level) => acc + (getXPThreshFromLevel(4,level.value) * level.count),0)
    setPartyXPThresh(vals)
    localStorage.setItem(PARTY_LEVEL_ARR_STR_KEY,JSON.stringify(partyLevelArr))
  }, [partyLevelArr])

  useEffect(() => {
    const monsterXPSum = monsterCRArr.reduce((acc, cr) => acc + (getXPThreshFromCR(cr.value) * cr.count),0)
    const numMonsters = monsterCRArr.reduce((acc, cr) => acc + cr.count,0)
    const monsterXP = multiplyByMultiplier(monsterXPSum, numMonsters)
    setMonsterXP(monsterXP)
    localStorage.setItem(MONSTER_CR_ARR_STR_KEY,JSON.stringify(monsterCRArr))
  },[monsterCRArr])

  useEffect(() => {
    if (monsterXP < partyXPThresh.easy) setEncounterDifficulty(0)
    else if (monsterXP < partyXPThresh.medium) setEncounterDifficulty(1)
    else if (monsterXP < partyXPThresh.hard) setEncounterDifficulty(2)
    else if (monsterXP < partyXPThresh.deadly) setEncounterDifficulty(3)
    else setEncounterDifficulty(4)
  }, [partyXPThresh, monsterXP])

  useEffect(() => {
    if (partyXPThresh.easy === 0) {
      setInvalidReason("Add at least one valid party member")
    }
    else if (monsterXP === 0) {
      setInvalidReason("Add at least one valid monster")
    }
    else {
      setInvalidReason("")
    }
  },[partyXPThresh, monsterXP])

  return (<div className="App">
  <div className="_inputGridContainer">
    <div>
    <InputGrid title="Your Party" valsArr={partyLevelArr} setValsArr={setPartyLevelArr} inputGridType={InputGridTypes.PARTY_LEVEL} />
    {/* <p>Difficulty</p>
  <p>{partyXPThresh.easy}</p>
  <p>{partyXPThresh.medium}</p>
  <p>{partyXPThresh.hard}</p>
  <p>{partyXPThresh.deadly}</p>
  <p>{monsterXP}</p> */}
    </div>
    <div>
    <InputGrid title="Monsters" valsArr={monsterCRArr} setValsArr={setMonsterCRArr} inputGridType={InputGridTypes.MONSTER_CR}  />
    </div>
    <DifficultyLevelBar invalidReason={invalidReason} difficulty={encounterDifficulty}/>

  </div>
  </div>)
}

export default App;

const InputGrid = (props) => {
  const {title, valsArr, setValsArr,inputGridType} = props;

  const addNewRow =() => {
    const values = [...valsArr]
    values.push({value: "", count: ""})
    setValsArr(values)
  }

  const onTriggerRemove = (index) => {
    const values = [...valsArr]
    values.splice(index, 1)
    setValsArr(values)
  }


  return (
    <div className="_inputGrid">
      <h5 className="_inputGridTitle">{title}</h5>
      <div className="_inputGridHeaders">
        <p className="_countField">#</p>
        <p>{inputGridType === InputGridTypes.MONSTER_CR ? "CR" : "Level"}</p>
      </div>
      {valsArr.map((val,index) => {
      const setVal = (value) => {
        const values = [...valsArr]
        values[index].value= value
        setValsArr(values)
      }
      const setCount = (count) => {
        const values = [...valsArr]
        values[index].count= count
        setValsArr(values)
      }

        return (
          <ValAndCountContainer 
              type={inputGridType}
              val={val.value}  
              setVal={setVal} 
              count={val.count} 
              setCount={setCount} 
              onTriggerRemove={onTriggerRemove} 
              index={index} />
        )
      })}
      <button className="_addRowButton" onClick={addNewRow}>Add Row</button>
    </div>
  )
}

const ValAndCountContainer = (props) => {
  const {type, val, setVal, count, setCount, onTriggerRemove, index} = props;
  return (
    <div className='_valueAndCountContainer'>
          <ValCountField count={count} setCount={setCount} />
          <ValInputField type={type} val={val} setVal={setVal} />
          <button className={"_removeRowButton " + (index === 0 ? "_hidden" : "")} onClick={() => {onTriggerRemove(index)}}><i class="bi bi-trash"></i></button>
    </div>
  )
}

const ValInputField = (props) => {
  const {type, val, setVal} = props;
  const onValChange = (event) => {
    setVal(event.target.value)
  }
  const placeholder = type === InputGridTypes.MONSTER_CR ? "CR" : "Level"
  return <input placeholder={placeholder} value={val} onChange={onValChange}/>
}

const ValCountField = (props) => {
  const {count, setCount} = props;
  const onCountChange = (event) => {
    setCount(event.target.value)
  }
  return <input className='_countField' placeholder='#' value={count} onChange={onCountChange}/>
}

const DifficultyLevelBar = (props) => {
  const {invalidReason, difficulty} = props;
  const difficultyBarCssClass = difficulty === 1 ? "_easyBar" : difficulty === 2 ? "_mediumBar" : difficulty === 3 ? "_hardBar" : "_deadlyBar"
  
  return (
    <div className="_smallTopPadding">
      {invalidReason !== "" ? 
      <p>{invalidReason}</p> : 
      <div>
        <p className='_smallBottomPadding'>Encounter Difficulty: {EncounterDifficulties[difficulty]}</p>
        <div className='_difficultyLevelBar'>
          <div className={"_baseBar " + (difficulty > 0 ? difficultyBarCssClass : "")} />
          <div className={"_baseBar " + (difficulty > 1 ? difficultyBarCssClass : "")}/>
          <div className={"_baseBar " + (difficulty > 2 ? difficultyBarCssClass : "")}/>
          <div className={"_baseBar " + (difficulty > 3 ? difficultyBarCssClass : "")} />
        </div>
      </div>
      }
    </div>
  )
}

