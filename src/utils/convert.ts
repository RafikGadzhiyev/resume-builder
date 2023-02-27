export const ConvertToMinutes = (n: number) => {
    let minutes = Math.floor(n / 60) % 60;

    return (minutes < 10 ? '0' : '') + minutes;
}

export const ConvertToSeconds = (n: number) => {
    let seconds = n % 60;

    return (seconds < 10 ? '0' : '') + seconds;
}

export const ConvertToHours = (n: number) => {
    let hours = Math.floor(n / 3600);

    return (hours < 10 ? '0' : '') + hours;
}