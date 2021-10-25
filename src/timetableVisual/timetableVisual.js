import React from 'react'

function TimetableVisual(props){
    let rowArray=[];
    for(var i = 0; i < 5; ++i){
        rowArray.push(<DayRow key={i} day={i} />)
    }
    let lineArray = []
    for(var i = 0; i < 25; ++i){
        lineArray.push(<Line key={i} halfHour={i} />)  
    }

    return (
      <div class="timetableMain">
          
          <DayChooser />
          {rowArray}
          {lineArray}
          <HourNames />
          
      </div>
    )
}
function DayChooser(props){
    return(
        <div class="dayChooser">

        </div>
    )
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
export default TimetableVisual;