
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getParkGuideResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Hello! I'm Willow, your nature guide. Ask me anything about the park's wildlife, trees, or upcoming conservation work!" }] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMsg }] }]);
    setIsLoading(true);

    const response = await getParkGuideResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: response || '' }] }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-emerald-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <div>
                <h3 className="font-bold text-sm leading-none">Willow</h3>
                <p className="text-xs text-emerald-200 mt-1">Nature Guide AI</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-1 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-700 text-white rounded-tr-none' 
                    : 'bg-white border border-stone-200 text-stone-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1">
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-stone-200 flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Willow..."
              className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-700 text-white p-2 rounded-xl hover:bg-emerald-800 disabled:opacity-50 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-700 text-white p-4 rounded-full shadow-lg hover:bg-emerald-800 hover:scale-110 transition-all flex items-center space-x-2"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:inline font-semibold">Ask Willow</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
