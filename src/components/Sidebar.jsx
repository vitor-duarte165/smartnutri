import { LayoutDashboard, Package, Calculator, History, Leaf } from 'lucide-react';

export default function Sidebar({ activeView, setActiveView }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ingredients', label: 'Insumos', icon: Package },
    { id: 'formulate', label: 'Formular Ração', icon: Calculator },
    { id: 'history', label: 'Histórico', icon: History },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-eco-dark text-white flex flex-col z-10">
      <div className="p-6 border-b border-eco-medium">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-eco-light" />
          <h1 className="text-2xl font-bold">SmartNutri</h1>
        </div>
        <p className="text-sm text-eco-lighter mt-1">Nutrição Inteligente</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`sidebar-link w-full text-left ${
                activeView === item.id ? 'active' : 'text-eco-lighter'
              }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-eco-medium">
        <p className="text-xs text-eco-lighter text-center">
          Versão 1.0.0
        </p>
      </div>
    </aside>
  );
}
