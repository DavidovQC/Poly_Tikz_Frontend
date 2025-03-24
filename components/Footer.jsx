import "../styles/footer-styles.css";

function Footer() {
    return (
        <div className="footer">
            <p>
                &copy; {new Date().getFullYear()} Poly-TikZ. All Rights
                Reserved.
            </p>
        </div>
    );
}

export default Footer;
