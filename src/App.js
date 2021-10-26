
import React, { useState } from 'react';
import MainWebsite from './input.js'
import './App.css';
import Timetable from './timetable/timetable.js';
import Block from './timetable/block.js';
import TimetableVisual from './timetableVisual/timetableVisual.js';

function App() {

  const[preferredDays,setPrefferedDays]=useState([true,true,true,true,true])
  const[classes,setClasses]=useState([])
  const[generate,setGenerate]=useState(false)

  if(generate){
    //let array = [ ["PAN","LAB","2",[[0,12.5],[0,15.5]]] , ["PAN","CMP","3",[[0,15],[1,14]]] ]
    console.log(classes)
    let ba = blockArray(classes)
    console.log(ba)
    let tt = new Timetable(ba,preferredDays,[[],[],[],[],[]])
    tt.permute(tt.blockArray,0)
    
    for(var record in tt.bestResults.best){
      console.log(tt.bestResults.best.at(record).getTableString())
    }
    return (
      <div className="App">
        <MainWebsite 
              preferredDays={preferredDays} 
              classes={classes}
              setPreferredDays={setPrefferedDays}
              setClasses={setClasses}
              setGenerate={setGenerate} />
  
        <Thing best={tt.bestResults} />
  
        <TimetableVisual results={tt.bestResults} />
      </div>
    );
  }
  else{
    return (
      <div className="App">
        <MainWebsite 
              preferredDays={preferredDays} 
              classes={classes}
              setPreferredDays={setPrefferedDays}
              setClasses={setClasses}
              setGenerate={setGenerate} />
      </div>
    );
  }
  
}

function blockArray(ar){
  var blockArray = []

  console.log(ar)
  for(var i = 0;i < ar.length; ++i){
    blockArray.push(new Block(ar[i][0],ar[i][1],parseFloat(ar[i][2]),ar[i][3]))
  } 
  console.log(blockArray)
  return blockArray
}

function Thing(props){
  return(
    <div>
      {props.best.best[0].getTableString()}
    </div>
  )
}


export default App;
