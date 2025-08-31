import React from 'react'
import About from './About'
import Breadcrumb from '../../components/Breadcrumb'
import ForStudents from './ForStudents'

const AboutSection = () => {
  return (
    <>
       <Breadcrumb page='About us'/>
      <About/>
      <ForStudents/>
    </>
  )
}

export default AboutSection
