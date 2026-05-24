"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChatMessage, Product } from '@/types';
import { generateStylistResponse } from '@/services/searchService';
import { PRODUCTS } from '@/constants';

interface AIStylistProps {
  onClose: () => void;
}

interface ExtendedMessage extends ChatMessage {
  products?: Product[];
}

const extractProductsFromResponse = (text: string): Product[] => {
  const products: Product[] = [];
  const boldPattern = /\*\*([^*]+)\*\*/g;
  let match;

  while ((match = boldPattern.exec(text)) !== null) {
    const title = match[1];
    const product = PRODUCTS.find(p => p.title.toLowerCase() === title.toLowerCase());
    if (product && !products.some(p => p.id === product.id)) {
      products.push(product);
    }
  }

  return products.slice(0, 3);
};

export const AIStylist: React.FC<AIStylistProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ExtendedMessage[]>([
    {
      role: 'model',
      text: 'Hello! I am your personal jewelry stylist. Tell me about the occasion, your outfit, or how you want to feel, and I will find the perfect gemstone piece for you.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim()) return;

    const userText = input;
    const userMsg: ExtendedMessage = { role: 'user', text: userText };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const updatedMessages = [...messages, userMsg];
      const advice = generateStylistResponse(userText, updatedMessages);
      const products = extractProductsFromResponse(advice);
      setMessages(prev => [...prev, { role: 'model', text: advice, products }]);
      setLoading(false);
    }, 800);
  };

  const handleProductClick = (product: Product) => {
    onClose();
    router.push(`/products/${product.handle}`);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:justify-end bg-black/40 backdrop-blur-sm transition-all animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="
          w-full md:w-[420px] h-[85vh] md:h-[650px] 
          md:mr-8 md:mb-8 
          bg-white shadow-2xl rounded-t-2xl md:rounded-2xl 
          flex flex-col 
          overflow-hidden 
          animate-in slide-in-from-bottom-10 duration-300
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-silvoraa-gold p-4 flex items-center justify-between text-white shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-5 h-5 animate-pulse text-white" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium tracking-wide">Silvoraa Stylist</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80 font-sans">Personal AI Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95"
            aria-label="Close Stylist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-silvoraa-gold flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="flex flex-col max-w-[85%]">
                <div
                  className={`
                    p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user'
                      ? 'bg-silvoraa-black text-white rounded-br-none'
                      : 'bg-white border border-gray-100 text-silvoraa-black rounded-bl-none'
                    }
                  `}
                >
                  {msg.text.split('**').map((part, idx) =>
                    idx % 2 === 1 ? <strong key={idx} className="font-semibold text-silvoraa-gold">{part}</strong> : part
                  )}
                </div>

                {msg.role === 'model' && msg.products && msg.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {msg.products.map((product, idx) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="w-full flex items-center gap-3 p-2.5 bg-white rounded-xl border border-gray-100 hover:border-silvoraa-gold/50 hover:shadow-md transition-all duration-300 group text-left animate-in slide-in-from-bottom-2 fade-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-silvoraa-black truncate group-hover:text-silvoraa-gold transition-colors">
                            {product.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-silvoraa-warmGray">{product.stone}</span>
                            <span className="text-[10px] text-gray-400 uppercase">{product.type}</span>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-silvoraa-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-silvoraa-gold flex items-center justify-center mr-2 flex-shrink-0 mt-1 opacity-50">
                <Sparkles className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm text-sm text-gray-400 italic flex gap-1 items-center">
                <span>Curating selections</span>
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && (
          <div className="px-4 pb-2 pt-1 flex flex-wrap gap-2 bg-white border-t border-gray-50">
            {['Amethyst rings', 'Blue topaz earrings', 'Gift for mom', 'Something calming', 'Citrine pendants'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => { setInput(suggestion); }}
                className="px-3 py-1.5 bg-gray-50 hover:bg-silvoraa-gold/10 border border-gray-100 hover:border-silvoraa-gold/30 rounded-full text-xs font-medium text-silvoraa-warmGray hover:text-silvoraa-gold transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSend}
          className="p-4 bg-white border-t border-gray-100 flex gap-2 relative z-20 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)]"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for advice..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-silvoraa-gold/50 focus:ring-2 focus:ring-silvoraa-gold/10 transition-all placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="
              bg-silvoraa-gold text-white p-2.5 rounded-full 
              hover:bg-silvoraa-deepGold hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              transition-all duration-200 shadow-md
            "
            aria-label="Send Message"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};