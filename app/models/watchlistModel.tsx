import { SecuritiesModel } from './securitiesModel'

export class WatchlistModel {
  id: string
  name: string
  securities: SecuritiesModel[]

  constructor(
    id: string,
    name: string,
    securities: SecuritiesModel[] = []
  ) {
    this.id = id
    this.name = name
    this.securities = securities
  }

  static fromJSON(json: any): WatchlistModel {
    return new WatchlistModel(
      json.id,
      json.name,
      (json.securities ?? []).map((s: any) =>
        SecuritiesModel.fromJSON(s)
      )
    )
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      securities: this.securities.map(s => s.toJSON()),
    }
  }
}
