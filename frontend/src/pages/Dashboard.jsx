import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Package, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalStock: 0, lowStock: 0, totalValue: 0 });
  const [chartData, setChartData] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, movementsRes] = await Promise.all([
          api.get('/products'),
          api.get('/movements')
        ]);
        
        const productsData = productsRes.data;
        setProducts(productsData);
        const totalStock = productsData.reduce((acc, p) => acc + p.quantity, 0);
        const lowStock = productsData.filter(p => p.quantity <= p.lowStockThreshold).length;
        const totalValue = productsData.reduce((acc, p) => acc + (p.quantity * p.unitPrice), 0);

        setStats({
          totalProducts: productsData.length,
          totalStock,
          lowStock,
          totalValue
        });

        const last7Days = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toISOString().split('T')[0];
        }).reverse();

        const moveData = last7Days.map(date => {
          const count = movementsRes.data.filter(m => m.date.startsWith(date)).length;
          return { name: date, movements: count };
        });
        setChartData(moveData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const exportCSV = () => {
    if (products.length === 0) return alert('No data to export');
    
    const headers = ['Name', 'Category', 'Quantity', 'Unit Price', 'Value'];
    const rows = products.map(p => [
      p.name,
      p.category,
      p.quantity,
      p.unitPrice,
      (p.quantity * p.unitPrice).toFixed(2)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `hsabi_inventory_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cards = [
    { label: 'Total Products', value: stats.totalProducts, icon: <Package size={24}/>, color: 'bg-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Stock', value: stats.totalStock, icon: <TrendingUp size={24}/>, color: 'bg-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Low Stock Alerts', value: stats.lowStock, icon: <AlertCircle size={24}/>, color: 'bg-rose-500', bg: 'bg-rose-50' },
    { label: 'Total Value', value: `$${stats.totalValue.toLocaleString()}`, icon: <DollarSign size={24}/>, color: 'bg-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <DashboardLayout title="Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${card.bg} text-${card.color.split('-')[1]}-600`}>{card.icon}</div>
              <span className="text-xs font-black text-slate-300 uppercase tracking-tighter">Stats</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{card.value}</div>
            <div className="text-sm font-medium text-slate-500">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Stock Evolution</h3>
              <p className="text-sm text-slate-500">Activity over the last 7 days</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="movements" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/dashboard/products?action=new')}
              className="w-full p-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
            >
              Add New Product
            </button>
            <button 
              onClick={() => navigate('/dashboard/movements?action=new')}
              className="w-full p-4 bg-secondary-100 text-secondary-600 rounded-2xl font-bold hover:bg-secondary-200 transition-all"
            >
              Log Stock Movement
            </button>
            <button 
              onClick={exportCSV}
              className="w-full p-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all border border-slate-200"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
