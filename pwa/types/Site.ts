import { Item } from "./item";

export class Site implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public reference?: string,
    public claims?: string[]
  ) {
    this["@id"] = _id;
  }
}
