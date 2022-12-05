import { Item } from "./item";

export class ExpenseType implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public expenseClaimItems?: string[]
  ) {
    this["@id"] = _id;
  }
}
