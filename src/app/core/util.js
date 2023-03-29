export function getDiffMinute(inputShowing, filmShowing) {
    const filmShowingHour = filmShowing.split('+');
    // console.log(inputShowing, filmShowingHour[0]);
    const diffSecond = convertToSecond(filmShowingHour[0]) - convertToSecond(inputShowing.payload);
    // console.log('diffMs: ', diffSecond);
    var diffMins = Math.round(diffSecond / 60);
    return diffMins;
}

function convertToSecond(hour) {
    if (hour) {
        let hours = hour.split(':');
        return (+hours[0]) * 60 * 60 + (+hours[1]) * 60 + (+hours[2] || 0);
    }
}

export function convertToHourDisplay(hour) {
    console.log(hour);
    let exactHour = hour.split('+');
    let hourDisplay = exactHour[0].split(':');
    return (hourDisplay[0] >= 12 ? hourDisplay[0] - 12 : hourDisplay[0]) + (hourDisplay[0] >= 12 ? ' pm' : ' am')
}