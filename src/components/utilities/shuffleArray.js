export function shuffleArray(arr) {
    for(let i = 0; i < arr.length; i++) {
        let randIndex = Math.floor(Math.random() * (arr.length-1))
        let temp = arr[i]
        arr[i] = arr[randIndex]
        arr[randIndex] = temp
    }
    return arr
}