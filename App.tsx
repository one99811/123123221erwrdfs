import React, { useState, useEffect, useRef } from 'react';
import { OneLogo } from './component/Logo';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { REVENUE_DATA, TEAM_MEMBERS } from './constants';
import { ArrowUp, ArrowDown, Quote, Building2, Factory, Users, ArrowRight, Footprints, Trophy, Zap, ShoppingBag, Linkedin, Mail, Bot, Leaf, ChevronDown } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";

// --- HOOKS & UTILS ---

const useOnScreen = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
          // Only set true, don't toggle back to false to keep it visible once seen
          if (entry.isIntersecting) {
            setIntersecting(true);
          }
      },
      { threshold: 0.1 } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
};

// --- SHARED COMPONENTS ---

const SlideWrapper = ({ children, className = "", id = "" }: { children?: React.ReactNode, className?: string, id?: string }) => {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <section 
        id={id} 
        ref={ref} 
        // Removed overflow-hidden to allow scrolling on mobile if content exceeds screen height
        className={`w-full min-h-screen flex flex-col items-center justify-center relative snap-start snap-always ${className}`}
    >
        <div className={`w-full h-full flex-grow flex flex-col items-center justify-center transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    </section>
  );
};

const Navigation = () => {
    const sections = [
        { id: 'hero', label: 'Home' },
        { id: 'purpose', label: 'Purpose' },
        { id: 'problem', label: 'Problem' },
        { id: 'platform', label: 'Platform' },
        { id: 'solution', label: 'Solution' },
        { id: 'benefits', label: 'Benefits' },
        { id: 'whynow', label: 'Why Now?' },
        { id: 'patent', label: 'Patents' },
        { id: 'business-model', label: 'Business Model' },
        { id: 'market-size', label: 'Market Opportunity' },
        { id: 'financials', label: 'Financials' },
        { id: 'team', label: 'Team' },
        { id: 'contact', label: 'Contact' }
    ];

    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="hidden md:flex fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-6">
            {sections.map((section) => (
                <a 
                    key={section.id} 
                    href={`#${section.id}`} 
                    className="group relative flex items-center justify-end"
                    aria-label={section.label}
                >
                    <span className={`absolute right-6 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap`}>
                        {section.label}
                    </span>
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 border border-brand-dark ${activeSection === section.id ? 'bg-brand-red border-brand-red scale-125' : 'bg-transparent hover:bg-gray-300'}`} />
                </a>
            ))}
        </div>
    )
}

const FloatingContactBtn = () => {
    return (
        <a 
            href="mailto:max@one-ai.fashion"
            className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-4 py-2 md:px-5 md:py-3 rounded-full shadow-lg hover:bg-brand-red transition-all duration-300 hover:scale-105 group"
        >
            <Mail size={18} className="group-hover:rotate-12 transition-transform"/>
            <span className="font-bold text-xs md:text-sm tracking-wide">Get in Touch</span>
        </a>
    )
}

const CycleArrows = ({ color = "currentColor" }: { color?: string }) => (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow">
        <defs>
             <marker id={`arrow-${color.replace('#','')}`} markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill={color} />
             </marker>
        </defs>
        {/* Three arcs forming a circle */}
        <path d="M 100 20 A 80 80 0 0 1 170 60" fill="none" stroke={color} strokeWidth="2" markerEnd={`url(#arrow-${color.replace('#','')})`} />
        <path d="M 180 100 A 80 80 0 0 1 140 170" fill="none" stroke={color} strokeWidth="2" markerEnd={`url(#arrow-${color.replace('#','')})`} />
        <path d="M 100 180 A 80 80 0 0 1 30 140" fill="none" stroke={color} strokeWidth="2" markerEnd={`url(#arrow-${color.replace('#','')})`} />
        <path d="M 20 100 A 80 80 0 0 1 60 30" fill="none" stroke={color} strokeWidth="2" markerEnd={`url(#arrow-${color.replace('#','')})`} />
    </svg>
)

// --- SLIDE COMPONENTS ---

const HeroSlide = () => (
  <SlideWrapper id="hero" className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white to-gray-50 p-6 md:p-16">
    <div className="flex flex-col items-center justify-center space-y-12 relative w-full h-full">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-5xl">
          {/* Logo container */}
          <div className="w-full mb-8 md:mb-12 px-4 md:px-12 animate-float">
             <OneLogo className="w-full h-auto text-brand-red drop-shadow-sm" />
          </div>
          <h1 className="text-3xl md:text-6xl font-sans tracking-wide text-center mt-4 text-brand-dark">
            SELFWEAR™ for every <span className="font-bold">ONE</span>
          </h1>
          <div className="mt-12 animate-bounce">
              <ChevronDown className="w-8 h-8 text-gray-400" />
          </div>
      </div>
    </div>
  </SlideWrapper>
);

const QuoteSlide = () => (
  <SlideWrapper id="purpose" className="bg-white p-6 md:p-16">
    <div className="max-w-4xl w-full flex flex-col gap-4 md:gap-8">
      <Quote className="w-10 h-10 md:w-16 md:h-16 fill-brand-dark rotate-180 mb-4 opacity-20" />
      <h2 className="text-2xl md:text-5xl leading-tight font-sans text-brand-dark">
        Our purpose is to help fashion brands create beauty, but <span className="italic font-serif text-brand-red">responsibly</span> — by knowing exactly what matters most to people and by making specifically that, with <span className="italic font-serif text-brand-red">care</span> and <span className="italic font-serif text-brand-red">precision</span>.
      </h2>
      <Quote className="w-10 h-10 md:w-16 md:h-16 fill-brand-dark self-end mt-4 opacity-20" />
    </div>
  </SlideWrapper>
);

const RedProblemSlide = () => (
  <SlideWrapper id="problem" className="bg-brand-red text-white p-6 md:p-16 relative overflow-hidden">
    {/* Subtle Pattern Overlay */}
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-black to-transparent pointer-events-none" />
    
    <div className="max-w-6xl text-center space-y-8 md:space-y-16 py-8 relative z-10">
      <div className="space-y-4">
        <h2 className="text-xl md:text-4xl font-light opacity-90">
            When robots can make anything with AI,<br/>
            the fundamental question for a brand becomes:
        </h2>
        <h1 className="text-4xl md:text-8xl font-black tracking-tight leading-none drop-shadow-md">
            What exactly should the brand offer?
        </h1>
      </div>
      
      {/* Updated visuals for this text block */}
      <div className="bg-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-md shadow-2xl border border-white/20">
          <p className="text-xl md:text-6xl leading-tight font-medium">
            Fashion still today produces in the <span className="text-black font-black">dark</span>,<br/>
            <span className="opacity-80">guessing demand,</span><br/>
            <span className="opacity-80">overproducing, discounting,</span><br/>
            and <span className="text-black font-black underline decoration-white underline-offset-8">wasting 40%</span> of all goods made.
          </p>
      </div>
    </div>
  </SlideWrapper>
);

const PlatformSlide = () => (
  <SlideWrapper id="platform" className="bg-[#111111] text-white p-6 md:p-16">
    <div className="w-full max-w-7xl flex flex-col items-center z-10 py-8">
        {/* Header */}
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 max-w-5xl leading-tight text-white/90">
            ONE transforms a loss making supply chain <br className="hidden md:block"/>
            to a circular profit-only machinery
        </h2>

        <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-8 lg:gap-16">
            {/* Diagram Area */}
            <div className="relative w-full max-w-[320px] md:max-w-4xl aspect-square md:aspect-[1.6/1] flex items-center justify-center my-4 lg:my-0">
                 
                 {/* WEST: Design */}
                 <div className="absolute left-0 md:left-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center text-center w-20 md:w-24 z-20">
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm mb-2">
                        <Building2 className="w-6 h-6 md:w-10 md:h-10 text-brand-red" strokeWidth={1.5} />
                    </div>
                 </div>

                 {/* NORTH: Factory */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-20 md:w-24 z-20">
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm mb-2">
                        <Factory className="w-6 h-6 md:w-10 md:h-10 text-brand-red" strokeWidth={1.5} />
                    </div>
                 </div>

                 {/* EAST: People */}
                 <div className="absolute right-0 md:right-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center text-center w-20 md:w-24 z-20">
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm mb-2">
                        <Users className="w-6 h-6 md:w-10 md:h-10 text-brand-red" strokeWidth={1.5} />
                    </div>
                 </div>

                 {/* SOUTH: ONE Logo */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-64 z-20">
                     <div className="transform scale-75 mb-2 bg-black/50 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                        <OneLogo className="w-20 h-auto md:w-32 text-white" /> 
                     </div>
                     <p className="text-[10px] md:text-sm font-medium leading-snug opacity-90 text-gray-400">AI-Augmented<br/>Computational Design,<br/>Sales Automation,<br/>Autonomous Manufacturing</p>
                 </div>
                 
                 {/* ARROWS (SVG Overlay) */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                    <defs>
                        <marker id="arrowhead" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto">
                            <path d="M2,2 L12,7 L2,12" fill="none" stroke="#E30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </marker>
                    </defs>
                    
                    {/* Top Path: Building -> Factory */}
                    <line x1="15%" y1="40%" x2="43%" y2="20%" stroke="#333" strokeWidth="2" />
                    <line x1="15%" y1="40%" x2="43%" y2="20%" stroke="#E30613" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" className="animate-pulse" />
                    
                    {/* Top Path: Factory -> People */}
                    <line x1="57%" y1="20%" x2="85%" y2="40%" stroke="#333" strokeWidth="2" />
                    <line x1="57%" y1="20%" x2="85%" y2="40%" stroke="#E30613" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" className="animate-pulse" />
                    
                    {/* Bottom Path: Building -> ONE */}
                    <line x1="15%" y1="60%" x2="43%" y2="78%" stroke="#333" strokeWidth="2" />
                    <line x1="15%" y1="60%" x2="43%" y2="78%" stroke="#E30613" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" className="animate-pulse" />
                    
                    {/* Bottom Path: ONE -> People */}
                    <line x1="57%" y1="78%" x2="85%" y2="60%" stroke="#333" strokeWidth="2" />
                    <line x1="57%" y1="78%" x2="85%" y2="60%" stroke="#E30613" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" className="animate-pulse" />
                 </svg>
                 
                 {/* Floating Labels */}
                 <div className="absolute top-[25%] left-[8%] md:left-[14%] text-[9px] md:text-sm text-center font-medium text-gray-300">
                    Human + Computational<br/>Design
                 </div>

                 <div className="absolute top-[25%] right-[8%] md:right-[15%] text-[9px] md:text-sm text-right font-medium text-gray-300">
                    Production, Distribution<br/>Leadtime<br/>+ Risk
                 </div>

                 <div className="absolute bottom-[25%] left-[8%] md:left-[15%] text-[9px] md:text-sm text-left font-medium text-gray-300">
                    DNA<br/>Brand Essence<br/>Pre-training
                 </div>

                 <div className="absolute bottom-[40%] right-[18%] md:right-[22%] text-[9px] md:text-sm font-medium text-gray-300">
                    Delivery
                 </div>
            </div>

            {/* Right Legend */}
            <div className="flex flex-col space-y-4 lg:space-y-12 w-full max-w-full lg:max-w-xs text-left z-20 mt-8 lg:mt-0 p-6 lg:p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Old World</h3>
                    <p className="text-sm leading-relaxed font-medium text-gray-400">
                        Risk<br/>
                        Black-box Demand & Production<br/>
                        Un-sustainable with Waste
                    </p>
                </div>
                <div className="h-px w-full bg-white/10"></div>
                <div>
                    <h3 className="font-bold text-lg mb-2 text-brand-red">AI World</h3>
                    <p className="text-sm leading-relaxed font-medium text-gray-200">
                        Zero Risk<br/>
                        Production on demand, pre-paid<br/>
                        Sustainable, Resilient
                    </p>
                </div>
            </div>
        </div>

        {/* Footer */}
         <div className="absolute bottom-2 md:bottom-4 right-4 md:right-8 text-[9px] md:text-xs opacity-50 text-right">
            * AI – Artificial Intelligence<br/>
            (M) – Manufacturing
        </div>
    </div>
  </SlideWrapper>
);

const DiscoverDesignInstructSlide = () => (
  <SlideWrapper id="solution" className="bg-white p-6 md:p-16">
    <div className="w-full h-full flex flex-col py-8">
      <h2 className="text-2xl md:text-4xl text-brand-red font-bold text-center mb-8 md:mb-12">
        ONE AI. Discover what to make, then make that <br className="hidden md:block" />
        <span className="font-normal text-black">at scale for any individual, anywhere, any time.</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 flex-grow w-full h-full min-h-[500px] shadow-2xl rounded-2xl overflow-hidden">
        {/* Discover */}
        <div className="flex flex-col relative border-b md:border-b-0 md:border-r border-gray-200 p-8 hover:bg-gray-50 transition-colors duration-500 min-h-[250px] md:min-h-auto group">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-2 group-hover:translate-x-2 transition-transform">DISCOVER</h3>
            <p className="text-sm md:text-lg mb-4 text-gray-600">desire, by empowering the individual to personalise product design</p>
          </div>
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
             <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80" alt="Fashion Sketches" className="object-cover w-full h-full grayscale" />
          </div>
        </div>
        {/* Design */}
        <div className="flex flex-col relative bg-gray-50 p-8 hover:bg-gray-100 transition-colors duration-500 min-h-[250px] md:min-h-auto group">
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-4xl font-bold mb-2 text-center group-hover:scale-110 transition-transform">DESIGN</h3>
              <p className="text-sm md:text-lg mb-4 text-center text-gray-600">precisely to match the person's captured physique, style and purpose</p>
            </div>
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
             <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" alt="3D Body Scan" className="object-cover w-full h-full grayscale" />
          </div>
        </div>
        {/* Instruct */}
        <div className="flex flex-col relative p-8 bg-brand-dark text-white hover:bg-black transition-colors duration-500 min-h-[250px] md:min-h-auto group">
          <div className="relative z-10 text-right">
            <h3 className="text-2xl md:text-4xl font-bold mb-2 text-right group-hover:-translate-x-2 transition-transform">INSTRUCT</h3>
            <p className="text-sm md:text-lg mb-4 text-right text-gray-400">robots to produce overnight using minimal resources</p>
          </div>
          <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
             <img src="/attached_assets/stock_images/industrial_robot_arm_78298320.jpg" alt="Advanced Manufacturing" className="object-cover w-full h-full grayscale" />
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center pb-8 md:pb-0">
        <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-brand-dark">SELFWEAR™</h3>
        <p className="text-2xl md:text-3xl text-gray-500">clothes that express you and not the other way around.</p>
      </div>
    </div>
  </SlideWrapper>
);

const TransformationSlide = () => {
    const items = [
        { title: "Unit Price", arrow: "up", desc: "Personalize each product in style, fit and purpose for higher price" },
        { title: "Volume", arrow: "up", desc: "Add machines to meet growing demand with no investment risk" },
        { title: "COGS", arrow: "down", desc: "Make only what is sold and eliminate risk and uncertainty" },
        { title: "Brand Value", arrow: "up", desc: "Speak to every single customer and match brand message" },
        { title: "Speed", arrow: "up", desc: "Time-to-market is instant with automated robotic manufacturing" },
    ];

    return (
        <SlideWrapper id="benefits" className="bg-white p-6 md:p-16">
            <div className="w-full max-w-6xl py-8">
                 <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 text-center text-brand-dark">
                    Transformation from <span className="text-gray-300 line-through decoration-brand-red decoration-2">Push</span> to <span className="text-brand-red">Pull</span> Manufacturing
                 </h2>
                 <div className="grid gap-6">
                     {items.map((item, idx) => (
                         <div key={idx} className="flex flex-col md:grid md:grid-cols-12 items-center gap-2 md:gap-4 border-b border-gray-100 pb-4 group hover:bg-gray-50 transition-all duration-300 p-6 rounded-2xl hover:shadow-lg text-center md:text-left">
                             <div className="w-full md:w-auto md:col-span-3 text-xl md:text-2xl font-bold md:text-right group-hover:text-brand-red transition-colors text-brand-dark">{item.title}</div>
                             <div className="md:col-span-1 flex justify-center py-2 md:py-0">
                                 {item.arrow === "up" ? (
                                     <ArrowUp className="w-8 h-8 text-emerald-500 group-hover:scale-125 transition-transform" strokeWidth={3} />
                                 ) : (
                                     <ArrowDown className="w-8 h-8 text-emerald-500 group-hover:scale-125 transition-transform" strokeWidth={3} />
                                 )}
                             </div>
                             <div className="md:col-span-8 text-lg md:text-xl text-gray-600 font-light">{item.desc}</div>
                         </div>
                     ))}
                 </div>
            </div>
        </SlideWrapper>
    );
};

const WhyNowSlide = () => {
  return (
    <SlideWrapper id="whynow" className="bg-brand-dark text-white p-6 md:p-16">
       <div className="w-full max-w-7xl flex flex-col md:flex-row h-full gap-8 md:gap-16 py-8">
          {/* Header Section */}
          <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800 pb-8 md:pb-0">
             <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4">
                WHY<br/>
                <span className="text-brand-red">NOW?</span>
             </h2>
             <p className="text-lg md:text-2xl text-gray-400 font-light mt-4 leading-relaxed">
                The convergence of technology, legislation, and consumer behavior creates the perfect storm for disruption.
             </p>
          </div>

          {/* Cards Section */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
             
             {/* Card 1 */}
             <div className="group bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-brand-red hover:border-brand-red transition-all duration-300 cursor-default hover:shadow-[0_0_30px_rgba(227,6,19,0.3)]">
                <div className="mb-4 text-brand-red group-hover:text-white transition-colors">
                    <Bot size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">AI + Robotics</h3>
                <p className="text-gray-400 group-hover:text-white/90 text-sm leading-relaxed">
                   Technologies have matured while fashion has remained stagnant. Autonomous manufacturing is now a reality.
                </p>
             </div>

             {/* Card 2 */}
             <div className="group bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-brand-red hover:border-brand-red transition-all duration-300 cursor-default hover:shadow-[0_0_30px_rgba(227,6,19,0.3)]">
                <div className="mb-4 text-brand-red group-hover:text-white transition-colors">
                    <Leaf size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-400 group-hover:text-white/90 text-sm leading-relaxed">
                   EU DPP and anti-waste laws are forcing the industry to abandon the overproduction model immediately.
                </p>
             </div>

             {/* Card 3 */}
             <div className="group bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-brand-red hover:border-brand-red transition-all duration-300 cursor-default hover:shadow-[0_0_30px_rgba(227,6,19,0.3)]">
                <div className="mb-4 text-brand-red group-hover:text-white transition-colors">
                    <Users size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Consumer Demand</h3>
                <p className="text-gray-400 group-hover:text-white/90 text-sm leading-relaxed">
                   Modern consumers demand individuality. Personalization allows for premium margins and deeper brand loyalty.
                </p>
             </div>

             {/* Card 4 */}
             <div className="group bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-brand-red hover:border-brand-red transition-all duration-300 cursor-default hover:shadow-[0_0_30px_rgba(227,6,19,0.3)]">
                <div className="mb-4 text-brand-red group-hover:text-white transition-colors">
                    <Factory size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Micro-Production</h3>
                <p className="text-gray-400 group-hover:text-white/90 text-sm leading-relaxed">
                   Local production reduces logistics costs, lead times, and carbon emissions, enabling agile response to trends.
                </p>
             </div>

          </div>
       </div>
    </SlideWrapper>
  )
}

const PatentSlide = () => (
    <SlideWrapper id="patent" className="bg-white p-6 md:p-16">
        <div className="w-full max-w-6xl flex flex-col items-center py-8">
            {/* Header */}
            <div className="text-center mb-12 max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-red mb-4 leading-tight">
                    Patent protected and market-ready AI system
                </h2>
                <h3 className="text-xl md:text-4xl font-light text-black">
                    to know humans, machines and fashion
                </h3>
            </div>

            {/* Responsive Container: Column on Mobile, Row on Desktop */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 w-full">
                
                {/* LEFT BOX: SELL */}
                <div className="flex flex-col items-center w-full md:w-auto">
                    <h4 className="text-lg md:text-2xl font-medium mb-4 text-gray-800">Patent in Filing</h4>
                    <div className="w-64 h-64 md:w-96 md:h-96 bg-white rounded-3xl border border-gray-100 relative shadow-2xl flex flex-col items-center justify-between p-6 overflow-hidden">
                        <div className="absolute inset-0 bg-red-50 opacity-50 z-0"></div>
                        {/* Top */}
                        <div className="text-lg font-bold text-black text-center z-10">Generate<br/>Design</div>
                        
                        {/* Center Content */}
                        <div className="flex flex-col items-center justify-center flex-grow w-full relative z-10">
                             {/* Arrows */}
                             <div className="absolute inset-0 scale-95">
                                <CycleArrows color="#E30613" />
                             </div>
                             <span className="text-3xl md:text-5xl font-bold text-brand-red tracking-widest z-10">SELL</span>
                        </div>

                        {/* Bottom Sides */}
                        <div className="flex justify-between w-full z-10">
                            <div className="text-sm md:text-lg font-bold text-black text-center leading-tight">Test<br/>Response</div>
                            <div className="text-sm md:text-lg font-bold text-black text-center leading-tight">Present<br/>Product</div>
                        </div>
                    </div>
                </div>

                {/* CONNECTOR: BUY */}
                <div className="flex flex-col items-center justify-center z-20 md:mx-4">
                     <div className="hidden md:flex flex-col items-center">
                        <ArrowRight className="w-16 h-16 text-black" strokeWidth={1} />
                        <span className="font-bold text-xl uppercase mt-2">Buy</span>
                     </div>
                     <div className="flex md:hidden flex-col items-center my-4">
                        <ArrowDown className="w-16 h-16 text-black" strokeWidth={1} />
                        <span className="font-bold text-xl uppercase mt-2">Buy</span>
                     </div>
                </div>

                {/* RIGHT BOX: MAKE */}
                <div className="flex flex-col items-center w-full md:w-auto">
                    <h4 className="text-lg md:text-2xl font-medium mb-4 text-black">Patent granted in US, EU</h4>
                    <div className="w-64 h-64 md:w-96 md:h-96 bg-brand-red rounded-3xl relative shadow-2xl flex flex-col items-center justify-between p-6 text-white overflow-hidden">
                         {/* Top */}
                        <div className="text-lg font-bold text-center z-10">Scan<br/>Body</div>

                        {/* Center Content */}
                        <div className="flex flex-col items-center justify-center flex-grow w-full relative z-10">
                            {/* Arrows */}
                             <div className="absolute inset-0 scale-95">
                                <CycleArrows color="#FFFFFF" />
                             </div>
                            <span className="text-3xl md:text-5xl font-bold tracking-widest z-10">MAKE</span>
                        </div>

                         {/* Bottom Sides */}
                        <div className="flex justify-between w-full z-10">
                             <div className="text-sm md:text-lg font-bold text-center leading-tight">Wear<br/>Clothes</div>
                             <div className="text-sm md:text-lg font-bold text-center leading-tight">Instruct<br/>Machines</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </SlideWrapper>
);

const BusinessModelSlide = () => (
    <SlideWrapper id="business-model" className="bg-gray-50 p-6 md:p-16">
        <div className="w-full max-w-7xl flex flex-col items-center py-8">
             {/* Header */}
             <div className="text-center mb-8 md:mb-16">
                <h2 className="text-3xl md:text-6xl font-bold text-brand-red mb-6">
                    The Business Model
                </h2>
                <h3 className="text-lg md:text-3xl text-black font-light max-w-4xl leading-relaxed">
                    10% for ONE AI. 20% EBIT boost for Brand.<br/>
                    <span className="text-gray-500 text-lg md:text-2xl">Sell digital assets and earn with every unit.</span>
                </h3>
            </div>

            {/* 3-Column Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
                
                {/* 1. ONE AI */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-4 border-brand-red flex flex-col items-center text-center relative hover:-translate-y-2 transition-transform duration-300">
                    <div className="mb-8 transform scale-125">
                        <OneLogo className="h-12 md:h-16 w-auto text-brand-red" />
                    </div>
                    <div className="flex-grow flex flex-col gap-4 w-full">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 font-bold text-lg text-gray-800">
                            Digital Designs
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 font-bold text-lg text-gray-800">
                            Machine Code
                        </div>
                    </div>
                    {/* Connector Icon (Desktop) */}
                    <div className="hidden md:flex absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center border border-gray-100">
                        <ArrowRight className="w-6 h-6 text-brand-red" />
                    </div>
                </div>

                {/* 2. BRAND */}
                <div className="bg-brand-red text-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center text-center relative transform md:-translate-y-4 z-10 hover:scale-105 transition-transform duration-300">
                    <h3 className="text-5xl font-thin mb-2 tracking-wide">Brand</h3>
                    <div className="w-12 h-1 bg-white/50 mb-8"></div>
                    
                    <div className="flex-grow flex flex-col gap-6 justify-center w-full">
                        <div className="text-center">
                            <span className="block text-4xl font-bold">+20%</span>
                            <span className="text-white/80 text-sm uppercase tracking-widest">EBIT Boost</span>
                        </div>
                         <div className="h-px bg-white/20 w-full"></div>
                        <div className="text-center opacity-90">
                            <span className="block text-xl font-bold">Pay 10%</span>
                            <span className="text-sm">Revenue Share</span>
                        </div>
                    </div>

                     {/* Connector Icon (Desktop) */}
                    <div className="hidden md:flex absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center border border-gray-100">
                         <ArrowRight className="w-6 h-6 text-black" />
                    </div>
                </div>

                {/* 3. CUSTOMER */}
                <div className="bg-black text-white p-8 md:p-12 rounded-3xl shadow-xl border-t-4 border-gray-600 flex flex-col items-center text-center relative hover:-translate-y-2 transition-transform duration-300">
                     <h3 className="text-5xl font-thin mb-8 tracking-wide">Customer</h3>
                     
                     <div className="flex-grow flex flex-col gap-4 w-full">
                         <div className="flex items-center justify-between bg-gray-900 p-4 rounded-xl border border-gray-800">
                             <span className="text-gray-400 text-sm">Receives</span>
                             <span className="font-bold">Test Offers</span>
                         </div>
                         <div className="flex items-center justify-between bg-white text-black p-4 rounded-xl shadow-lg border-2 border-transparent hover:border-brand-red transition-colors">
                             <span className="text-sm font-medium">Pays</span>
                             <span className="font-bold text-xl">Buy €</span>
                         </div>
                         <div className="flex items-center justify-between bg-gray-900 p-4 rounded-xl border border-gray-800">
                             <span className="text-gray-400 text-sm">Receives</span>
                             <span className="font-bold">Product</span>
                         </div>
                     </div>
                </div>

            </div>
        </div>
    </SlideWrapper>
);

const MarketOpportunitySlide = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const getCircleStyle = (index: number) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;
        
        // Base transitions
        let baseStyle = "transition-all duration-500 ease-in-out absolute rounded-full flex items-start justify-center";

        if (isHovered) {
             return `${baseStyle} scale-110 shadow-2xl z-50`; // Pop out
        } else if (isAnyHovered) {
             return `${baseStyle} opacity-40 scale-95 blur-[1px]`; // Dim others
        }
        
        return baseStyle;
    }

    return (
    <SlideWrapper id="market-size" className="bg-white p-6 md:p-16">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-24 py-8">
            
            {/* Left Content: Text Stack */}
            <div className="flex-1 space-y-6 md:space-y-8 order-2 lg:order-1 w-full z-20">
                <div>
                     <h2 className="text-4xl md:text-7xl font-black text-brand-red mb-4 leading-none tracking-tighter">
                        MARKET<br/><span className="text-black">OPPORTUNITY</span>
                    </h2>
                    <h3 className="text-lg md:text-2xl font-light text-gray-600">
                        10% of TAM is attainable with ONE AI
                    </h3>
                </div>

                <div className="space-y-2 md:space-y-4">
                     {/* Card 1: Insoles (Target) - Index 0 */}
                     <div 
                        onMouseEnter={() => setHoveredIndex(0)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`flex items-center justify-between p-4 md:p-6 rounded-3xl cursor-pointer transition-all duration-300 ${hoveredIndex === 0 ? 'bg-brand-red text-white scale-105 shadow-xl' : 'bg-gray-50 text-gray-800 border border-gray-100'}`}
                     >
                         <div>
                             <div className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 ${hoveredIndex === 0 ? 'text-white/80' : 'text-brand-red'}`}>Initial Entry Market</div>
                             <div className="text-lg md:text-xl font-bold">Orthotic & Lifestyle Insoles</div>
                         </div>
                         <div className="text-2xl md:text-4xl font-black">€6B</div>
                     </div>

                     {/* Card 2: Sneakers - Index 1 */}
                     <div 
                        onMouseEnter={() => setHoveredIndex(1)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`flex items-center justify-between p-4 md:p-6 rounded-3xl cursor-pointer transition-all duration-300 ${hoveredIndex === 1 ? 'bg-brand-red text-white scale-105 shadow-xl' : 'bg-gray-50 text-gray-800 border border-gray-100'}`}
                     >
                         <div>
                             <div className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 ${hoveredIndex === 1 ? 'text-white/80' : 'text-brand-red'}`}>Segment Expansion</div>
                             <div className="text-lg md:text-xl font-bold">Athletic & Lifestyle Sneakers</div>
                         </div>
                         <div className="text-2xl md:text-4xl font-black">€90B</div>
                     </div>

                     {/* Card 3: Footwear - Index 2 */}
                     <div 
                        onMouseEnter={() => setHoveredIndex(2)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`flex items-center justify-between p-4 md:p-6 rounded-3xl cursor-pointer transition-all duration-300 ${hoveredIndex === 2 ? 'bg-brand-red text-white scale-105 shadow-xl' : 'bg-gray-50 text-gray-800 border border-gray-100'}`}
                     >
                         <div>
                             <div className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 ${hoveredIndex === 2 ? 'text-white/80' : 'text-gray-500'}`}>Market Expansion</div>
                             <div className="text-lg md:text-xl font-bold">Footwear General</div>
                         </div>
                         <div className="text-2xl md:text-4xl font-black">€430B</div>
                     </div>

                     {/* Card 4: Global - Index 3 */}
                     <div 
                        onMouseEnter={() => setHoveredIndex(3)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`flex items-center justify-between p-4 md:p-6 rounded-3xl cursor-pointer transition-all duration-300 ${hoveredIndex === 3 ? 'bg-brand-red text-white scale-105 shadow-xl' : 'bg-transparent border-l-4 border-gray-200 text-gray-400'}`}
                     >
                         <div>
                             <div className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 ${hoveredIndex === 3 ? 'text-white/80' : 'text-gray-400'}`}>Total Addressable Market</div>
                             <div className="text-lg md:text-xl font-bold">Global Fashion Market</div>
                         </div>
                         <div className="text-2xl md:text-4xl font-black">€2T</div>
                     </div>
                </div>
            </div>

            {/* Right Content: Concentric Circles Visualization */}
            <div className="flex-1 flex items-center justify-center order-1 lg:order-2 w-full h-[320px] md:h-[600px]">
                {/* Made responsive: w-full with max-width limits and square aspect ratio */}
                <div className="relative w-full max-w-[320px] md:max-w-[600px] aspect-square flex items-center justify-center">
                    
                    {/* Circle 1: Global (Index 3) - Outermost */}
                    <div 
                        onMouseEnter={() => setHoveredIndex(3)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`w-[100%] h-[100%] border-2 border-dashed border-gray-200 pt-4 md:pt-8 bg-gray-50/30 cursor-pointer ${getCircleStyle(3)} ${hoveredIndex === 3 ? 'border-brand-red border-solid bg-red-50' : ''}`}
                    >
                        <span className={`font-bold text-[10px] md:text-xs uppercase tracking-widest mt-2 px-2 transition-colors ${hoveredIndex === 3 ? 'text-brand-red bg-transparent' : 'text-gray-300 bg-white'}`}>Global Fashion</span>
                    </div>

                    {/* Circle 2: Footwear (Index 2) */}
                    <div 
                        onMouseEnter={() => setHoveredIndex(2)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`w-[75%] h-[75%] border border-gray-300 bg-white shadow-xl pt-4 md:pt-6 z-10 cursor-pointer ${getCircleStyle(2)} ${hoveredIndex === 2 ? 'border-brand-red ring-4 ring-red-100' : ''}`}
                    >
                        <span className={`font-bold text-[10px] md:text-xs uppercase tracking-widest mt-2 transition-colors ${hoveredIndex === 2 ? 'text-brand-red' : 'text-gray-400'}`}>Footwear</span>
                    </div>

                    {/* Circle 3: Sneakers (Index 1) */}
                    <div 
                        onMouseEnter={() => setHoveredIndex(1)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`w-[50%] h-[50%] bg-red-50 border border-red-100 shadow-inner pt-2 md:pt-4 z-20 cursor-pointer ${getCircleStyle(1)} ${hoveredIndex === 1 ? 'bg-red-100 border-brand-red' : ''}`}
                    >
                         <span className={`font-bold text-[10px] md:text-xs uppercase tracking-widest mt-2 transition-colors ${hoveredIndex === 1 ? 'text-brand-red' : 'text-red-300'}`}>Athletic & Lifestyle Sneakers</span>
                    </div>

                    {/* Circle 4: Insoles (Index 0) - Innermost */}
                    <div 
                        onMouseEnter={() => setHoveredIndex(0)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`w-[25%] h-[25%] bg-brand-red shadow-2xl flex-col items-center z-30 cursor-pointer ${getCircleStyle(0)} ${hoveredIndex === null ? 'animate-pulse' : ''} ${hoveredIndex === 0 ? 'scale-125' : ''}`}
                    >
                        <span className="font-black text-lg md:text-4xl leading-none text-white">€6B</span>
                        <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-wider mt-1 text-white">Target</span>
                    </div>
                    
                </div>
            </div>

        </div>
    </SlideWrapper>
    );
};

const FinancialsSlide = () => {
    // Configuration for the data series
    const series = [
        { key: "Orthotic", color: "#E30613", icon: Footprints, label: "Orthotic Insoles", sub: "Laufwerk signed: €20 per sale" },
        { key: "Sports", color: "#F97316", icon: Trophy, label: "Sports Insole", sub: "In negotiation €20-100 per sale" },
        { key: "Runners", color: "#3B82F6", icon: Zap, label: "Runner Insoles", sub: "20% of list price" },
        { key: "Tote", color: "#10B981", icon: ShoppingBag, label: "Tote Bags", sub: "20-30% of list price" },
    ];

    return (
        <SlideWrapper id="financials" className="bg-white p-6 md:p-16">
            <div className="w-full max-w-6xl flex flex-col h-[60vh] md:h-[85vh] py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-2 md:mb-4">Financial Growth</h2>
                    <h3 className="text-lg md:text-2xl text-gray-500 font-light">Revenue Projection (Millions €)</h3>
                </div>
                
                <div className="flex-grow w-full relative bg-white rounded-3xl p-4 md:p-8 shadow-2xl border border-gray-100 overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={REVENUE_DATA}
                            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                {series.map(s => (
                                    <linearGradient key={s.key} id={`color${s.key}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={s.color} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={s.color} stopOpacity={0.1}/>
                                    </linearGradient>
                                ))}
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="period" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 500}} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 500}} 
                                tickFormatter={(value) => `€${value}M`}
                                domain={[0, 60]}
                                ticks={[0, 10, 20, 30, 40, 50, 60]}
                            />
                            <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '16px' }}
                                itemStyle={{ padding: '4px 0' }}
                                formatter={(value: number, name: string) => [`€${value}M`, name]}
                            />
                            
                            {series.map((s) => (
                                <Area 
                                    key={s.key}
                                    type="monotone" 
                                    dataKey={s.key} 
                                    stackId="1" 
                                    stroke={s.color} 
                                    fill={`url(#color${s.key})`} 
                                    strokeWidth={3}
                                    animationDuration={2000} 
                                />
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend / Key with Icons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-8">
                    {series.map((s) => ( 
                        <div key={s.key} className="flex items-center gap-2 md:gap-4 bg-white p-2 md:p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                            <div className="p-2 md:p-3 rounded-xl shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                                <s.icon size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800 text-xs md:text-base leading-tight">{s.label}</span>
                                <span className="text-[10px] md:text-sm text-gray-500 font-medium">{s.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SlideWrapper>
    );
};

const TeamSlide = () => (
    <SlideWrapper id="team" className="bg-white p-6 md:p-16">
        <div className="w-full max-w-6xl py-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 text-center text-brand-dark">The Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                {TEAM_MEMBERS.map((member, idx) => (
                    <a 
                        key={idx} 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center text-center group cursor-pointer block"
                    >
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 md:mb-6 shadow-xl grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 relative ring-4 ring-transparent group-hover:ring-brand-red/20">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-sm md:text-xl font-bold group-hover:text-brand-red transition-colors">{member.name.split('|')[0].trim()}</h3>
                        <p className="text-xs md:text-base text-gray-500 font-medium group-hover:text-brand-red group-hover:opacity-100 transition-colors mt-1">{member.role}</p>
                    </a>
                ))}
            </div>
        </div>
    </SlideWrapper>
);

const ContactSlide = () => (
    <SlideWrapper id="contact" className="bg-black text-white p-6 md:p-16 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col items-center justify-center space-y-8 relative z-10">
            <OneLogo className="w-48 md:w-64 h-auto text-brand-red animate-float" />
            <div className="h-px w-24 bg-brand-red my-8"></div>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide">Join the revolution.</h2>
            
            <div className="flex flex-col md:flex-row gap-6 mt-8 w-full md:w-auto px-8 md:px-0">
                <a 
                    href="mailto:max@one-ai.fashion"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                    <Mail size={24} />
                    Get in Touch
                </a>
                <a 
                    href="https://www.linkedin.com/company/one-ai-fashion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-[#0077b5] border-2 border-[#0077b5] rounded-full hover:bg-[#006097] hover:border-[#006097] transition-all duration-300 font-bold text-lg text-white hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]"
                >
                    <Linkedin size={24} fill="currentColor" />
                    LinkedIn
                </a>
            </div>
        </div>
        <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 opacity-50 text-xs md:text-sm">© 2026 ONE AI</div>
    </SlideWrapper>
);


function App() {
  return (
    <div className="w-full font-sans antialiased text-brand-dark selection:bg-brand-red selection:text-white">
      <FloatingContactBtn />
      <Navigation />
      <HeroSlide />
      <QuoteSlide />
      <RedProblemSlide />
      <PlatformSlide />
      <DiscoverDesignInstructSlide />
      <TransformationSlide />
      <WhyNowSlide />
      <PatentSlide />
      <BusinessModelSlide />
      <MarketOpportunitySlide />
      <FinancialsSlide />
      <TeamSlide />
      <ContactSlide />
      <Analytics />
    </div>
  );
}

export default App;
