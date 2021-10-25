class Recorder{
    constructor(table, daysOff, gap){
        this.table = table;
        this.daysOff = daysOff;
        this.gap = gap;
    }
    print(){
        
        const stringg =this.table.reduce(function(string,day){
            if(day.length==0){
                return "";
            }
            else{
                const updatedString = string += day.reduce(function(daystring, classs){
                    const updatedDaystring = daystring + classs.toString() + "\n"
                    return updatedDaystring
                }   )
                return updatedString
            }
        })
        return stringg

    }

}
export default Recorder