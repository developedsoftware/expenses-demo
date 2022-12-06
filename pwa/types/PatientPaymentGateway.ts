import { Item } from "./item";

export class PatientPaymentGateway implements Item {
  public "@id"?: string;

  constructor(_id?: string, public patientId?: string, public data?: any) {
    this["@id"] = _id;
  }
}
