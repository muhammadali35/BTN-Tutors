import React from 'react'
import Hero from './Hero'
import ServicesCard from '../ServiceSection/ServiceCard'
import EnrollSection from '../Enroll/EnrollSection'
import TuitionModes from '../../components/Tution'
import Institute from './Institute'
import WhyChooseUs from './WhyChoose'
const Home = () => {
  return (
    <>
    <Hero/>
    <ServicesCard/>
    <EnrollSection/>
    <WhyChooseUs/>
    <TuitionModes/>
    <Institute/>
    </>
  )
}

export default Home
