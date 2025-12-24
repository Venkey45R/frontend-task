import { PortfolioModel } from "@/app/models/portfolioModel"

export const adaptPortfolioResponse = (api: any) : PortfolioModel[] =>{
    return api.payload.open_positions.map((p: any)=>
        PortfolioModel.fromJSON(p)
    );
} 