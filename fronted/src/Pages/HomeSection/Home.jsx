import React from 'react'
import Hero from './Hero'
import ServicesCard from '../ServiceSection/ServiceCard'
import EnrollSection from '../Enroll/EnrollSection'
import TuitionModes from '../../components/Tution'
import Institute from './Institute'
import WhyChooseUs from './WhyChoose'
import TestimonialSection from '../HomeSection/Testimonial'
const Home = () => {
  return (
    <>
      <Hero />
      <ServicesCard />
      <Institute />
      <EnrollSection />
      <WhyChooseUs />
      <TuitionModes />
      <TestimonialSection />


    </>
  )
}

export default Home
