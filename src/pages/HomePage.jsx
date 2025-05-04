import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import FavouriteClients from '../components/FavouriteClients';
import Blog from '../components/Blog';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Projects />
      <Testimonials />
      <FavouriteClients />
      <Blog />
      <Contact />
    </>
  );
};

export default HomePage;