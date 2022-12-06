import { Item } from "./item";

export class ClaimItem implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public claim?: string,
    public expenseType?: string,
    public currency?: string,
    public amount?: number,
    public additionalInfo?: string,
    public claimTimestamp?: Date,
    public claimItemReceipts?: string[]
  ) {
    this["@id"] = _id;
  }
}
