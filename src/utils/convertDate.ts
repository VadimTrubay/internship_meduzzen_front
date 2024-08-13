export const formatTimestamp = (timestampStr: Date) => {
    const date = new Date(timestampStr);
    const time = date.toTimeString().split(' ')[0];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `(${day}-${month}-${year})`;

    return `${time} ${formattedDate}`;
}