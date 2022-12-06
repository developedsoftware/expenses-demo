import { Item } from "./item";

export class PatientPaymentGateway implements Item {
  public "@id"?: string;

  constructor(_id?: string, public patient?: string, public data?: any) {
    this["@id"] = _id;
  }
}
