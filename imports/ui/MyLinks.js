import React from 'react';

import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksList from './LinksList';
import LinksListFilter from './LinksListFilter';
import LinksListFilter2 from './LinksListFilter2';

// PRESENTATION COMPONENT (vs container component with class syntax)
MyLinks = () => {
  return (
    <div>
      <PrivateHeader title={"Super Links App"}/>
      <div className="page-content">
        <div className="page-content__functionality">
          <AddLink />
          <LinksListFilter2 />
        </div>

        <LinksList />
      </div>
    </div>
  );
};

export default MyLinks;
