import { Item } from "./item";

export class Claim implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public createdAt?: Date,
    public submittedAt?: Date,
    public patientId?: string,
    public studyId?: string[],
    public siteId?: string,
    public claimStatusId?: string,
    public claimItems?: string[]
  ) {
    this["@id"] = _id;
  }
}
