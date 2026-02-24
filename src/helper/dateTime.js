export function DateTimeFormatter(dateTimeString) {
    const [rawDate, time] = dateTimeString.split(" ");
    const [year, month, day] = rawDate.split("-");
    const date = `${day}-${month}-${year}`;
    return (time === undefined)? date : `${date} ${time}`
} 