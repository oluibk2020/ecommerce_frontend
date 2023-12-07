import { GiShop } from "react-icons/gi";

function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="footer p-10 bg-gray-900  text-neutral-content footer-center">
      <div className="text-center">
        Reddy Store is the place to find all your goods at affordable price.
      </div>
      <GiShop className="text-5xl" />
      <p>Copyright &copy; {footerYear} All rights reserved</p>
    </footer>
  );
}
export default Footer;
