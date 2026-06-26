import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-40 text-center max-w-2xl mx-auto">
      <h3 className="text-secondary font-mono mb-4">04. What's Next?</h3>
      <h2 className="text-5xl font-bold text-white mb-6">Get In Touch</h2>
      <p className="text-darkSlate mb-12 text-lg">
        I’m currently looking for new opportunities and my inbox is always open. 
        Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>
      <a
      target='__blank'
        href="https://www.linkedin.com/in/zahoor-ahmad-leghari?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        className="px-10 py-5 border-2 border-secondary text-secondary rounded font-mono hover:bg-secondary/10 transition-all inline-block"
      >
        Say Hello
      </a>
    </section>
  );
};
export default Contact;