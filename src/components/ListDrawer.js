import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from './IconButton';
import {
    faStar,
    faStarHalfAlt,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';

class ListDrawer extends Component {
    state = {
        open: false,
        query: ''
    };

    /**
     * @description Set new state for filter input and send the entered query to filter locations
     * @param String
     * @returns State, function
     */
    queryUpdate = queryEntry => {
        this.setState({ query: queryEntry });
        this.props.filterLocations(queryEntry);
    };

    /**
     * @description Create an array of Font Awesome star icons
     * @param Numeric
     * @returns Array
     */
    ratingStars = r => {
        let stars = [];
        for (let i = 0; i < r; i++) {
            if (r - i > 1) {
                stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
            } else {
                stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={i} />);
            }
        }
        return stars;
    };

    render = () => {
        const { locations, open, toggleDrawer } = this.props;

        return (
            <div className={'drawer' + (open ? ' open' : '')}>
                <IconButton
                    id="menubutton"
                    hiddenName="Drawer"
                    className="drawer-button"
                    role="button"
                    aria-controls="menu"
                    aria-expanded={open ? 'true' : 'false'}
                    onClick={toggleDrawer}
                />
                <div className="search">
                    <label htmlFor="search" className="offscreen">
                        Search restaurant or restaurants:
                    </label>
                    <input
                        id="search"
                        type="text"
                        role="search"
                        aria-label="Search restaurants"
                        placeholder="Search restaurants"
                        tabIndex={open ? '0' : '-1'}
                        onChange={e => this.queryUpdate(e.target.value)}
                        value={this.state.query}
                    />
                </div>
                <div id="menu" aria-labelledby="menubutton" className="list">
                    <ul role="menu">
                        {locations.map((location, index) => (
                            <li className="item" key={index}>
                                <button
                                    className={
                                        'item-button' +
                                        (this.props.selectedIndex === index
                                            ? ' item-button_active'
                                            : '')
                                    }
                                    tabIndex={open ? '0' : '-1'}
                                    role="menuitem"
                                    onClick={e => {
                                        this.props.listDrawerItemClick(
                                            index,
                                            location
                                        );
                                    }}
                                >
                                    <div className="item-icon">
                                        <FontAwesomeIcon icon={faUtensils} />
                                    </div>
                                    <div>
                                        <h4 className="item-name">
                                            {location.name}
                                        </h4>
                                        {location.location && (
                                            <p className="item-address">
                                                {location.location.address &&
                                                    location.location.address.trim()}
                                                &nbsp;
                                                {location.location.postalCode &&
                                                    location.location.postalCode.trim()}
                                            </p>
                                        )}
                                        <p className="item-rate">
                                            {location.rating}
                                            {this.ratingStars(location.rating)}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };
}

export default ListDrawer;
