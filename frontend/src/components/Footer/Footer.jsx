import React from "react";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="upper-box">
        <div className="auto-container">
          <div className="row no-gutters">
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-pin"></span>
                  </div>
                  <div className="text">
                    54B, Arbaminch Town 5238 MT, <br /> La city, IA 522364
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-email"></span>
                  </div>
                  <div className="text">
                    Email us : <br />{" "}
                    <a href="mailto:contact.contact@autorex.com">
                      contact@nechsar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
              <div className="info-inner">
                <div className="content">
                  <div className="icon">
                    <span className="flaticon-phone"></span>
                  </div>
                  <div className="text">
                    Call us on : <br />
                    <strong>+ 1800 456 7890</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="widgets-section">
        <div className="auto-container">
          <div className="widgets-inner-container">
            <div className="row clearfix">
              <div className="footer-column col-lg-4">
                <div className="widget widget_about">
                  <div className="text">
                    Providing comprehensive resources for advanced medical
                    reporting.
                  </div>
                </div>
              </div>
              <div className="footer-column col-lg-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="widget widget_links">
                      <h4 className="widget_title">Usefull Links</h4>
                      <div className="widget-content">
                        <ul className="list">
                          <li>
                            <a href="index.html">Home</a>
                          </li>
                          <li>
                            <a href="about.html">About Us</a>
                          </li>
                          <li>
                            <a href="#">Research Guidelines</a>
                          </li>
                          <li>
                            <a href="testimonial.html">Case Studies</a>
                          </li>
                          <li>
                            <a href="contact.html">Contact Us</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="widget widget_links">
                      <h4 className="widget_title">Our Services</h4>
                      <div className="widget-content">
                        <ul className="list">
                          <li>
                            <a href="#">Performance Upgrade</a>
                          </li>
                          <li>
                            <a href="#">Statistical Analysis</a>
                          </li>
                          <li>
                            <a href="#">Data Management</a>
                          </li>
                          <li>
                            <a href="#">Ethics Consultation</a>
                          </li>
                          <li>
                            <a href="#">Trye & Wheels</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-column col-lg-4">
                <div className="widget widget_newsletter">
                  <h4 className="widget_title">Newsletter</h4>
                  <div className="text">Get latest updates and offers.</div>
                  <div className="newsletter-form"></div>
                  <ul className="social-links">
                    <li>
                      <a href="#">
                        <span className="fab fa-facebook-f"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fab fa-linkedin-in"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fab fa-twitter"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fab fa-google-plus-g"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auto-container">
        <div className="footer-bottom">
          <div className="copyright-text">
            © Copyright <a href="#">Nechsar Campas</a> 2025 . All right reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
