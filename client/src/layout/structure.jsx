import './structure.css'
import Header from '../components/Header/header'
import Footer from '../components/Footer/footer'
import { SideBar } from '../components/SideBar/sidebar'
import { Outlet } from "react-router-dom"


export function Structure() {
    return (
        <>
            <div className='main-structure con'>
                <div className='bg-dark' id="sidebar">
                    <SideBar />
                </div>

            </div>
            <div>
                <div id='header'>
                    <Header />
                </div>
                <div className='p-3 text-justify' id="content" >
                    <Outlet />
                </div>

                <div id='footer'>
                    <Footer />
                </div>

            </div>


        </>
    )
}