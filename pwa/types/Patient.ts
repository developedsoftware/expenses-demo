import { Item } from "./item";

export class Patient implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public registrationNumber?: number,
    public email?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public patientAddresses?: string[],
    public patientPaymentGateways?: string[],
    public claims?: string[]
  ) {
    this["@id"] = _id;
  }
}
