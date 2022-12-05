import { Item } from "./item";

export class Study implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public patientStudySiteVisits?: string[],
    public studyReference?: string,
    public study_reference?: string
  ) {
    this["@id"] = _id;
  }
}
