import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/about-page-styles.css";

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
