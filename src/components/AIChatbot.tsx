import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Cloud, ShieldCheck, RefreshCw, Copy, Check, ChevronDown, Mic, MicOff, Volume2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "Tell me about Sahil's B.Tech CGPA & Education",
  "What projects has Sahil built in AI & NLP?",
  "Tell me about Sahil's 5 internship experiences",
  "Can you write Python code for a machine learning model?",
  "What is Sahil's role as Campus President?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am **Sahil Dahale's Official AI Assistant**. Ask me anything about Sahil's **B.Tech Final Year status, Data Analytics expertise, 5 internships, CGPA (8.0/10), projects, or technical coding queries**!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Speech Recognition capability
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (promptToSend?: string) => {
    const textPrompt = promptToSend || input.trim();
    if (!textPrompt || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!promptToSend) setInput('');
    setIsLoading(true);

    try {
      // Build previous messages payload for multi-turn context
      const chatHistory = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: textPrompt,
          messages: chatHistory
        })
      });

      const data = await res.json();
      const botReplyText = data.text || "Thank you for asking! Sahil Dahale is an AI/ML Engineer and Data Scientist based in Nashik, India.";

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sahil Dahale is a B.Tech AIML Engineer at Sandip University (8.0/10 CGPA) with 5 internships (Oasis Infobyte, Mindenious, HunarIntern, SaiKet Systems, Auspify Tech). Feel free to reach out directly via sahildahale321@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove markdown formatting symbols for smooth reading
      const plainText = text.replace(/[*_#`~]/g, '');
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper renderer to handle basic Markdown bolding and code blocks
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const language = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
        const codeContent = language ? lines.slice(1).join('\n') : lines.join('\n');

        return (
          <div key={index} className="my-2 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400">
              <span>{language || 'code'}</span>
              <button
                onClick={() => copyToClipboard(codeContent, `code-${index}`)}
                className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer"
              >
                {copiedId === `code-${index}` ? <Check className="w-3 h-3 text-red-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === `code-${index}` ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-red-200 leading-relaxed font-mono">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }

      // Simple inline bold formatting
      const subParts = part.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={index}>
          {subParts.map((sub, i) => {
            if (sub.startsWith('**') && sub.endsWith('**')) {
              return <strong key={i} className="font-bold text-white">{sub.slice(2, -2)}</strong>;
            }
            return sub;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-red-400/40"
          aria-label="Open Sahil AI Assistant Chatbot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 fill-current text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-slate-950" />
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-xs tracking-wider text-white font-black uppercase">
            Sahil AI Agent
          </span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-slate-950/95 border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden font-sans">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 relative">
                <Bot className="w-5 h-5 text-red-400" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-mono">Sahil AI Assistant</h3>
                  <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-mono text-[9px] font-bold border border-red-500/30">
                    AI Knowledge Base
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                  <Sparkles className="w-3 h-3 text-red-400" />
                  <span>Ultra-Fast Intelligence • Not Stored</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conversation Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 shrink-0 h-fit">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl space-y-1 ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white font-medium rounded-tr-none shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-inner'
                  }`}
                >
                  <div className="leading-relaxed whitespace-pre-wrap font-sans">
                    {renderFormattedText(msg.text)}
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono pt-1 border-t border-slate-800">
                    {msg.role === 'model' ? (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Read aloud via Speech Synthesis"
                      >
                        <Volume2 className="w-3 h-3 text-red-400" />
                        <span>Listen</span>
                      </button>
                    ) : <span />}
                    <span
                      className={`${
                        msg.role === 'user' ? 'text-white/80 font-bold ml-auto' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-red-300 shrink-0 h-fit">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-red-300 font-mono text-xs flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  <span>Querying AI Engine...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          {messages.length < 3 && (
            <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-850 shrink-0">
              <p className="text-[10px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-red-400" /> Suggested Questions:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/40 text-[11px] font-mono text-slate-300 hover:text-red-400 transition-all cursor-pointer text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0 space-y-2">
            {isListening && (
              <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center justify-between animate-pulse">
                <span className="flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-red-400" />
                  Listening to your voice... Speak now!
                </span>
                <button
                  type="button"
                  onClick={toggleListening}
                  className="text-[10px] underline hover:text-white"
                >
                  Stop
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isListening && recognitionRef.current) {
                  recognitionRef.current.stop();
                  setIsListening(false);
                }
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={isListening ? "Listening..." : "Ask by typing or clicking the mic..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-red-500 focus:outline-none placeholder:text-slate-500"
              />

              {/* Voice Speech Recognition Button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={isLoading}
                  title={isListening ? "Stop voice listening" : "Speak your question (Voice Input)"}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                    isListening
                      ? 'bg-red-600 text-white border-red-400 animate-pulse'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-red-400 hover:border-red-500/40'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-red-400" />}
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold active:scale-95 disabled:opacity-40 transition-all cursor-pointer shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-red-400" /> Voice & Text Ready • No Data Stored
              </span>
              <span>Sahil Dahale AI</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
