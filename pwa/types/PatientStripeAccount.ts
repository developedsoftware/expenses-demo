import { Item } from "./item";

export class PatientStripeAccount implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public patientId?: string,
    public stripeAccountUuid?: string,
    public stripe_account_uuid?: string
  ) {
    this["@id"] = _id;
  }
}
