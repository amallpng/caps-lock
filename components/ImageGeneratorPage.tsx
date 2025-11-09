import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ImageGeneratorPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateImage = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }

        setLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '1:1',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                const url = `data:image/jpeg;base64,${base64ImageBytes}`;
                setImageUrl(url);
            } else {
                setError('No image was generated. Please try a different prompt.');
            }
        } catch (e) {
            console.error(e);
            setError('An error occurred while generating the image. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            generateImage();
        }
    };

    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-[var(--color-primary)]">Image Generator</h1>
            <p className="text-lg text-center text-[var(--color-text-muted)]">
                Bring your ideas to life! Describe what you want to see, and our AI will create an image for you.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-4">
                <label htmlFor="prompt-input" className="sr-only">Image Prompt</label>
                <input
                    id="prompt-input"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., A vintage typewriter on a wooden desk..."
                    className="flex-grow bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-3 rounded-sm border-2 border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg"
                    disabled={loading}
                    aria-label="Image generation prompt"
                />
                <button
                    onClick={generateImage}
                    disabled={loading}
                    className="btn-vintage font-bold py-3 px-6 rounded-sm text-lg whitespace-nowrap disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                    aria-live="polite"
                    aria-busy={loading}
                >
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </div>
            
            <div role="status" className="w-full">
                {error && <p className="bg-red-500/20 text-red-800 p-3 rounded-sm text-center border border-red-800/50 w-full">{error}</p>}
            </div>

            <div className="w-full aspect-square bg-[var(--color-secondary)]/50 rounded-sm border-2 border-dashed border-[var(--color-border)] flex items-center justify-center mt-4" aria-live="polite">
                {loading && (
                    <div className="flex flex-col items-center gap-4 text-[var(--color-text-muted)]" role="alert" aria-label="Generating image, please wait.">
                        <svg className="animate-spin h-12 w-12 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="font-semibold text-lg">Creating your masterpiece...</p>
                    </div>
                )}
                
                {!loading && imageUrl && (
                     <img src={imageUrl} alt={prompt || "Generated image"} className="w-full h-full object-contain rounded-sm" />
                )}

                {!loading && !imageUrl && (
                    <div className="text-center text-[var(--color-text-muted)] p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="mt-2 font-semibold">Your generated image will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageGeneratorPage;
