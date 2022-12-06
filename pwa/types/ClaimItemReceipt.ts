import { Item } from "./item";

export class ClaimItemReceipt implements Item {
  public "@id"?: string;

  constructor(_id?: string, public claimItemId?: string, public data?: any) {
    this["@id"] = _id;
  }
}
