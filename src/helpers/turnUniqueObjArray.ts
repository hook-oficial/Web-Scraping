export function turnUniqueObjArray(array: any[], property: any){
    const uniqueArray = new Set();
    const result = array.filter(element => {
    if (!uniqueArray.has(element[property])) {
        uniqueArray.add(element[property]);
            return true;
    }
        return false;
    });
    return result;
}