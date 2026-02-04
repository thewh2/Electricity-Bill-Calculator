import { SavedBill } from '@/types/bill';
import { generatePDF } from '@/utils/generatePDF';
import { ArrowLeft, FileDown, Zap, Users, Calculator, Calendar } from 'lucide-react';

interface SavedBillViewProps {
  bill: SavedBill;
  onBack: () => void;
}

export function SavedBillView({ bill, onBack }: SavedBillViewProps) {
  const { summary } = bill;

  const handleDownloadPdf = () => {
    generatePDF(summary, bill.name);
  };

  return (
    <div className="space-y-6 slide-up">
      {/* Back button and title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{bill.name}</h2>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {new Date(bill.savedAt).toLocaleDateString()} at{' '}
              {new Date(bill.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-elevated p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-accent mx-auto mb-2 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <p className="stat-value">{summary.totalUnits}</p>
          <p className="stat-label">Total Units</p>
        </div>
        
        <div className="card-elevated p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-accent mx-auto mb-2 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <p className="stat-value">NPR {summary.pricePerUnit}</p>
          <p className="stat-label">Per Unit</p>
        </div>
      </div>

      {/* Bill Overview */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Bill Overview</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Bill Amount</span>
            <span className="font-medium">NPR {summary.totalBillAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">External Charges</span>
            <span className="font-medium">NPR {summary.externalCharges.toFixed(2)}</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between font-semibold">
            <span>Grand Total</span>
            <span className="text-primary">NPR {(summary.totalBillAmount + summary.externalCharges).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Individual Results */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Individual Bills</h3>
        <div className="space-y-3">
          {summary.results.map((result, index) => (
            <div key={index} className="result-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                    {result.userName.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-semibold text-foreground">{result.userName}</span>
                </div>
                <span className="badge-success">
                  {result.unitsConsumed} Units
                </span>
              </div>
              
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Electricity Cost</span>
                  <span>NPR {result.electricityCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">External Share</span>
                  <span>NPR {result.externalChargesShare.toFixed(2)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total Payable</span>
                  <span className="text-primary">NPR {result.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleDownloadPdf}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <FileDown className="w-5 h-5" />
          Download PDF
        </button>
        
        <button onClick={onBack} className="btn-secondary">
          Back to History
        </button>
      </div>
    </div>
  );
}
