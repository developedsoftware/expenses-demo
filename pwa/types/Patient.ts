import { Item } from "./item";

export class Patient implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public email?: string,
    public password?: string,
    public patientAddresses?: string[],
    public patientStripeAccount?: string,
    public patientStudySiteVisits?: string[],
    public expenseClaims?: string[],
    public registrationId?: number,
    public firstName?: string,
    public lastName?: string,
    public first_name?: string,
    public last_name?: string
  ) {
    this["@id"] = _id;
  }
}
