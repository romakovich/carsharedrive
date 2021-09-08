import React from 'react';

const Footer = () => {

return (
    <footer>
        <div className="footer__container">
            <span className="footer__container-copyright">© SkillDrive Inc. 2020</span>
            <div className="footer__container-social-media">
                <a href="https://www.facebook.com/" target="_blank" rel="nofollow" className="icon-facebook is-animated"></a>
                <a href="https://www.instagram.com/" target="_blank" rel="nofollow" className="icon-insta is-animated"></a>
                <a href="https://vk.com/" target="_blank" rel="nofollow" className="icon-vk is-animated"></a>
            </div>
        </div>
    </footer>
)
}
export default Footer;