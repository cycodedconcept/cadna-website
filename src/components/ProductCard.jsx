import { Link } from 'react-router-dom';
import { ResponsiveImage } from './ResponsiveImage';
import { StaggerItem } from './animations/Reveal';
import styles from './Growth.module.css';

export function ProductArtwork({ image, className = '' }) {
  return <div className={`${styles.productArt} ${className}`} style={{ '--crop-x': `${image.crop.column * -100}%`, '--crop-y': `${image.crop.row * -100}%` }}>
    <ResponsiveImage image={image} sizes="596px" />
  </div>;
}

export function ProductCard({ product }) {
  return <StaggerItem as="article" className={styles.productCard}>
    <Link to={`/technology/${product.slug}`} className={styles.artLink} aria-label={`Explore ${product.name}`}><ProductArtwork image={product.image} /></Link>
    <div className={styles.cardBody}><div className={styles.meta}><span>{product.category}</span><span className={styles.status}>{product.status}</span></div>
      <h3>{product.name}</h3><p>{product.description}</p>
      <Link className={styles.textLink} to={`/technology/${product.slug}`}>Explore platform <span aria-hidden="true">↗</span></Link>
    </div>
  </StaggerItem>;
}
