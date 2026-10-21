import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { siteSettings } from '../data/initialData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      customMsg.trim() || 'Hello Shawn, I would like to enquire about Re:kula academic support for my learner.'
    );
    window.open(`https://wa.me/27674350849?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-navy/10 p-5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-navy-900 border-2 border-emerald-500">
                  <img
                    src="/assets/shawn-maluleke.png"
                    alt="Shawn Maluleke"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy leading-tight">Shawn Maluleke</h4>
                <p className="text-xs text-slate-subtle">Founder, Re:kula • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-3 p-3 bg-softblue-tint/50 rounded-2xl text-xs text-navy leading-relaxed">
            <p className="font-medium text-navy">
              Hi there! 👋 Welcome to Re:kula.
            </p>
            <p className="text-slate-subtle mt-1">
              Have a question about bridging, tutoring, exam prep, or volunteer support? Send us a WhatsApp message and we’ll reply shortly.
            </p>
          </div>

          <form onSubmit={sendWhatsApp} className="flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3.5 py-2 text-xs rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue text-navy placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-2 text-center">
            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-700 hover:underline font-medium"
            >
              Or open WhatsApp directly ({siteSettings.phoneDisplay})
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none ring-4 ring-emerald-500/20"
        aria-label="Open WhatsApp conversation"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-white/20" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        </div>
        <span className="text-xs sm:text-sm font-semibold tracking-wide pr-1">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
