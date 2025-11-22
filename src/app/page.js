'use client';

import { useState } from 'react';
import { Send, Loader2, BarChart2, Layers, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
    const [context, setContext] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const [pocRes, metricsRes] = await Promise.all([
                fetch('/api/poc-design', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ context }),
                }),
                fetch('/api/metrics-generator', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ context }),
                }),
            ]);

            const pocData = await pocRes.json();
            const metricsData = await metricsRes.json();

            setResult({ poc: pocData, metrics: metricsData });

            // Save to JSON
            try {
                const saveRes = await fetch('/api/save-poc', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        context,
                        poc: pocData,
                        metrics: metricsData
                    }),
                });
                const saveData = await saveRes.json();
                if (saveData.success) {
                    alert(`Projeto salvo com sucesso em: saved_pocs/${saveData.filename}`);
                }
            } catch (saveError) {
                console.error('Error saving:', saveError);
            }

        } catch (error) {
            console.error('Error generating results:', error);
            alert('Erro ao gerar resultados. Verifique sua chave de API e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16">

                {/* Header */}
                <header className="text-center space-y-6 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 mb-4">
                        <Sparkles size={16} className="text-blue-600" />
                        <span className="text-slate-600 text-sm font-medium">AI Innovation Assistant</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
                        PoC & Metrics <br />
                        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Generator</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Transforme ideias em planos de PoC estruturados e frameworks de métricas em segundos com inteligência artificial.
                    </p>
                </header>

                {/* Input Section */}
                <section className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label htmlFor="context" className="text-base font-semibold text-slate-700 ml-1 block">
                                Descreva sua ideia ou contexto de inovação
                            </label>
                            <div className="relative">
                                <textarea
                                    id="context"
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                    placeholder="Ex: Um sistema de drones para entrega de medicamentos em áreas rurais..."
                                    className="w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-lg text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-slate-400 shadow-inner"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading || !context}
                                className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-blue-600/30"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Gerando Estratégia...
                                    </>
                                ) : (
                                    <>
                                        Gerar Plano
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Results Section */}
                {result && (
                    <div className="grid md:grid-cols-2 gap-8 animate-slide-up">

                        {/* PoC Design Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                                    <Layers size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">PoC Design</h2>
                            </div>
                            <div className="prose prose-slate prose-lg max-w-none">
                                <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                                    {result.poc.content}
                                </div>
                            </div>
                        </div>

                        {/* Metrics Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                                <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                                    <BarChart2 size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">Metrics & KPIs</h2>
                            </div>
                            <div className="prose prose-slate prose-lg max-w-none">
                                <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                                    {result.metrics.content}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
}
