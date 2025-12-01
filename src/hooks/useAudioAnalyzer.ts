import { useState, useEffect, useRef } from 'react';

export const useAudioAnalyzer = (isListening: boolean) => {
  const [amplitude, setAmplitude] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isListening) {
      startAnalyzing();
    } else {
      stopAnalyzing();
    }

    return () => {
      stopAnalyzing();
    };
  }, [isListening]);

  const startAnalyzing = async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('getUserMedia is not supported in this browser');
        return;
      }

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;

      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create analyzer
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      analyzer.smoothingTimeConstant = 0.8;
      analyzerRef.current = analyzer;

      // Connect microphone to analyzer
      const microphone = audioContext.createMediaStreamSource(stream);
      microphoneRef.current = microphone;
      microphone.connect(analyzer);

      // Start analyzing
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      
      const analyze = () => {
        if (!analyzerRef.current) return;

        analyzerRef.current.getByteFrequencyData(dataArray);
        
        // Enhanced voice frequency analysis
        let sum = 0;
        let count = 0;
        let peakValue = 0;
        
        // Analyze voice frequency range (85Hz - 1000Hz)
        // This gives better response to human voice
        for (let i = 0; i < Math.min(dataArray.length / 2, 80); i++) {
          const value = dataArray[i];
          sum += value;
          count++;
          peakValue = Math.max(peakValue, value);
        }
        
        const average = count > 0 ? sum / count : 0;
        
        // Combine average and peak for more dynamic response
        const combined = (average * 0.6) + (peakValue * 0.4);
        
        // Normalize with enhanced sensitivity for better visual feedback
        const normalizedAmplitude = Math.min(combined / 80, 1);
        
        // Smooth but responsive - like Siri
        const smoothedAmplitude = normalizedAmplitude * 0.75 + (amplitude * 0.25);
        
        setAmplitude(smoothedAmplitude);
        
        animationFrameRef.current = requestAnimationFrame(analyze);
      };

      analyze();
    } catch (error) {
      console.error('Error accessing microphone for audio analysis:', error);
      // Even if microphone access fails, we can still show visual feedback
      // by simulating amplitude based on listening state
      setAmplitude(0);
    }
  };

  const stopAnalyzing = () => {
    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Disconnect and close audio nodes
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Stop media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    analyzerRef.current = null;
    setAmplitude(0);
  };

  return amplitude;
};