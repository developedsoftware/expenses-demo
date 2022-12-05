import { Item } from "./item";

export class PatientAddress implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public patientId?: string,
    public addressLine1?: string,
    public addressLine2?: string,
    public addressLine3?: string,
    public addressLine4?: string,
    public areaCode?: string,
    public countryCode?: string,
    public isPrimary?: boolean,
    public address_line_1?: string,
    public address_line_2?: string,
    public address_line_3?: string,
    public address_line_4?: string,
    public area_code?: string,
    public country_code?: string,
    public is_primary?: boolean
  ) {
    this["@id"] = _id;
  }
}
