class BestResults{
    constructor(maxsize){
        this.maxsize = maxsize;
        this.best = [];
    }
    add(record){
       
        this.best.push(record)
        if(this.best.length>1)this.sort();
        console.log(this.best)
        
        //if(this.best.length > this.maxsize)this.best.pop(this.best.length-1)
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

    
}
export default BestResults