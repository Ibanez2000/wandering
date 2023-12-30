

url = "https://raw.githubusercontent.com/Ibanez2000/wandering/main/files/japanese/anime/anime.json";

async function readJSON(url) {
    let response = await fetch(url)
    let data = await response.json()
    
    return data;
}

let a = readJSON(url);

console.log(a);