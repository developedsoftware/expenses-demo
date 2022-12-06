import { Item } from "./item";

export class PatientAddress implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public patient?: string,
    public line1?: string,
    public line2?: string,
    public line3?: string,
    public areaCode?: string,
    public countryCode?: string
  ) {
    this["@id"] = _id;
  }
}
