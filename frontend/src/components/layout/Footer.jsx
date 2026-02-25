// Footer Component
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <p className="footer-text">
                    © {new Date().getFullYear()} <span className="footer-brand">KnowledgeMind</span> — Built with ❤️ for knowledge sharing
                </p>
            </div>
        </footer>
    );
};

export default Footer;
