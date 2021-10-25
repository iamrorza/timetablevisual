class ProposedClass{
    constructor(block, arrayTimeIndex){
        this.block = block
        this.arrayTimeIndex = arrayTimeIndex
    }
    getTime(){
        return this.block.potentialTimes[this.arrayTimeIndex];
    }
}

export default ProposedClass