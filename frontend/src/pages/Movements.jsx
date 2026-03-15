import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { History, ArrowUpRight, ArrowDownLeft, Plus, Search, Calendar } from 'lucide-react';
import { api } from '../context/AuthContext';

const Movements = () => {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ productId: '', type: 'IN', quantity: 0, note: '' });
  const location = useLocation();

  useEffect(() => {
    fetchMovements();
    fetchProducts();
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'new') {
      setShowModal(true);
    }
  }, [location]);

  const fetchMovements = async () => {
    try {
      const { data } = await api.get('/movements');
      setMovements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/movements', {
        ...formData,
        quantity: parseInt(formData.quantity)
      });
      setShowModal(false);
      setFormData({ productId: '', type: 'IN', quantity: 0, note: '' });
      fetchMovements();
    } catch (err) {
      console.error(err);
      alert('Error logging movement: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <DashboardLayout title="Stock Movements">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Filter by product or note..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-primary-400 shadow-sm transition-all"
          />
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Calendar size={20}/> Date Range
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-secondary-600 text-white rounded-2xl font-bold hover:bg-secondary-700 transition-all shadow-lg shadow-secondary-200"
          >
            <Plus size={20} />
            Log Movement
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {movements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    {m.type === 'IN' ? (
                      <span className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-tighter bg-emerald-50 w-fit px-3 py-1 rounded-full">
                        <ArrowUpRight size={14}/> Stock In
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-tighter bg-rose-50 w-fit px-3 py-1 rounded-full">
                        <ArrowDownLeft size={14}/> Stock Out
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800">{m.product?.name}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`font-black ${m.type === 'IN' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {m.type === 'IN' ? '+' : '-'}{m.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-400 text-sm font-medium">
                    {new Date(m.date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-sm text-slate-500 italic max-w-xs truncate">{m.note || '—'}</div>
                  </td>
                </tr>
              ))}
              {movements.length === 0 && !loading && (
                <tr>
                   <td colSpan="5" className="px-8 py-12 text-center text-slate-400 italic">No movements log found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Movement Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Log Stock Movement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Select Product</label>
                <select 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-400 transition-all"
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                >
                  <option value="">Select a product...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Current: {p.quantity})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Movement Type</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-400 transition-all"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="IN">Stock In (+)</option>
                    <option value="OUT">Stock Out (-)</option>
                  </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Quantity</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-400 transition-all"
                    placeholder="10"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Note (Optional)</label>
                <textarea 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-400 transition-all h-24 resize-none"
                  placeholder="Reason for movement..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                >
                  Log Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Movements;
