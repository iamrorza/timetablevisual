import React, {useState} from "react";

class MainWebsite extends React.Component{
    constructor(props){
      super(props)
      this.state ={
        day:0,
        classes:[],
        currentClassTimes:[]
      }
      this.changeDay = this.changeDay.bind(this)
      this.updateTimeArray = this.updateTimeArray.bind(this)
      this.addClass = this.addClass.bind(this)
    }
    
    addClass(uniClass){
      
    let stateClasses = this.state.classes;
    let classes= this.state.currentClassTimes;
    
    let newclass = [uniClass[0],uniClass[1],uniClass[2],classes]

    stateClasses.push(newclass)
      
    this.setState({
        classes:stateClasses,
        day:this.state.day,
        currentClassTimes:[]
    })

    console.log(this.state)
    }
    changeDay(day){
        this.setState({day:day})
    }
    updateTimeArray(classtimes){
        this.setState({
            day:this.state.day,
            classes:this.state.classes,
            currentClassTimes:classtimes
        })
    }
    render(){
      return(
        
        <div class="enterDataTab">

            <div class="inputPanel">
                <SubjectInput addClass={this.addClass}/>
            </div>
            <DayPanel currentDay={this.state.day} changeDay={this.changeDay} />
            <div class="timePanel">
                <TimeInput currentDay={this.state.day} updateTimeArray={this.updateTimeArray} timeArray = {this.state.currentClassTimes}/>
            </div>
        </div>
        
      )
    }
  }

    function DayPanel(props){
        return(
        <div class="dayPanel">
            <DayButton day="Mon" currentDay={props.currentDay} buttonDay={0} changeDay={props.changeDay} />
            <DayButton day="Tue" currentDay={props.currentDay} buttonDay={1} changeDay={props.changeDay}/>
            <DayButton day="Wed" currentDay={props.currentDay} buttonDay={2} changeDay={props.changeDay}/>
            <DayButton day="Thurs" currentDay={props.currentDay} buttonDay={3} changeDay={props.changeDay}/>
            <DayButton day="Fri" currentDay={props.currentDay} buttonDay={4} changeDay={props.changeDay}/>
        </div>
        )
    }

    function DayButton(props){
        
    
        var styleClass ="";
        
        if(props.buttonDay === props.currentDay)styleClass="dayButtonClicked textCenter"
        else styleClass="dayButton textCenter"
        
        return(
            <div class={styleClass}
            onClick={() => props.changeDay(props.buttonDay)}>
                {props.day}
            </div>
        )
      }

    class TimeInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            timeArray:[]
        }
        this.updateClickedArray = this.updateClickedArray.bind(this)
    }
    updateClickedArray(bool,time){
        var array = this.props.timeArray
        if(bool){
            array.push(time)
        }
        else{
            let index = 0;
            for(var i = 0; i < array.length;i++){
                if(array[i][0]===time[0]&&array[i][1]===time[1]){
                    index = i;
                }
            }
            array.splice(index,index+1);
        }
        this.props.updateTimeArray(array)
        
        //this.setState({timeArray:array}) 
    }
    checkIfInTimeArray(day,time){
        for(var i = 0; i < this.props.timeArray.length;++i){
           
            if(day===this.props.timeArray[i][0]&&this.props.timeArray[i][1]==time)return true
        }
        return false;
    }
    render(){
        var buttonArray = [];
        for(var i = 0; i < 26;i++){
            var initialState = this.checkIfInTimeArray(this.props.currentDay,8+(i/2))
            //console.log(initialState + " " + this.props.currentDay)
            buttonArray.push(<TimeButton 
                            time={8+(i/2)}
                            initialState={initialState}
                            updateClickedArray={this.updateClickedArray}
                            day ={this.props.currentDay}
                            key={i}
                            />);
        }
        return(
            <>
            {buttonArray}
            </>
        )
    }
  }

  function TimeButton(props){
    var time = "";
    if(props.time%1===0){
        time = props.time + ":00"
    }
    else{
        let rawtime = props.time-0.5;
        time = rawtime + ":30"
    }

    var styleClass ="";
    if(props.initialState)styleClass="timeButtonClicked textCenter"
    else styleClass="timeButton textCenter"

    return(
        <div class={styleClass}
        onClick={() =>{props.updateClickedArray(!props.initialState,[props.day,props.time])}}>
            {time}
        </div>
    )
  }
  
  function SubjectInput(props){
    const [subjectName, setSubjectName] = useState("");
    const [className, setClassName] = useState("");
    const [length, setLength] = useState("");
    
    function resetText(){
        setSubjectName("")
        setClassName("")
        setLength("")
    }
  
    return(
      <>
      <div class="singularInput subjectInput textCenter">
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
  
      <div class="singularInput classInput textCenter">
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
  
    <div class="singularInput lengthInput textCenter">
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
  
      <div class="submitButton textCenter" onClick={() => {props.addClass([subjectName,className,length]); resetText()}}>
        Add Class
      </div>
    </>
    
    )
  }

export default MainWebsite;