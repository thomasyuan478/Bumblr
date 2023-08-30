import React from 'react';
import { LeftSideNavigation } from "../LeftSideNavigation"
import { RightSideNavigation } from "../RightSideNavigation"
import { FeedNavigation } from "../FeedNavigation"
import './index.css'

export function MainPageNavigation() {
    
    return (
    <div className="main-entire-page">
        <div className="left-side-nav">
            <LeftSideNavigation />
        </div>
        <div className="feed-page">
            <FeedNavigation />
        </div>
        <div className="right-side-nav">
            <RightSideNavigation />
        </div>
    </div>
);
}

export default MainPageNavigation;