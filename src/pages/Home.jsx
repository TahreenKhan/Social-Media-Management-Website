import React from 'react';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import VisionFounders from '../components/VisionFounders/VisionFounders';
import FeaturedWork from '../components/FeaturedWork/FeaturedWork';
import PackageVault from '../components/PackageVault/PackageVault';
import PackageBuilder from '../components/PackageBuilder/PackageBuilder';
import EcosystemUniverse from '../components/EcosystemUniverse/EcosystemUniverse';
import Contact from '../components/Contact/Contact';

const Home = ({ addToCart }) => {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedWork />
      <PackageVault addToCart={addToCart} />
      <PackageBuilder addToCart={addToCart} />
      <VisionFounders />
      <EcosystemUniverse />
      <Contact />
    </>
  );
};

export default Home;
