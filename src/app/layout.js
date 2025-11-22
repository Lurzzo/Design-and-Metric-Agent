import './globals.css';

export const metadata = {
    title: 'PoC Design & Metrics Agent',
    description: 'AI-powered agent for Innovation PoC ideation and prototyping',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
