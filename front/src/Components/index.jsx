import React, { useContext } from 'react'
import Navbar from '../Components/navbar';
import Actions from '../Components/actions'
import Tutorial from '../Components/tutorial'
import Tips from '../Components/tips'
import About from '../Components/about'
import Contact from '../Components/contact'
import Footer from './footer';
import Autoscroll from '../Functions/autoscrollindex'

function Index() {

    return (
        <>
            {Autoscroll()}
            <Navbar />
            <Actions />
            <Tutorial />
            <Tips />
            <About />
            <Contact />
            <Footer />
        </>
    )
}


export default Index