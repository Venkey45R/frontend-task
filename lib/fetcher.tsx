export const fetchPortfolio = async() =>{
    const res = await fetch('/data/portfolio.txt');
    if(!res.ok){
        throw new Error("Failed to fetch portfolio data");
    }
    return res.json();
}