import { Link } from 'react-router-dom';
import { MotionLink } from './animations/Reveal';
import { ResponsiveImage } from './ResponsiveImage';
import { images } from '../data/images';
import styles from '../pages/HomePage.module.css';

export function Hero() {
  return <section className={styles.hero} aria-labelledby="home-heading">
    <div className={styles.heroVisual}>
      <ResponsiveImage image={images.leadership} priority sizes="(max-width: 900px) 100vw, 55vw" />
    </div>
    <div className={styles.heroCopy}>
      <span>BUILD. SCALE. OPERATE. GROW.</span>
      <h1 id="home-heading">The operating system for <em>African business growth.</em></h1>
      <p>We help entrepreneurs, growing businesses and established organizations build stronger operations, prepare for capital and turn growth plans into action.</p>
      <p className={styles.description}>Your operating system: one accountable partner connecting strategy, capital, talent and technology—from the first plan through execution.</p>
      <div className={styles.actions}>
        <MotionLink className={styles.primary} to="/contact">Talk to CADNA <span aria-hidden="true">↗</span></MotionLink>
        <Link className={styles.secondary} to="/#solutions">Explore Our Services <span aria-hidden="true">↓</span></Link>
      </div>
      <small className={styles.response}>Tell us your goal. We’ll help define the next step.</small>
    </div>
    <div className={styles.heroCaption}><span>STRATEGY / CAPITAL / TALENT / TECHNOLOGY</span><b>Connected around your business.</b></div>
  </section>;
}
