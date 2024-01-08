export class Capital {
  constructor(id: number, country: string, capital: string, regionId: number) {
    this.id = id;
    this.country = country;
    this.capital = capital;
    this.region_id = regionId;
  }
  id: number;
  country: string;
  capital: string;
  region_id: number;
}
