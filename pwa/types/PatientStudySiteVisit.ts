import { Item } from "./item";

export class PatientStudySiteVisit implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public expenseClaims?: string[],
    public patientId?: string,
    public studyId?: string,
    public siteId?: string,
    public visitTimestamp?: Date,
    public visit_timestamp?: Date
  ) {
    this["@id"] = _id;
  }
}
