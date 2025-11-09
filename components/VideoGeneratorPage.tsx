import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

// Loading messages to show during generation
const loadingMessages = [
    "Warming up the pixels...",
    "Reticulating splines...",
    "Composing the scenes...",
    "Rendering the digital film...",
    "This can take a few minutes, please wait...",
    "Finalizing the masterpiece...",
    "Almost there..."
];

const VideoGeneratorPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
    const [error, setError] = useState<string | null>(null);
    const [apiKeySelected, setApiKeySelected] = useState(false);
    
    // Check for API key on component mount
    useEffect(() => {
        const checkApiKey = async () => {
            if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
                const hasKey = await window.aistudio.hasSelectedApiKey();
                setApiKeySelected(hasKey);
            } else {
                // Fallback for environments where aistudio is not available
                setError("API key management is unavailable in this environment.");
            }
        };
        checkApiKey();
    }, []);

    // Cycle through loading messages
    useEffect(() => {
        let interval: number;
        if (loading) {
            interval = window.setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = loadingMessages.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingMessages.length;
                    return loadingMessages[nextIndex];
                });
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleSelectKey = async () => {
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
            await window.aistudio.openSelectKey();
            // Assume key selection is successful to avoid race conditions.
            // The API call will fail if it's not, and the UI will reset.
            setApiKeySelected(true);
        }
    };
    
    const generateVideo = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }

        setLoading(true);
        setError(null);
        setVideoUrl(null);
        setLoadingMessage(loadingMessages[0]);

        try {
            // Create a new instance right before the call
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            let operation = await ai.models.generateVideos({
                model: 'veo-3.1-fast-generate-preview',
                prompt: prompt,
                config: {
                    numberOfVideos: 1,
                    resolution: '720p',
                    aspectRatio: aspectRatio
                }
            });

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation: operation });
            }

            if (operation.response?.generatedVideos?.[0]?.video?.uri) {
                const downloadLink = operation.response.generatedVideos[0].video.uri;
                const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch video: ${response.statusText}`);
                }
                const videoBlob = await response.blob();
                const url = URL.createObjectURL(videoBlob);
                setVideoUrl(url);
            } else {
                 throw new Error('Video generation completed, but no video URI was found.');
            }

        } catch (e: any) {
            console.error(e);
            let errorMessage = 'An error occurred while generating the video. Please try again.';
            if (e.message && e.message.includes("Requested entity was not found.")) {
                errorMessage = "Your API key is invalid. Please select a valid key to continue.";
                setApiKeySelected(false); // Reset key state to re-prompt user
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateVideo();
        }
    };

    const renderApiKeySelection = () => (
        <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 016-6h7.5a6 6 0 016 6z" />
            </svg>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">API Key Required</h2>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                To use the Veo video generation model, you need to select an API key. This service may incur costs. Please review the pricing information before proceeding.
            </p>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline font-semibold">
                View Billing Information
            </a>
            <button
                onClick={handleSelectKey}
                className="btn-vintage font-bold py-3 px-6 rounded-sm text-xl"
            >
                Select API Key
            </button>
        </div>
    );
    
    const renderGenerator = () => (
        <>
            <p className="text-lg text-center text-[var(--color-text-muted)]">
                Bring your ideas to life! Describe a scene, and our AI will generate a short video for you.
            </p>

            <div className="w-full space-y-4">
                <label htmlFor="prompt-input" className="sr-only">Video Prompt</label>
                <textarea
                    id="prompt-input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., An animated evolution of a vintage typewriter transforming into a futuristic, glowing keyboard."
                    className="w-full bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-3 rounded-sm border-2 border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg resize-none"
                    rows={3}
                    disabled={loading}
                    aria-label="Video generation prompt"
                />
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--color-text-muted)]">Aspect Ratio:</span>
                        <button
                            onClick={() => setAspectRatio('16:9')}
                            className={`px-3 py-1 transition-colors ${aspectRatio === '16:9' ? 'bg-[var(--color-primary)] text-[var(--color-bg)] rounded-sm' : 'hover:underline'}`}
                            disabled={loading}
                        >
                            16:9 (Landscape)
                        </button>
                         <button
                            onClick={() => setAspectRatio('9:16')}
                            className={`px-3 py-1 transition-colors ${aspectRatio === '9:16' ? 'bg-[var(--color-primary)] text-[var(--color-bg)] rounded-sm' : 'hover:underline'}`}
                            disabled={loading}
                        >
                            9:16 (Portrait)
                        </button>
                    </div>
                     <button
                        onClick={generateVideo}
                        disabled={loading || !prompt.trim()}
                        className="btn-vintage font-bold py-3 px-6 rounded-sm text-lg whitespace-nowrap disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                        aria-live="polite"
                        aria-busy={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Video'}
                    </button>
                </div>
            </div>

            <div role="status" className="w-full">
                {error && <p className="bg-red-500/20 text-red-800 p-3 rounded-sm text-center border border-red-800/50 w-full">{error}</p>}
            </div>

            <div 
                className={`w-full bg-[var(--color-secondary)]/50 rounded-sm border-2 border-dashed border-[var(--color-border)] flex items-center justify-center mt-4 transition-all ${aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16] max-h-[70vh]'}`} 
                aria-live="polite"
            >
                {loading && (
                    <div className="flex flex-col items-center gap-4 text-[var(--color-text-muted)] p-4" role="alert" aria-label="Generating video, please wait.">
                        <svg className="animate-spin h-12 w-12 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="font-semibold text-lg text-center">{loadingMessage}</p>
                    </div>
                )}
                
                {!loading && videoUrl && (
                     <video src={videoUrl} controls className="w-full h-full object-contain rounded-sm" />
                )}

                {!loading && !videoUrl && (
                    <div className="text-center text-[var(--color-text-muted)] p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        <p className="mt-2 font-semibold">Your generated video will appear here.</p>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-[var(--color-primary)]">Video AI Generator</h1>
            {!apiKeySelected ? renderApiKeySelection() : renderGenerator()}
        </div>
    );
};

export default VideoGeneratorPage;