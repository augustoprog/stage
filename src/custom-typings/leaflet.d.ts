declare module 'leaflet' {

    export function latLng(latitude: number, longitude: number, altitude?: number): LatLng;
    export function latLng(coords: number[]): LatLng;
    export function latLng(coords: LatLng): LatLng;
    export function latLngBounds(corner1: LatLng, corner2: LatLng): LatLngBounds;
    export function latLngBounds(latlngs: LatLng[]): LatLngBounds;
    export function bounds(corner1: Point, corner2: Point);
    export function bounds(points: Point[]): Bounds;
    export function point(x: number, y: number, round?: number): Point;
    export function point(coords: number[]): Point;
    export function point(coords: Point): Point;
    export function map(id: string, options?: MapOptions): Map;
    export function map(el: HTMLElement, options?: MapOptions): Map;
    export function popup(options?: PopupOptions, source?: Layer): Popup;
    export function tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;
    export function gridLayer(options?: GridLayerOptions): GridLayer;
    export function featureGroup(layers: Layer[]): FeatureGroup;
    export function marker(latlng: LatLng, options?: MarkerOptions): Marker;
    export function icon(options: IconOptions): Icon;
    export function polyline(latLngs: LatLng[], options?: PolyLineOptions): PolyLine;

    export namespace control {
        export function zoom(options?: ControlZoomOptions): ControlZoom;
        export function scale(options?: ControlScaleOptions): ControlScale;
    }

    export namespace Handler {
        export function addTo(map: Map, name: string): Handler;
    }

    export namespace DomUtil {
        export function get(id: string | HTMLElement): HTMLElement;
        export function getStyle(el: HTMLElement, styleAttrib: string): string;
        export function create(tagName: string, className?: string, container?: HTMLElement): HTMLElement;
        export function remove(el: HTMLElement): void;
        export function empty(el: HTMLElement): void;
        export function toFront(el: HTMLElement): void;
        export function toBack(el: HTMLElement): void;
        export function hasClass(el: HTMLElement, name: string): boolean
        export function addClass(el: HTMLElement, name: string): void;
        export function removeClass(el: HTMLElement, name: string): void;
        export function setClass(el: HTMLElement, name: string): void;
        export function getClass(el: HTMLElement): string;
        export function setOpacity(el: HTMLElement, opacity: number): void;
        export function testProp(props: string[]): string | boolean;
        export function setTransform(el: HTMLElement, offset: Point, scale?: number): void;
        export function setPosition(el: HTMLElement, position: Point): void;
        export function getPosition(el: HTMLElement): Point;
        export function disableTextSelection(): void;
        export function enableTextSelection(): void;
        export function disableImageDrag(): void;
        export function enableImageDrag(): void;
        export function preventOutline(el: HTMLElement): void;
        export function restoreOutline(): void;
        export function getSizedParentNode(el: HTMLElement): HTMLElement;
        export function getScale(el: HTMLElement): any
    }

    export namespace DomEvent {
        export function on(el: HTMLElement, types: string, fn: Function, context?: any): IDomEvent;
        export function on(el: HTMLElement, eventMap: any, context?: any): IDomEvent;
        export function off(el: HTMLElement, types: string, fn: Function, context?: any): IDomEvent;
        export function off(el: HTMLElement, eventMap: any, context?: any): IDomEvent;
        export function stopPropagation(ev: Event): IDomEvent;
        export function disableScrollPropagation(el: HTMLElement): IDomEvent;
        export function disableClickPropagation(el: HTMLElement): IDomEvent;
        export function preventDefault(ev: Event): IDomEvent;
        export function stop(ev: Event): IDomEvent;
        export function getMousePosition(ev: Event, container?: HTMLElement): Point;
        export function getWheelDelta(ev: Event): number;
        export function addListener(el: HTMLElement, types: string, fn: Function, context?: any): IDomEvent;
        export function addListener(el: HTMLElement, eventMap: any, context?: any): IDomEvent;
        export function removeListener(el: HTMLElement, types: string, fn: Function, context?: any): IDomEvent;
        export function removeListener(el: HTMLElement, eventMap: any, context?: any): IDomEvent;
    }

    export interface IDomEvent {
        on(el: HTMLElement, types: string, fn: Function, context?: any): IDomEvent;
        on(el: HTMLElement, eventMap: any, context?: any): IDomEvent;
        off(el: HTMLElement, types: string, fn: Function, context?: any): IDomEvent;
        off(el: HTMLElement, eventMap: any, context?: any): IDomEvent;
        stopPropagation(ev: Event): IDomEvent;
        disableScrollPropagation(el: HTMLElement): IDomEvent;
        disableClickPropagation(el: HTMLElement): IDomEvent;
        preventDefault(ev: Event): IDomEvent;
        stop(ev: Event): IDomEvent;
        getMousePosition(ev: Event, container?: HTMLElement): Point;
        getWheelDelta(ev: Event): number;
        addListener(el: HTMLElement, types: string, fn: Function, context?: any): IDomEvent;
        addListener(el: HTMLElement, eventMap: any, context?: any): IDomEvent;
        removeListener(el: HTMLElement, types: string, fn: Function, context?: any): IDomEvent;
        removeListener(el: HTMLElement, eventMap: any, context?: any): IDomEvent;
    }

    export interface Map extends Evented {
        zoomControl: ControlZoom,
        boxZoom: Handler,
        doubleClickZoom: Handler,
        dragging: Handler,
        keyboard: Handler,
        scrollWheelZoom: Handler,
        tap: Handler,
        touchZoom: Handler,
        getRenderer(layer: Path): Renderer,
        addControl(control: Control): Map,
        removeControl(control: Control): Map,
        addLayer(layer: Layer): Map,
        removeLayer(layer: Layer): Map,
        hasLayer(layer: Layer): boolean,
        eachLayer(fn: Function, context?: any): Map,
        openPopup(popup: Popup): Map,
        openPopup(content: string | HTMLElement, latlng: LatLng, options?: PopupOptions): Map,
        closePopup(popup?: Popup): Map,
        openTooltip(tooltip: Tooltip): Map,
        openTooltip(content: string | HTMLElement, latlng: LatLng, options?: TooltipOptions): Map,
        closeTooltip(tooltip?: Tooltip): Map,
        setView(center: LatLng, zoom: number, options?: ZoomPanOptions): Map,
        setZoom(zoom: number, options?: ZoomPanOptions): Map,
        zoomIn(delta?: number, options?: ZoomOptions): Map,
        zoomOut(delta?: number, options?: ZoomOptions): Map,
        setZoomAround(latlng: LatLng, zoom: number, options: ZoomOptions): Map,
        setZoomAround(offset: Point, zoom: number, options: ZoomOptions): Map,
        fitBounds(bounds: LatLngBounds, ptions?: FitBoundsOptions): Map,
        fitWorld(options?: FitBoundsOptions): Map,
        panTo(latlng: LatLng, options?: PanOptions): Map,
        panBy(offset: Point, options?: PanOptions): Map,
        flyTo(latlng: LatLng, zoom?: number, options?: ZoomPanOptions): Map,
        flyToBounds(bounds: LatLngBounds, ptions?: FitBoundsOptions): Map,
        setMaxBounds(bounds: Bounds): Map,
        setMinZoom(zoom: number): Map,
        setMaxZoom(zoom: number): Map,
        panInsideBounds(bounds: LatLngBounds, options?: PanOptions): Map,
        invalidateSize(options?: ZoomPanOptions): Map,
        invalidateSize(animate: boolean): Map,
        stop(): Map,
        locate(options?: LocateOptions): Map,
        stopLocate(): Map,
        addHandler(name: string, fn: Function): Map,
        remove(): Map,
        createPane(name: string, container?: HTMLElement): HTMLElement,
        getPane(pane: string | HTMLElement): HTMLElement,
        getPanes(): any,
        getContainer(): HTMLElement,
        whenReady(fn: Function, context?: any): Map,
        getCenter(): LatLng,
        getZoom(): number,
        getBounds(): LatLngBounds,
        getMinZoom(): number,
        getMaxZoom(): number,
        getBoundsZoom(bounds: LatLngBounds, inside?: boolean, padding?: Point): number,
        getSize(): Point,
        getPixelBounds(): Bounds,
        getPixelOrigin(): Point,
        getPixelWorldBounds(zoom?: number): Bounds,
        getZoomScale(toZoom: number, fromZoom: number): number,
        getScaleZoom(scale: number, fromZoom: number): number,
        project(latlng: LatLng, zoom: number): Point,
        unproject(point: Point, zoom: number): LatLng,
        layerPointToLatLng(point: Point): LatLng,
        latLngToLayerPoint(latlng: LatLng): Point,
        wrapLatLng(latlng: LatLng): LatLng,
        wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds,
        distance(latlng1: LatLng, latlng2: LatLng): number,
        containerPointToLayerPoint(point: Point): Point,
        layerPointToContainerPoint(point: Point): Point,
        containerPointToLatLng(point: Point): LatLng,
        latLngToContainerPoint(latlng: LatLng): Point,
        mouseEventToContainerPoint(ev: MouseEvent): Point,
        mouseEventToLayerPoint(ev: MouseEvent): Point,
        mouseEventToLatLng(ev: MouseEvent): LatLng
    }

    export interface MapOptions extends ControlOptions, InteractionOptions, PanningInertiaOptions, KeyboardNavigationOptions,
        MouseWheelOptions, TouchInteractionOptions, MapStateOptions, AnimationOptions {
        preferCanvas?: boolean,
    }

    export interface ControlOptions {
        attributionControl?: boolean,
        zoomControl?: boolean,
    }

    export interface InteractionOptions {
        closePopupOnClick?: boolean,
        boxZoom?: boolean,
        doubleClickZoom?: boolean | string,
        dragging?: boolean,
        zoomSnap?: number,
        zoomDelta?: number,
        trackResize?: boolean,
    }

    export interface PanningInertiaOptions {
        inertia?: boolean,
        inertiaDeceleration?: number,
        inertiaMaxSpeed?: number,
        easeLinearity?: number,
        worldCopyJump?: boolean,
        maxBoundsViscosity?: number,
    }

    export interface KeyboardNavigationOptions {
        keyboard?: boolean,
        keyboardPanDelta?: number,
    }

    export interface MouseWheelOptions {
        scrollWheelZoom?: boolean | string,
        wheelDebounceTime?: number,
        wheelPxPerZoomLevel?: number,
    }

    export interface TouchInteractionOptions {
        tap?: boolean,
        tapTolerance?: number,
        touchZoom?: boolean | string,
        bounceAtZoomLimits?: boolean,
    }

    export interface MapStateOptions {
        crs?: CRS,
        center?: LatLng,
        zoom?: number,
        minZoom?: number,
        maxZoom?: number,
        layers?: Layer[][],
        maxBounds?: LatLngBounds,
        renderer?: Renderer,
    }

    export interface AnimationOptions {
        zoomAnimation?: boolean,
        zoomAnimationThreshold?: number,
        fadeAnimation?: boolean,
        markerZoomAnimation?: boolean,
        transform3DLimit?: number
    }

    export interface ZoomOptions {
        animate?: boolean
    }

    export interface PanOptions {
        animate?: boolean,
        duration?: number,
        easeLinearity?: number,
        noMoveStart?: boolean
    }

    export interface ZoomPanOptions extends ZoomOptions, PanOptions {
        paddingTopLeft?: Point,
        paddingBottomRight?: Point,
        padding?: Point,
        maxZoom?: number
    }

    export interface LocateOptions {
        watch?: boolean,
        setView?: boolean,
        maxZoom?: number,
        timeout?: number,
        maximumAge?: number,
        enableHighAccuracy?: boolean
    }

    export interface FitBoundsOptions extends ZoomOptions, PanOptions {
        paddingTopLeft?: Point,
        paddingBottomRight?: Point,
        padding?: Point,
        maxZoom?: number
    }

    export interface Control {
        getPosition(): string,
        setPosition(position: string): Control,
        getContainer(): HTMLElement,
        addTo(map: Map): Control,
        remove(): Control,
        onAdd(map: Map): HTMLElement,
        onRemove(map: Map): void
    }

    export interface ControlOptions {
        position?: string
    }

    export interface ControlZoom extends Control {

    }

    export interface ControlZoomOptions extends ControlOptions {
        zoomInText?: string,
        zoomInTitle?: string,
        zoomOutText?: string,
        zoomOutTitle?: string
    }

    export interface ControlScale extends Control {

    }

    export interface ControlScaleOptions extends ControlOptions {
        maxWidth?: number;
        metric?: boolean;
        imperial?: boolean;
        updateWhenIdle?: boolean;
    }

    export interface Handler {
        enable(): Handler,
        disable(): Handler,
        enabled(): boolean,
        addHooks(): void,
        removeHooks(): void
    }

    export interface Path extends Layer {
        redraw(): Path,
        setStyle(style: PathOptions): Path,
        bringToFront(): Path,
        bringToBack(): Path
    }

    export interface PathOptions extends InteractiveLayer {
        stroke?: boolean,
        color?: string,
        weight?: number,
        opacity?: number,
        lineCap?: string,
        lineJoin?: string,
        dashArray?: string,
        dashOffset?: string,
        fill?: boolean,
        fillColor?: string,
        fillOpacity?: number,
        fillRule?: string,
        bubblingMouseEvents?: boolean,
        renderer?: Renderer,
        className?: string
    }

    export interface TileLayer extends GridLayer {
        setUrl(url: string, noRedraw?: boolean): TileLayer,
        createTile(coords: any, done?: Function): HTMLElement
    }

    export interface TileLayerOptions extends GridLayerOptions {
        minZoom?: number,
        maxZoom?: number,
        subdomains?: string | string[],
        errorTileUrl?: string,
        zoomOffset?: number,
        tms?: boolean,
        zoomReverse?: boolean,
        detectRetina?: boolean,
        crossOrigin?: boolean | string
    }

    export interface CRS {
        code: string,
        wrapLng: number[],
        wrapLat: number[],
        infinite: boolean,
        Earth: CRS,
        EPSG3395: CRS,
        EPSG3857: CRS,
        EPSG4326: CRS,
        Base: CRS,
        Simple: CRS,
        latLngToPoint(latlng: LatLng, zoom: number): Point,
        pointToLatLng(point: Point, zoom: number): LatLng,
        project(latlng: LatLng): Point,
        unproject(point: Point): LatLng,
        scale(zoom: number): number,
        zoom(scale: number): number,
        getProjectedBounds(zoom: number): Bounds,
        distance(latlng1: LatLng, latlng2: LatLng): number,
        wrapLatLng(latlng: LatLng): LatLng,
        wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
    }

    export interface Renderer extends Layer {

    }

    export interface RendererOptions extends LayerOptions {
        padding?: number,
        tolerance?: number
    }

    export interface Layer extends Evented {
        addTo(map: Map | LayerGroup): Layer,
        remove(): Layer,
        removeFrom(map: Map): Layer,
        getPane(name?: string): HTMLElement,
        getAttribution(): string,
        onAdd(map: Map): Layer,
        onRemove(map: Map): Layer,
        getEvents(): any,
        getAttribution(): string,
        beforeAdd(map: Map): Layer,
        bindPopup(content: string | HTMLElement | Function | Popup, options?: PopupOptions): Layer,
        unbindPopup(): Layer,
        openPopup(latlng?: LatLng): Layer,
        closePopup(): Layer,
        togglePopup(): Layer,
        isPopupOpen(): boolean,
        setPopupContent(content: string | HTMLElement | Popup): Layer,
        getPopup(): Popup,
        bindTooltip(content: string | HTMLElement | Function | Tooltip, options?: TooltipOptions): Layer,
        unbindTooltip(): Layer,
        openTooltip(latlng?: LatLng): Layer,
        closeTooltip(): Layer,
        toggleTooltip(): Layer,
        isTooltipOpen(): boolean,
        setTooltipContent(content: string | HTMLElement | Tooltip): Layer,
        getTooltip(): Tooltip,
    }

    export interface LayerOptions {
        pane?: string,
        attribution?: string
    }

    export interface InteractiveLayer {

    }

    export interface InteractiveLayerOptions extends LayerOptions {
        interactive?: boolean,
        bubblingMouseEvents?: boolean
    }

    export interface GridLayer extends Layer {
        bringToFront(): GridLayer,
        bringToBack(): GridLayer,
        getContainer(): HTMLElement,
        setOpacity(opacity: number): GridLayer,
        setZIndex(zIndex: number): GridLayer,
        isLoading(): boolean,
        redraw(): GridLayer,
        getTileSize(): Point,
        createTile(coords: any, done?: Function): HTMLElement
    }

    export interface GridLayerOptions extends LayerOptions {
        tileSize?: number | Point,
        opacity?: number,
        updateWhenIdle?: boolean,
        updateWhenZooming?: boolean,
        updateInterval?: number,
        zIndex?: number,
        bounds?: LatLngBounds,
        minZoom?: number,
        maxZoom?: number,
        maxNativeZoom?: number,
        minNativeZoom?: number,
        noWrap?: boolean,
        pane?: string,
        className?: string,
        keepBuffer?: number
    }

    export interface LayerGroup extends Layer {
        toGeoJSON(): any,
        addLayer(layer: Layer): LayerGroup,
        removeLayer(layer: Layer): LayerGroup,
        removeLayer(id: number): LayerGroup,
        hasLayer(layer: Layer): boolean,
        hasLayer(id: number): boolean,
        clearLayers(): LayerGroup,
        invoke(methodName: string, ...args: any[]): LayerGroup,
        eachLayer(fn: Function, context?: any): LayerGroup,
        getLayer(id: number): Layer,
        getLayers(): Layer[],
        setZIndex(zIndex: number): LayerGroup,
        getLayerId(layer: Layer): number
    }

    export interface FeatureGroup extends LayerGroup {
        setStyle(style: PathOptions): FeatureGroup,
        bringToFront(): FeatureGroup,
        bringToBack(): FeatureGroup,
        getBounds(): LatLngBounds
    }

    export interface FeatureGroupOptions extends LayerOptions {

    }

    export interface Marker extends Layer {
        toGeoJSON(): any,
        getLatLng(): LatLng,
        setLatLng(latlng: LatLng): Marker,
        setZIndexOffset(offset: number): Marker,
        setIcon(icon: Icon): Marker,
        setOpacity(opacity: number): Marker
    }

    export interface MarkerOptions extends InteractiveLayerOptions {
        icon?: Icon,
        keyboard?: boolean,
        title?: string,
        alt?: string,
        zIndexOffset?: number,
        opacity?: number,
        riseOnHover?: boolean,
        riseOffset?: number,
        pane?: string,
        bubblingMouseEvents?: boolean,
        draggable?: boolean,
        autoPan?: boolean,
        autoPanPadding?: Point,
        autoPanSpeed?: number
    }

    export interface Icon {
        createIcon(oldIcon?: HTMLElement): HTMLElement,
        createShadow(oldIcon?: HTMLElement): HTMLElement
    }

    export interface IconOptions {
        iconUrl?: string,
        iconRetinaUrl?: string,
        iconSize?: Point | number[],
        iconAnchor?: Point | number[],
        popupAnchor?: Point | number[],
        tooltipAnchor?: Point | number[],
        shadowUrl?: string,
        shadowRetinaUrl?: string,
        shadowSize?: Point | number[],
        shadowAnchor?: Point | number[],
        className?: string
    }

    export interface PolyLine extends Path {
        toGeoJSON(): any;
        getLatLngs(): LatLng[];
        setLatLngs(latlngs: LatLng[]): PolyLine;
        isEmpty(): boolean;
        closestLayerPoint(p: Point): Point;
        getCenter(): LatLng;
        getBounds(): LatLngBounds;
        addLatLng(latlng: LatLng): PolyLine;
    }

    export interface PolyLineOptions extends PathOptions {
        smoothFactor?: number;
        noClip?: boolean;
    }

    export interface Evented {
        on(type: string, fn: Function, context?: any): Evented,
        on(eventMap: any): Evented,
        off(type: string, fn?: Function, context?: any): Evented,
        off(eventMap: any): Evented,
        off(): Evented,
        fire(type: string, data?: any, propagate?: boolean): Evented,
        listens(type: string): boolean,
        once(type: string, fn: Function, context?: any): Evented,
        addEventParent(obj: Evented): Evented,
        removeEventParent(obj: Evented): Evented,
        addEventListener(type: string, fn: Function, context?: any): Evented,
        addEventListener(eventMap: any): Evented,
        removeEventListener(type: string, fn?: Function, context?: any): Evented,
        removeEventListener(eventMap: any): Evented,
        clearAllEventListeners(type: string, fn?: Function, context?: any): Evented,
        addOneTimeEventListener(type: string, fn: Function, context?: any): Evented,
        fireEvent(type: string, data?: any, propagate?: boolean): Evented,
        hasEventListeners(type: string): boolean
    }

    export interface Popup extends Layer {
        getLatLng(): LatLng,
        setLatLng(latlng: LatLng): Popup,
        getContent(): string | HTMLElement,
        setContent(htmlContent: string | HTMLElement | Function): Popup,
        getElement(): string | HTMLElement,
        update(): void,
        isOpen(): boolean,
        bringToFront(): Popup,
        bringToBack(): Popup,
        openOn(map: Map): Popup
    }

    export interface PopupOptions {
        maxWidth?: number,
        minWidth?: number,
        maxHeight?: number,
        autoPan?: boolean,
        autoPanPaddingTopLeft?: Point,
        autoPanPaddingBottomRight?: Point,
        autoPanPadding?: Point,
        keepInView?: boolean,
        closeButton?: boolean,
        autoClose?: boolean,
        closeOnEscapeKey?: boolean,
        closeOnClick?: boolean,
        className?: string,
        offset?: Point,
        pane?: string,
        attribution?: string
    }

    export interface Tooltip extends Layer {

    }

    export interface TooltipOptions {
        pane?: string,
        offset?: Point,
        direction?: string,
        permanent?: boolean,
        sticky?: boolean,
        interactive?: boolean,
        opacity?: number,
        className?: string,
        attribution?: string
    }

    export interface CRS {
        code: string,
        wrapLng: number[],
        wrapLat: number[],
        infinite: boolean,
        latLngToPoint(latlng: LatLng, zoom: number): Point,
        pointToLatLng(point: Point, zoom: number): LatLng,
        project(latlng: LatLng): Point,
        unproject(point: Point): LatLng,
        scale(zoom: number): number,
        zoom(scale: number): number,
        getProjectedBounds(zoom: number): Bounds,
        distance(latlng1: LatLng, latlng2: LatLng): number,
        wrapLatLng(latlng: LatLng): LatLng,
        wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
    }

    export interface LatLngBounds {
        extend(latlng: LatLng): LatLngBounds,
        extend(otherBounds: LatLngBounds): LatLngBounds,
        pad(bufferRatio: number): LatLngBounds,
        getCenter(): LatLng,
        getSouthWest(): LatLng,
        getNorthEast(): LatLng,
        getNorthWest(): LatLng,
        getSouthEast(): LatLng,
        getWest(): number,
        getSouth(): number,
        getEast(): number,
        getNorth(): number,
        contains(otherBounds: LatLngBounds): boolean,
        contains(latlng: LatLng): boolean,
        intersects(otherBounds: LatLngBounds): boolean,
        overlaps(otherBounds: Bounds): boolean,
        toBBoxString(): string,
        equals(otherBounds: LatLngBounds, maxMargin?: number): boolean,
        isValid(): boolean
    }

    export interface LatLng {
        lat: number,
        lng: number,
        alt?: number,
        equals(): boolean,
        toString(): string,
        distanceTo(): number,
        wrap(): LatLng,
        toBounds(): LatLngBounds
    }

    export interface Bounds {
        min: Point,
        max: Point,
        extend(point: Point): Bounds,
        getCenter(round?: boolean): Point,
        getBottomLeft(): Point,
        getTopRight(): Point,
        getTopLeft(): Point,
        getBottomRight(): Point,
        getSize(): Point,
        contains(otherBounds: Point): boolean,
        contains(point: Point): boolean,
        intersects(otherBounds: Bounds): boolean,
        overlaps(otherBounds: Bounds): boolean
    }

    export interface Point {
        x: number,
        y: number,
        clone(): Point,
        add(otherPoint: Point): Point,
        subtract(otherPoint: Point): Point,
        divideBy(num: number): Point,
        multiplyBy(num: number): Point,
        scaleBy(scale: Point): Point,
        unscaleBy(scale: Point): Point,
        round(): Point,
        floor(): Point,
        ceil(): Point,
        trunc(): Point,
        distanceTo(otherPoint: Point): number,
        equals(otherPoint: Point): boolean,
        contains(otherPoint: Point): boolean,
        toString(): string
    }

    export interface Event {
        type: string;
        target: any
        sourceTarget: any
        propagatedFrom: any
        layer: any
    }

    export interface KeyboardEvent extends Event {
        originalEvent: IDomEvent;
    }

    export interface MouseEvent extends Event {
        latlng: LatLng;
        layerPoint: Point;
        containerPoint: Point;
        originalEvent: IDomEvent;
    }

    export interface LocationEvent extends Event {
        latlng: LatLng;
        bounds: LatLngBounds;
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        heading: number;
        speed: number;
        timestamp: number;
    }

    export interface ErrorEvent extends Event {
        message: string;
        code: number;
    }

    export interface LayerEvent extends Event {
        layer: Layer;
    }

    export interface LayersControlEvent extends Event {
        layer: Layer;
        name: string;
    }

    export interface TileEvent extends Event {
        tile: HTMLElement;
        coords: Point;
    }

    export interface TileErrorEvent extends Event {
        tile: HTMLElement;
        coords: Point;
        error: any
    }

    export interface ResizeEvent extends Event {
        oldSize: Point;
        newSize: Point;
    }

    export interface GeoJSONEvent extends Event {
        layer: Layer;
        properties: any;
        geometryType: string;
        id: string;
    }

    export interface PopupEvent extends Event {
        popup: Popup;
    }

    export interface TooltipEvent extends Event {
        tooltip: Tooltip;
    }

    export interface DragEndEvent extends Event {
        distance: number;
    }

    export interface ZoomAnimEvent extends Event {
        center: LatLng;
        zoom: number;
        noUpdate: boolean;
    }

}