export interface SubMeterUser {
  id: string;
  name: string;
  units: number;
}

export interface BillResult {
  userName: string;
  unitsConsumed: number;
  electricityCost: number;
  externalChargesShare: number;
  totalAmount: number;
}

export interface CalculationSummary {
  totalUnits: number;
  pricePerUnit: number;
  totalBillAmount: number;
  externalCharges: number;
  results: BillResult[];
  calculatedAt: Date;
}

export interface SavedBill {
  id: string;
  name: string;
  savedAt: Date;
  summary: CalculationSummary;
}
