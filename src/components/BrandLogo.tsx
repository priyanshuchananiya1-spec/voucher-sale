import React from 'react';

interface BrandLogoProps {
  logoType: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  logoType,
  name,
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const containerClass = `relative inline-flex items-center justify-center shrink-0 rounded-xl overflow-hidden font-bold select-none shadow-sm ${sizeMap[size]} ${className}`;

  switch (logoType) {
    case 'free-fire-india':
      return (
        <div className={`${containerClass} bg-gradient-to-b from-[#FF9933] via-white to-[#138808] p-0.5 border border-amber-300 shadow-md`}>
          <div className="w-full h-full bg-slate-950 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
            {/* Tiranga strip top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600" />
            <div className="text-[10px] font-black text-amber-400 tracking-tighter leading-none">FF</div>
            <div className="text-[8px] font-bold text-white tracking-widest leading-none mt-0.5">INDIA</div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 border border-white mt-0.5 animate-pulse" />
          </div>
        </div>
      );

    case 'free-fire-max':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-amber-400 via-orange-600 to-amber-900 p-0.5 shadow-md`}>
          <div className="w-full h-full bg-black rounded-lg flex flex-col items-center justify-center text-amber-400">
            <span className="text-[10px] font-black tracking-tighter leading-none text-yellow-400">MAX</span>
            <div className="flex items-center gap-0.5 mt-0.5">
              <span className="text-[8px] font-extrabold text-white">FF</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 inline-block" />
            </div>
          </div>
        </div>
      );

    case 'flipkart':
      return (
        <div className={`${containerClass} bg-[#2874F0]`}>
          <div className="flex items-center justify-center">
            <span className="text-white font-black italic tracking-tighter text-sm">f</span>
            <span className="w-1.5 h-1.5 bg-[#FFE500] rounded-full ml-0.5 -mt-2"></span>
          </div>
        </div>
      );

    case 'apple':
      return (
        <div className={`${containerClass} bg-slate-900 text-white`}>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.94-12-14.58-6.17-9.5-11-20.35-14.49-32.55-3.48-12.2-5.22-23.95-5.22-35.25 0-16.14 4.35-29.35 13.06-39.63 8.71-10.28 19.33-15.54 31.86-15.78 4.7 0 10.02 1.34 15.96 4.02 5.94 2.68 9.77 4.06 11.5 4.14 1.45 0 5.23-1.45 11.34-4.35 6.11-2.9 11.66-4.14 16.65-3.72 12.83.65 23.36 5.56 31.6 14.74-11.33 6.84-16.82 16.29-16.48 28.36.35 9.74 4.2 17.75 11.56 24.03 7.36 6.28 15.94 9.94 25.74 10.98-2.3 7.15-5.22 14.36-8.76 21.63zM119.22 31.85c0-7.74 2.76-14.93 8.28-21.57 5.52-6.64 12.35-10.74 20.48-12.28.23 1.16.35 2.21.35 3.17 0 7.74-2.88 15.15-8.63 22.23-5.75 7.08-12.63 11.19-20.65 12.33-.11-1.3-.17-2.6-.17-3.88z" />
          </svg>
        </div>
      );

    case 'blinkit':
      return (
        <div className={`${containerClass} bg-[#F8CB46] text-black`}>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black tracking-tight leading-none text-slate-900">blink</span>
            <span className="text-[10px] font-black leading-none text-[#0C831F]">it</span>
          </div>
        </div>
      );

    case 'amazon':
      return (
        <div className={`${containerClass} bg-[#232F3E] text-white p-1`}>
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-black tracking-tight -mb-1">a</span>
            {/* Smile curved arrow */}
            <svg className="w-5 h-2 text-[#FF9900]" viewBox="0 0 24 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M2 3c7 6 13 6 20 0" />
            </svg>
          </div>
        </div>
      );

    case 'swiggy':
      return (
        <div className={`${containerClass} bg-[#FC8019] text-white`}>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
      );

    case 'zomato':
      return (
        <div className={`${containerClass} bg-[#E23744] text-white`}>
          <span className="text-[11px] font-black italic tracking-tighter">zomato</span>
        </div>
      );

    case 'dominos':
      return (
        <div className={`${containerClass} bg-[#006491] text-white`}>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-[#E31837] rounded-sm rotate-45 border border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>
      );

    case 'google-play':
      return (
        <div className={`${containerClass} bg-slate-900`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M3.6 1.8l10.8 10.2-2.4 2.4L3.6 1.8z" />
            <path fill="#34A853" d="M14.4 12l2.4 2.4-13.2 7.8 10.8-10.2z" />
            <path fill="#FBBC05" d="M20.4 10.2L16.8 8.4 14.4 12l2.4 2.4 3.6-1.8c.8-.5.8-1.9 0-2.4z" />
            <path fill="#EA4335" d="M3.6 1.8l13.2 6.6-2.4 3.6-10.8-10.2z" />
          </svg>
        </div>
      );

    case 'netflix':
      return (
        <div className={`${containerClass} bg-black`}>
          <span className="text-red-600 font-black text-lg tracking-tighter">N</span>
        </div>
      );

    case 'spotify':
      return (
        <div className={`${containerClass} bg-[#1DB954] text-black`}>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.792-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.496 9.721 1.114.294.18.387.562.207.856zm1.224-2.72c-.226.367-.706.482-1.072.257-2.687-1.652-6.785-2.131-9.965-1.166-.413.127-.848-.106-.973-.517-.125-.413.108-.848.52-.973 3.632-1.102 8.147-.568 11.233 1.328.366.226.481.707.257 1.071zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.493.15-1.016-.128-1.166-.62-.149-.494.13-1.017.622-1.167 3.532-1.073 9.404-.866 13.115 1.338.445.264.59.838.327 1.282-.264.443-.838.59-1.28.326z" />
          </svg>
        </div>
      );

    case 'croma':
      return (
        <div className={`${containerClass} bg-[#00897B] text-white`}>
          <span className="text-[10px] font-black tracking-tight">croma</span>
        </div>
      );

    case 'tanishq':
      return (
        <div className={`${containerClass} bg-[#831843] text-amber-200 border border-amber-300/30`}>
          <span className="text-base font-serif font-black">T</span>
        </div>
      );

    case 'uber':
      return (
        <div className={`${containerClass} bg-black text-white`}>
          <span className="text-xs font-bold tracking-tight">Uber</span>
        </div>
      );

    case 'steam':
      return (
        <div className={`${containerClass} bg-[#171a21] text-sky-400`}>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 0 0-10 10c0 4.7 3.2 8.6 7.6 9.7l2.8-4.1a3 3 0 0 1-.4-.6l-3.8 1.5a4 4 0 0 1-.2-1.5c0-2.2 1.8-4 4-4 .3 0 .7 0 1 .1l2.5-3.6a5 5 0 0 1 8.5-1.5 5 5 0 0 1-5 8.5l-3.6 2.5c.1.3.1.7.1 1 0 2.2-1.8 4-4 4a4 4 0 0 1-2.9-1.3l-4.1 1.7A10 10 0 1 0 12 2z" />
          </svg>
        </div>
      );

    default: {
      // Deterministic initials & colors
      const words = name.split(' ');
      const initials = words.length > 1
        ? `${words[0][0]}${words[1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();

      const bgPalette = [
        'bg-blue-600',
        'bg-indigo-600',
        'bg-emerald-600',
        'bg-rose-600',
        'bg-amber-600',
        'bg-cyan-600',
        'bg-purple-600',
        'bg-teal-600',
        'bg-slate-800'
      ];
      const charCode = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
      const chosenBg = bgPalette[charCode % bgPalette.length];

      return (
        <div className={`${containerClass} ${chosenBg} text-white`}>
          <span>{initials}</span>
        </div>
      );
    }
  }
};
