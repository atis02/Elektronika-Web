interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
export const countries: readonly CountryType[] = [
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BY", label: "Belarus", phone: "375" },
  {
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CN", label: "China", phone: "86" },
  {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "FI", label: "Finland", phone: "358" },
  {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  { code: "IN", label: "India", phone: "91" },
  { code: "IT", label: "Italy", phone: "39" },
  {
    code: "JP",
    label: "Japan",
    phone: "81",
    suggested: true,
  },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "RU", label: "Russian Federation", phone: "7" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TR", label: "Turkey", phone: "90" },
  {
    code: "US",
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" },
];
