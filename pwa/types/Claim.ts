import { Item } from "./item";

export class Claim implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public createdAt?: Date,
    public submittedAt?: Date,
    public patient?: string,
    public study?: string,
    public site?: string,
    public claimStatus?: string
  ) {
    this["@id"] = _id;
  }
}
