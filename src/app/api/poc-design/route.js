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
                    content: `Você é um Arquiteto de PoC de Inovação especialista. Seu objetivo é desenhar uma Prova de Conceito de Baixa Fidelidade baseada na ideia do usuário.
          
          DIRETRIZES DE RESPOSTA:
          1. IDIOMA: Português do Brasil (PT-BR).
          2. TOM: Altamente técnico, profissional e direto.
          3. FORMATO: TEXTO PURO APENAS. NÃO USE MARKDOWN (nada de negrito, itálico, headers com #, etc). Use letras maiúsculas para títulos de seção.
          
          Estruture sua resposta com as seguintes seções:
          
          ESCOPO MVP
          Defina o escopo mínimo viável para a PoC.
          
          ROADMAP TÉCNICO
          Descreva sprints e milestones.
          
          MÉTRICAS DE SUCESSO
          Métricas específicas para esta PoC.
          
          REQUISITOS DE DADOS
          Identifique dados necessários e disponibilidade.
          
          ARQUITETURA SIMPLIFICADA
          Proponha uma arquitetura técnica de alto nível.
          
          Seja conciso, prático e focado em validação rápida.`
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
        return NextResponse.json({ error: 'Failed to generate PoC design' }, { status: 500 });
    }
}
