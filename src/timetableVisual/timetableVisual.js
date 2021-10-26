
import React, { useState } from 'react'
import arrow from "../images/arrowImage.png"
function TimetableVisual(props){
    const[day, setDay] = useState(0);

    let rowArray=[];
    for(var i = 0; i < 5; ++i){
        rowArray.push(<DayRow key={i} day={i} />)
    }
    let lineArray = []
    for(var i = 0; i < 25; ++i){
        lineArray.push(<Line key={i} halfHour={i} />)  
    }

    
    const splitArray = props.results.best[day].table.split(",")
    let blockArray = [];

    const size = splitArray.length/5
    for(var i =0; i < size;++i){
        blockArray.push(<Block classInfo={splitArray.splice(0,5)} />)
    }
    return (
      <div class="timetableMain">
          
          <DayChooser changeDay={setDay} day={day} />
          {rowArray}
          {lineArray}
          <HourNames />
          {blockArray}
      </div>
    )
}
function Block(props){
    console.log(props.classInfo)

    const day = parseInt(props.classInfo[3]), startTime = parseFloat(props.classInfo[4]), length = parseFloat(props.classInfo[2]);

    const style={
        "position": "absolute",
        "top": (10 + 16*day).toString().concat("%"),
        "height": "15.9%",
        "left": ( (startTime-8)*(200/26)).toString().concat("%"),
        "width":( length*200/26 -0.1) .toString().concat("%"),
        "backgroundColor":" rgb(25, 255, 255)",
        "border":"1px solid black",
        "textAlign":"left"
    }
    const timeString = returnString(startTime,length)
    return(
        <div style={style}>
            {props.classInfo[0]}
            <br />
            {props.classInfo[1]}
            <br />
            {timeString}
        </div>
    )
}

function returnString(time,length){
    let startString = "";
    let endString = "";
    if(time %1==0){
        startString = Math.floor(time) + ":00";
    }
    else{
        startString = Math.floor(time) + ":30";
    }
    
    if( (time+length)%1==0){
        endString = Math.floor(time+length) + ":00";
    }
    else{
        endString = Math.floor(time+length) + ":30";
    }

    return startString +" - " + endString

}

function Line(props){
    console.log(props.key)
    const style ={
        "position": "absolute",
        "top": "10%",
        "height": "80%",
        "left": (props.halfHour*(100/26)).toString().concat("%"),
        "width":(100/26).toString().concat("%"),
        "backgroundColor":" rgba(255, 255, 255,0)",
        "borderStyle":"none solid none none",
        "borderWidth":"1px",
        
    }
    return(
        <div style={style}>

        </div>
    )
}
function HourNames(props){
    let hourArray=[];
    for(var i = 0; i < 14; ++i){
        hourArray.push(<Hour key={i} hour={8+i} />)
    }
    return(
        <div class="hournames">
            {hourArray}
        </div>
    )
}
function Hour(props){
    const style ={
        "position": "absolute",
        "left": ((props.hour-8.1)*7.67).toString().concat("%"),
        "height": "50%",
        "top":"0%",
        "width":"2%",
    }
    return(
        <div style={style}>
            {props.hour}
        </div>
    )
}
function DayRow(props){

    const style ={
        "position": "absolute",
        "top": (props.day*16 + 10).toString().concat("%"),
        "height": "16%",
        "left":"0%",
        "width":"100%",
        "backgroundColor":" rgb(255, 255, 255)",
        "border":"1px solid black"
    }
    return(
        <div style={style}>
            
        </div>
    )
}

function DayChooser(props){
    return(
        <div class="dayChooser textCenter" >
            <Arrow rotate={0} changeDay={props.changeDay} day={props.day}/>
            <TimetableResultTitle day={props.day} />
            <Arrow rotate={1} changeDay={props.changeDay} day={props.day}/>
        </div>
    )
}

function TimetableResultTitle(props){
    return(
        <div class="textCenter">
            Timetable {props.day+1}
        </div>
    )
}

function Arrow(props){
    
    const style={
        "width":"5em",
        "height":"3em",
        "transform": "rotate(" + (props.rotate*180).toString().concat("deg)")
    }
    return(
        <div class="arrow" onClick={()=>props.changeDay(( props.day-1+props.rotate*2)%5 )}>
            <img src={arrow} style={style}/>
        </div>
    )
}

export default TimetableVisual;