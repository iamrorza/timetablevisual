class Block{
    constructor(subject,name,length,potentialTimes){
        this.subject = subject;
        this.name = name;
        this.length = length;
        this.potentialTimes = potentialTimes;
    }
    timesLength(){
        return this.potentialTimes.length
    }
    toString(){
        return "[" + this.subject + ", " + this.name + ", " + this.length + "]";
    }
}
export default Block;