import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'OpenAI API Key is missing' }, { status: 500 });
        }
        const openai = new OpenAI({ apiKey });

        const { context } = await req.json();

        if (!context) {
            return NextResponse.json({ error: 'Context is required' }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `Você é um especialista em Métricas & KPIs para Inovação. Seu objetivo é definir um framework de mensuração para a PoC do usuário.
          
          DIRETRIZES DE RESPOSTA:
          1. IDIOMA: Português do Brasil (PT-BR).
          2. TOM: Altamente técnico, profissional e orientado a dados.
          3. FORMATO: TEXTO PURO APENAS. NÃO USE MARKDOWN (nada de negrito, itálico, headers com #, etc). Use letras maiúsculas para títulos de seção.
          
          Estruture sua resposta com as seguintes seções:
          
          ÁRVORE DE MÉTRICAS
          Defina indicadores Leading (antecedentes) e Lagging (resultantes).
          
          BASELINES E METAS
          Defina baselines iniciais e metas de sucesso.
          
          FERRAMENTAS DE TRACKING
          Sugira ferramentas para rastrear essas métricas.
          
          MOCKUP DE DASHBOARD
          Descreva o layout visual de um dashboard (ex: "Canto superior esquerdo: Gráfico de Usuários Ativos Diários...").
          
          FREQUÊNCIA DE MEDIÇÃO
          Estabeleça com que frequência medir e revisar.
          
          Seja específico ao contexto fornecido.`
                },
                {
                    role: 'user',
                    content: `Context: ${context}`
                }
            ],
        });

        const content = completion.choices[0].message.content;

        return NextResponse.json({ content });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        return NextResponse.json({ error: 'Failed to generate metrics' }, { status: 500 });
    }
}
