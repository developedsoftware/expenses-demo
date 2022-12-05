import { Item } from "./item";

export class ExpenseClaimItemReceipt implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public data?: any,
    public expenseClaimItemId?: string
  ) {
    this["@id"] = _id;
  }
}
