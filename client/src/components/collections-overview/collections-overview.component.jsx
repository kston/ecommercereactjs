import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCollectionForPreview} from '../../redux/collections/collections.selector';

import CollectionPreview from '../collection-preview/collection-preview';

import './collections-overview.style.scss';

const CollectionsOverview = ({collections}) => {

    return (
        <div className="collections-overview">
            {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
  })


export default connect(mapStateToProps)(CollectionsOverview);