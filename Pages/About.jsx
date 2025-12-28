import Navbar from "../components/SiteComponents/Navbar";
import Footer from "../components/SiteComponents/Footer";
import "../styles/PageStyles/about-page-styles.css";

function About() {
    return (
        <>
            <Navbar></Navbar>
            <div className="coming-soon-container">
                <h2>Tutorials Coming Soon!</h2>
            </div>
            <Footer></Footer>
        </>
    );
}

export default About;
