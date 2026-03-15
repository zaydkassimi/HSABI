import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Package, ShoppingBag, Info } from 'lucide-react';
import axios from 'axios';

const PublicStore = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/public/${slug}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Storefront...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center font-bold text-rose-400">Store not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Public Header */}
      <header className="bg-white border-b border-slate-200 py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <img src="/images/hsabinbg.png" alt="Hsabi Logo" className="h-10 w-auto mx-auto mb-6 object-contain" />
          <h1 className="text-4xl font-black text-slate-900 mb-2">{data.companyName}</h1>
          <p className="text-slate-500 font-medium">Welcome to our public product catalog</p>
        </div>
      </header>

      {/* Product List */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.products.map((p, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="w-full aspect-square bg-slate-50 rounded-3xl mb-6 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
                <Package size={64} strokeWidth={1}/>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 mb-2 block">{p.category}</span>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{p.name}</h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2">{p.description || 'No description available for this product.'}</p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <div className="text-2xl font-black text-slate-900">${p.unitPrice.toFixed(2)}</div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${p.quantity > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {p.quantity > 0 ? `${p.quantity} In Stock` : 'Out of Stock'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {data.products.length === 0 && (
          <div className="text-center py-20">
            <Info className="mx-auto mb-4 text-slate-200" size={48} />
            <p className="text-slate-400 font-bold">This store hasn't listed any products yet.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-100 mt-20">
        Powered by <span className="font-bold text-primary-600">Hsabi</span> (حسابي)
      </footer>
    </div>
  );
};

export default PublicStore;
