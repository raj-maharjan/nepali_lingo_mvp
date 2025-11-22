"use client";

import { useCallback } from "react";

export const useSounds = () => {
    const playSound = useCallback((type: "correct" | "wrong" | "finish") => {
        if (typeof window === "undefined") return;

        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === "correct") {
            // High pitch ding
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        } else if (type === "wrong") {
            // Low pitch buzz
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(100, now + 0.3);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === "finish") {
            // Victory fanfare (simple arpeggio)
            const playNote = (freq: number, time: number, duration: number) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g);
                g.connect(ctx.destination);
                o.type = "triangle";
                o.frequency.value = freq;
                g.gain.setValueAtTime(0.2, time);
                g.gain.exponentialRampToValueAtTime(0.01, time + duration);
                o.start(time);
                o.stop(time + duration);
            };

            playNote(523.25, now, 0.2); // C5
            playNote(659.25, now + 0.2, 0.2); // E5
            playNote(783.99, now + 0.4, 0.4); // G5
            playNote(1046.50, now + 0.6, 0.8); // C6
        }
    }, []);

    return { playSound };
};
