import { Item } from "./item";

export class Currency implements Item {
  public "@id"?: string;

  constructor(_id?: string, public code?: string, public name?: string) {
    this["@id"] = _id;
  }
}
