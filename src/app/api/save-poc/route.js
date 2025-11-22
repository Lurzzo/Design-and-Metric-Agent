import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'OpenAI API Key is missing' }, { status: 500 });
        }
        const openai = new OpenAI({ apiKey });

        const { context, poc, metrics } = await req.json();

        if (!context || !poc || !metrics) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        // Generate filename using AI
        const filenameCompletion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a file naming assistant. Generate a concise filename (max 4 words) for a JSON file based on the user's innovation context.
          Format: snake_case (e.g., drone_delivery_system.json).
          Output ONLY the filename.`
                },
                {
                    role: 'user',
                    content: context
                }
            ],
        });

        let filename = filenameCompletion.choices[0].message.content.trim();
        // Ensure extension is .json
        if (!filename.endsWith('.json')) {
            filename += '.json';
        }
        // Sanitize filename just in case
        filename = filename.replace(/[^a-z0-9_.]/gi, '_');

        const saveDir = path.join(process.cwd(), 'saved_pocs');
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir);
        }

        const filePath = path.join(saveDir, filename);
        const fileContent = JSON.stringify({
            timestamp: new Date().toISOString(),
            context,
            poc,
            metrics
        }, null, 2);

        fs.writeFileSync(filePath, fileContent);

        return NextResponse.json({ success: true, filename });
    } catch (error) {
        console.error('Save Error:', error);
        return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }
}
