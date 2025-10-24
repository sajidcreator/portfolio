import { useState } from "react"; 
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import emailjs from '@emailjs/browser'; // install: npm install @emailjs/browser

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    emailjs.send(
      "service_15yq00l",   // replace with your EmailJS service ID
      "template_2lde83a",  // replace with your EmailJS template ID
      formDetails,
      "SPN5vaTEDZGKuQ83_"    // replace with your EmailJS public key
    ).then((response) => {
      console.log("Email sent!", response.status, response.text);
      setStatus({ success: true, message: "✅ Message sent successfully!" });
      setFormDetails(formInitialDetails);
      setButtonText("Send");
    }).catch((err) => {
      console.error("Failed to send email:", err);
      setStatus({ success: false, message: "❌ Something went wrong. Try again." });
      setButtonText("Send");
    });
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img
                  className={isVisible ? "animate__animated animate__zoomIn" : ""}
                  src={contactImg}
                  alt="Contact Us"
                />
              }
            </TrackVisibility>
          </Col>

          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={formDetails.firstName}
                          onChange={(e) => onFormUpdate('firstName', e.target.value)}
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={formDetails.lastName}
                          onChange={(e) => onFormUpdate('lastName', e.target.value)}
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formDetails.email}
                          onChange={(e) => onFormUpdate('email', e.target.value)}
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          placeholder="Phone No."
                          value={formDetails.phone}
                          onChange={(e) => onFormUpdate('phone', e.target.value)}
                        />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          placeholder="Message"
                          value={formDetails.message}
                          onChange={(e) => onFormUpdate('message', e.target.value)}
                          required
                        ></textarea>
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>

                      {status.message && (
                        <Col>
                          <p className={status.success ? "success" : "danger"}>
                            {status.message}
                          </p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
