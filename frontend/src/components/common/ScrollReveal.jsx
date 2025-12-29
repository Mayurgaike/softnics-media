import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollReveal = ({
  children,
  delay = 0,
  y = 40,
  once = true,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
