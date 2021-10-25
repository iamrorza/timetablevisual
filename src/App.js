
import React, { useState } from 'react';
import MainWebsite from './input.js'
import './App.css';
import Timetable from './timetable/timetable.js';
import Block from './timetable/block.js';
import BestResults from './timetable/bestresults.js';

function App() {

  let array = [ ["PAN","LAB","2",[[0,12],[0,15]]] , ["PAN","CMP","3",[[0,15],[1,14]]] ]
  let ba = blockArray(array)
  console.log(ba)
  let tt = new Timetable(ba,[true,true,true,true,true],[[],[],[],[],[]])
  tt.permute(tt.blockArray,0)

  tt.bestResults.best.forEach((e) => console.log(e.print()))
  return (
    <div className="App">
      <MainWebsite />
      <Thing text ={tt.bestResults} />
    </div>
  );
}

function blockArray(ar){
  var blockArray = []
  for(var i = 0;i < ar.length; ++i){
    blockArray.push(new Block(ar[i][0],ar[i][1],ar[i][2],ar[i][3]))
  } 
  console.log(blockArray)
  return blockArray
}

function Thing(props){
  return(
    <div>
      {props.text.best[0].print()}
    </div>
  )
}
export default App;
