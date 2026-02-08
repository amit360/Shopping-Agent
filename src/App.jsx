import { useState, useEffect, useRef } from 'react'
import {
  Home, PlusCircle, PlaySquare, User,
  Search, Bell, Cast, MoreVertical, ArrowUpRight,
  X, Send, ExternalLink, ShoppingCart, ArrowLeft, Plus, Minus,
  Check, Star, Heart, Truck, Shield, RotateCcw
} from 'lucide-react'
import './App.css'

// ─── 10 Allbirds Shoe Products ─────────────────────────────────────────────────

const ALL_SHOES = [
  {
    id: 1, name: 'Tree Runner', price: 98, color: '#2d2d2d', sole: '#f0ebe3',
    tagline: 'Breezy everyday sneaker',
    description: 'Made with responsibly sourced eucalyptus tree fiber. Breathable, lightweight, and silky smooth for all-day wear.',
    rating: 4.8, reviews: 2847,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
    colors: ['Basin', 'Blizzard', 'Charcoal'],
    features: ['Machine Washable', 'Carbon Neutral', 'Breathable Knit'],
    type: 'sneaker',
  },
  {
    id: 2, name: 'Wool Runner', price: 110, color: '#1a2744', sole: '#d4c4a8',
    tagline: 'Cozy merino wool classic',
    description: 'Crafted from ZQ merino wool for natural temperature regulation. Incredibly soft — the shoe that started it all.',
    rating: 4.7, reviews: 3421,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Natural Gray', 'Tuke Midnight', 'Natural White'],
    features: ['Temperature Regulating', 'Odor Reducing', 'Cozy Wool'],
    type: 'hightop',
  },
  {
    id: 3, name: 'Tree Dasher 2', price: 138, color: '#1a1a1a', sole: '#e8e8e8',
    tagline: 'Daily running shoe',
    description: 'Built for daily runs with a responsive midsole and engineered eucalyptus upper. Balanced cushioning from heel to toe.',
    rating: 4.6, reviews: 1893,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Thunder', 'Bloom', 'Blizzard'],
    features: ['Responsive Cushion', 'Supportive Heel', 'Lightweight'],
    type: 'boot',
  },
  {
    id: 4, name: 'Trail Runner SWT', price: 138, color: '#3a3a3a', sole: '#c8915a',
    tagline: 'Off-road trail shoe',
    description: 'Rugged traction meets sustainable comfort with a grippy rubber outsole and water-repellent upper for any terrain.',
    rating: 4.5, reviews: 967,
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Obsidian', 'Basin Green', 'Hazy Beige'],
    features: ['Water Repellent', 'Grippy Outsole', 'Trail Lugs'],
    type: 'trail',
  },
  {
    id: 5, name: 'Tree Flyer 2', price: 160, color: '#2d4a3e', sole: '#e8e0d4',
    tagline: 'Performance running shoe',
    description: 'Our highest-performance shoe with SwiftFoam™ midsole for maximum energy return. Ultra lightweight carbon-reduced materials.',
    rating: 4.9, reviews: 1247,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Kaikoura', 'Bough Green', 'Eclipse'],
    features: ['SwiftFoam™', 'Energy Return', 'Ultra Light'],
    type: 'sneaker',
  },
  {
    id: 6, name: 'Wool Lounger', price: 100, color: '#4a4035', sole: '#f0ebe3',
    tagline: 'Slip-on comfort',
    description: 'The ultimate slip-on made from soft merino wool. No laces, no fuss — just pure everyday comfort.',
    rating: 4.8, reviews: 4102,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Natural Gray', 'Tuke Jo', 'Cream'],
    features: ['No Laces', 'Easy On/Off', 'Cozy Wool'],
    type: 'sneaker',
  },
  {
    id: 7, name: 'Tree Piper', price: 98, color: '#5c4033', sole: '#f0ebe3',
    tagline: 'Laid-back lace-up',
    description: 'A relaxed lace-up style with a canvas-like eucalyptus upper. Perfect for casual everyday looks.',
    rating: 4.6, reviews: 1532,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Rugged Beige', 'Navy Night', 'White'],
    features: ['Canvas Feel', 'Lightweight', 'Breathable'],
    type: 'sneaker',
  },
  {
    id: 8, name: 'SuperLight Tree Runner', price: 120, color: '#363636', sole: '#d0d0d0',
    tagline: 'Our lightest shoe ever',
    description: 'Reimagined with a revolutionary SuperLight foam sole that\'s 30% lighter. Same great Tree Runner feel, featherweight comfort.',
    rating: 4.7, reviews: 892,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Dark Grey', 'Chalk', 'Hazy Lime'],
    features: ['SuperLight Foam', '30% Lighter', 'Zero Gravity Feel'],
    type: 'sneaker',
  },
  {
    id: 9, name: 'Wool Runner Mizzle', price: 135, color: '#2b3a4e', sole: '#3a3a3a',
    tagline: 'Weather-ready wool runner',
    description: 'The classic Wool Runner upgraded with a water-repellent bio-based shield and puddle guard. Rain or shine comfort.',
    rating: 4.8, reviews: 2156,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Hazy Indigo', 'Thunder', 'Natural Black'],
    features: ['Water Repellent', 'Puddle Guard', 'Bio Shield'],
    type: 'hightop',
  },
  {
    id: 10, name: 'Tree Breezers', price: 110, color: '#8b4513', sole: '#f0ebe3',
    tagline: 'Elegant flat for every day',
    description: 'A sleek flat made from eucalyptus tree fiber. Perfectly balanced between polished style and casual comfort.',
    rating: 4.7, reviews: 3298,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Cocoa', 'Blizzard', 'Eclipse'],
    features: ['Elegant Design', 'Soft Insole', 'Versatile Style'],
    type: 'sneaker',
  },
]

// ─── SVG Shoe Components ───────────────────────────────────────────────────────

function ShoeByType({ type, color = '#1a1a1a', sole = '#f5f0e8', className = '' }) {
  if (type === 'hightop') return <ShoeHighTop color={color} sole={sole} className={className} />
  if (type === 'boot') return <ShoeBlackBoot color={color} sole={sole} className={className} />
  if (type === 'trail') return <ShoeTrail color={color} sole={sole} className={className} />
  return <ShoeSneaker color={color} sole={sole} className={className} />
}

function ShoeSneaker({ color, sole, className }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="none">
      <path d="M30 65 C30 45, 50 30, 80 28 C100 26, 130 25, 155 30 C170 33, 185 40, 190 55 L190 70 C190 75, 185 80, 180 80 L25 80 C20 80, 18 75, 20 70 Z" fill={color}/>
      <path d="M25 72 C25 68, 30 65, 35 65 L180 65 C185 65, 192 68, 192 72 L192 78 C192 82, 188 85, 184 85 L22 85 C18 85, 15 82, 15 78 Z" fill={sole}/>
      <path d="M80 28 C82 35, 75 42, 70 45 C65 48, 55 52, 45 58 C40 61, 35 63, 30 65" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
      <text x="90" y="55" fontFamily="serif" fontStyle="italic" fontSize="11" fill="white" opacity="0.7">allbirds</text>
    </svg>
  )
}

function ShoeHighTop({ color, sole, className }) {
  return (
    <svg viewBox="0 0 160 140" className={className} fill="none">
      <path d="M45 30 C45 20, 55 12, 70 10 C85 8, 95 10, 105 15 C110 18, 115 25, 115 35 L115 80 C115 85, 125 90, 135 95 L140 100 C142 102, 142 108, 140 110 L20 110 C15 110, 12 107, 15 103 L25 95 C30 90, 40 85, 45 80 Z" fill={color}/>
      <path d="M15 103 C15 99, 20 96, 25 96 L140 96 C145 96, 148 99, 148 103 L148 108 C148 112, 145 115, 140 115 L15 115 C10 115, 8 112, 10 108 Z" fill={sole}/>
      <path d="M55 20 L55 45 M70 15 L70 40 M85 15 L85 40" stroke={color} strokeWidth="2" opacity="0.3"/>
    </svg>
  )
}

function ShoeBlackBoot({ color, sole, className }) {
  return (
    <svg viewBox="0 0 160 140" className={className} fill="none">
      <path d="M50 25 C50 15, 60 8, 75 8 C90 8, 100 12, 108 18 C112 22, 115 30, 115 40 L115 80 C120 85, 130 90, 138 95 L140 100 C142 103, 140 108, 136 110 L22 110 C18 110, 16 106, 18 102 L28 92 C35 85, 45 80, 50 75 Z" fill={color}/>
      <path d="M18 102 C18 98, 22 95, 28 95 L140 95 C145 95, 148 98, 148 102 L148 108 C148 112, 144 115, 140 115 L18 115 C14 115, 12 112, 14 108 Z" fill={sole}/>
      <circle cx="62" cy="48" r="2" fill={color} opacity="0.4"/>
      <circle cx="62" cy="56" r="2" fill={color} opacity="0.4"/>
    </svg>
  )
}

function ShoeTrail({ color, sole, className }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="none">
      <path d="M25 60 C25 40, 45 25, 75 22 C100 20, 135 20, 160 28 C175 33, 188 42, 192 55 L192 65 C192 70, 188 75, 183 75 L22 75 C17 75, 14 70, 16 65 Z" fill={color}/>
      <path d="M16 65 C16 61, 20 58, 25 58 L185 58 C190 58, 195 62, 195 66 L195 75 C195 80, 190 85, 185 85 L16 85 C11 85, 8 80, 10 75 Z" fill={sole}/>
      <path d="M30 75 L35 68 L45 75 L50 68 L60 75 L65 68 L75 75 L80 68 L90 75 L95 68 L105 75 L110 68 L120 75 L125 68 L135 75 L140 68 L150 75 L155 68 L165 75 L170 68 L180 75" stroke={sole} strokeWidth="2" fill="none" opacity="0.6"/>
    </svg>
  )
}

// ─── Icon Components ───────────────────────────────────────────────────────────

function AllbirdsLogo({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <circle cx="20" cy="20" r="20" fill="#1a1a1a"/>
      <text x="20" y="24" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" fill="white">allbirds</text>
    </svg>
  )
}

function ShortsIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"/>
    </svg>
  )
}

function CurvedArrowDown() {
  return (
    <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
      <path d="M5 5 C8 15, 15 25, 25 35 C28 38, 32 42, 35 45" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M28 40 L35 45 L30 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function CurvedArrowUp() {
  return (
    <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
      <path d="M35 45 C32 35, 25 25, 15 15 C12 12, 8 8, 5 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M12 10 L5 5 L10 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={14} className={s <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">{rating}</span>
      <span className="text-sm text-gray-400">·</span>
      <span className="text-sm text-gray-400">{reviews.toLocaleString()} reviews</span>
    </div>
  )
}

// ─── Checkout Flow ─────────────────────────────────────────────────────────────

function CheckoutSheet({ item, onClose, onComplete }) {
  const [step, setStep] = useState('review')
  const subtotal = item.price * item.qty
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = (subtotal + tax).toFixed(2)

  const handlePay = () => {
    setStep('paying')
    setTimeout(() => setStep('done'), 2000)
    setTimeout(() => onComplete(item), 3500)
  }

  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={step === 'done' ? undefined : onClose} />
      <div className="relative bg-white rounded-t-3xl animate-slide-up overflow-hidden" style={{ maxHeight: '60%' }}>
        <div className="flex justify-center pt-3 pb-2"><div className="w-10 h-1 bg-gray-300 rounded-full" /></div>

        {step === 'review' && (
          <div className="px-6 pb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5">Checkout</h3>

            {/* Product summary */}
            <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl mb-5">
              <div className="w-18 h-18 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm">
                <ShoeByType type={item.type} color={item.color} sole={item.sole} className="w-16 h-auto" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500 mt-0.5">Size {item.size} · {item.selectedColor}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
              <p className="text-lg font-bold text-gray-900">${subtotal}</p>
            </div>

            {/* Order details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="text-gray-900 font-medium">${subtotal}.00</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span className="text-green-600 font-medium">Free</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Estimated Tax</span><span className="text-gray-900 font-medium">${tax.toFixed(2)}</span></div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between text-base"><span className="font-bold text-gray-900">Total</span><span className="font-bold text-gray-900">${total}</span></div>
            </div>

            {/* GPay button */}
            <button onClick={handlePay}
              className="w-full py-4 bg-[#1a1a1a] rounded-2xl font-semibold text-white flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-lg shadow-black/10">
              <svg viewBox="0 0 40 16" className="w-10 h-4" fill="none">
                <text x="0" y="13" fontFamily="system-ui" fontWeight="700" fontSize="13"><tspan fill="#4285F4">G</tspan><tspan fill="white"> Pay</tspan></text>
              </svg>
              <span className="text-[15px]">Pay ${total}</span>
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-xs text-gray-400"><Shield size={12} /> Secure</div>
              <div className="flex items-center gap-1 text-xs text-gray-400"><Truck size={12} /> Free Shipping</div>
              <div className="flex items-center gap-1 text-xs text-gray-400"><RotateCcw size={12} /> 30-Day Returns</div>
            </div>
          </div>
        )}

        {step === 'paying' && (
          <div className="px-6 pb-10 pt-6 flex flex-col items-center">
            <div className="w-14 h-14 border-[3px] border-gray-200 border-t-black rounded-full animate-spin mb-5" />
            <p className="text-base font-semibold text-gray-800">Processing payment...</p>
            <p className="text-sm text-gray-400 mt-1">Please don't close this window</p>
          </div>
        )}

        {step === 'done' && (
          <div className="px-6 pb-10 pt-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 animate-check-pop">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={28} className="text-green-600" strokeWidth={3} />
              </div>
            </div>
            <p className="text-lg font-bold text-gray-900">Order Confirmed!</p>
            <p className="text-sm text-gray-500 mt-1.5">{item.name} · Size {item.size}</p>
            <p className="text-sm text-gray-400 mt-0.5">Arrives in 3-5 business days</p>
            <div className="mt-4 px-4 py-2 bg-gray-50 rounded-full text-xs text-gray-500 font-medium">
              Confirmation sent to your email
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Product Detail ────────────────────────────────────────────────────────────

function ShoeDetail({ shoe, onBack, onCheckout }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(shoe.colors[0])
  const [qty, setQty] = useState(1)
  const [liked, setLiked] = useState(false)

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <span className="text-[15px] font-semibold text-gray-900">{shoe.name}</span>
        <button onClick={() => setLiked(!liked)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 -mr-1">
          <Heart size={22} className={liked ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Hero image */}
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 flex items-center justify-center relative">
          <ShoeByType type={shoe.type} color={shoe.color} sole={shoe.sole} className="w-56 h-auto drop-shadow-xl" />
          {shoe.rating >= 4.8 && (
            <span className="absolute top-4 left-4 bg-yellow-400 text-[10px] font-bold text-yellow-900 px-2.5 py-1 rounded-full">BESTSELLER</span>
          )}
        </div>

        {/* Product info */}
        <div className="px-5 pt-5 pb-4 space-y-5">
          {/* Title + price row */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[22px] font-bold text-gray-900 leading-tight">{shoe.name}</h3>
                <p className="text-[15px] text-gray-500 mt-1">{shoe.tagline}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[22px] font-bold text-gray-900">${shoe.price}</p>
              </div>
            </div>
            <div className="mt-2.5"><StarRating rating={shoe.rating} reviews={shoe.reviews} /></div>
          </div>

          {/* Features */}
          <div className="flex gap-2 flex-wrap">
            {shoe.features.map((f) => (
              <span key={f} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-xs text-gray-600 rounded-full font-medium">{f}</span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Description */}
          <p className="text-[14px] text-gray-600 leading-relaxed">{shoe.description}</p>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Color — <span className="font-normal text-gray-500">{selectedColor}</span></p>
            <div className="flex gap-2">
              {shoe.colors.map((c) => (
                <button key={c} onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 text-[13px] rounded-full border-2 transition-all font-medium ${selectedColor === c ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-900">Size</p>
              <button className="text-xs text-gray-500 underline">Size Guide</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {shoe.sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`min-w-[44px] h-11 px-2 text-sm font-medium rounded-xl border-2 transition-all ${selectedSize === s ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Quantity</p>
            <div className="flex items-center border border-gray-200 rounded-xl w-fit overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="w-12 h-11 flex items-center justify-center text-sm font-semibold border-x border-gray-200">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Trust info */}
          <div className="flex gap-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Truck size={14} /> Free Shipping</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><RotateCcw size={14} /> 30-Day Returns</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 py-4 border-t border-gray-100 bg-white">
        <button onClick={() => selectedSize && onCheckout({ ...shoe, size: selectedSize, selectedColor, qty })}
          className={`w-full py-4 rounded-2xl font-semibold text-[16px] flex items-center justify-center gap-2.5 transition-all ${
            selectedSize ? 'bg-black text-white hover:bg-gray-800 shadow-xl shadow-black/15 active:scale-[0.98]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}>
          <ShoppingCart size={20} /> Add to Cart — ${shoe.price * qty}
        </button>
        {!selectedSize && <p className="text-xs text-center text-gray-400 mt-2">Please select a size</p>}
      </div>
    </div>
  )
}

// ─── Chat Modal ────────────────────────────────────────────────────────────────

function ChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [chips, setChips] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [selectedShoe, setSelectedShoe] = useState(null)
  const [checkoutItem, setCheckoutItem] = useState(null)
  const [cart, setCart] = useState([])
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setMessages([])
      setChips([])
      setIsTyping(false)
      setSelectedShoe(null)
      setCheckoutItem(null)
      setCart([])
      setTimeout(() => {
        setMessages([{ from: 'bot', text: "Hey there! 👋 I'm Allie from Allbirds. Looking for the perfect shoe? I'd love to help you find your match!" }])
        setTimeout(() => {
          setChips(['Running Shoes', 'Daily Walking', 'Slip-ons'])
          setMessages(prev => [...prev, { from: 'bot', type: 'trending' }])
        }, 500)
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, chips])

  const handleChipClick = (chip) => {
    setMessages(prev => prev.filter(m => m.type !== 'trending').concat([{ from: 'user', text: chip }]))
    setChips([])
    setIsTyping(true)

    const replyMap = {
      'Running Shoes': {
        text: 'Great pick! Here are our best running shoes — swipe through:',
        shoes: ALL_SHOES.filter(s => ['Tree Dasher 2', 'Tree Flyer 2', 'Trail Runner SWT', 'SuperLight Tree Runner'].includes(s.name)),
      },
      'Daily Walking': {
        text: 'Perfect for everyday comfort! Our most-loved walking shoes:',
        shoes: ALL_SHOES.filter(s => ['Tree Runner', 'Wool Runner', 'Wool Lounger', 'Tree Piper', 'Tree Breezers'].includes(s.name)),
      },
      'Slip-ons': {
        text: 'Easy on, easy off! Check out these comfy styles:',
        shoes: ALL_SHOES.filter(s => ['Wool Lounger', 'Tree Runner', 'Tree Breezers'].includes(s.name)),
      },
    }

    const reply = replyMap[chip] || replyMap['Running Shoes']

    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text: reply.text }, { from: 'bot', type: 'shoe-carousel', shoes: reply.shoes }])
      setTimeout(() => setChips(['Running Shoes', 'Daily Walking', 'Slip-ons'].filter(c => c !== chip)), 300)
    }, 1200)
  }

  const handleCheckout = (item) => { setSelectedShoe(null); setCheckoutItem(item) }

  const handlePurchaseComplete = (item) => {
    setCheckoutItem(null)
    setCart(prev => [...prev, item])
    setMessages(prev => [...prev, { from: 'bot', text: `Your ${item.name} (Size ${item.size}) order is confirmed! 🎉 Arrives in 3-5 business days. Need anything else?` }])
    setChips(['Running Shoes', 'Daily Walking', 'Slip-ons'])
  }

  if (!isOpen) return null

  if (selectedShoe) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative bg-white rounded-t-2xl flex flex-col animate-slide-up" style={{ height: '92%' }}>
          <ShoeDetail shoe={selectedShoe} onBack={() => setSelectedShoe(null)} onCheckout={handleCheckout} />
          {checkoutItem && <CheckoutSheet item={checkoutItem} onClose={() => setCheckoutItem(null)} onComplete={handlePurchaseComplete} />}
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl flex flex-col animate-slide-up" style={{ height: '88%' }}>
        <div className="flex justify-center pt-2.5 pb-1"><div className="w-10 h-1 bg-gray-300 rounded-full" /></div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <AllbirdsLogo size={40} />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-gray-900">Allie from Allbirds</p>
              <p className="text-xs text-gray-400">Usually replies instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <div className="relative">
                <ShoppingCart size={20} className="text-gray-600" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">{cart.length}</span>
              </div>
            )}
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
              <X size={22} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 space-y-4 no-scrollbar bg-[#fafafa]">
          {messages.map((msg, i) => {
            if (msg.type === 'trending') {
              return (
                <div key={i} className="animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5 ml-9">Popular right now</p>
                  <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 ml-9 snap-x-mandatory">
                    {ALL_SHOES.slice(0, 5).map((shoe) => (
                      <button key={shoe.id} onClick={() => setSelectedShoe(shoe)}
                        className="min-w-[120px] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex-shrink-0 text-left hover:shadow-md transition-all snap-start">
                        <div className="bg-gradient-to-b from-white to-gray-50 h-[72px] flex items-center justify-center">
                          <ShoeByType type={shoe.type} color={shoe.color} sole={shoe.sole} className="w-[88px] h-auto" />
                        </div>
                        <div className="px-2.5 pb-2.5 pt-1">
                          <p className="text-[11px] font-semibold text-gray-900 truncate">{shoe.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium">${shoe.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            }

            if (msg.type === 'shoe-carousel') {
              return (
                <div key={i} className="animate-fade-in ml-9" style={{ opacity: 0 }}>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x-mandatory">
                    {msg.shoes.map((shoe) => (
                      <button key={shoe.id} onClick={() => setSelectedShoe(shoe)}
                        className="min-w-[155px] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex-shrink-0 text-left hover:shadow-lg transition-all snap-start group">
                        <div className="bg-gradient-to-b from-white to-gray-50 h-[100px] flex items-center justify-center p-3 relative">
                          <ShoeByType type={shoe.type} color={shoe.color} sole={shoe.sole} className="w-[120px] h-auto group-hover:scale-105 transition-transform" />
                          {shoe.rating >= 4.8 && (
                            <span className="absolute top-2 left-2 bg-yellow-400/90 text-[8px] font-bold text-yellow-900 px-1.5 py-0.5 rounded-full">TOP PICK</span>
                          )}
                        </div>
                        <div className="p-3 pt-2">
                          <p className="text-[12px] font-bold text-gray-900">{shoe.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">{shoe.tagline}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[13px] font-bold text-gray-900">${shoe.price}</span>
                            <span className="text-[10px] bg-gray-900 text-white px-2.5 py-1 rounded-full font-medium">View</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            }

            return msg.from === 'bot' ? (
              <div key={i} className="flex items-end gap-2.5 animate-fade-in" style={{ opacity: 0 }}>
                <AllbirdsLogo size={26} className="flex-shrink-0 mb-0.5" />
                <div className="max-w-[78%] bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                  <p className="text-[13.5px] text-gray-800 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end animate-fade-in" style={{ opacity: 0 }}>
                <div className="max-w-[78%] bg-gray-900 text-white rounded-2xl rounded-br-md px-4 py-3">
                  <p className="text-[13.5px] leading-relaxed">{msg.text}</p>
                </div>
              </div>
            )
          })}

          {isTyping && (
            <div className="flex items-end gap-2.5">
              <AllbirdsLogo size={26} className="flex-shrink-0 mb-0.5" />
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3.5 shadow-sm border border-gray-100">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                </div>
              </div>
            </div>
          )}

          {/* Chips with color and spacing */}
          {chips.length > 0 && (
            <div className="flex gap-2 flex-wrap ml-9 pt-2 animate-fade-in" style={{ opacity: 0 }}>
              {chips.map((chip, idx) => {
                const chipColors = [
                  'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
                  'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
                  'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
                ]
                return (
                  <button key={chip} onClick={() => handleChipClick(chip)}
                    className={`px-4 py-2.5 border rounded-full text-[13px] font-medium active:scale-95 transition-all shadow-sm ${chipColors[idx]}`}>
                    {chip}
                  </button>
                )
              })}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 px-5 py-3.5 flex items-center gap-2.5 bg-white">
          <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-[14px] text-gray-700 outline-none placeholder-gray-400" disabled />
          <button className="w-11 h-11 bg-black rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-800 transition-colors">
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>

      {checkoutItem && <CheckoutSheet item={checkoutItem} onClose={() => setCheckoutItem(null)} onComplete={handlePurchaseComplete} />}
    </div>
  )
}

// ─── YouTube Feed Videos ───────────────────────────────────────────────────────

const FEED_VIDEOS = [
  {
    title: 'Best Travel Shoes 2026 — Allbirds vs Nike vs On Cloud',
    channel: 'PackHacker', views: '284K views', time: '2 weeks ago', duration: '12:34',
    bgColor: 'bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400',
    icon: '🏃',
  },
  {
    title: "I Wore Allbirds for 365 Days — Here's What Happened",
    channel: 'Chase Reeves', views: '1.2M views', time: '3 months ago', duration: '18:22',
    bgColor: 'bg-gradient-to-br from-orange-300 via-rose-300 to-pink-400',
    icon: '👟',
  },
]

// ─── Main App ──────────────────────────────────────────────────────────────────

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  const thumbnails = [
    { type: 'hightop', color: '#1a2744', sole: '#c8915a' },
    { type: 'boot', color: '#222222', sole: '#333333' },
    { type: 'trail', color: '#3a3a3a', sole: '#c8915a' },
    { type: 'sneaker', color: '#1a1a1a', sole: '#f5f0e8' },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="relative w-[390px] h-[844px] bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* YouTube Top Nav */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-white border-b border-gray-50">
          <div className="flex items-center gap-1">
            {/* Proper YouTube logo */}
            <svg width="90" height="20" viewBox="0 0 90 20" className="flex-shrink-0">
              <rect x="0" y="0" width="28" height="20" rx="5" fill="#FF0000"/>
              <polygon points="11,5 11,15 20,10" fill="white"/>
              <text x="32" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="16" fill="#1a1a1a" letterSpacing="-0.5">YouTube</text>
            </svg>
          </div>
          <div className="flex items-center gap-5">
            <Cast size={21} className="text-gray-700" />
            <div className="relative">
              <Bell size={21} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center font-bold">3</span>
            </div>
            <Search size={21} className="text-gray-700" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-[#f9f9f9]">

          {/* Hero Ad */}
          <div className="relative overflow-hidden bg-white" style={{ aspectRatio: '3/3.2' }}>
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#7b5e8e] via-[#c4876e] to-[#d4a574]" />
              <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                <path d="M0 150 L0 100 L15 100 L15 70 L25 70 L25 60 L30 55 L35 60 L35 70 L40 70 L40 80 L50 80 L50 65 L55 65 L55 55 L58 50 L60 45 L62 50 L65 55 L65 65 L70 65 L70 80 L80 80 L80 90 L100 90 L100 75 L105 75 L105 60 L110 55 L115 50 L120 55 L120 75 L130 75 L130 85 L150 85 L150 70 L155 70 L155 45 L160 40 L163 30 L166 40 L170 45 L170 70 L180 70 L180 80 L200 80 L200 65 L210 65 L210 50 L215 45 L220 42 L225 45 L225 65 L235 65 L235 75 L250 75 L250 60 L255 55 L260 50 L265 55 L265 75 L280 75 L280 85 L300 85 L300 70 L310 65 L315 60 L320 55 L325 60 L325 70 L330 75 L340 75 L340 80 L350 80 L350 90 L370 90 L370 100 L385 100 L385 110 L400 110 L400 150 Z" fill="rgba(0,0,0,0.12)"/>
              </svg>
              <svg className="absolute bottom-10 left-6" width="55" height="65" viewBox="0 0 55 65">
                <path d="M8 65 L8 28 C8 14, 22 5, 27 3 C32 5, 46 14, 46 28 L46 65" fill="rgba(200,180,140,0.35)" stroke="rgba(200,180,140,0.5)" strokeWidth="1"/>
                <circle cx="27" cy="7" r="3.5" fill="rgba(255,215,0,0.4)"/>
              </svg>
            </div>
            <div className="absolute top-5 left-0 right-0 text-center">
              <h2 className="text-[2.4rem] font-black text-white tracking-wide leading-none" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>TRAVEL LIGHT</h2>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
              <ShoeSneaker color="#1a1a1a" sole="#f5f0e8" className="w-60 h-auto drop-shadow-2xl" />
            </div>
            <div className="absolute bottom-14 left-3"><CurvedArrowUp /><span className="text-white text-[13px] font-bold tracking-wide leading-tight mt-1 block" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>SUITCASE<br/>FRIENDLY</span></div>
            <div className="absolute bottom-14 right-3 text-right"><CurvedArrowDown /><span className="text-white text-[13px] font-bold tracking-wide leading-tight mt-1 block" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>MACHINE<br/>WASHABLE</span></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 px-3 py-3 bg-white overflow-x-auto no-scrollbar">
            {thumbnails.map((t, i) => (
              <div key={i} className={`min-w-[88px] h-[88px] bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border-2 transition-all ${i === 2 ? 'border-gray-800 shadow-md' : 'border-gray-100'}`}>
                <ShoeByType type={t.type} color={t.color} sole={t.sole} className="w-16 h-auto" />
              </div>
            ))}
          </div>

          {/* Ad Metadata */}
          <div className="px-4 pb-2.5 bg-white">
            <div className="flex items-start gap-3">
              <span className="text-sm font-serif italic text-gray-800 mt-0.5 flex-shrink-0">allbirds</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">The Perfect Pair For Anywhere</h3>
                    <p className="text-[13px] text-gray-500 mt-0.5 leading-snug">Easy to pack, breezy to clean, our shoes are ready for whatever.</p>
                    <p className="text-xs text-gray-400 mt-1"><span className="font-semibold text-gray-500">Sponsored</span> · Allbirds</p>
                  </div>
                  <MoreVertical size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* CTAs — gray on load, black animates in */}
          <div className="flex gap-2.5 px-4 pb-4 bg-white">
            <button className="flex-1 bg-white text-gray-900 font-bold text-[15px] py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
              Shop now
            </button>
            <button onClick={() => setChatOpen(true)}
              className="flex-[1.3] text-white font-bold text-[15px] py-3 rounded-full animate-cta-load hover:opacity-90 transition-opacity shadow-lg shadow-black/10">
              Chat with AllBirds
            </button>
          </div>

          {/* Feed Separator */}
          <div className="h-2 bg-[#f2f2f2]" />

          {/* YouTube Video Feed */}
          {FEED_VIDEOS.map((vid, i) => (
            <div key={i} className="bg-white mb-2">
              <div className={`w-full ${vid.bgColor} relative`} style={{ aspectRatio: '16/9' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">{vid.icon}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">{vid.duration}</span>
              </div>
              <div className="flex gap-3 p-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-gray-900 leading-snug line-clamp-2">{vid.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{vid.channel} · {vid.views} · {vid.time}</p>
                </div>
                <MoreVertical size={18} className="text-gray-400 flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
          <div className="h-2" />
        </div>

        {/* Bottom Nav */}
        <div className="flex items-center justify-around py-1.5 pb-4 bg-[#212121] border-t border-white/5">
          <NavItem icon={<Home size={22} />} label="Home" active />
          <NavItem icon={<ShortsIcon size={22} />} label="Shorts" />
          <div className="flex flex-col items-center"><PlusCircle size={30} className="text-white" /></div>
          <NavItem icon={<PlaySquare size={22} />} label="Subscriptions" />
          <NavItem icon={<User size={22} />} label="You" />
        </div>

        <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false }) {
  return (
    <button className="flex flex-col items-center gap-0.5 min-w-[48px]">
      <span className={active ? 'text-white' : 'text-gray-400'}>{icon}</span>
      <span className={`text-[10px] ${active ? 'text-white font-medium' : 'text-gray-400'}`}>{label}</span>
    </button>
  )
}

export default App
