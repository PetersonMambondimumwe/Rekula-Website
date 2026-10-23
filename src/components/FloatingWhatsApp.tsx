import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { siteSettings } from '../data/initialData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      customMsg.trim() || 'Hello, I would like to enquire about Re:kula academic support for my learner.'
    );
    window.open(`https://wa.me/27674350849?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-28 right-4 sm:bottom-32 sm:right-6 z-50 flex flex-col items-end">
      {/* Popover Bubble in Warm-Dark Theme */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-cards bg-surface border border-border-cork p-4 sm:p-5 shadow-2xl text-left animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-dashed border-border-cork">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-void border border-softblue">
                  <img
                    src="/assets/shawn-maluleke.png"
                    alt="Lead Educator"
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-softblue border border-void rounded-full"></span>
              </div>
              <div>
                <h4 className="text-xs font-serif uppercase tracking-wider font-medium text-cream">Lead Educator</h4>
                <p className="text-[10px] text-cream-muted uppercase font-mono">Lead Educator, Re:kula · Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-void border border-border-cork text-cream-muted hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-3 p-3 bg-void/70 rounded-lg border border-border-cork text-xs text-cream-muted leading-relaxed">
            <p className="font-medium text-cream">
              Hello. Welcome to Re:kula.
            </p>
            <p className="mt-1 text-[11px]">
              Have a question regarding curriculum bridging, tutoring, exam prep or volunteering? Send a direct WhatsApp message to our Lead Educator.
            </p>
          </div>

          <form onSubmit={sendWhatsApp} className="flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3.5 py-2 text-base sm:text-xs rounded-full bg-void border border-border-cork text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-cream"
            />
            <button
              type="submit"
              className="bg-softblue hover:bg-softblue/80 text-white px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>

          <div className="mt-2 text-center">
            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-softblue hover:underline font-mono uppercase tracking-wider"
            >
              Open WhatsApp Direct ({siteSettings.phoneDisplay})
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 rounded-buttons-pill bg-surface hover:bg-void text-cream px-5 py-3 border border-border-cork shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none"
        aria-label="Open WhatsApp conversation"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-softblue" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-softblue rounded-full animate-ping" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider pr-1">
          WhatsApp Direct
        </span>
      </button>
    </div>
  );
};
