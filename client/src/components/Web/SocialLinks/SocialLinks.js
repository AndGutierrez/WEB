import React from 'react';
import { ReactComponent as YouTubeIcon } from '../../../assets/img/svg/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/svg/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/svg/facebook.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/img/svg/linkedin.svg';

import './SocialLinks.scss';

export default function SocialLinks() {
    return (
        <div className="social-links">
            <a className="youtube"
                href="https://www.youtube.com/channel/UCpFMtID_A1gOz6hDN9Bx_jA"
                target="_blank"
                rel="noopener noreferrer"
            >
                <YouTubeIcon/>
            </a>
            <a className="twitter"
                href="https://twitter.com/agvera75"
                target="_blank"
                rel="noopener noreferrer"
            >
                <TwitterIcon/>
            </a>
            <a className="facebook"
                href="https://www.youtube.com/channel/UCpFMtID_A1gOz6hDN9Bx_jA"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FacebookIcon/>
            </a>
            <a className="linkedin"
                href="https://linkedin.com/in/andresgutierrezvera"
                target="_blank"
                rel="noopener noreferrer"
            >
                <LinkedinIcon/>
            </a>
        </div>        
    );
}