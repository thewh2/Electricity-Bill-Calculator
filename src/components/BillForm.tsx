import { useState, useEffect } from 'react';
import { SubMeterUser } from '@/types/bill';
import { Zap, User, Gauge, ArrowLeft } from 'lucide-react';

interface BillFormProps {
  onCalculate: (totalBill: number, externalCharges: number, users: SubMeterUser[]) => void;
  onBack: () => void;
}
export function BillForm({
  onCalculate,
  onBack
}: BillFormProps) {
  const [totalBill, setTotalBill] = useState<string>('');
  const [externalCharges, setExternalCharges] = useState<string>('0');
  const [userCount, setUserCount] = useState<number>(2);
  const [users, setUsers] = useState<SubMeterUser[]>([]);
  useEffect(() => {
    // Initialize or adjust users array based on userCount
    setUsers(prev => {
      const newUsers: SubMeterUser[] = [];
      for (let i = 0; i < userCount; i++) {
        newUsers.push(prev[i] || {
          id: crypto.randomUUID(),
          name: '',
          units: 0
        });
      }
      return newUsers;
    });
  }, [userCount]);
  const updateUser = (index: number, field: 'name' | 'units', value: string | number) => {
    setUsers(prev => {
      const updated = [...prev];
      if (field === 'name') {
        updated[index] = {
          ...updated[index],
          name: value as string
        };
      } else {
        updated[index] = {
          ...updated[index],
          units: parseFloat(value as string) || 0
        };
      }
      return updated;
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bill = parseFloat(totalBill) || 0;
    const external = parseFloat(externalCharges) || 0;

    // Validate users have names
    const validUsers = users.map((user, idx) => ({
      ...user,
      name: user.name.trim() || `User ${idx + 1}`
    }));
    onCalculate(bill, external, validUsers);
  };
  const isValid = parseFloat(totalBill) > 0 && users.some(u => u.units > 0);
  return <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to History
      </button>

      {/* Total Bill Amount */}
      <div className="card-elevated p-4">
        <label className="label-text flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Total Electricity Bill Amount (NPR)
        </label>
        <input type="number" inputMode="decimal" placeholder="Enter energy charges" value={totalBill} onChange={e => setTotalBill(e.target.value)} className="input-field" min="0" step="0.01" required />
      </div>

      {/* External Charges */}
      <div className="card-elevated p-4">
        <label className="label-text">Minimum / Extra Charges (NPR)</label>
        <input type="number" inputMode="decimal" placeholder="Enter minimum charges (0 if none)" value={externalCharges} onChange={e => setExternalCharges(e.target.value)} className="input-field" min="0" step="0.01" />
        <p className="text-xs text-muted-foreground mt-1.5">This is distributed equally to all.</p>
      </div>

      {/* Number of Users */}
      <div className="card-elevated p-4">
        <label className="label-text flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Number of Sub-Meter Users
        </label>
        <select value={userCount} onChange={e => setUserCount(parseInt(e.target.value))} className="input-field appearance-none bg-no-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundPosition: 'right 12px center',
        backgroundSize: '20px'
      }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => <option key={num} value={num}>
              {num} {num === 1 ? 'User' : 'Users'}
            </option>)}
        </select>
      </div>

      {/* Dynamic User Inputs */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Gauge className="w-4 h-4 text-primary" />
          Sub-Meter Readings
        </h3>
        
        {users.map((user, index) => <div key={user.id} className="card-elevated p-4 fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-foreground">User {index + 1}</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                <input type="text" placeholder={`User ${index + 1} name`} value={user.name} onChange={e => updateUser(index, 'name', e.target.value)} className="input-field text-sm py-2.5" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Units Consumed</label>
                <input type="number" inputMode="decimal" placeholder="Enter units" value={user.units || ''} onChange={e => updateUser(index, 'units', e.target.value)} className="input-field text-sm py-2.5" min="0" step="0.01" />
              </div>
            </div>
          </div>)}
      </div>

      {/* Calculate Button */}
      <button type="submit" disabled={!isValid} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
        Calculate Bill
      </button>
    </form>;
}