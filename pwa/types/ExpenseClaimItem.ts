import { Item } from "./item";

export class ExpenseClaimItem implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public amount?: number,
    public expenseClaimItemReceipts?: string[],
    public expenseClaimId?: string,
    public expenseTypeId?: string,
    public expenseCurrencyId?: string,
    public additionalInfo?: string,
    public expenseClaimItemStatusId?: string,
    public additional_info?: string
  ) {
    this["@id"] = _id;
  }
}
