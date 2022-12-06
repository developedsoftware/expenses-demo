import { Item } from "./item";

export class ExpenseType implements Item {
  public "@id"?: string;

  constructor(_id?: string, public name?: string) {
    this["@id"] = _id;
  }
}
