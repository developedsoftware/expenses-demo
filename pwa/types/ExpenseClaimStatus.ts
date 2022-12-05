import { Item } from "./item";

export class ExpenseClaimStatus implements Item {
  public "@id"?: string;

  constructor(_id?: string, public status?: string) {
    this["@id"] = _id;
  }
}
