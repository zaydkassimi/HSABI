import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Shield, BarChart3, ArrowRight, Mail, User, MessageSquare } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 glass sticky top-0 z-50">
        <Link to="/" className="flex items-center">
          <img src="/images/hsabinbg.png" alt="Hsabi Logo" className="h-10 w-auto object-contain" />
        </Link>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-slate-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
          <Link to="/signup" className="px-5 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md active:scale-95">Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary-50 to-white -z-10 opacity-50 blur-3xl rounded-full" />
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Take control of your stock <br />
            <span className="text-primary-600">with Hsabi</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            "Manage your stock, your way."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 flex items-center gap-2 group">
              Get Started for Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-800 uppercase tracking-widest letter-spacing-1">Why Choose Hsabi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="text-primary-600" size={32} />, title: 'Fully Isolated', desc: 'Each user is fully isolated. Your data is yours alone.' },
            { icon: <BarChart3 className="text-secondary-600" size={32} />, title: 'Smart Analytics', desc: 'Visualise your stock evolution with beautiful, intuitive charts.' },
            { icon: <Package className="text-emerald-600" size={32} />, title: 'Inventory Alerts', desc: 'Never run out of stock with our automated low-stock warnings.' },
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="mb-6 p-4 rounded-xl bg-slate-50 w-fit">{f.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-slate-900 text-white rounded-[3rem] mx-4 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-400">Choose the plan that fits your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 text-center">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-black mb-6">$0<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <ul className="text-left space-y-3 mb-8 text-slate-300">
                <li>• Up to 20 products</li>
                <li>• Basic analytics</li>
                <li>• Public store page</li>
              </ul>
              <Link to="/signup" className="block w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">Start for free</Link>
            </div>
            <div className="p-8 rounded-3xl bg-primary-600 border border-primary-500 text-center relative overflow-hidden">
               <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm uppercase">Popular</div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-black mb-6">$19<span className="text-lg font-normal text-primary-100">/mo</span></div>
              <ul className="text-left space-y-3 mb-8 text-primary-50">
                <li>• Unlimited products</li>
                <li>• Advanced analytics</li>
                <li>• Custom domain (soon)</li>
                <li>• Priority support</li>
              </ul>
              <button disabled className="w-full py-3 bg-slate-800/50 text-slate-400 rounded-xl font-bold cursor-not-allowed">Coming Soon</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h2>
          <p className="text-slate-500 text-lg">Have questions? We'd love to hear from you.</p>
        </div>
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <form className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 focus:bg-white transition-all underline-none"
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 focus:bg-white transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <textarea 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 focus:bg-white transition-all min-h-[120px] resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>
            </div>
            <button className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 active:scale-[0.98]">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center">
            <img src="/images/hsabinbg.png" alt="Hsabi Logo" className="h-10 w-auto object-contain" />
          </div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Hsabi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
