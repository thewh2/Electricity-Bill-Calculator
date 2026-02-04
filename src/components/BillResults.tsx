import { useState } from "react";
import { CalculationSummary } from "@/types/bill";
import { generatePDF } from "@/utils/generatePDF";
import { FileDown, Zap, Users, Calculator, X, Check } from "lucide-react";

interface BillResultsProps {
  summary: CalculationSummary;
  onReset: () => void;
  onSaveBill: (name: string) => void;
}

export function BillResults({ summary, onReset, onSaveBill }: BillResultsProps) {
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfFileName, setPdfFileName] = useState("electricity-bill");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveBillName, setSaveBillName] = useState("");

  const handleDownloadPdf = () => {
    generatePDF(summary, pdfFileName);
    setShowPdfDialog(false);
  };

  return (
    <div className="space-y-6 slide-up">
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
            <span className="text-muted-foreground">Energy Charges</span>
            <span className="font-medium">NPR {summary.totalBillAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Minimum Charges</span>
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
                <span className="badge-success">{result.unitsConsumed} Units</span>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy Charges</span>
                  <span>NPR {result.electricityCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Charges</span>
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
        <button onClick={() => setShowSaveDialog(true)} className="btn-primary flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          Save Bill
        </button>

        <button onClick={() => setShowPdfDialog(true)} className="btn-secondary flex items-center justify-center gap-2">
          <FileDown className="w-5 h-5" />
          Save as PDF
        </button>

        <button onClick={onReset} className="btn-secondary">
          Calculate New Bill
        </button>
      </div>

      {/* PDF Name Dialog */}
      {showPdfDialog && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center p-4 z-50">
          <div className="card-elevated p-6 w-full max-w-sm slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Save PDF</h3>
              <button
                onClick={() => setShowPdfDialog(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-4">
              <label className="label-text">File Name</label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={pdfFileName}
                  onChange={(e) => setPdfFileName(e.target.value)}
                  placeholder="Enter file name"
                  className="input-field"
                  autoFocus
                />
                <span className="text-muted-foreground">.pdf</span>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              disabled={!pdfFileName.trim()}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      )}
      {/* Save Bill Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center p-4 z-50">
          <div className="card-elevated p-6 w-full max-w-sm slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Save Bill</h3>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-4">
              <label className="label-text">Bill Name</label>
              <input
                type="text"
                value={saveBillName}
                onChange={(e) => setSaveBillName(e.target.value)}
                placeholder="e.g., January 2024 Bill"
                className="input-field"
                autoFocus
              />
            </div>

            <button
              onClick={() => {
                if (saveBillName.trim()) {
                  onSaveBill(saveBillName.trim());
                  setShowSaveDialog(false);
                  setSaveBillName("");
                }
              }}
              disabled={!saveBillName.trim()}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
              Save to History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
