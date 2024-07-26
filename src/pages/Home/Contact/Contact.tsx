import "./contact.css";
const Contact = () => {
  return (
    <div data-aos="zoom-in" className="flex justify-center items-center mt-20">
      <form className="w-2/3">
        <p className="text-4xl text-center mb-5">Contact Us</p>
        <input
          name="name"
          type="text"
          className="feedback-input"
          placeholder="Name"
        />
        <input
          name="email"
          type="text"
          className="feedback-input"
          placeholder="Email"
        />
        <textarea
          name="text"
          className="feedback-input"
          placeholder="Comment"
        ></textarea>
        <button className="contact-submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default Contact;
