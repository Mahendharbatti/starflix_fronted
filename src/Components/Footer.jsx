import React from 'react';
import '../Styles/footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className='footer' style={{ backgroundImage: "url('/images/footer.png')" }}>
        <h6>© 2025 StarFlix. All Rights Reserved.</h6>
        <h6>
          <button className="back-to-top" onClick={scrollToTop}>
            Back to top
          </button>
        </h6>
      </section>
    </div>
  );
};

export default Footer;
