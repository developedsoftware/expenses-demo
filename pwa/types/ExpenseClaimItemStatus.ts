import { Item } from "./item";

export class ExpenseClaimItemStatus implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public status?: string,
    public expenseClaimItems?: string[]
  ) {
    this["@id"] = _id;
  }
}
