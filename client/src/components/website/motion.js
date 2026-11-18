import { motion } from 'motion/react';

/**
 * Shared Framer Motion building blocks for the Smilux landing page.
 * One place to tune easing, distances, and stagger so every section
 * feels like one coherent system.
 */

// A smooth, slightly playful ease used across all entrances.
export const EASE = [0.22, 1, 0.36, 1];

// Container that staggers its children's entrance.
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Fade + rise. The workhorse for most elements.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Reveal — drop-in wrapper that animates its children when scrolled into view.
 * Plays once.
 *
 *   <Reveal>...</Reveal>
 *   <Reveal variant="fadeLeft" delay={0.1}>...</Reveal>
 *   <Reveal as="h2" className="...">...</Reveal>
 */
export function Reveal({
  children,
  variant = fadeUp,
  delay = 0,
  as = 'div',
  className = '',
  amount = 0.2,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  // Bake the delay into the variant's "show" transition. When a variant defines
  // its own transition, Framer Motion ignores the element-level `transition`
  // prop, so merging here is the reliable way to delay a reveal.
  const variantWithDelay = {
    ...variant,
    show: {
      ...variant.show,
      transition: { ...variant.show.transition, delay },
    },
  };
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variantWithDelay}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * RevealGroup — wraps a list of <RevealItem> children and staggers them
 * when the group scrolls into view.
 *
 *   <RevealGroup className="grid ...">
 *     <RevealItem>card 1</RevealItem>
 *     <RevealItem>card 2</RevealItem>
 *   </RevealGroup>
 */
export function RevealGroup({
  children,
  as = 'div',
  className = '',
  stagger = 0.09,
  delayChildren = 0,
  amount = 0.15,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={staggerContainer(stagger, delayChildren)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  variant = fadeUp,
  as = 'div',
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag className={className} variants={variant} {...rest}>
      {children}
    </MotionTag>
  );
}
