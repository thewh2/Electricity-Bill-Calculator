import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BillForm } from '@/components/BillForm';
import { BillResults } from '@/components/BillResults';
import { BillHistory } from '@/components/BillHistory';
import { SavedBillView } from '@/components/SavedBillView';
import { SubMeterUser, CalculationSummary, SavedBill } from '@/types/bill';
import { calculateBill } from '@/utils/calculateBill';

const SAVED_BILLS_KEY = 'electricity_calculator_saved_bills';

type AppView = 'history' | 'form' | 'results' | 'viewSaved';

const Index = () => {
  const [view, setView] = useState<AppView>('history');
  const [summary, setSummary] = useState<CalculationSummary | null>(null);
  const [savedBills, setSavedBills] = useState<SavedBill[]>([]);
  const [selectedBill, setSelectedBill] = useState<SavedBill | null>(null);

  // Load saved bills from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SAVED_BILLS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const bills = parsed.map((bill: SavedBill) => ({
          ...bill,
          savedAt: new Date(bill.savedAt),
          summary: {
            ...bill.summary,
            calculatedAt: new Date(bill.summary.calculatedAt),
          },
        }));
        setSavedBills(bills);
      } catch (e) {
        console.error('Failed to parse saved bills');
      }
    }
  }, []);

  // Save bills to localStorage whenever they change
  const persistBills = (bills: SavedBill[]) => {
    localStorage.setItem(SAVED_BILLS_KEY, JSON.stringify(bills));
    setSavedBills(bills);
  };

  const handleCalculate = (totalBill: number, externalCharges: number, users: SubMeterUser[]) => {
    const result = calculateBill(totalBill, externalCharges, users);
    setSummary(result);
    setView('results');
  };

  const handleReset = () => {
    setSummary(null);
    setView('form');
  };

  const handleSaveBill = (name: string) => {
    if (summary) {
      const newBill: SavedBill = {
        id: crypto.randomUUID(),
        name,
        savedAt: new Date(),
        summary,
      };
      const updatedBills = [newBill, ...savedBills];
      persistBills(updatedBills);
      setSummary(null);
      setView('history');
    }
  };

  const handleViewBill = (bill: SavedBill) => {
    setSelectedBill(bill);
    setView('viewSaved');
  };

  const handleDeleteBill = (billId: string) => {
    const updatedBills = savedBills.filter(bill => bill.id !== billId);
    persistBills(updatedBills);
  };

  const handleBackToHistory = () => {
    setSelectedBill(null);
    setSummary(null);
    setView('history');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-lg mx-auto px-4 pb-8 flex-1">
        <Header />
        
        {view === 'history' && (
          <BillHistory
            savedBills={savedBills}
            onNewBill={() => setView('form')}
            onViewBill={handleViewBill}
            onDeleteBill={handleDeleteBill}
          />
        )}

        {view === 'form' && (
          <BillForm onCalculate={handleCalculate} onBack={handleBackToHistory} />
        )}

        {view === 'results' && summary && (
          <BillResults
            summary={summary}
            onReset={handleReset}
            onSaveBill={handleSaveBill}
          />
        )}

        {view === 'viewSaved' && selectedBill && (
          <SavedBillView bill={selectedBill} onBack={handleBackToHistory} />
        )}
      </div>
      
      <footer className="py-4 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">
          Powered by <a href="http://wh2hub.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">WH2HUB</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
