
import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <MainWebsite />
    </div>
  );
}

class MainWebsite extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      classes:[],
    }
  }
  render(){
    return(
      <>
      <div class="enterDataTab">
        <InputPanel />
      </div>

      <div class="timetableTab">

      </div>
      </>
    )
  }
}

function InputPanel(){
  return(
    <div class="inputPanel">
      <SubjectInput />
      <ClassInput />
      <LengthInput />
    </div>
  )
}

function SubjectInput(props){
  const [subjectName, setSubjectName] = useState("");

  return(
    <div class="singularInput subjectInput">
      <form>
      <label>Enter Subject Name:    
        <input 
          type="text" 
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
      </label>
    </form>
    </div>
  )
}
function ClassInput(props){
  const [className, setClassName] = useState("");

  return(
    <div class="singularInput classInput">
      <form>
      <label>Enter Class:    
        <input 
          type="text" 
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </label>
    </form>
    </div>
  )
}
function LengthInput(props){
  const [length, setLength] = useState("");

  return(
    <div class="singularInput lengthInput">
      <form>
      <label>Enter Class Length:    
        <input 
          type="text" 
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </label>
    </form>
    </div>
  )
}
export default App;
