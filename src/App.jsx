import { useState, useEffect, useRef } from 'react'
import {
  Home, Flame, PlusCircle, PlaySquare, User,
  Search, Bell, Cast, MoreVertical, ExternalLink,
  X, Send, ShoppingBag, ChevronRight
} from 'lucide-react'
import './App.css'

// ─── Chat Modal Component ─────────────────────────────────────────────────────
function ChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [chips, setChips] = useState(['Running Shoes', 'Daily Walking', 'Slip-ons'])
  const [showTrending, setShowTrending] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const trendingProducts = [
    { name: 'Wool Runners', price: '$110', color: 'bg-amber-100' },
    { name: 'Tree Pipers', price: '$105', color: 'bg-emerald-100' },
    { name: 'Wool Loungers', price: '$100', color: 'bg-sky-100' },
  ]

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          from: 'bot',
          text: "Hi there! 👋 I'm Allie. Ready to find your perfect travel shoes?",
        },
      ])
      setChips(['Running Shoes', 'Daily Walking', 'Slip-ons'])
      setShowTrending(true)
      setIsTyping(false)
    }
  }, [isOpen])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleChipClick = (chip) => {
    setMessages((prev) => [...prev, { from: 'user', text: chip }])
    setChips([])
    setShowTrending(false)
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: 'Excellent choice for staying active on a trip! Based on our current lineup at allbirds.com, here are my top two recommendations for running:',
        },
        {
          from: 'bot',
          type: 'products',
          products: [
            {
              name: 'Tree Flyer 2',
              price: '$160',
              tagline: 'Springy & resilient for long runs.',
              color: 'bg-lime-100',
              accent: 'border-lime-300',
            },
            {
              name: 'Tree Dasher 2',
              price: '$135',
              tagline: 'Everyday neutral running shoe.',
              color: 'bg-teal-100',
              accent: 'border-teal-300',
            },
          ],
        },
      ])
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-t-2xl flex flex-col animate-slide-up"
        style={{ height: '85%' }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Allie from Allbirds</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                Online now
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
          {messages.map((msg, i) => {
            if (msg.type === 'products') {
              return (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[85%] space-y-2">
                    {msg.products.map((p, j) => (
                      <div
                        key={j}
                        className={`rounded-xl border ${p.accent} overflow-hidden bg-white shadow-sm`}
                      >
                        <div className={`${p.color} h-28 flex items-center justify-center`}>
                          <ShoppingBag size={36} className="text-gray-400" />
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                            <p className="font-bold text-gray-900 text-sm">{p.price}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{p.tagline}</p>
                          <button className="mt-2 w-full bg-black text-white text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1">
                            View on Allbirds <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }

            return msg.from === 'bot' ? (
              <div key={i} className="flex justify-start">
                <div className="max-w-[80%] bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                  <p className="text-sm text-gray-800 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div className="max-w-[80%] bg-black text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5">
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Suggestion Chips */}
          {chips.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-1">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Trending Section */}
          {showTrending && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Trending Now
              </p>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {trendingProducts.map((p, i) => (
                  <div
                    key={i}
                    className="min-w-[130px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex-shrink-0"
                  >
                    <div className={`${p.color} h-20 flex items-center justify-center`}>
                      <ShoppingBag size={24} className="text-gray-400" />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-semibold text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Allie anything..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-700 outline-none placeholder-gray-400"
            disabled
          />
          <button className="w-9 h-9 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [chatOpen, setChatOpen] = useState(false)

  const thumbnails = [
    { color: 'bg-emerald-100', label: 'Wool Runner' },
    { color: 'bg-sky-100', label: 'Tree Dasher' },
    { color: 'bg-amber-100', label: 'Tree Flyer' },
    { color: 'bg-rose-100', label: 'Lounger' },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      {/* Phone Container */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-[8px] border-gray-800">
        {/* Status Bar (simulated) */}
        <div className="flex items-center justify-between px-6 py-1.5 bg-white">
          <span className="text-xs font-semibold text-black">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-1 h-1.5 bg-black rounded-sm" />
              <div className="w-1 h-2 bg-black rounded-sm" />
              <div className="w-1 h-2.5 bg-black rounded-sm" />
              <div className="w-1 h-3 bg-black rounded-sm" />
            </div>
            <span className="text-xs font-semibold text-black ml-1">5G</span>
            <div className="w-6 h-3 border border-black rounded-sm ml-1 flex items-center p-0.5">
              <div className="w-3/4 h-full bg-black rounded-xs" />
            </div>
          </div>
        </div>

        {/* YouTube Top Nav */}
        <div className="flex items-center justify-between px-4 py-2 bg-white">
          <div className="flex items-center gap-1">
            {/* YouTube Logo */}
            <div className="flex items-center">
              <div className="w-7 h-5 bg-red-600 rounded-sm flex items-center justify-center">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-white ml-0.5" />
              </div>
              <span className="text-lg font-bold text-black ml-1 tracking-tight">YouTube</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Cast size={22} className="text-gray-800" />
            <Bell size={22} className="text-gray-800" />
            <Search size={22} className="text-gray-800" />
          </div>
        </div>

        {/* Main Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
          {/* Hero Ad Section - "TRAVEL LIGHT" */}
          <div className="relative mx-3 rounded-2xl overflow-hidden bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400" style={{ aspectRatio: '4/3' }}>
            {/* Background shoe placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-32 bg-stone-300/50 rounded-2xl flex items-center justify-center">
                <ShoppingBag size={48} className="text-stone-400" />
              </div>
            </div>

            {/* "TRAVEL LIGHT" text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-black text-gray-900 tracking-wider text-center leading-tight">
                TRAVEL<br />LIGHT
              </h2>
            </div>

            {/* Feature callouts with arrows */}
            <div className="absolute top-6 left-5 flex items-center gap-1">
              <span className="text-[10px] font-bold text-gray-700 tracking-wide bg-white/70 px-2 py-0.5 rounded-full">
                SUITCASE FRIENDLY
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M8 6C12 8 14 14 18 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 12L18 16L14 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="absolute bottom-8 right-5 flex items-center gap-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M16 18C12 16 10 10 6 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 12L6 8L10 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] font-bold text-gray-700 tracking-wide bg-white/70 px-2 py-0.5 rounded-full">
                MACHINE WASHABLE
              </span>
            </div>

            {/* External link icon */}
            <div className="absolute bottom-3 right-3 w-7 h-7 bg-black/40 rounded-full flex items-center justify-center">
              <ExternalLink size={14} className="text-white" />
            </div>
          </div>

          {/* Thumbnail Carousel */}
          <div className="flex gap-2 px-3 mt-3 overflow-x-auto no-scrollbar">
            {thumbnails.map((t, i) => (
              <div
                key={i}
                className={`min-w-[80px] h-[80px] ${t.color} rounded-lg flex items-center justify-center flex-shrink-0 border-2 ${i === 0 ? 'border-black' : 'border-transparent'}`}
              >
                <ShoppingBag size={24} className="text-gray-400" />
              </div>
            ))}
          </div>

          {/* Ad Metadata */}
          <div className="px-4 mt-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 leading-snug">
                  The Perfect Pair For Anywhere
                </h3>
                <p className="text-sm text-gray-600 mt-0.5 leading-snug">
                  Lightweight, packable & machine washable shoes for every adventure.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Sponsored &middot; Allbirds
                </p>
              </div>
              <button className="p-1 -mr-1">
                <MoreVertical size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 px-4 mt-3 mb-4">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm py-2.5 rounded-full transition-colors">
              Shop now
            </button>
            <button
              onClick={() => setChatOpen(true)}
              className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold text-sm py-2.5 rounded-full transition-colors"
            >
              Chat with Allbirds
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mx-4" />

          {/* Feed placeholder items */}
          <div className="px-3 py-3 space-y-4">
            {[1, 2].map((item) => (
              <div key={item}>
                <div className="w-full bg-gray-100 rounded-xl" style={{ aspectRatio: '16/9' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <PlaySquare size={36} className="text-gray-300" />
                  </div>
                </div>
                <div className="flex gap-3 mt-2 px-1">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                    <div className="h-2.5 bg-gray-100 rounded w-3/5 mt-1.5" />
                    <div className="h-2.5 bg-gray-100 rounded w-2/5 mt-1" />
                  </div>
                  <MoreVertical size={16} className="text-gray-400 mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-around py-2 pb-4 bg-white border-t border-gray-200">
          <NavItem icon={<Home size={22} />} label="Home" active />
          <NavItem icon={<Flame size={22} />} label="Shorts" />
          <div className="flex flex-col items-center">
            <PlusCircle size={30} className="text-gray-700" />
          </div>
          <NavItem icon={<PlaySquare size={22} />} label="Subscriptions" />
          <NavItem icon={<User size={22} />} label="You" />
        </div>

        {/* Chat Modal Overlay */}
        <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false }) {
  return (
    <button className="flex flex-col items-center gap-0.5">
      <span className={active ? 'text-black' : 'text-gray-500'}>{icon}</span>
      <span className={`text-[10px] ${active ? 'text-black font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
    </button>
  )
}

export default App
