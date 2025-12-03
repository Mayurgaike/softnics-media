import Box from '@mui/material/Box';

import SocialBar from './components/layout/SocialBar';
import NavBar from './components/layout/NavBar';
import HeroSlider from './components/sections/HeroSlider';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import MissionVisionSection from './components/sections/MissionVisionSection';
import ClientsSection from './components/sections/ClientsSection';
import TeamSection from './components/sections/TeamSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <SocialBar />
      <NavBar />
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <MissionVisionSection />
      <ClientsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </Box>
  );
};

export default App;
