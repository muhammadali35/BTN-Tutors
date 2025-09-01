import React from 'react'
import About from './About'
import Breadcrumb from '../../components/Breadcrumb'
import ForStudents from './ForStudents'
import TuitionModes from '../../components/Tution'

const AboutSection = () => {
  return (
    <>
       <Breadcrumb page='About us'/>
      <About/>
      <ForStudents/>
       <TuitionModes />
    </>
  )
}

export default AboutSection
