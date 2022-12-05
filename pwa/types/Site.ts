import { Item } from "./item";

export class Site implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public patientStudySiteVisits?: string[],
    public siteReference?: string,
    public site_reference?: string
  ) {
    this["@id"] = _id;
  }
}
