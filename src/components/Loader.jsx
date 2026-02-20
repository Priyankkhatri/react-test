import React from 'react';
import './Loader.css';

const Loader = () => {
    // Generate an array of arbitrary length for skeleton grid
    const skeletonArray = Array.from({ length: 8 });

    return (
        <div className="loader-container">
            <div className="skeleton-grid">
                {skeletonArray.map((_, index) => (
                    <div key={index} className="skeleton-card glass">
                        <div className="skeleton-image shimmer"></div>
                        <div className="skeleton-content">
                            <div className="skeleton-title shimmer"></div>
                            <div className="skeleton-year shimmer"></div>
                            <div className="skeleton-actions">
                                <div className="skeleton-btn shimmer"></div>
                                <div className="skeleton-icon shimmer"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loader;
