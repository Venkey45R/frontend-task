export class PortfolioModel{
    symbol: string
    quantity: number
    avgPrice: number
    ltp: number
    pnl: number
    marketValue: number

    constructor(symbol: string, quantity: number, avgPrice: number, ltp: number, pnl: number, marketValue: number){
        this.symbol = symbol;
        this.quantity = quantity;
        this.avgPrice = avgPrice;
        this.ltp = ltp;
        this.pnl = pnl;
        this.marketValue = marketValue;
    }

    static fromJSON(api: any) : PortfolioModel{
        return new PortfolioModel(
            api.trading_symbol,
            api.position,
            api.average_cost_per_share,
            api.latest_price,
            api.unrealized_pnl,
            api.cur_market_value
        );
    }

    toJSON(){
        return {
            trading_symbol: this.symbol,
            position: this.quantity,
            average_cost_per_share: this.avgPrice,
            latest_price: this.ltp,
            unrealized_pnl: this.pnl,
            cur_market_value: this.marketValue
        };
    }
}