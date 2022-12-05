import { Item } from "./item";

export class ExpenseCurrency implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public currency?: string,
    public expenseClaimItems?: string[]
  ) {
    this["@id"] = _id;
  }
}
