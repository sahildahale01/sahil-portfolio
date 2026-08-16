import React, { useEffect, useRef, useState } from 'react';
import {
  Send,
  X,
  User,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Mic,
  MicOff,
  Volume2,
  MessageCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "Who is Sahil Dahale?",
  "What are Sahil's skills?",
  "What projects has Sahil built?",
  "Tell me about Sahil's education.",
  "What leadership experience does Sahil have?",
];

const getTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isBotActive, setIsBotActive] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text:
        "Hi! I'm **Sahil AI Agent** 🤖\n\nAsk me anything about Sahil's portfolio, projects, skills, education, experience, leadership, or technical work.",
      timestamp: getTime(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // ------------------------------------------------------------
  // Speech Recognition
  // ------------------------------------------------------------
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

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
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        // Ignore cleanup errors.
      }
    };
  }, []);

  // ------------------------------------------------------------
  // Scroll chat
  // ------------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isOpen, isLoading]);

  // ------------------------------------------------------------
  // Bot animation state
  // ------------------------------------------------------------
  useEffect(() => {
    if (!isOpen) {
      setIsBotActive(true);

      const timer = window.setTimeout(() => {
        setIsBotActive(false);
      }, 1200);

      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  // ------------------------------------------------------------
  // Voice input
  // ------------------------------------------------------------
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error('Could not start speech recognition:', error);
    }
  };

  // ------------------------------------------------------------
  // Send message
  // ------------------------------------------------------------
  const handleSendMessage = async (promptToSend?: string) => {
    const textPrompt = (promptToSend ?? input).trim();

    if (!textPrompt || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textPrompt,
      timestamp: getTime(),
    };

    setMessages((previous) => [...previous, userMessage]);

    if (!promptToSend) {
      setInput('');
    }

    setIsLoading(true);
    setIsBotActive(true);

    try {
      /*
       * Send the existing conversation to the backend.
       *
       * IMPORTANT:
       * The backend should use the portfolio's real data / knowledge
       * base when answering questions about Sahil.
       */
      const chatHistory = [...messages, userMessage].map((message) => ({
        role: message.role,
        text: message.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: textPrompt,
          messages: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API returned ${response.status}`);
      }

      const data = await response.json();

      const reply =
        typeof data?.text === 'string' && data.text.trim()
          ? data.text.trim()
          : "I couldn't get a reliable answer right now. Please try again in a moment.";

      const botMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: reply,
        timestamp: getTime(),
      };

      setMessages((previous) => [...previous, botMessage]);
    } catch (error) {
      console.error('Chat API error:', error);

      /*
       * DO NOT invent personal information if the API is unavailable.
       * This prevents the bot from giving incorrect portfolio facts.
       */
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        text:
          "I'm having trouble connecting to my AI knowledge system right now. Please try again in a moment.",
        timestamp: getTime(),
      };

      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setIsLoading(false);

      window.setTimeout(() => {
        setIsBotActive(false);
      }, 900);
    }
  };

  // ------------------------------------------------------------
  // Reset conversation
  // ------------------------------------------------------------
  const resetConversation = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text:
          "Hi! I'm **Sahil AI Agent** 🤖\n\nAsk me anything about Sahil's portfolio, projects, skills, education, experience, leadership, or technical work.",
        timestamp: getTime(),
      },
    ]);

    setInput('');
  };

  // ------------------------------------------------------------
  // Text to speech
  // ------------------------------------------------------------
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const plainText = text
      .replace(/```[\s\S]*?```/g, 'Code block omitted.')
      .replace(/\*\*/g, '')
      .replace(/[*_#`~]/g, '');

    const utterance = new SpeechSynthesisUtterance(plainText);

    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  // ------------------------------------------------------------
  // Copy
  // ------------------------------------------------------------
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedId(id);

      window.setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  // ------------------------------------------------------------
  // Basic markdown renderer
  // ------------------------------------------------------------
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const raw = part.slice(3, -3).trim();

        const lines = raw.split('\n');

        const firstLine = lines[0] ?? '';

        const hasLanguage =
          /^[a-zA-Z0-9_+#.-]+$/.test(firstLine) &&
          lines.length > 1;

        const language = hasLanguage ? firstLine : '';
        const codeContent = hasLanguage
          ? lines.slice(1).join('\n')
          : raw;

        const codeId = `code-${index}-${text.length}`;

        return (
          <div
            key={`${index}-${part.slice(0, 10)}`}
            className="my-3 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#050914]"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                {language || 'code'}
              </span>

              <button
                type="button"
                onClick={() => copyToClipboard(codeContent, codeId)}
                className="flex cursor-pointer items-center gap-1.5 text-[10px] text-slate-400 transition hover:text-cyan-300"
              >
                {copiedId === codeId ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}

                {copiedId === codeId ? 'Copied' : 'Copy'}
              </button>
            </div>

            <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-cyan-100">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }

      const boldParts = part.split(/(\*\*.*?\*\*)/g);

      return (
        <span key={`${index}-${part.slice(0, 10)}`}>
          {boldParts.map((subPart, subIndex) => {
            if (
              subPart.startsWith('**') &&
              subPart.endsWith('**')
            ) {
              return (
                <strong
                  key={subIndex}
                  className="font-semibold text-white"
                >
                  {subPart.slice(2, -2)}
                </strong>
              );
            }

            return subPart;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* =========================================================
          FLOATING SAHIL AI AGENT
      ========================================================== */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 scale-125 rounded-full bg-cyan-400/20 blur-2xl" />

          {/* Orbit ring */}
          <div className="pointer-events-none absolute -inset-3 rounded-full border border-cyan-300/10" />

          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsBotActive(false);
            }}
            onMouseEnter={() => setIsBotActive(true)}
            onMouseLeave={() => setIsBotActive(false)}
            aria-label="Open Sahil AI Agent"
            className="group relative flex cursor-pointer items-center justify-center"
          >
            {/* Status */}
            <span className="absolute right-1 top-1 z-20 h-3.5 w-3.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-[#050914] bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
            </span>

            {/* Character */}
            <div
              className={[
                'relative h-[108px] w-[90px] sm:h-[132px] sm:w-[110px]',
                isBotActive
                  ? 'sahil-agent-active'
                  : 'sahil-agent-idle',
              ].join(' ')}
            >
              <img
                src="/sahil-ai-agent.png"
                alt="Sahil AI Agent"
                className="h-full w-full object-contain drop-shadow-[0_0_22px_rgba(34,211,238,0.35)] transition duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(34,211,238,0.65)]"
                draggable={false}
              />
            </div>

            {/* Label */}
            <div className="absolute -bottom-1 left-1/2 hidden -translate-x-1/2 translate-y-full whitespace-nowrap rounded-full border border-cyan-400/20 bg-[#07101f]/95 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-300 shadow-lg backdrop-blur-xl sm:block">
              Sahil AI Agent
            </div>
          </button>
        </div>
      )}

      {/* =========================================================
          CHAT WINDOW
      ========================================================== */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[70] flex h-[min(650px,calc(100vh-2rem))] w-[calc(100vw-2rem)] max-w-[440px] flex-col overflow-hidden rounded-[28px] border border-cyan-300/15 bg-[#050914]/95 shadow-[0_25px_100px_rgba(0,0,0,0.65),0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-2xl sm:bottom-6 sm:right-6">
          {/* Top glow */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

          {/* Header */}
          <div className="relative flex shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-12 shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-cyan-400/15 blur-lg" />

                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#081222]">
                  <img
                    src="/sahil-ai-agent.png"
                    alt="Sahil AI Agent"
                    className="h-full w-full object-contain"
                  />
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#050914] bg-emerald-400" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-bold text-white">
                    Sahil AI Agent
                  </h3>

                  <span className="rounded-full border border-cyan-300/15 bg-cyan-300/5 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-cyan-300">
                    Online
                  </span>
                </div>

                <div className="mt-0.5 flex items-center gap-1.5 text-[9px] text-slate-400">
                  <Sparkles className="h-3 w-3 text-cyan-300" />
                  <span>Portfolio Intelligence</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={resetConversation}
                title="Reset conversation"
                className="cursor-pointer rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-cyan-300"
              >
                <RefreshCw className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="cursor-pointer rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message) => {
              const isUser = message.role === 'user';

              return (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isUser && (
                    <div className="relative mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-xl border border-cyan-300/15 bg-[#081222]">
                      <img
                        src="/sahil-ai-agent.png"
                        alt="AI"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}

                  <div
                    className={[
                      'max-w-[82%] rounded-2xl px-3.5 py-3 text-xs leading-relaxed sm:text-sm',
                      isUser
                        ? 'rounded-tr-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_8px_30px_rgba(14,165,233,0.18)]'
                        : 'rounded-tl-md border border-white/10 bg-white/[0.035] text-slate-200',
                    ].join(' ')}
                  >
                    <div className="whitespace-pre-wrap">
                      {renderFormattedText(message.text)}
                    </div>

                    <div
                      className={`mt-2 flex items-center justify-between gap-3 border-t pt-1.5 text-[8px] font-mono ${
                        isUser
                          ? 'border-white/15 text-white/60'
                          : 'border-white/5 text-slate-600'
                      }`}
                    >
                      {!isUser ? (
                        <button
                          type="button"
                          onClick={() => speakText(message.text)}
                          className="flex cursor-pointer items-center gap-1 transition hover:text-cyan-300"
                        >
                          <Volume2 className="h-3 w-3" />
                          Listen
                        </button>
                      ) : (
                        <span />
                      )}

                      <span>{message.timestamp}</span>
                    </div>
                  </div>

                  {isUser && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading */}
            {isLoading && (
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 overflow-hidden rounded-xl border border-cyan-300/15 bg-[#081222]">
                  <img
                    src="/sahil-ai-agent.png"
                    alt="AI thinking"
                    className="h-full w-full object-contain sahil-thinking"
                  />
                </div>

                <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.035] px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300" />
                    <span className="ml-1 text-[10px] font-mono text-slate-500">
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="shrink-0 border-t border-white/5 bg-black/10 px-4 py-3">
              <div className="mb-2 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-slate-500">
                <Sparkles className="h-3 w-3 text-cyan-300" />
                Ask about Sahil
              </div>

              <div className="flex max-h-20 flex-wrap gap-1.5 overflow-y-auto">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-left text-[9px] text-slate-400 transition hover:border-cyan-300/25 hover:bg-cyan-300/5 hover:text-cyan-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="shrink-0 border-t border-white/10 bg-white/[0.025] p-3">
            {isListening && (
              <div className="mb-2 flex items-center justify-between rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-3 py-2 text-[9px] text-cyan-300">
                <span className="flex items-center gap-2">
                  <Mic className="h-3.5 w-3.5 animate-pulse" />
                  Listening...
                </span>

                <button
                  type="button"
                  onClick={toggleListening}
                  className="cursor-pointer underline"
                >
                  Stop
                </button>
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();

                if (isListening && recognitionRef.current) {
                  recognitionRef.current.stop();
                  setIsListening(false);
                }

                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <MessageCircle className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />

                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  disabled={isLoading}
                  placeholder={
                    isListening
                      ? 'Listening...'
                      : 'Ask anything about Sahil...'
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#030711] py-2.5 pl-9 pr-3 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/30"
                />
              </div>

              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={isLoading}
                  title={
                    isListening
                      ? 'Stop listening'
                      : 'Voice input'
                  }
                  className={[
                    'shrink-0 cursor-pointer rounded-xl border p-2.5 transition',
                    isListening
                      ? 'border-cyan-300/30 bg-cyan-400/15 text-cyan-300'
                      : 'border-white/10 bg-white/[0.025] text-slate-400 hover:border-cyan-300/20 hover:text-cyan-300',
                  ].join(' ')}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="shrink-0 cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-2.5 text-white shadow-[0_6px_20px_rgba(14,165,233,0.2)] transition hover:scale-105 hover:shadow-[0_8px_28px_rgba(14,165,233,0.3)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                title="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between px-1 text-[8px] font-mono text-slate-600">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400/70" />
                Portfolio Knowledge
              </span>

              <span>SAHIL AI</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          BOT ANIMATION STYLES
      ========================================================== */}
      <style>{`
        @keyframes sahilAgentFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-1deg);
          }

          25% {
            transform: translateY(-7px) rotate(1.5deg);
          }

          50% {
            transform: translateY(-3px) rotate(-1.5deg);
          }

          75% {
            transform: translateY(-9px) rotate(1deg);
          }
        }

        @keyframes sahilAgentActive {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }

          20% {
            transform: translateY(-10px) rotate(-4deg) scale(1.03);
          }

          40% {
            transform: translateY(-3px) rotate(4deg) scale(1.04);
          }

          60% {
            transform: translateY(-9px) rotate(-3deg) scale(1.03);
          }

          80% {
            transform: translateY(-2px) rotate(2deg) scale(1.01);
          }

          100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes sahilThinking {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }

          50% {
            transform: translateY(-3px) rotate(2deg);
          }
        }

        .sahil-agent-idle {
          animation: sahilAgentFloat 3.6s ease-in-out infinite;
          transform-origin: bottom center;
          will-change: transform;
        }

        .sahil-agent-active {
          animation: sahilAgentActive 0.9s ease-in-out;
          transform-origin: bottom center;
          will-change: transform;
        }

        .sahil-thinking {
          animation: sahilThinking 1s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sahil-agent-idle,
          .sahil-agent-active,
          .sahil-thinking {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}