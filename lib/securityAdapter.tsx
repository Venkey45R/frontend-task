import { SecuritiesModel } from "@/app/models/securitiesModel";

export const adaptSecurityResponse = (api: any) : SecuritiesModel[]=>{
    const payload = api.payload;
    if(!payload){
        return [];
    }
    const securities: any[] = Object.values(payload).flat();
    return securities.map((p: any)=>
        SecuritiesModel.fromJSON(p)
    );
}