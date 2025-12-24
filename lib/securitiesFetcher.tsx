export const fetcher = async() =>{
    const res = await fetch('/data/securities.txt');
    if(!res.ok){
        throw new Error("Failed to fetch securities data");
    }
    return res.json();
}