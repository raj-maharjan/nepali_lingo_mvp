"use client";

import { useCallback, useEffect, useState } from "react";

export const useTTS = () => {
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            setSupported(true);
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (!supported) return;

        const utterance = new SpeechSynthesisUtterance(text);
        // Try to find a Nepali voice, otherwise use default
        const voices = window.speechSynthesis.getVoices();
        const nepaliVoice = voices.find((v) => v.lang === "ne-NP");

        if (nepaliVoice) {
            utterance.voice = nepaliVoice;
        }

        utterance.rate = 0.9; // Slightly slower for learning
        window.speechSynthesis.speak(utterance);
    }, [supported]);

    return { speak, supported };
};
