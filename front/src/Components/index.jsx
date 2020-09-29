import React from 'react'
import Navbar from '../Components/navbar';
import Presentation from '../Components/presentation';
import Actions from '../Components/actions'
import Tutorial from '../Components/tutorial'
import Tips from '../Components/tips'
import About from '../Components/about'
import Contact from '../Components/contact'
import Footer from './footer';
import Autoscroll from '../Functions/autoscrollindex'

class Index extends React.Component {

    componentDidUnMount() {
        console.log("Componente desmontado")
    }

    render() {
        return (
            <>
                {Autoscroll()}
                <Navbar />
                <Presentation />
                <Actions />
                <Tutorial />
                <Tips />
                <About />
                <Contact />
                <Footer />
            </>
        )
    }

}

export default Index