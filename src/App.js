
import React, { useState } from 'react';
import usePromise from 'react-promise';
import MainWebsite from './input.js'
import './App.css';
import Timetable from './timetable/timetable.js';
import Block from './timetable/block.js';
import TimetableVisual from './timetableVisual/timetableVisual.js';
import BestResults from './timetable/bestresults.js';

function App() {
  

  const[preferredDays,setPrefferedDays]=useState([true,true,true,true,true])
  const[classes,setClasses]=useState([])
  const[generate,setGenerate]=useState(false)

  if(generate){
    return (
      <div className="App">
        <MainWebsite 
              preferredDays={preferredDays} 
              classes={classes}
              setPreferredDays={setPrefferedDays}
              setClasses={setClasses}
              setGenerate={setGenerate} />
        <TimetableRenderer classes={classes} preferredDays={preferredDays} />
      </div>
    )
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
  for(var i = 0;i < ar.length; ++i){
    blockArray.push(new Block(ar[i][0],ar[i][1],parseFloat(ar[i][2]),ar[i][3]))
  } 
  return blockArray
}

function Thing(props){
  return(
    <div>
      {props.best.best[0].getTableString()}
    </div>
  )
}


function TimetableRenderer(props){
  

  /*let prom = new Promise(function(resolve, reject) {
    console.log(props)
    let ba = blockArray(props.classes)
    let tt = new Timetable(ba,props.preferredDays,[[],[],[],[],[]])
    let results = tt.permute(tt.blockArray,0)
    resolve(results)
  })*/

  const[created,setCreated]=useState(false)
  const[data,setData]=useState(null)
  let prom = () => new Promise(function(resolve, reject) {

    setTimeout(function(){
    let ba = blockArray(props.classes)
    let tt = new Timetable(ba,props.preferredDays,[[],[],[],[],[]])
    let results = tt.permute(tt.blockArray,0)
    //console.log(results)
    
    setCreated(true);
    setData(results)
    resolve(results)
    },3000)
    
  })
  
  if(!created)prom()


 
  //console.log(results.promiseState)
  if(data == null){
    return (
      <Spinner />
    );
  } else{
        return <TimetableVisual results={data} />
  }
}

function Spinner(){
  return(
    <div class="timetableMain blackBorder textCenter">
      <div class="flexCenterColumn textCenter" >
      <div class="spinner"><div></div><div></div><div></div></div>
        TIMETABLE IS BEING GENERATED
        <div class="spinner"><div></div><div></div><div></div></div>
      </div>
        
    </div>
  )
}


export default App;
