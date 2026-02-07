import React from 'react'
import Navbar from '../components/navbar'
import CertificateComp from '../components/certificateComp'
import Footer from '../components/footer'

export default function Page() {
  return (
    <div>
        <Navbar/>
      <div className="">
       <CertificateComp/>
      </div>
      <Footer/>
    </div>
  )
}
