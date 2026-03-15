import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { AlertTriangle, TrendingUp, Package, Search } from 'lucide-react';
import { api } from '../context/AuthContext';

const Alerts = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const { data } = await api.get('/products/alerts');
      setLowStockProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Critical Stock Alerts">
      <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl mb-8 flex items-start gap-4">
        <div className="p-3 bg-white rounded-2xl text-rose-500 shadow-sm shadow-rose-100">
          <AlertTriangle size={24}/>
        </div>
        <div>
          <h2 className="text-lg font-bold text-rose-800">Low Stock Warning</h2>
          <p className="text-rose-600/70 text-sm">The following products have reached or fallen below their set minimum thresholds. Please restock as soon as possible.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lowStockProducts.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-[2rem] border border-rose-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-rose-100/50 transition-all border-l-4 border-l-rose-500">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-rose-500 group-hover:bg-rose-50 transition-colors">
                <Package size={24}/>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Critical</span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1">{p.name}</h3>
            <p className="text-sm text-slate-500 mb-6">{p.category}</p>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current</div>
                <div className="text-2xl font-black text-rose-500">{p.quantity}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Threshold</div>
                <div className="text-2xl font-black text-slate-700">{p.lowStockThreshold}</div>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 group">
              Order Refresh
              <TrendingUp size={18} className="translate-y-px" />
            </button>
          </div>
        ))}
        {lowStockProducts.length === 0 && !loading && (
          <div className="col-span-full py-12 text-center">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32}/>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Everything is fine!</h3>
            <p className="text-slate-500">No products are currently under the low stock threshold.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
