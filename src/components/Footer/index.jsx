import React from 'react';

import './footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>About Ghost Team</h3>
                <p>
                    This website is dedicated to showcasing the distinguished faculty members of H University.
                    Explore profiles, achievements, and research contributions.
                </p>
                <ul className="social-icons">
                    <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Ghost Team - H University. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
