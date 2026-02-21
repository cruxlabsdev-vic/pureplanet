
// src/components/layout/Header.tsx
import styles from './Header.module.css';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';
import { FaPinterest, FaReddit, FaThreads } from 'react-icons/fa6';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>PURE PLANET</div>
                <nav className={styles.nav}>
                    {/* TODO: Add navigation links from Figma */}
                    <ul>
                        <li>Home</li>
                        <li>Services</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
                <div className={styles.socialLinks}>
                    <a
                        href="https://wa.me/450010419"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className={styles.socialIcon}
                    >
                        <MessageCircle size={20} />
                    </a>
                    <a
                        href="https://www.pinterest.com/kamrashubhang/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Pinterest"
                        className={styles.socialIcon}
                    >
                        <FaPinterest size={20} />
                    </a>
                    <a
                        href="https://www.reddit.com/user/PurePlanet_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Reddit"
                        className={styles.socialIcon}
                    >
                        <FaReddit size={20} />
                    </a>
                    <a
                        href="https://www.threads.com/@planet9298"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Threads"
                        className={styles.socialIcon}
                    >
                        <FaThreads size={20} />
                    </a>
                    <a
                        href="https://www.instagram.com/planet9298/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className={styles.socialIcon}
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                        href="https://www.facebook.com/profile.php?id=61586682674853"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className={styles.socialIcon}
                    >
                        <Facebook size={20} />
                    </a>
                </div>
            </div>
        </header>
    );
}
