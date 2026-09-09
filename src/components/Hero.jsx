import { Link } from 'react-router-dom';
import { FadeIn, MotionLink } from './animations/Reveal';
import { ParallaxImage } from './animations/ParallaxImage';
import { images } from '../data/images';
import styles from '../pages/HomePage.module.css';

export function Hero() {
  return <section className={styles.hero} aria-labelledby="home-heading">
    <FadeIn direction="fade" appear duration={0.7} className={styles.heroVisual}>
      <ParallaxImage image={images.leadership} priority sizes="(max-width: 900px) 100vw, 66vw" />
    </FadeIn>
    <div className={styles.heroCopy}>
      <FadeIn as="span" appear delay={0.1} direction="fade">STRATEGY × CAPITAL × TALENT × TECHNOLOGY</FadeIn>
      <FadeIn as="h1" appear delay={0.18} id="home-heading">The operating system for <em>African business growth</em></FadeIn>
      <FadeIn as="p" appear delay={0.32}>We help ambitious African businesses transform ideas, opportunities and capital into structured, scalable enterprises.</FadeIn>
      <FadeIn as="p" appear delay={0.4} className={styles.description}>CADNA connects strategy, capital, talent and technology to help organizations build stronger foundations, unlock opportunities and achieve sustainable growth.</FadeIn>
      <FadeIn appear delay={0.5} className={styles.actions}>
        <MotionLink className={styles.primary} to="/request">Start a Growth Conversation <span aria-hidden="true">↗</span></MotionLink>
        <Link className={styles.secondary} to="/#solutions">Explore Our Solutions <span aria-hidden="true">↓</span></Link>
      </FadeIn>
      <FadeIn as="small" appear delay={0.58} className={styles.response}>One integrated partner. From direction to delivery.</FadeIn>
    </div>
    <FadeIn appear delay={0.62} className={styles.heroCaption}><span>CADNA GLOBAL SYNERGY</span><b>Built around your next chapter.</b></FadeIn>
  </section>;
}
