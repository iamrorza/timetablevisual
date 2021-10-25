class ProposedClass{
    constructor(block, arrayTimeIndex){
        this.block = block
        this.arrayTimeIndex = arrayTimeIndex
    }
    getTime(){
        return this.block.potentialTimes[this.arrayTimeIndex];
    }
    toString(){
        return `${this.block.toString()},${this.block.potentialTimes[this.arrayTimeIndex][0]},${this.block.potentialTimes[this.arrayTimeIndex][1]}`
    }
}

export default ProposedClass