import { SubMeterUser, CalculationSummary, BillResult } from '@/types/bill';

export function calculateBill(
  totalBillAmount: number,
  externalCharges: number,
  users: SubMeterUser[]
): CalculationSummary {
  // Calculate total units consumed
  const totalUnits = users.reduce((sum, user) => sum + user.units, 0);
  
  // Calculate price per unit
  const pricePerUnit = totalUnits > 0 ? totalBillAmount / totalUnits : 0;
  
  // Calculate external charges share per user
  const externalChargesShare = users.length > 0 ? externalCharges / users.length : 0;
  
  // Calculate individual bills
  const results: BillResult[] = users.map(user => {
    const electricityCost = user.units * pricePerUnit;
    const totalAmount = electricityCost + externalChargesShare;
    
    return {
      userName: user.name,
      unitsConsumed: user.units,
      electricityCost: Math.round(electricityCost * 100) / 100,
      externalChargesShare: Math.round(externalChargesShare * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    };
  });
  
  return {
    totalUnits,
    pricePerUnit: Math.round(pricePerUnit * 100) / 100,
    totalBillAmount,
    externalCharges,
    results,
    calculatedAt: new Date(),
  };
}
