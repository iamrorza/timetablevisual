class Recorder{
    constructor(table, daysOff, gap){
        this.table = table;
        this.daysOff = daysOff;
        this.gap = gap;
    }
    getTableString(){
        return this.table;
    }

}
export default Recorder