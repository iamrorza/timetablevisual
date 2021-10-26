import Block from './block';
import BestResults from './bestresults';
import ProposedClass from './proposedclass.js';
import Recorder from './recorder.js';

class Timetable{
    constructor(blockArray,preferredDays, timetable){
        this.blockArray = blockArray
        this.preferredDays = preferredDays
        this.timetable = timetable
        

        this.bestResults = new BestResults(5)
    }
    
    canPlaceBlock(block, num){
        var day = block.potentialTimes[num][0]
        var time = block.potentialTimes[num][1]
        if(this.timetable[day].length!==0 && this.isPreferredDay(day)){
            for(var i = 0; i < this.timetable[day].length;++i){
                if(time < this.timetable[day][i].getTime() + this.timetable[day][i].block.length && time + block.length < this.timetable[day][i].getTime()){
                    return false
                }
            }
        }else if(this.timetable[day].length===0 && !this.isPreferredDay(day)) return false;

        return true;
    }
    isPreferredDay(day){
        return this.preferredDays[day]
    }
    placeBlock(block, num){
        var day = block.potentialTimes[num][0]
        var pc = new ProposedClass(block,num)
        this.timetable[day].push(Object.assign(Object.create(Object.getPrototypeOf(pc)), pc))
        //console.log(pc)
        //console.log(this.timetable)
    }
    removeBlock(block,num){
        var day = block.potentialTimes[num][0];
        this.timetable[day].splice(this.getProposedClassFromDay(block, day),1)
    }
    getProposedClassFromDay(block, day){
        for(var i =0; i < this.timetable[day].length; ++i){
            if(this.timetable[day][i].block===block){
                //console.log("HERHEHREHRhERHREH")
                return i
            }
        }
        return null;
    }
    daysOff(){
        var count = 0;
        for(var i = 0; i < 5; ++i ){
            if(this.timetable[i].length===0)++count;
        }
        return count;
    }
    sortDays(){
        for(var i = 0; i < 5; ++i){
            this.timetable[i].sort(function(a,b){return a-b})
        }
        /*
        for(var i = 0; i < 5; ++i){
            var dayList = this.timetable[i]
            if(dayList.length>1){
                for (var j = 0; j < dayList.length-1; ++j) {
                    var smallest = dayList[j];
                    for (var k = j+1; k < dayList.length; ++k) {
                         if (dayList[k].getTime() < smallest.getTime()) {
                            smallest = dayList[k];
                        }
                    }
                    var temp = dayList[j]
                    dayList[j] = dayList[dayList.indexOf(smallest)]
                    dayList[dayList.indexOf(smallest)] = temp
                }
            }
        }
        */
    }
    singleDayGap(dayList){
       
        var size = dayList.length
        
        if(size<2)return 0;
        else if(size === 2){
            return dayList[1].getTime() - (dayList[0].getTime() + dayList[0].block.length) 
        }
        else{
            var classesInbetweenLength = 0;
            for(var i = 1; i < dayList.length-1; ++i){
                classesInbetweenLength += dayList[i].block.length;
            }
            
            return dayList[size-1].getTime() - (dayList[0].getTime() + dayList[0].block.length) - classesInbetweenLength;
        }
    }
    totalGap(){
        this.sortDays();
        var gap = 0
        for(var i =0; i < 5; ++i){
            gap += this.singleDayGap(this.timetable[i])
        }
        return gap;
    }
    recursiveCheck(currentBlockIndex, blockArray){
        for(var i = 0; i < blockArray[currentBlockIndex].timesLength(); i++){
            if(this.canPlaceBlock(blockArray[currentBlockIndex],i)){
                this.placeBlock(blockArray[currentBlockIndex],i)
                
                if(currentBlockIndex !== blockArray.length-1){
                    this.recursiveCheck(currentBlockIndex+1,blockArray)
                }
                else{
                    var strin = this.stringify();
                    this.bestResults.add( new Recorder( strin ,this.daysOff(),this.totalGap()))
                }
                this.removeBlock(blockArray[currentBlockIndex],i)
            }
            else{
                //console.log("CANNOT PLACE CKASS")
            }
        }
    }
    swap(ar,k,i){

        var a = ar[i], b = ar[k];
        ar[k] = a;
        ar[i] = b;

    }
    swapOverlap(x,y,ar){
        if(y!==x){
            for(var i =0;i<ar[x].timesLength();++i){
                for(var j = 0; j <ar[y].timesLength();++j){
                    if(ar[x].potentialTimes[i][0] === ar[y].potentialTimes[j][0])return true
                }
            }
        }
        return false;
    }

    permute(ar,k){
        for(var i = k;i<ar.length;i++){
            if(this.swapOverlap(i,k,ar)){
                this.swap(ar,i,k)
                this.permute(ar,k+1)
                this.swap(ar,k,i)
            }
            else{
                this.permute(ar,k+1)
            }
        }
        if(k===ar.length){
            this.recursiveCheck(0,ar)
        }
    }
    stringify(){
        var string = "";
        for(var i = 0; i < 5;++i){
            if(this.timetable[i].length!==0){
                string += this.timetable[i].reduce(function(stringg, classs){
                    let string = stringg + "," + classs.toString() + ","
                    
                    return string
                })
            }
        }
        console.log(string)
        return string;
    }
    day(i){
        switch(i){
            case 0:
                return "Monday"
            case 1:
                return "Tuesday"
            case 2:
                return "Wednesday"
            case 3:
                return "Thursday"
            case 4:
                return "Friday"
            default:
                return "ERROR"
        
        }
    }
    
}

export default Timetable;

