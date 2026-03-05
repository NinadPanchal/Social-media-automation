import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
export const metadata = {
    title: 'AutoSocial AI — AI-Powered Social Media Automation',
    description: 'Automate your entire social media strategy with AI. Generate posts, schedule content, analyze performance, and manage campaigns across Instagram, Twitter, LinkedIn, and Facebook.',
    keywords: 'social media automation, AI marketing, content generation, social media scheduler, analytics',
    openGraph: {
        title: 'AutoSocial AI — AI-Powered Social Media Automation',
        description: 'Automate your entire social media strategy with AI.',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <div className="noise-overlay" aria-hidden="true" />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
