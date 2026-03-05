import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import AIDemoSection from '@/components/sections/AIDemoSection';
import PlatformFlow from '@/components/sections/PlatformFlow';
import SchedulerPreview from '@/components/sections/SchedulerPreview';
import AnalyticsPreview from '@/components/sections/AnalyticsPreview';
import CampaignBuilder from '@/components/sections/CampaignBuilder';
import DashboardPreview from '@/components/sections/DashboardPreview';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <AIDemoSection />
                <PlatformFlow />
                <SchedulerPreview />
                <AnalyticsPreview />
                <CampaignBuilder />
                <DashboardPreview />
                <PricingSection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
