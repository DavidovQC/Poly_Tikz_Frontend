import "../styles/footer-styles.css";

function Footer() {
    return (
        <div className="footer">
            <p>
                &copy; {new Date().getFullYear()}{" "}
                <a href="https://www.linkedin.com/in/nathan-davidov-1b5b4b192/">
                    Nathan Davidov
                </a>
                . All Rights Reserved.
            </p>
        </div>
    );
}

export default Footer;
