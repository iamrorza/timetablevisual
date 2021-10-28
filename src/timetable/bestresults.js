class BestResults{
    constructor(maxsize){
        this.maxsize = maxsize;
        this.best = [];
    }
    add(record){
        if(this.isNotDuplicate(record)){
            this.best.push(record)
            if(this.best.length>1)this.sort();
            if(this.best.length > this.maxsize)this.best.pop(this.best.length-1)
        }
        else{
            console.log("DUPLICATE")
        }
    }
    sort(){
        var temp = [];
        var bestTemp = this.best
        while(bestTemp.length > 0){
            var min = 0;
            for(var i = 0; i < bestTemp.length;++i){
                if(bestTemp[min].daysOff < bestTemp[i].daysOff){
                    min = i
                }
                else if(bestTemp[min].daysOff === bestTemp[i].daysOff){
                    if(bestTemp[min].gap > bestTemp[i].gap){
                        min = i
                    }
                }
            }
            
            temp.push(bestTemp[min])
            bestTemp.splice(bestTemp.indexOf(bestTemp[min]),1)
        }
        this.best = temp
    }
    isNotDuplicate(record){
        //FIXME Duplicate being called too much
        for(var result of this.best){
            if(result.getTableString()===record.getTableString())return false;
        }
        return true;
    }
}
export default BestResults