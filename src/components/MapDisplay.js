import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Marker from './Marker';
import MarkerInfo from './MarkerInfo';

const MAP_KEY = 'AIzaSyAVSL9eG92K3W19jt0uIpoxW_lZGPdxfJs';

class MapDisplay extends Component {
    state = {
        map: null,
        markers: []
    };

    mapReady = (props, map) => {
        this.setState({ map });

        this.props.locations.map((location, index) => {
            // console.log(this.state.markers[index]);
            return (location.marker = this.state.markers[index]);
        });
    };

    onMarkerMounted = e => {
        this.setState(prevState => ({
            markers: [...prevState.markers, e.marker]
        }));
    };

    setAnimation = markerName => {
        if (markerName === this.props.activeMarker.name) {
            return '1';
        } else {
            return '2';
        }
    };

    render = () => {
        const {
            activeMarker,
            closeInfoWindow,
            onMarkerClick,
            google,
            lat,
            lng,
            locations,
            showingInfoWindow,
            zoom
        } = this.props;

        const style = {
            width: '100%',
            heigth: '100%'
        };

        const center = {
            lat: lat,
            lng: lng
        };

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={google}
                zoom={zoom}
                style={style}
                initialCenter={center}
                onClick={closeInfoWindow}
                mapTypeControl={false}
                className="content"
            >
                {locations.map(({ location, name, url }, index) => (
                    <Marker
                        ref={this.onMarkerMounted}
                        key={index}
                        position={location}
                        onClick={onMarkerClick}
                        name={name}
                        url={url}
                        animation={this.setAnimation(name)}
                    />
                ))}
                <MarkerInfo
                    activeMarker={activeMarker}
                    visible={showingInfoWindow}
                    onClose={closeInfoWindow}
                />
            </Map>
        );
    };
}

export default GoogleApiWrapper({ apiKey: MAP_KEY })(MapDisplay);
