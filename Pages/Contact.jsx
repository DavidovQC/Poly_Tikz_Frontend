import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
    return (
        <>
            <Navbar></Navbar>
            <div className="coming-soon-container">
                <p>
                    Feel free to reach out on my{" "}
                    <a href="https://www.linkedin.com/in/nathan-davidov-1b5b4b192/">
                        LinkedIn
                    </a>
                    !
                </p>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Contact;
