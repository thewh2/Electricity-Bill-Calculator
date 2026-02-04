import { SavedBill } from '@/types/bill';
import { Calendar, Receipt, Plus, Trash2 } from 'lucide-react';

interface BillHistoryProps {
  savedBills: SavedBill[];
  onNewBill: () => void;
  onViewBill: (bill: SavedBill) => void;
  onDeleteBill: (billId: string) => void;
}

export function BillHistory({ savedBills, onNewBill, onViewBill, onDeleteBill }: BillHistoryProps) {
  return (
    <div className="space-y-6 slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Saved Bills</h2>
        <span className="text-sm text-muted-foreground">{savedBills.length} bills</span>
      </div>

      {savedBills.length === 0 ? (
        <div className="card-elevated p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
            <Receipt className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Saved Bills Yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Calculate and save your first electricity bill to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedBills.map((bill) => (
            <div
              key={bill.id}
              className="result-card cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => onViewBill(bill)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{bill.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(bill.savedAt).toLocaleDateString()} at{' '}
                      {new Date(bill.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      NPR {bill.summary.totalBillAmount.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {bill.summary.results.length} users
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBill(bill.id);
                    }}
                    className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"
                    aria-label="Delete bill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={onNewBill} className="btn-primary flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Calculate New Bill
      </button>
    </div>
  );
}
