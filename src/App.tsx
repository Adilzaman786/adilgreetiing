/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Moon, Star, Heart, Sparkles, Share2, Twitter, Facebook, Mail, Copy, Check, Send, X, ChevronDown, Instagram, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDuaOpen, setIsDuaOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typing Effect State
  const phrases = ["Eid Mubarak", "Eid-ul-Adha", "Eid Greetings"];
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentFullPhrase = phrases[phraseIndex];
      
      if (!isDeleting) {
        setDisplayText(currentFullPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(150);

        if (displayText === currentFullPhrase) {
          setTypingSpeed(2500); // Pause at full text
          setIsDeleting(true);
        }
      } else {
        setDisplayText(currentFullPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(75);

        if (displayText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(500);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, typingSpeed]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2026-05-27T00:00:00").getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const shareUrl = "https://adilgreeting.netlify.app";
  const shareText = "Wishing you a very Happy Eid-ul-Adha! Check out this special greeting from Adil Zaman.";

  const fullDua = {
    arabic: "تَقَبَّلَ اللهُ مِنَّا وَمِنْكُمْ",
    urdu: "اللہ تعالی آپ کی اور ہماری تمام عبادات، دعاؤں اور قربانیوں کو اپنی بارگاہِ الہی میں قبول و منظور فرمائے۔ اس مبارک عید کے موقع پر اللہ رب العزت آپ کے گھر کو خوشیوں، برکتوں، سکون اور سلامتی کے نور سے منور کر دے۔ دعا ہے کہ ہر قربانی آپ کی زندگی میں تزکیہ نفس اور خالقِ حقیقی سے قربت کا ذریعہ بنے۔ عید الاضحیٰ کی یہ گھڑیاں آپ کے اور آپ کے پیاروں کے لیے دائمی مسرتوں، کامیابیوں اور خوشحالی کا پیغام ثابت ہوں۔ آمین بجاہ النبی الامین۔",
    english: "May Allah accept your good deeds, prayers, and sacrifices. On this blessed Eid, may the Almighty fill your home with joy, blessings, peace, and light. May every sacrifice bring you closer to the Creator and serve as a means of purification. Wishing you and your loved ones eternal happiness, success, and prosperity on this Eid-ul-Adha. Ameen."
  };

  const shareOptions = [
    { 
      name: "WhatsApp", 
      icon: Send, 
      color: "hover:bg-green-500", 
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}` 
    },
    { 
      name: "Twitter", 
      icon: Twitter, 
      color: "hover:bg-sky-500", 
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` 
    },
    { 
      name: "Facebook", 
      icon: Facebook, 
      color: "hover:bg-blue-600", 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` 
    },
    { 
      name: "Email", 
      icon: Mail, 
      color: "hover:bg-red-500", 
      url: `mailto:?subject=Eid Mubarak!&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}` 
    },
  ];

  const handleCloseDua = () => {
    setIsDuaOpen(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const flourishVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a smooth "flourish"
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden ornament-bg selection:bg-eid-gold selection:text-eid-green">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-eid-gold/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-eid-gold/10 blur-[120px] rounded-full" />

      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl w-full"
        >
          {/* Icons */}
          <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Moon className="w-12 h-12 text-eid-gold" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Star className="w-8 h-8 text-eid-gold fill-eid-gold" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Urdu Heading */}
          <motion.h2 
            variants={flourishVariants}
            className="font-urdu text-4xl md:text-6xl text-eid-gold mb-4 leading-relaxed tracking-wider drop-shadow-lg"
          >
            عید الاضحیٰ مبارک
          </motion.h2>

          {/* Main Title with Typing Effect */}
          <motion.h1 
            variants={flourishVariants}
            className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 gold-gradient tracking-tight font-light italic min-h-[1.5em] flex items-center justify-center whitespace-nowrap overflow-hidden"
          >
            {displayText}
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block w-[4px] h-[0.8em] bg-eid-gold ml-2 align-middle"
            />
          </motion.h1>

          {/* Countdown Timer */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-3 md:gap-6 justify-center mb-10 overflow-x-auto no-scrollbar py-2"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[70px] md:min-w-[90px]">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-eid-gold/5 border border-eid-gold/20 flex items-center justify-center mb-3 shadow-[0_10px_30px_rgba(212,175,55,0.05)] backdrop-blur-sm group hover:border-eid-gold/40 transition-colors">
                  <span className="text-xl md:text-2xl font-serif text-eid-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-eid-gold/50 font-bold">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="font-urdu text-xl md:text-2xl text-eid-gold/80 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            آپ کو اور آپ کے اہل خانہ کو اللہ کی رحمتوں، خوشیوں اور امن سے بھری عید الاضحیٰ مبارک ہو۔ دعا ہے کہ یہ قربانی آپ کو خالقِ حقیقی کے مزید قریب کر دے۔
          </motion.p>

          {/* Personalized Message Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="premium-card rounded-[2.5rem] p-10 md:p-16 mb-16 relative overflow-hidden group border border-eid-gold/10 hover:border-eid-gold/30 hover:shadow-[0_30px_70px_rgba(212,175,55,0.2)] transition-all duration-500"
          >
            {/* Animated internal background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-eid-gold/0 via-eid-gold/[0.02] to-eid-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-eid-gold/40 to-transparent group-hover:via-eid-gold transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-eid-gold/40 to-transparent group-hover:via-eid-gold transition-all duration-500" />
            
            <p className="text-3xl md:text-5xl font-urdu text-white/90 mb-12 leading-relaxed drop-shadow-sm">
              "قربانی محبت اور عقیدت کا عظیم ترین عمل ہے"
            </p>
            
            <div 
              onClick={() => setIsDuaOpen(true)}
              className="flex flex-col items-center group/name relative cursor-pointer active:scale-95 transition-transform"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-eid-gold/40 mb-3 group-hover/name:text-eid-gold/60 transition-colors">Message from</span>
              
              <div className="relative">
                <div className="absolute inset-0 bg-eid-gold/10 blur-2xl rounded-full opacity-60 pointer-events-none" />
                
                {/* Clickable Arrow Hint (Side Arrows pointing towards name) */}
                <motion.div 
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 text-eid-gold/60 hidden sm:block"
                >
                  <ChevronRight size={24} className="drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                </motion.div>

                <motion.div 
                  animate={{ x: [5, -5, 5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 text-eid-gold/60 hidden sm:block"
                >
                  <ChevronLeft size={24} className="drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                </motion.div>

                {/* Mobile Top Hint */}
                <motion.div 
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 text-eid-gold/50 sm:hidden"
                >
                  <ChevronDown size={20} />
                </motion.div>

                <h3 className="text-4xl md:text-5xl font-serif glow-text text-eid-gold font-medium relative z-10 transition-transform duration-300">
                  Adil Zaman
                </h3>
                
                {/* Modern Dua Button */}
                <div className="mt-8 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-eid-gold/30 bg-eid-gold/5 text-eid-gold text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-eid-gold/10 transition-all duration-300 shadow-[0_5px_20px_rgba(212,175,55,0.1)] group/btn cursor-pointer"
                  >
                    <span>Special Message</span>
                    <Heart size={10} className="group-hover/btn:fill-eid-gold transition-colors animate-pulse" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Share Button */}
          <motion.div variants={itemVariants} className="mb-16 flex justify-center">
            <button
              onClick={() => setIsShareOpen(true)}
              className="gold-btn-gradient flex items-center justify-center gap-3 px-10 py-5 text-eid-green rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.6)] group cursor-pointer border border-eid-gold-light/30 min-w-[280px]"
            >
              <Share2 size={20} className="group-hover:rotate-12 transition-transform duration-500" />
              <span>Spread the Joy</span>
            </button>
          </motion.div>

          {/* Decorative Footer */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-6 mb-8"
          >
            <div className="flex items-center justify-center gap-6 text-eid-gold/40">
              <div className="h-[1px] w-16 bg-eid-gold/20" />
              <Heart size={16} />
              <div className="h-[1px] w-16 bg-eid-gold/20" />
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-6 mt-2">
              <a 
                href="https://web.facebook.com/adilagral786" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-eid-gold/5 border border-eid-gold/20 text-eid-gold/60 hover:text-eid-gold hover:bg-eid-gold/10 hover:border-eid-gold/40 transition-all duration-300 transform hover:scale-110 shadow-[0_5px_15px_rgba(212,175,55,0.05)]"
                title="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/adilagral" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-eid-gold/5 border border-eid-gold/20 text-eid-gold/60 hover:text-eid-gold hover:bg-eid-gold/10 hover:border-eid-gold/40 transition-all duration-300 transform hover:scale-110 shadow-[0_5px_15px_rgba(212,175,55,0.05)]"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.tiktok.com/@adilagral786" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-eid-gold/5 border border-eid-gold/20 text-eid-gold/60 hover:text-eid-gold hover:bg-eid-gold/10 hover:border-eid-gold/40 transition-all duration-300 transform hover:scale-110 shadow-[0_5px_15px_rgba(212,175,55,0.05)]"
                title="TikTok"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  width="18" 
                  height="18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
            
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-eid-gold/60 flex items-center">
              Made with <Heart size={10} className="mx-1.5 fill-eid-gold/40 text-eid-gold animate-pulse" /> by <span className="text-eid-gold ml-1 drop-shadow-sm">Adil Zaman</span>
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Enhanced Particle System (Star Rain) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute text-eid-gold/20"
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: "-10vh",
              opacity: 0,
              scale: Math.random() * 0.4 + 0.3
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: [`${Math.random() * 100}vw`, `${(Math.random() * 20 - 10) + 50}vw`], // Slight diagonal drift
              opacity: [0, 0.7, 0.7, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 25,
              repeat: Infinity,
              delay: Math.random() * -50,
              ease: "linear"
            }}
          >
            {i % 4 === 0 ? (
              <Moon size={16 + Math.random() * 20} fill="currentColor" className="opacity-30" />
            ) : (
              <Star size={10 + Math.random() * 15} fill="currentColor" className="opacity-50" />
            )}
          </motion.div>
        ))}

        {/* Shimmering Glints */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`glint-${i}`}
            className="absolute text-white/40"
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: `${Math.random() * 100}vh`,
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          >
            <Sparkles size={8 + Math.random() * 12} />
          </motion.div>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-eid-gold/30 to-transparent" />

      {/* Share Dialog Overlay */}
      <AnimatePresence>
        {isShareOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-eid-green border border-eid-gold/30 rounded-3xl p-8 z-[101] shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-2xl font-serif text-eid-gold mb-1 italic">Spread the Joy</h4>
                  <p className="text-sm text-eid-gold/60">Share this Eid blessing with your loved ones.</p>
                </div>
                <button 
                  onClick={() => setIsShareOpen(false)}
                  className="p-2 text-eid-gold/40 hover:text-eid-gold transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300 ${option.color} group`}
                  >
                    <option.icon className="w-6 h-6 text-eid-gold group-hover:text-white transition-colors" />
                    <span className="text-xs uppercase tracking-widest text-eid-gold/80 group-hover:text-white transition-colors">
                      {option.name}
                    </span>
                  </a>
                ))}
              </div>

              <div className="relative group/copy">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-black/20 border border-eid-gold/20 rounded-xl px-4 py-3 text-sm text-eid-gold/70 outline-none focus:border-eid-gold/40 transition-colors"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-eid-gold text-eid-green rounded-lg text-xs font-bold hover:bg-white transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "COPIED" : "COPY LINK"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full Dua Modal */}
      <AnimatePresence>
        {isDuaOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDua}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-2xl premium-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 z-[111] overflow-hidden group shadow-[0_0_100px_rgba(212,175,55,0.2)] max-h-[90vh] flex flex-col"
            >
              <div className="overflow-y-auto no-scrollbar flex-grow py-4 px-2">
                {/* Decorative Corner Ornaments */}
                <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 opacity-10 pointer-events-none">
                  <Moon className="w-full h-full text-eid-gold -rotate-45 -translate-x-4 -translate-y-4 md:-translate-x-8 md:-translate-y-8" />
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-10 pointer-events-none">
                  <Star className="w-full h-full text-eid-gold rotate-45 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8" />
                </div>

                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    className="mb-6 md:mb-8"
                  >
                    <div className="p-3 md:p-4 rounded-full bg-eid-gold/10 border border-eid-gold/20">
                      <Heart className="w-8 h-8 md:w-10 md:h-10 text-eid-gold fill-eid-gold/20" />
                    </div>
                  </motion.div>

                  <motion.h4 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-serif text-eid-gold text-base md:text-xl uppercase tracking-[0.4em] mb-2"
                  >
                    ایک خاص دعا آپ کے لیے
                  </motion.h4>

                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="font-urdu text-lg md:text-xl text-eid-gold mb-8 italic"
                  >
                    عادل زمان کی طرف سے
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 md:mt-4 space-y-6"
                  >
                    <p className="font-urdu text-3xl md:text-5xl text-eid-gold leading-normal tracking-wide drop-shadow-md pb-4">
                      {fullDua.arabic}
                    </p>
                    <div className="h-[1px] w-12 bg-eid-gold/20 mx-auto" />
                    <p className="font-urdu text-2xl md:text-4xl text-eid-gold leading-[2.5] md:leading-[2.8] drop-shadow-md pb-4">
                      {fullDua.urdu}
                    </p>
                  </motion.div>
                </div>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={handleCloseDua}
                className="mt-6 md:mt-8 px-8 md:px-10 py-3 border border-eid-gold/30 text-eid-gold rounded-full hover:bg-eid-gold hover:text-eid-green transition-all duration-300 font-medium uppercase tracking-widest text-[10px] md:text-xs cursor-pointer flex-shrink-0"
              >
                Close Greeting
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Thank You Notification */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            className="fixed bottom-12 left-1/2 z-[200] px-8 py-4 bg-eid-gold shadow-[0_20px_50px_rgba(212,175,55,0.4)] rounded-full flex items-center gap-3 border border-white/20"
          >
            <div className="bg-eid-green rounded-full p-1.5">
              <Heart size={16} className="text-eid-gold fill-eid-gold" />
            </div>
            <span className="text-eid-green font-bold text-sm tracking-tight whitespace-nowrap">
              Thank you for sharing the joy!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
