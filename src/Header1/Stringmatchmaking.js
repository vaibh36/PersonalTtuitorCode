
export default function stringMatch(StateArray, value){
    console.log('Here')
    let newarray=[]
    for(let i=0;i<StateArray.length;i++){
        if(value.match(StateArray[i])){
            newarray.push(StateArray[i])
        }
    }
    console.log('Matched array values are:-', newarray)
}