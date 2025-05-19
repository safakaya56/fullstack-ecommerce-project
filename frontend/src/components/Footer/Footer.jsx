import "./footer.css";
import FooterInfo from "./FooterInfo";
import FooterLinks from "./FooterLinks";

const Footer = () => {
    return (
        <footer className="footerContainer">
            <FooterInfo />
            <FooterLinks />
        </footer>
    );
};

export default Footer;
