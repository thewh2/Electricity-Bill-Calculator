import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Header() {
  return (
    <header className="pt-6 pb-4 text-center">
      <Link to="/" className="flex items-center justify-center gap-2 mb-1 hover:opacity-80 transition-opacity">
        <img src={logo} alt="Electricity Bill Calculator" className="w-10 h-10 rounded-xl object-contain" />
        <h1 className="text-xl font-bold text-foreground">Electricity Bill Calculator</h1>
      </Link>
      <p className="text-sm text-muted-foreground">Split bills fairly among tenants</p>
    </header>
  );
}
