/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { 
  Search, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Share2, 
  Camera, 
  MapPin, 
  Mail, 
  Phone, 
  MessageSquare, 
  Plus, 
  Upload, 
  Bell, 
  Edit2, 
  Trash2, 
  Info,
  ExternalLink,
  Clock,
  Dumbbell,
  Lock,
  Unlock,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type View = 'home' | 'catalog' | 'inventory';

interface Product {
  id: string;
  code: string;
  name: string;
  price: string;
  image: string;
  challengeEligible?: boolean;
}

// --- Constants ---

const PRODUCTS: Product[] = [
  {
    id: '1',
    code: 'IA-DEN-001',
    name: 'Raw Edge Denim Jacket',
    price: '4,999',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArtYnWoYTUjUQ6EjvPQwX-MeTWUk9utrUkUiPCw-VHPERmvWIHqTeFSxdmxR3sWHjF_9_WYKHCB0J35LczeFQ5EY5uOP1_XOQRdgr5s8jAQxMPX5X0lWlGbj0fhHC1_o4f4pRqioCaNQcTh0aQufIGR3kJpFbTEFCxJZoeTCXaV2w2m8m6t6xJCdfNSzwojbbxTm1m4VmB6K1vTAMn_rfNxUx90dO4zb3-50vUeVBfU8e2TkMOcoNbU75ybT40RBI5uOnBIGPtPnPF',
    challengeEligible: true
  },
  {
    id: '2',
    code: 'IA-LIN-024',
    name: 'Architectural Linen Shirt',
    price: '3,250',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2a2NW6aC5YhUgV91owyP4npJKNWmjeC3U_C-ltK40VpyZmtFSLaTv8J5PzUszNDqc9vKlr9PwNVPJXuh4MiihjOGf4qKe65OfvrEEHhHoLOiPjZUxthiTFJMsJEgoqtAwOo2XldM9e7RI2nyj8DwJ2mxQgoPsINkgx7NkDNmeSA3V5bSEab-2j5BfW6ziVbKpfF_loGkrNGBLtjScXn0fl1XSWpzKKwbX2YEsPNsMfWw9Vwzko25rxtxbrnhD0uReFlChdYl7_jR7',
    challengeEligible: true
  },
  {
    id: '3',
    code: 'IA-TEE-008',
    name: 'Heavyweight Essential Tee',
    price: '1,850',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_hXCGSKKiBBi9l9pH4q9tuuFwo9JGajuFrfKYM92yAfsoQ0dv55RzGH6wnUw_A40ZzNRO3p6KbYe1QDrzlVP5ccMtBZYA-9iBRdFDgNqBFauf4vMYw9Pcr00LRZxfVjpy5HEj1PhvtesUuVRJyK_8Np0Zz2-2Cs9pi2PGb-logF0f8DiHNLEnRFslLK5C0SrKV3ao3o4ximSviHjxkehonchE-WY0wMQWJyWBcyRFKAUEBU--F5T10XemeTSigW5HKGVAOYnuDSmN',
    challengeEligible: true
  },
  {
    id: '4',
    code: 'IA-DEN-012',
    name: 'Wide-Leg Structured Denim',
    price: '4,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw7kMnp2SAjxehxK5Hzo_KBGob6_-blCrDalX6Sz9OGVtde1HH_1TUnBQX2lyvwlReqplxNBdjGAQdDppR7Z2Jy9epRd-YJm1lQtkJcDod9fvvLG8NuX9EgXiF32fK41JehnVFbHNdejHVnM3rr9-5OjPbUriPhFAzGA-VXVI9Su1uVWFGUpk11DcuYKUj5kAXwASDqCsn4mWzgSO_DfuSOH97itPmNqi1HGd6tm-KKG2LdYox26BKcyN1m5WSxUpcTsASL_9CAW6F',
    challengeEligible: true
  }
];

// --- Components ---

const Navbar = ({ currentView, setView, isOwner, onLogout }: { 
  currentView: View, 
  setView: (v: View) => void,
  isOwner: boolean,
  onLogout: () => void
}) => (
  <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
    <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12 py-6">
      <div className="flex items-center gap-12">
        <button onClick={() => setView('home')} className="flex flex-col items-center leading-none group">
          <span className="text-2xl font-light text-white/90 leading-none">∞</span>
          <span className="font-sans text-[10px] font-black tracking-[0.4em] uppercase text-white -mt-1">aura</span>
        </button>
        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => setView('home')}
            className={`text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-100 ${currentView === 'home' ? 'border-b border-white pb-1 text-white' : 'text-white/40'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setView('catalog')}
            className={`text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-100 ${currentView === 'catalog' ? 'border-b border-white pb-1 text-white' : 'text-white/40'}`}
          >
            Collections
          </button>
          <button 
            onClick={() => setView('inventory')}
            className={`text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-100 flex items-center gap-2 ${currentView === 'inventory' ? 'border-b border-white pb-1 text-white' : 'text-white/40'}`}
          >
            Inventory
            {!isOwner && <Lock className="w-3 h-3 opacity-50" />}
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex relative">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input 
            className="bg-transparent border-b border-transparent focus:border-white pl-6 pr-4 py-1 text-[10px] tracking-widest w-32 lg:w-48 transition-all uppercase placeholder-white/20 text-white" 
            placeholder="SEARCH..."
          />
        </div>
        <button className="hover:opacity-50 transition-all text-white">
          <ShoppingBag className="w-5 h-5 font-light" />
        </button>
        {isOwner && (
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <button className="relative hover:opacity-50 transition-all text-white">
              <Bell className="w-5 h-5 font-light" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#d1d1d1] rounded-full border border-black"></span>
            </button>
            <button 
              onClick={onLogout}
              className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-[#0a0a0a] py-20 px-6 lg:px-12 border-t border-white/5">
    <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-1 md:col-span-2">
        <div className="flex flex-col items-start leading-none mb-8">
          <span className="text-2xl font-light text-white/80 leading-none">∞</span>
          <span className="font-sans text-xs font-bold tracking-[0.3em] uppercase text-white -mt-1">Aura</span>
        </div>
        <p className="max-w-sm text-xs font-medium uppercase tracking-wider leading-loose text-white/40 mb-8">
          Minimalist fashion boutique. <br/>
          Crafted in Alappuzha, Kerala. <br/>
          T-Shirts | Denim | Linen | Thrift
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-white/60 hover:text-white transition-all"><Share2 className="w-5 h-5" /></a>
          <a href="#" className="text-white/60 hover:text-white transition-all"><Camera className="w-5 h-5" /></a>
        </div>
      </div>
      <div>
        <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white">Navigation</h5>
        <ul className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
          <li><a href="#" className="hover:text-white">New Arrivals</a></li>
          <li><a href="#" className="hover:text-white">Denim Series</a></li>
          <li><a href="#" className="hover:text-white">Linen Edit</a></li>
          <li><a href="#" className="hover:text-white">The Thrift Archive</a></li>
        </ul>
      </div>
      <div>
        <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white">Location</h5>
        <ul className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
          <li className="flex items-center gap-3">
            <MapPin className="w-4 h-4" />
            Alappuzha, Kerala
          </li>
          <li className="flex items-center gap-3">
            <Mail className="w-4 h-4" />
            studio@infiniteaura.com
          </li>
          <li className="flex items-center gap-3">
            <Phone className="w-4 h-4" />
            +91 98765 43210
          </li>
        </ul>
      </div>
    </div>
    <div className="mx-auto max-w-[1400px] mt-20 pt-10 border-t border-white/10 text-center text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
      © 2024 Infinite Aura. Designed & Made in Alappuzha.
    </div>
  </footer>
);

const ProductCard = ({ product }: { product: Product, key?: string }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group flex flex-col gap-5"
  >
    <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-[#141414]">
      <img 
        src={product.image} 
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 border border-white/20 bg-black/60 backdrop-blur-md px-2 py-1 text-[9px] font-bold tracking-widest text-[#d1d1d1] uppercase">
        {product.code}
      </div>
      {product.challengeEligible && (
        <div className="absolute bottom-4 right-4 bg-[#d1d1d1] text-black px-2 py-1 text-[8px] font-bold tracking-widest uppercase italic">
          Challenge Eligible
        </div>
      )}
    </div>
    <div className="flex flex-col gap-1">
      <h4 className="font-bold text-xs uppercase tracking-wider text-white/90">{product.name}</h4>
      <p className="text-[10px] text-white/40 tracking-widest">₹ {product.price}</p>
    </div>
    <button className="flex items-center justify-center gap-2 border border-white/10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all text-white">
      <MessageSquare className="w-3 h-3" />
      WhatsApp Inquiry
    </button>
  </motion.div>
);

// --- Screens ---

const HomeScreen = ({ setView }: { setView: (v: View) => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-24"
  >
    {/* Hero Section */}
    <section className="flex flex-col gap-12 py-16 lg:flex-row lg:items-center lg:py-24">
      <div className="flex flex-1 flex-col gap-8">
        <div className="inline-flex items-center gap-3 text-white/60 font-bold tracking-[0.3em] uppercase text-[10px]">
          <span className="h-px w-12 bg-white/40"></span>
          Alappuzha, Kerala
        </div>
        <h2 className="text-6xl font-serif font-light leading-[1] tracking-tight md:text-8xl italic text-white">
          Quiet <br/> <span className="font-sans font-bold not-italic uppercase tracking-tighter text-white/90">Luxury.</span>
        </h2>
        <p className="max-w-[480px] text-base text-white/50 leading-relaxed font-light">
          A boutique experience curated in the heart of Alappuzha. We redefine the essentials through a monochrome lens, focusing on structural denim, premium linen, and architectural basics.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={() => setView('catalog')}
            className="border border-[#d1d1d1] bg-[#d1d1d1] px-10 py-4 text-xs font-bold uppercase tracking-widest text-black hover:bg-transparent hover:text-[#d1d1d1] transition-all"
          >
            Shop Collection
          </button>
          <button className="border border-white/20 px-10 py-4 text-xs font-bold uppercase tracking-widest text-[#d1d1d1] hover:bg-[#d1d1d1] hover:text-black transition-all">
            Our Story
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#141414] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55S0ARtHqse0_G-TXfRR2ysMsbn4IhiZr0m9l5WgfVc22VgT6mSZ_tTyKawWCIFCZEdfRF6rnRlsbpd46VWMx2lGoO_Yvf5K0CDuZI-aEbF44r0WaniGSXsE6axHHZyVLNdivDetMmx3wXjbAREoTFg3i8SMlllpC5VtVivNglhHudkcKyG4uza-3R8--kbYzCt-Z48WGmRNrewx1H29k7dp2H9LRo7ieJgH3Z4umdsp8DSh8j-MW_EYWZmsVFb6LmATLEQOMMenv"
            alt="Minimalist Fashion"
            className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    {/* Latest Collection */}
    <section className="py-16 border-t border-white/20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h3 className="text-4xl font-bold tracking-tighter uppercase text-[#d1d1d1]">Latest Collection</h3>
          <p className="mt-4 text-white/40 uppercase tracking-widest text-[11px]">Selected Denim, Linen & Essentials</p>
        </div>
        <div className="flex gap-4">
          <button className="flex h-12 w-12 items-center justify-center border border-white/10 text-[#d1d1d1] hover:bg-[#d1d1d1] hover:text-black transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center border border-white/10 text-[#d1d1d1] hover:bg-[#d1d1d1] hover:text-black transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>

    {/* Challenge Banner */}
    <section className="py-12">
      <div className="bg-[#111111] text-white p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden border border-white/5">
        <div className="flex-1 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-3 text-white/40 font-semibold tracking-[0.2em] uppercase text-[10px]">
            <span className="h-px w-10 bg-white/20"></span>
            Community Event
          </div>
          <h2 className="text-5xl md:text-7xl font-serif italic">The Infinite <br/><span className="not-italic font-sans font-bold uppercase tracking-tighter">Challenge</span></h2>
          <div className="space-y-6 max-w-md">
            <div className="border-l-2 border-white/10 pl-6">
              <h4 className="text-2xl font-bold mb-1">30 Clean Pull-ups</h4>
              <p className="text-white/40 text-sm tracking-widest uppercase">= 1 Free Product</p>
            </div>
            <div className="border-l-2 border-white/10 pl-6">
              <h4 className="text-2xl font-bold mb-1">20 Clean Pull-ups</h4>
              <p className="text-white/40 text-sm tracking-widest uppercase">= 10% Discount</p>
            </div>
          </div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-white bg-white/5 inline-block px-4 py-2 border border-white/10">
            Note: Pull-ups must be clean and proper
          </p>
        </div>
        <div className="flex-1 w-full lg:w-auto h-full relative z-10">
          <div className="relative aspect-square md:aspect-video lg:aspect-[4/5] overflow-hidden border border-white/10 group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2a2NW6aC5YhUgV91owyP4npJKNWmjeC3U_C-ltK40VpyZmtFSLaTv8J5PzUszNDqc9vKlr9PwNVPJXuh4MiihjOGf4qKe65OfvrEEHhHoLOiPjZUxthiTFJMsJEgoqtAwOo2XldM9e7RI2nyj8DwJ2mxQgoPsINkgx7NkDNmeSA3V5bSEab-2j5BfW6ziVbKpfF_loGkrNGBLtjScXn0fl1XSWpzKKwbX2YEsPNsMfWw9Vwzko25rxtxbrnhD0uReFlChdYl7_jR7"
              alt="Challenge"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-50 group-hover:brightness-75 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Dumbbell className="w-16 h-16 font-thin mb-4 mx-auto text-white/80" />
                <p className="font-sans lowercase text-sm tracking-widest">Available In-Store Only</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
          <Dumbbell className="w-[400px] h-[400px]" />
        </div>
      </div>
    </section>

    {/* Atelier Section */}
    <section className="py-24">
      <div className="border border-white/10 bg-[#0d0d0d] p-12 lg:p-20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <h3 className="text-xs font-bold tracking-[0.4em] uppercase mb-8 border-b border-white/20 pb-4 inline-block text-white">The Alappuzha Atelier</h3>
          <p className="text-2xl lg:text-3xl font-light leading-snug mb-10 text-white/80">
            Infinite Aura is a reflection of Kerala's soul. Rooted in the historic heritage of Alappuzha, our boutique merges the fluid grace of coastal textures with sharp, minimalist denim and linen silhouettes. Each piece is an inquiry into elegance.
          </p>
          <button className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest group text-white">
            Explore Our Roots
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-white">
          <span className="text-[400px] font-light leading-none">∞</span>
        </div>
      </div>
    </section>
  </motion.div>
);

const CatalogScreen = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="py-12"
  >
    <div className="flex flex-col mb-16">
      <h2 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-none text-white">Catalog</h2>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Alappuzha, Kerala — Edition 2024
        </p>
        <div className="flex gap-8 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button className="text-[10px] font-bold uppercase tracking-widest border-b-2 border-white text-white">All pieces</button>
          <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">New</button>
          <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">Challenge Eligible</button>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-10">
      {/* Repeating products for catalog feel */}
      {[...PRODUCTS, ...PRODUCTS].map((product, idx) => (
        <ProductCard key={`${product.id}-${idx}`} product={product} />
      ))}
    </div>
    <div className="flex items-center justify-center gap-12 mt-32 py-10 border-t border-white/10">
      <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-opacity">Previous</button>
      <div className="flex gap-4">
        <span className="text-[10px] font-black tracking-widest px-2 underline decoration-2 underline-offset-4 text-white">01</span>
        <span className="text-[10px] font-black tracking-widest px-2 text-white/20">02</span>
        <span className="text-[10px] font-black tracking-widest px-2 text-white/20">03</span>
      </div>
      <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-opacity">Next</button>
    </div>
  </motion.div>
);

const InventoryScreen = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="py-12 max-w-[1400px] mx-auto w-full"
  >
    <div className="mb-16 border-l-2 border-white pl-6">
      <h2 className="text-4xl font-light tracking-tight mb-2 text-white">Owner Product Upload</h2>
      <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">Alappuzha Studio • Inventory Management</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2 space-y-12">
        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-10 pb-4 border-b border-white/5 flex items-center gap-3 text-white">
            <Plus className="w-4 h-4" />
            New Entry
          </h3>
          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Product Name</label>
                <input className="w-full border-0 border-b border-white/10 p-0 pb-2 text-sm focus:ring-0 focus:border-white transition-colors bg-transparent text-white" placeholder="e.g. Kerala Handloom White Shirt" type="text"/>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Product Code</label>
                <input className="w-full border-0 border-b border-white/10 p-0 pb-2 text-sm focus:ring-0 focus:border-white transition-colors bg-transparent text-white" placeholder="IA-KRL-001" type="text"/>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Description</label>
              <textarea className="w-full border-0 border-b border-white/10 p-0 pb-2 text-sm focus:ring-0 focus:border-white transition-colors min-h-[80px] resize-none bg-transparent text-white" placeholder="Detailed product craftsmanship description..." rows={3}></textarea>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Visual Media</label>
              <div className="border border-dashed border-white/10 py-16 flex flex-col items-center justify-center hover:border-white/40 transition-colors cursor-pointer group bg-white/5">
                <Upload className="w-8 h-8 text-white/20 group-hover:text-white mb-4 transition-colors" />
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Select Image or Drag & Drop</p>
              </div>
            </div>
            <div className="flex justify-end gap-6 pt-6">
              <button className="text-[10px] font-bold uppercase tracking-widest border border-white/10 px-8 py-3 hover:bg-[#d1d1d1] hover:text-black transition-all text-[#d1d1d1]" type="button">Draft</button>
              <button className="text-[10px] font-bold uppercase tracking-widest bg-[#d1d1d1] text-black px-10 py-3 hover:opacity-80 transition-all flex items-center gap-2" type="submit">
                <Upload className="w-3 h-3" />
                Publish
              </button>
            </div>
          </form>
        </section>
      </div>
      <div className="lg:col-span-1">
        <section className="sticky top-32">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Recent Uploads</h3>
            <button className="text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">See All</button>
          </div>
          <div className="space-y-6">
            {PRODUCTS.slice(0, 3).map(product => (
              <div key={product.id} className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-white/5 overflow-hidden flex-shrink-0 grayscale border border-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest truncate text-white/90">{product.name}</p>
                  <p className="text-[10px] text-white/40 tracking-tighter">{product.code}</p>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-white/40 hover:text-white"><Edit2 className="w-3 h-3" /></button>
                  <button className="text-white/40 hover:text-white"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 border border-white/5 bg-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-3 h-3 text-white" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Guidelines</p>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed tracking-wide">
              All assets must adhere to the monochrome aesthetic. High contrast, studio lighting, and minimal composition preferred for Alappuzha HQ archives.
            </p>
          </div>
        </section>
      </div>
    </div>
  </motion.div>
);

const LoginModal = ({ onLogin, onCancel }: { onLogin: () => void, onCancel: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a server-side check
    if (password === 'AURASTUDIO2024') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-[#111111] border border-white/10 p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-full bg-[#d1d1d1]"
          />
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-white/20 rounded-full mb-6">
            <Lock className="w-6 h-6 text-[#d1d1d1]" />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter mb-2 text-[#d1d1d1]">Atelier Access</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Owner Authentication Required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Studio Password</label>
            <input 
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border-0 border-b ${error ? 'border-red-500' : 'border-white/10'} focus:border-white p-0 pb-2 text-center text-lg tracking-[0.5em] transition-colors bg-transparent focus:ring-0 text-white`}
              placeholder="••••••••"
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[9px] font-bold uppercase tracking-widest text-red-500 text-center"
              >
                Invalid Studio Credentials
              </motion.p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <button 
              type="submit"
              className="w-full bg-[#d1d1d1] text-black py-4 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all flex items-center justify-center gap-3"
            >
              <Unlock className="w-4 h-4" />
              Verify Identity
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-[#d1d1d1] transition-all"
            >
              Return to Storefront
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 leading-loose">
            Infinite Aura Studio Management System <br/>
            Alappuzha HQ • Secure Terminal
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleViewChange = (newView: View) => {
    if (newView === 'inventory' && !isOwner) {
      setShowLogin(true);
    } else {
      setView(newView);
    }
  };

  const handleLogin = () => {
    setIsOwner(true);
    setShowLogin(false);
    setView('inventory');
  };

  const handleLogout = () => {
    setIsOwner(false);
    setView('home');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-white selection:text-black bg-[#0a0a0a]">
      <Navbar 
        currentView={view} 
        setView={handleViewChange} 
        isOwner={isOwner}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <AnimatePresence mode="wait">
          {view === 'home' && <HomeScreen key="home" setView={handleViewChange} />}
          {view === 'catalog' && <CatalogScreen key="catalog" />}
          {view === 'inventory' && isOwner && <InventoryScreen key="inventory" />}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showLogin && (
          <LoginModal 
            onLogin={handleLogin} 
            onCancel={() => setShowLogin(false)} 
          />
        )}
      </AnimatePresence>

      <Footer />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] flex h-16 w-16 items-center justify-center bg-[#d1d1d1] text-black hover:bg-[#b0b0b0] transition-all duration-300 shadow-2xl"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[#d1d1d1] text-[9px] font-bold border border-white/20">1</span>
      </a>
    </div>
  );
}
