import React from 'react';

interface SiteLogoProps {
  site: string;
}

const SiteLogo: React.FC<SiteLogoProps> = ({ site }) => {
  if (site.includes("themeforest.net")) {
    return <img className="w-full" alt="Logo-EnvatoMarket-Themeforest-Dark" src="/images/logos/EnvatoMarket-Themeforest-Dark.png" />;
  } else if (site.includes("videohive.net")) {
    return <img className="w-full" alt="EnvatoMarket-Videohive-Dark" src="/images/logos/EnvatoMarket-Videohive-Dark.png" />;
  } else if (site.includes("photodune.net")) {
    return <img className="w-full" alt="EnvatoMarket-Photodune-Dark" src="/images/logos/EnvatoMarket-Photodune-Dark.png" />;
  } else if (site.includes("codecanyon.net")) {
    return <img className="w-full" alt="EnvatoMarket-Codecanyon-Dark" src="/images/logos/EnvatoMarket-Codecanyon-Dark.png" />;
  } else if (site.includes("graphicriver.net")) {
    return <img className="w-full" alt="EnvatoMarket-Graphicriver-Dark" src="/images/logos/EnvatoMarket-Graphicriver-Dark.png" />;
  } else if (site.includes("audiojungle.net")) {
    return <img className="w-full" alt="EnvatoMarket-Audiojungle-Dark" src="/images/logos/EnvatoMarket-Audiojungle-Dark.png" />;
  } else {
    return null;
  }
};

export default SiteLogo;
