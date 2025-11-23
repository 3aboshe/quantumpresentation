import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Zap, 
  User,
  Database,
  Unlock,
  Eye,
  BookOpen,
  Cpu,
  Download,
  ShieldAlert
} from 'lucide-react';

// --- DATA & SLIDE CONTENT ---

const TEAM_MEMBERS = "Abdulrahman Majid, Mohammed Bashar, Louay Qusay, Maryam Talaat";

const slides = [
  {
    id: 1,
    type: "title",
    title: "Quantum Threats: The End of Encryption",
    content: "An introduction to the physics that will break our digital locks.",
    visual: "lock-dissolve",
    definition: "Cybersecurity Alert: Quantum computing poses an existential threat to RSA and ECC encryption standards."
  },
  {
    id: 2,
    type: "concept",
    title: "The Analogy: The Magic Fridge",
    concept: "Probabilistic States",
    definition: "Quantum Superposition: A system exists in all possible states simultaneously until observed. Changing the probability amplitude can alter the outcome.",
    content: "Have you ever opened the fridge to see there's no food, closed it, lowered your standards, and opened it again hoping for food? In our world, that's insane. But in the Quantum world... it actually works. On the second try, the probability wave might collapse differently, and suddenly: PIZZA.",
    visual: "fridge-magic"
  },
  {
    id: 3,
    type: "concept",
    title: "Old Tech: The Light Switch",
    concept: "Classical Bits",
    definition: "Bit (Binary Digit): The fundamental unit of data in classical computing, represented as either a 0 or a 1.",
    content: "Your laptop works on transistors. Think of them like light switches on a wall. They are either UP (1) or DOWN (0). There is no in-between. It is simple, reliable, but limited.",
    visual: "switches"
  },
  {
    id: 4,
    type: "concept",
    title: "New Tech: The Spinning Coin",
    concept: "Qubits & Superposition",
    definition: "Qubit: A quantum bit that leverages superposition to represent both 0 and 1 simultaneously, exponentially increasing processing power.",
    content: "Superposition is the ability of a quantum system to be in multiple states at the same time until it is measured. Think of a spinning coin: it's not heads, it's not tails—it's a probability of both. This allows a quantum computer to process a vast number of possibilities in parallel.",
    visual: "spinning-coin"
  },
  {
    id: 5,
    type: "concept",
    title: "The Problem: The Soap Bubble",
    concept: "Decoherence (Fragility)",
    definition: "Decoherence: Quantum states are extremely sensitive. Any interaction with the environment (heat, noise) causes the 'bubble' to pop, losing all information.",
    content: "Qubits are incredibly fragile. Think of a soap bubble floating in the air. It's perfect and holds information. But if a tiny dust mote hits it, or if you even breathe on it... POP. It's gone. This is why building them is so hard.",
    visual: "bubble-pop"
  },
  {
    id: 6,
    type: "concept",
    title: "Microsoft's Solution: The Knot",
    concept: "Topological Qubits",
    definition: "Majorana Zero Modes: Quasiparticles that act as their own antiparticles. Their 'non-abelian' statistics allow information to be stored globally in the topology (knots) rather than locally.",
    content: "Microsoft found a fix using a '3rd state of matter'. Instead of a fragile bubble, think of a Knot in a rope. If you shake the rope, the knot doesn't pop. It stays tied. This makes the data stable.",
    visual: "knot"
  },
  {
    id: 7,
    type: "concept",
    title: "Hardware Architecture",
    concept: "World-Line Braiding",
    definition: "Braiding: Information is encoded in the sequence of swaps between particles. To 'read' the data, you check how the paths are tangled.",
    content: "How do we store data in a knot? By moving particles around each other over time. Imagine three dancers swapping places as they walk forward. Their path traces a braid. That 'braid' IS the memory.",
    visual: "braiding-time"
  },
  {
    id: 8,
    type: "concept",
    title: "The Race: The Maze",
    concept: "Quantum Parallelism",
    definition: "Sequential vs Parallel: Classical computers must walk every path one by one. Quantum computers behave like a wave, filling all paths simultaneously to find the exit.",
    content: "Imagine a complex maze. A Classical Computer (Red Dot) has to try a path, hit a wall, go back, and try another. It takes forever. A Quantum Computer (Green Wave) floods the entire maze at once. It touches the exit instantly.",
    visual: "maze"
  },
  {
    id: 9,
    type: "concept",
    title: "The Danger: Shor's Algorithm",
    concept: "Exponential Speedup",
    definition: "Shor's Algorithm: An algorithm that finds the prime factors of an integer. It can break RSA-2048 encryption in hours, a task that would take classical supercomputers trillions of years.",
    content: "Our current encryption (RSA) relies on math problems that take 10,000 years to solve. A Quantum computer running Shor's Algorithm could solve them in a lunch break.",
    visual: "rsa-table"
  },
  {
    id: 10,
    type: "concept",
    title: "Harvest Now, Decrypt Later",
    concept: "HNDL Attack Strategy",
    definition: "Harvest Now, Decrypt Later (HNDL): Adversaries collect encrypted data today, expecting to decrypt it once sufficiently powerful quantum computers are available.",
    content: "Hackers aren't waiting. They are stealing your locked data TODAY (Harvesting). They can't open it yet, but they keep it safe until the quantum key breaker is invented. Your secrets today are already compromised.",
    visual: "harvest-simple"
  },
  {
    id: 11,
    type: "comparison",
    title: "Tech Specs: Quantum vs Traditional",
    concept: "Architecture Comparison",
    definition: "Key Difference: Traditional CPUs rely on transistors and clock cycles (nanoseconds). Quantum chips rely on superconducting circuits and gate pulses (picoseconds).",
    content: "Comparing the physical limitations. Note the speed difference (100 million x) and the cooling requirements (Absolute Zero).",
    visual: "comparison-table"
  },
  {
    id: 12,
    type: "concept",
    title: "The Shield: QKD",
    concept: "Quantum Key Distribution",
    definition: "QKD: A secure communication method. If a third party attempts to eavesdrop on the quantum key, the wave function collapses, introducing detectable errors.",
    content: "How do we stop this? With Quantum Key Distribution (QKD). We use the laws of physics to send the encryption key. Instead of math, we send photons of light.",
    visual: "alice-bob"
  },
  {
    id: 13,
    type: "concept",
    title: "The Observer Effect",
    concept: "Intrusion Detection",
    definition: "Heisenberg Uncertainty Principle: You cannot measure a quantum system without disturbing it. Any attempt to hack the key destroys the key.",
    content: "If a hacker tries to 'look' at the key, the act of looking changes the photons. The key destroys itself instantly. It is physically impossible to hack without being caught.",
    visual: "observer"
  },
  {
    id: 14,
    type: "end",
    title: "The Future is Here",
    subtitle: "Thank You for Listening",
    content: "Presented by: " + TEAM_MEMBERS,
    visual: "end-warp",
    definition: "Any Questions?"
  }
];

// --- VISUAL COMPONENTS ---

const VisualLock = () => (
  <div className="flex items-center justify-center h-full w-full bg-slate-50 relative overflow-hidden">
    <div>
      <Lock size={120} className="text-slate-800" />
    </div>
  </div>
);

const VisualFridge = () => {
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAttempt(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-100 relative">
      <div className="text-xl font-bold mb-4 text-cyan-700">
        Attempt #{attempt + 1}: {attempt === 2 ? "QUANTUM PIZZA!" : "Empty..."}
      </div>
      
      <div className="relative w-48 h-72 bg-white border-4 border-slate-300 rounded-xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
          {attempt === 2 && (
             <motion.div 
               initial={{ scale: 0 }} 
               animate={{ scale: 1.2, rotate: 360 }} 
               className="text-6xl"
             >
               🍕
             </motion.div>
          )}
          {attempt !== 2 && <span className="text-slate-400 italic">Void</span>}
        </div>

        <motion.div
          className="absolute inset-0 bg-slate-50 border-r-4 border-slate-200 origin-left z-10 flex items-center justify-center"
          animate={{ rotateY: [0, -110, -110, 0] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="w-2 h-16 bg-slate-300 rounded-full ml-auto mr-4"></div>
        </motion.div>
      </div>
    </div>
  );
};

const VisualSwitches = () => (
  <div className="flex items-center justify-center gap-16 h-full w-full bg-slate-50">
    {[1, 2, 3].map((id) => (
      <div key={id} className="flex flex-col items-center gap-4">
        <div className={`w-20 h-32 rounded-lg border-4 shadow-lg flex items-center justify-center ${id === 2 ? 'bg-green-100 border-green-400' : 'bg-slate-200 border-slate-300'}`}>
          <div className={`w-12 h-20 rounded transition-all duration-300 ${id === 2 ? 'bg-green-500 -translate-y-2' : 'bg-slate-400 translate-y-2'}`} />
        </div>
        <span className="font-mono text-2xl font-bold text-slate-600">{id === 2 ? "1" : "0"}</span>
      </div>
    ))}
  </div>
);

const VisualCoin = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-slate-900 relative overflow-hidden">
    <div className="mb-8 text-cyan-400 font-mono text-xl tracking-widest">STATE: SUPERPOSITION</div>
    <motion.div
      className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-4 border-yellow-200 flex items-center justify-center shadow-[0_0_50px_rgba(253,224,71,0.3)]"
      animate={{ rotateY: 360 }}
      transition={{ duration: 4, ease: "linear", repeat: Infinity }}
    >
      <div className="text-6xl font-bold text-yellow-900 opacity-50">?</div>
    </motion.div>
    <div className="flex gap-20 mt-8">
      <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{duration: 2}} className="text-white font-bold text-xl">HEADS</motion.span>
      <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{duration: 2, delay: 1}} className="text-white font-bold text-xl">TAILS</motion.span>
    </div>
  </div>
);

const VisualBubble = () => (
  <div className="flex items-center justify-center h-full w-full bg-slate-100 relative overflow-hidden">
    {/* The Bubble */}
    <motion.div
      className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-100 to-transparent border-2 border-white shadow-xl flex items-center justify-center relative z-10 backdrop-blur-sm"
      style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.5)" }}
      animate={{ 
        y: [-10, 10, -10],
        scale: [1, 1.05, 1],
        opacity: [1, 1, 0]
      }}
      transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
    >
      <div className="absolute top-4 left-8 w-12 h-6 bg-white opacity-40 rounded-full rotate-[-45deg]"></div>
      <span className="text-slate-500 font-bold opacity-50">DATA</span>
    </motion.div>

    {/* The "Pop" Particles */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 2], x: (Math.random()-0.5)*200, y: (Math.random()-0.5)*200 }}
        transition={{ duration: 0.5, delay: 3.5, repeat: Infinity, repeatDelay: 4.5 }}
      />
    ))}

    {/* Noise/Dust Trigger */}
    <motion.div
      className="absolute right-0 top-1/2 w-4 h-4 bg-red-500 rounded-full"
      animate={{ x: [-200, -100], opacity: [0, 1, 0] }}
      transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 3 }}
    />
    <div className="absolute bottom-10 text-slate-400 font-mono text-xs">ENVIRONMENTAL NOISE DETECTED</div>
  </div>
);

const VisualKnot = () => (
  <div className="flex items-center justify-center h-full w-full bg-slate-50">
    <svg width="300" height="300" viewBox="0 0 200 200">
      <motion.path
        d="M40,100 C40,40 100,40 100,100 C100,160 160,160 160,100"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="12"
        strokeLinecap="round"
        animate={{ d: [
          "M40,100 C40,40 100,40 100,100 C100,160 160,160 160,100",
          "M40,110 C50,50 110,30 100,100 C90,170 150,150 160,100",
          "M40,100 C40,40 100,40 100,100 C100,160 160,160 160,100"
        ] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} 
      />
    </svg>
  </div>
);

const VisualBraidingTime = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-900 relative p-4">
      <div className="absolute top-4 left-4 text-cyan-400 font-mono text-xs">TIME (t) ↓</div>
      
      <div className="relative w-48 h-full">
         {/* Vertical Time Lines (World Lines) */}
         <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-700"></div>
         <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700"></div>
         <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-slate-700"></div>

         {/* Particle 1 */}
         <motion.div
           className="absolute w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan] z-20"
           animate={{ 
             top: ["0%", "30%", "60%", "100%"],
             left: ["0%", "50%", "0%", "0%"] 
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         />

         {/* Particle 2 */}
         <motion.div
           className="absolute w-6 h-6 bg-green-400 rounded-full shadow-[0_0_15px_green] z-20"
           animate={{ 
             top: ["0%", "30%", "60%", "100%"],
             left: ["50%", "0%", "50%", "50%"] 
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         />

         {/* The Braid Trail (SVG Overlay) */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
           <path d="M0,0 Q50,100 96,200" fill="none" stroke="cyan" strokeWidth="4" strokeDasharray="5,5" />
           <path d="M96,0 Q50,100 0,200" fill="none" stroke="green" strokeWidth="4" strokeDasharray="5,5" />
         </svg>
      </div>
      <div className="absolute bottom-4 bg-slate-800 text-white px-3 py-1 rounded text-xs">
        Braid Pattern = Stored Memory
      </div>
    </div>
  );
};

const VisualMaze = () => {
  const [classicalPos, setClassicalPos] = useState(0);
  const [quantumSolving, setQuantumSolving] = useState(false);
  
  // Maze: 0=path, 1=wall, S=start, E=end
  const maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
  ];
  
  const classicalPath = [{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:2,y:3},{x:2,y:4},{x:3,y:4},{x:4,y:4}];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setClassicalPos(p => (p + 1) % classicalPath.length);
    }, 500);
    
    const quantum = setInterval(() => {
      setQuantumSolving(q => !q);
    }, 2000);
    
    return () => { clearInterval(timer); clearInterval(quantum); };
  }, []);
  
  return (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Classical Computer */}
        <div className="flex flex-col items-center">
          <div className="text-orange-400 font-bold mb-2 text-sm">CLASSICAL (Sequential)</div>
          <div className="grid grid-cols-5 gap-1 bg-slate-700 p-2 rounded">
            {maze.map((row, y) => row.map((cell, x) => {
              const isVisited = classicalPath.findIndex(p => p.x === x && p.y === y) <= classicalPos;
              const isCurrent = classicalPath[classicalPos]?.x === x && classicalPath[classicalPos]?.y === y;
              return (
                <div key={`${x}-${y}`} className={`w-8 h-8 rounded ${
                  cell === 1 ? 'bg-slate-900' : 
                  isCurrent ? 'bg-orange-500 shadow-[0_0_10px_orange]' :
                  isVisited ? 'bg-orange-900' : 'bg-slate-600'
                }`} />
              );
            }))}
          </div>
          <div className="text-orange-300 text-xs mt-2">Step {classicalPos + 1}/{classicalPath.length}</div>
        </div>
        
        {/* Quantum Computer */}
        <div className="flex flex-col items-center">
          <div className="text-cyan-400 font-bold mb-2 text-sm">QUANTUM (Parallel)</div>
          <div className="grid grid-cols-5 gap-1 bg-slate-700 p-2 rounded relative">
            {maze.map((row, y) => row.map((cell, x) => (
              <motion.div 
                key={`q-${x}-${y}`} 
                className={`w-8 h-8 rounded ${
                  cell === 1 ? 'bg-slate-900' : 'bg-cyan-500'
                }`}
                animate={{ 
                  opacity: cell === 1 ? 1 : (quantumSolving ? [0.3, 1, 0.3] : 1),
                  boxShadow: cell === 1 ? 'none' : '0 0 10px cyan'
                }}
                transition={{ duration: 0.5, repeat: quantumSolving ? Infinity : 0 }}
              />
            )))}
            {quantumSolving && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-cyan-300 font-bold text-xs bg-slate-900/80 px-2 py-1 rounded"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  ALL PATHS AT ONCE
                </motion.div>
              </div>
            )}
          </div>
          <div className="text-cyan-300 text-xs mt-2">✓ Solved Instantly</div>
        </div>
      </div>
    </div>
  );
};

const VisualRSA = () => (
  <div className="flex flex-col justify-center items-center h-full w-full bg-slate-50 p-8">
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <span className="text-slate-500">Algorithm</span>
        <span className="font-mono font-bold">RSA-2048</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-500">Classical Time</span>
        <span className="bg-slate-200 px-2 py-1 rounded text-xs">10,000 Years</span>
      </div>
      <motion.div 
        className="flex justify-between items-center bg-red-100 p-4 rounded-lg border-2 border-red-500"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="text-red-900 font-bold">Quantum Time</span>
        <span className="text-2xl font-black text-red-600">8 HOURS</span>
      </motion.div>
    </div>
  </div>
);

const VisualHarvestSimple = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-900 p-8">
      <div className="text-red-400 font-bold text-2xl mb-8">
        Harvest Now, Decrypt Later
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="text-white text-lg">Encrypted Data Collected:</div>
        <motion.div
          className="text-red-400 text-3xl font-mono"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          100%
        </motion.div>
      </div>

      <div className="w-96 bg-slate-700 rounded-full h-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-red-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="text-slate-400 text-sm mt-4">
        Waiting for quantum computers...
      </div>
    </div>
  );
};

const VisualAliceBob = ({ hasHacker }) => (
  <div className="flex flex-col justify-center h-full w-full bg-slate-900 px-10 relative">
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-center z-10">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_#2563eb]">
          <User className="text-white" size={32}/>
        </div>
        <span className="text-blue-300 mt-2 font-bold">ALICE</span>
      </div>

      <div className="flex-grow h-1 bg-slate-800 relative mx-4">
        {!hasHacker && (
           <motion.div 
             className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_cyan]"
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 2, repeat: Infinity }}
           />
        )}
        {hasHacker && (
          <div className="w-1/2 h-full bg-red-600 shadow-[0_0_10px_red] mx-auto"></div>
        )}
      </div>

      <div className="flex flex-col items-center z-10">
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-[0_0_20px_#16a34a]">
          <User className="text-white" size={32}/>
        </div>
        <span className="text-green-300 mt-2 font-bold">BOB</span>
      </div>
    </div>

    {hasHacker && (
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
      >
        <Eye size={64} className="text-red-500" />
      </motion.div>
    )}
  </div>
);

const VisualTable = () => (
  <div className="h-full w-full bg-white p-4 overflow-hidden flex flex-col justify-center">
    <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm border border-slate-200 rounded">
      <div className="p-2 bg-slate-100 font-bold">Metric</div>
      <div className="p-2 bg-cyan-100 font-bold text-cyan-900">Quantum</div>
      <div className="p-2 bg-slate-100 font-bold text-slate-600">Traditional</div>
      
      <div className="p-2 border-t">Speed</div>
      <div className="p-2 border-t text-cyan-700 font-bold">100M x Faster</div>
      <div className="p-2 border-t text-slate-500">Sequential</div>

      <div className="p-2 border-t">Temp</div>
      <div className="p-2 border-t text-cyan-700 font-bold">Abs. Zero</div>
      <div className="p-2 border-t text-slate-500">Room Temp</div>

      <div className="p-2 border-t">Security</div>
      <div className="p-2 border-t bg-red-50 text-red-600 font-bold">Breaks RSA</div>
      <div className="p-2 border-t text-slate-500">Vulnerable</div>
    </div>
    <div className="text-[10px] text-slate-400 mt-2 text-center">Source: PatentPC (2025)</div>
  </div>
);

const VisualEndWarp = () => {
  return (
    <div className="h-full w-full bg-black relative overflow-hidden flex items-center justify-center">
      {/* Warp Stars */}
      {[...Array(50)].map((_, i) => {
        const startX = 50 + (Math.random() - 0.5) * 100;
        const startY = 50 + (Math.random() - 0.5) * 100;
        const angle = Math.atan2(startY - 50, startX - 50);
        const distance = 200;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${startX}%`, top: `${startY}%` }}
            animate={{
              x: [(endX - startX) * -0.5, (endX - startX)],
              y: [(endY - startY) * -0.5, (endY - startY)],
              opacity: [0, 1, 0],
              scaleX: [1, 3, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: "easeOut"
            }}
          />
        );
      })}

      {/* Text */}
      <div className="z-10 text-center">
        <motion.h1
          className="text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Thank You
        </motion.h1>
        <motion.p
          className="text-2xl text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Questions?
        </motion.p>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const renderVisual = (type) => {
    switch(type) {
      case 'lock-dissolve': return <VisualLock />;
      case 'fridge-magic': return <VisualFridge />;
      case 'switches': return <VisualSwitches />;
      case 'spinning-coin': return <VisualCoin />;
      case 'bubble-pop': return <VisualBubble />;
      case 'knot': return <VisualKnot />;
      case 'braiding-time': return <VisualBraidingTime />;
      case 'maze': return <VisualMaze />;
      case 'rsa-table': return <VisualRSA />;
      case 'alice-bob': return <VisualAliceBob hasHacker={false} />;
      case 'observer': return <VisualAliceBob hasHacker={true} />;
      case 'comparison-table': return <VisualTable />;
      case 'harvest-simple': return <VisualHarvestSimple />;
      case 'end-warp': return <VisualEndWarp />;
      default: return <div className="bg-slate-200 h-full w-full flex items-center justify-center">Visual Placeholder</div>;
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-screen w-screen bg-slate-900 flex items-center justify-center font-sans overflow-hidden p-8">
      
      <div className="max-w-6xl w-full aspect-video bg-white flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
        
        <div className="w-full md:w-5/12 h-64 md:h-full bg-slate-100 border-r border-slate-200 relative overflow-hidden">
          {renderVisual(slide.visual)}
          
          <div className="absolute bottom-4 left-4 bg-white/80 px-2 py-1 rounded text-xs font-mono text-slate-500">
            SLIDE {currentSlide + 1} / {slides.length}
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 flex flex-col justify-center bg-white relative">
          
          <div className="mb-6">
             <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
               {slide.title}
             </h1>
             {slide.subtitle && (
               <h2 className="text-lg text-cyan-600 font-medium">{slide.subtitle}</h2>
             )}
          </div>

          {slide.definition && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow-sm">
               <div className="flex items-center gap-2 text-yellow-700 font-bold text-xs uppercase tracking-wider mb-1">
                 <BookOpen size={14} /> Study Definition
               </div>
               <p className="text-sm text-slate-700 font-medium">
                 {slide.definition}
               </p>
            </div>
          )}

          <div className="prose prose-slate max-w-none">
             <p className="text-lg text-slate-600 leading-relaxed">
               {slide.content}
             </p>
          </div>

          <div className="absolute bottom-4 right-8 text-slate-300 text-xs font-mono animate-pulse">
             USE [←] ARROW KEYS [→]
          </div>

        </div>
      </div>

    </div>
  );
};

export default App;
