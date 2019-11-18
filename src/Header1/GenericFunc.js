export default function uniqueFinder(StateArray) {
    let newarray = [];
    StateArray.forEach(element => {
        newarray.push(element.State)
    });
   var filteredArray = newarray.filter(function(item, pos){
    return newarray.indexOf(item)== pos; 
  });
    
//   console.log('Unique array is:-', filteredArray);
   return filteredArray;

}
