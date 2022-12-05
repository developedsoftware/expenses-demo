import { Item } from "./item";

export class ExpenseClaim implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public expenseClaimItems?: string[],
    public patientId?: string,
    public patientStudySiteVisitId?: string,
    public expenseClaimStatusId?: string
  ) {
    this["@id"] = _id;
  }
}
