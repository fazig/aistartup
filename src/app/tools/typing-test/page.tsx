"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Keyboard, Timer, RotateCcw, Trophy, Settings, Activity, Target, 
  ChevronRight, Volume2, VolumeX, AlignLeft, Clock
} from 'lucide-react';
import Head from 'next/head';

const WORD_LISTS = {
  easy: "the quick brown fox jumps over the lazy dog this is a simple typing test for beginners to practice their skills keep typing words fast to get a high score on the board",
  medium: "Typing games are an excellent way to improve both your speed and accuracy. Many professionals rely on fast typing skills to complete their daily tasks efficiently. Practice regularly to see continuous improvement in your WPM.",
  hard: "JavaScript, Python, & C++ are prominent languages in 2026! Learning to code requires typing symbols like { }, [ ], and => accurately. Can you maintain 100% accuracy while typing 85+ WPM? Let's find out right now."
};

type Mode = 'time' | 'words';
type Duration = 15 | 30 | 60;
type WordCount = 10 | 25 | 50;

export default function TypingTest() {
  const [mode, setMode] = useState<Mode>('time');
  const [timeLimit, setTimeLimit] = useState<Duration>(60);
  const [wordLimit, setWordLimit] = useState<WordCount>(25);
  
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');
  const [mistakes, setMistakes] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);
  
  // Audio Context for sound effects
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playSound = (type: 'click' | 'error' | 'finish') => {
    if (!soundEnabled || !audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'finish') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  };

  const generateText = useCallback(() => {
    // Combine texts randomly to create a long enough string
    const baseWords = `${WORD_LISTS.easy} ${WORD_LISTS.medium} ${WORD_LISTS.hard}`.split(' ').sort(() => 0.5 - Math.random());
    let finalText = "";
    
    if (mode === 'words') {
      finalText = baseWords.slice(0, wordLimit).join(' ');
    } else {
      // For time mode, just generate a very long string
      finalText = Array(10).fill(baseWords).flat().join(' ');
    }
    
    setText(finalText);
    setUserInput("");
    setStatus('idle');
    setStartTime(null);
    setEndTime(null);
    setMistakes(0);
    setTotalKeystrokes(0);
    setTimeLeft(timeLimit);
  }, [mode, timeLimit, wordLimit]);

  useEffect(() => {
    generateText();
  }, [generateText]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'running' && mode === 'time') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, mode]);
  
  // Keep focus on hidden input when clicking anywhere on the game area
  const focusInput = () => {
    if (status !== 'finished') {
      inputRef.current?.focus();
    }
  };

  const finishTest = () => {
    setStatus('finished');
    setEndTime(Date.now());
    playSound('finish');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    if (status === 'idle') {
      setStatus('running');
      setStartTime(Date.now());
      initAudio();
    }
    
    setTotalKeystrokes(prev => prev + 1);
    
    // Check if new character is correct
    if (val.length > userInput.length) {
      const newChar = val[val.length - 1];
      const expectedChar = text[val.length - 1];
      
      if (newChar === expectedChar) {
        playSound('click');
      } else {
        setMistakes(prev => prev + 1);
        playSound('error');
      }
    }

    setUserInput(val);
    
    if (val.length >= text.length) {
      finishTest();
    }
  };

  // Calculations
  const calculateStats = () => {
    const timeElapsedInMinutes = startTime 
      ? ((endTime || Date.now()) - startTime) / 60000 
      : 1;
      
    // Standard WPM calculation (5 chars = 1 word)
    const grossWPM = Math.round((totalKeystrokes / 5) / timeElapsedInMinutes);
    const netWPM = Math.round(((totalKeystrokes - mistakes) / 5) / timeElapsedInMinutes);
    
    let accuracy = 100;
    if (totalKeystrokes > 0) {
      accuracy = Math.round(((totalKeystrokes - mistakes) / totalKeystrokes) * 100);
    }

    return {
      wpm: Math.max(0, netWPM),
      grossWpm: Math.max(0, grossWPM),
      accuracy,
      timeElapsed: Math.round(timeElapsedInMinutes * 60)
    };
  };

  const stats = calculateStats();

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .typing-char {
          font-family: 'Consolas', 'Courier New', monospace;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          transition: all 0.1s ease;
          position: relative;
        }
        .char-correct { color: #16a34a; }
        .char-incorrect { color: #ef4444; text-decoration: underline; background: rgba(239, 68, 68, 0.1); }
        .char-pending { color: var(--text-muted); opacity: 0.7; }
        
        .cursor-active::after {
          content: '|';
          position: absolute;
          right: -5px;
          top: -2px;
          color: var(--primary);
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(147, 51, 234, 0.05);
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border-light);
          text-align: center;
          transition: transform 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .active-btn {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
      `}} />

      <Head>
        <title>Professional Typing Test Game | StartupAI Tools</title>
        <meta name="description" content="Test your typing speed and accuracy with our fast, interactive typing game. Improve your WPM today." />
      </Head>

      <div className="section" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', minHeight: 'calc(100vh - 80px)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(147, 51, 234, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
              <Keyboard size={16} /> Typing Speed Test
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              How fast can you type?
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              Measure your typing speed (WPM) and accuracy. Play the time attack puzzle or test your endurance.
            </p>
          </div>

          {/* Settings Bar */}
          <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', background: 'var(--bg-main)', borderRadius: '8px', padding: '0.25rem', border: '1px solid var(--border-light)' }}>
                <button 
                  onClick={() => setMode('time')} 
                  className={mode === 'time' ? 'btn active-btn' : 'btn'}
                  style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', border: 'none', background: mode === 'time' ? '' : 'transparent', color: mode === 'time' ? '' : 'var(--text-muted)' }}
                >
                  <Clock size={16} /> Time Attack
                </button>
                <button 
                  onClick={() => setMode('words')} 
                  className={mode === 'words' ? 'btn active-btn' : 'btn'}
                  style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', border: 'none', background: mode === 'words' ? '' : 'transparent', color: mode === 'words' ? '' : 'var(--text-muted)' }}
                >
                  <AlignLeft size={16} /> Word Count
                </button>
              </div>

              {mode === 'time' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[15, 30, 60].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setTimeLimit(t as Duration)}
                      style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: timeLimit === t ? 'var(--primary)' : 'var(--bg-main)', color: timeLimit === t ? 'white' : 'var(--text-muted)', fontWeight: timeLimit === t ? 600 : 400 }}
                    >
                      {t}s
                    </button>
                  ))}
                </div>
              )}

              {mode === 'words' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[10, 25, 50].map((w) => (
                    <button 
                      key={w}
                      onClick={() => setWordLimit(w as WordCount)}
                      style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: wordLimit === w ? 'var(--primary)' : 'var(--bg-main)', color: wordLimit === w ? 'white' : 'var(--text-muted)', fontWeight: wordLimit === w ? 600 : 400 }}
                    >
                      {w}w
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => { initAudio(); setSoundEnabled(!soundEnabled); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: soundEnabled ? 'var(--primary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>

          {/* Game Area */}
          {status !== 'finished' ? (
            <div 
              className="glass-panel" 
              style={{ padding: '2.5rem', position: 'relative', cursor: 'text', minHeight: '300px', display: 'flex', flexDirection: 'column' }}
              onClick={focusInput}
            >
              {/* Live HUD */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '1.25rem', fontWeight: 600 }}>
                <div style={{ color: 'var(--primary)' }}>
                  {mode === 'time' ? `${timeLeft}s` : `${userInput.split(' ').filter(Boolean).length}/${wordLimit}`}
                </div>
                {status === 'running' && (
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <span>{stats.wpm} WPM</span>
                    <span>{stats.accuracy}%</span>
                  </div>
                )}
              </div>

              {/* Hidden Input */}
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                autoFocus
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, zIndex: -1 }}
              />

              {/* Text Display */}
              <div ref={textDisplayRef} style={{ lineHeight: '1.8', wordWrap: 'break-word' }}>
                {text.split('').map((char, index) => {
                  let className = "typing-char char-pending";
                  let isCursor = false;
                  
                  if (index < userInput.length) {
                    className = userInput[index] === char 
                      ? "typing-char char-correct" 
                      : "typing-char char-incorrect";
                  } else if (index === userInput.length) {
                    isCursor = true;
                  }

                  return (
                    <span key={index} className={`${className} ${isCursor ? 'cursor-active' : ''}`}>
                      {char}
                    </span>
                  );
                })}
              </div>

              {status === 'idle' && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(2px)', borderRadius: '16px' }}>
                  <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', animation: 'bounce 2s infinite' }}>
                    <Keyboard size={20} /> Click to focus & start typing
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: 'rgba(147, 51, 234, 0.1)', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Trophy size={40} />
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Test Complete!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Great job. Here is how you performed.</p>

              <div className="grid-3" style={{ marginBottom: '3rem' }}>
                <div className="stat-card">
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}><Activity size={16}/> Net Speed</div>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>{stats.wpm}</div>
                  <div style={{ color: 'var(--text-muted)' }}>WPM</div>
                </div>
                
                <div className="stat-card">
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}><Target size={16}/> Accuracy</div>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: stats.accuracy >= 95 ? '#16a34a' : '#eab308' }}>{stats.accuracy}%</div>
                  <div style={{ color: 'var(--text-muted)' }}>{stats.grossWpm} Gross WPM</div>
                </div>

                <div className="stat-card">
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}><Timer size={16}/> Time</div>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)' }}>{stats.timeElapsed}</div>
                  <div style={{ color: 'var(--text-muted)' }}>Seconds</div>
                </div>
              </div>

              <button onClick={generateText} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <RotateCcw size={20} /> Try Again
              </button>
            </div>
          )}

          <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <p>Tip: Your Net WPM is calculated by subtracting your uncorrected errors from your Gross WPM.</p>
          </div>

        </div>
      
      <div className="prose" style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-main)', borderRadius: '12px' }}>
        <h2>Why Take a Typing Speed Test?</h2>
        <p>A typing speed test is the best way to measure your Words Per Minute (WPM) and typing accuracy. In today's digital world, being able to type quickly and accurately is an essential skill for professionals, students, and developers alike. By taking regular typing tests, you can track your progress over time and identify which keys slow you down.</p>
        <h3>How is Words Per Minute (WPM) calculated?</h3>
        <p>WPM is calculated based on the standard assumption that a "word" consists of five characters or keystrokes, including spaces. If you type 50 characters in one minute, your speed is 10 WPM. Our free online typing test algorithm also factors in your accuracy by subtracting penalties for uncorrected errors, giving you your "Net WPM," which is the truest reflection of your typing speed.</p>
        <p>To improve your typing speed, focus on accuracy first. Keep your hands in the proper home-row position and avoid looking at the keyboard. Practice daily for just 10 minutes using this free typing test, and you will see your WPM naturally increase as muscle memory takes over.</p>
      </div>
</div>
    </>
  );
}
