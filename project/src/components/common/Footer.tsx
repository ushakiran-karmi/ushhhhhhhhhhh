// src/components/common/Footer.tsx


const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-neutral-600">
              &copy; {new Date().getFullYear()} Resume Studio. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-600 hover:text-primary-600 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary-600 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary-600 text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;