import { Item } from "./item";

export class Study implements Item {
  public "@id"?: string;

  constructor(_id?: string, public name?: string, public reference?: string) {
    this["@id"] = _id;
  }
}
