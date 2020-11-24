
import SHOP_DATA from './collections.data';

const INITIAL_STATE_COLLECTION =  {
    collections: SHOP_DATA
};

const collectionsReducer = (state= INITIAL_STATE_COLLECTION, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default collectionsReducer;