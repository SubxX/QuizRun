

export const sleep = (time = 250) =>
    new Promise((resolve) => setTimeout(() => resolve(true), time));

export const preventDefault = (e?: any) => e?.preventDefault()

export const randomizeArrayOrder = (array: any[]) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array
}
