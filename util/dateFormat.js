export function formatDate(date){
    let dateArr = date.split("-");
    let output = "";
    const monthArr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
    output += monthArr[parseInt(dateArr[1])-1]
    output += " ";
    output += dateArr[2];
    output += ", "
    output += dateArr[0];
    return output;
}