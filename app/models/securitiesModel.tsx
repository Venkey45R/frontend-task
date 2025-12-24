export class SecuritiesModel{
    id: number
    symbol: string
    name: string
    exchanges: string[]
    instrument_type: string
    lot_size: number

    constructor(id: number, symbol: string, name: string, exchanges: string[], instrument_type: string, lot_size: number){
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.exchanges = exchanges;
        this.instrument_type = instrument_type;
        this.lot_size = lot_size;
    }

    static fromJSON(api: any) : SecuritiesModel{
        return new SecuritiesModel(
            api.id,
            api.trading_symbol,
            api.name,
            api.exchanges,
            api.instrument_type,
            api.lot_size,
        );
    }

    toJSON(){
        return {
            symbol: this.symbol,
            name: this.name,
            exchanges: this.exchanges,
            instrument_type: this.instrument_type,
            lot_size: this.lot_size
        };
    }
}

