import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Servicios from '../components/Servicios.jsx'
import Portafolio from '../components/Portafolio.jsx'
import Precios from '../components/Precios.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Testimonios from '../components/Testimonios.jsx'
import Footer from '../components/Footer.jsx'

export default function Landing() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Servicios />
        <Portafolio />
        <Precios />
        <ContactForm />
        <Testimonios />
      </main>
      <Footer />
    </>
  )
}
