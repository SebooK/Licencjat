import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ModalController, NavParams} from "@ionic/angular";
import {SearchService} from "../../../../services/geocoding/search.service";
import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"
import * as mapboxgl from 'mapbox-gl'


@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    startPosition: any;
    endPosition: any;
    directions;
    startCoordinates: any[];
    endCoordinates: any[];
    private map;
    private geo;
    private loading: boolean = false;
    constructor(private navParams: NavParams,
                private modalController: ModalController,
                private searchService: SearchService,
    ) {
    }


    ngOnInit() {
        this.hasData();
        this.getData();
    }

    ionViewDidEnter() {
        mapboxgl.accessToken = environment.mapBoxAccessToken;
       // this.getRoute();
        this.initMap()
    }
    close() {
        this.modalController.dismiss();
    }

    hasData() {
        this.startPosition = this.navParams.get('loadingPlace');
        this.endPosition = this.navParams.get('unloadingPlace');
        if ((this.startPosition || this.endPosition) === undefined) {
            return false
        } else return true
    }

    getData() {
        this.startCoordinates = this.startPosition['center'];
        this.endCoordinates = this.endPosition['center'];
        console.log(this.startCoordinates,this.endCoordinates)
    }

    getRoute() {
        return this.searchService.getRouteCoordinates(this.startCoordinates, this.endCoordinates).subscribe( res => {
            //console.log(res);
        });

    }

    setDirection() {
        this.directions.setOrigin([this.startCoordinates[0],this.startCoordinates[1]]);

        let bounds = new mapboxgl.LngLatBounds();
        bounds.extend(this.startCoordinates);
        bounds.extend(this.endCoordinates);
        this.directions.setDestination(this.endCoordinates);
        this.map.fitBounds(bounds, {padding:100, duration:1000})
    }

    initMap() {

        this.map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/streets-v11',
            center: this.startCoordinates,
            zoom: 9,
            minZoom: 7.5, //restrict map zoom - buildings not visible beyond 13
            container: 'map'
        });


        this.map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserLocation: true
        }));

        this.directions = new MapboxDirections ({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
            alternatives:true,
            annotations: true,
            interactive: false,
            controls: {
                inputs: false,
                instructions: false,
                profileSwitcher: false
            }
        });
        this.map.addControl(this.directions);
        this.map.addControl(new mapboxgl.NavigationControl());
                let self = this;
        this.map.on("load", function () {
            self.map.setLayoutProperty('country-label', 'text-field', [
                'format',
                ['get', 'name_pl'],
                {'font-scale': 1.2},
                '\n',
                {},
                ['get', 'name'],
                {
                    'font-scale': 0.8,
                    'text-font': [
                        'literal',
                        ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
                    ]
                }
            ]);
            self.setDirection();
        });

        /*
        this.startPosition = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving-traffic',
            interactive: 'false',
            controls: {
                inputs: false,
                instructions: false,
                profileSwitcher: false
            }
        });

        let self = this;
        this.map.on("load", function () {
            self.map.setLayoutProperty('country-label', 'text-field', [
                'format',
                ['get', 'name_en'],
                {'font-scale': 1.2},
                '\n',
                {},
                ['get', 'name'],
                {
                    'font-scale': 0.8,
                    'text-font': [
                        'literal',
                        ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
                    ]
                }
            ]);
            self.map.addLayer({
                id: 'start',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: self.startCoordinates
                            }
                        }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                }
            });
            self.map.addLayer({
                id: 'end',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: self.endCoordinates
                            }
                        }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#f30'
                }
            });
            self.map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: self.geo.geometry.coordinates
                        }
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        });
*/
    }
}
