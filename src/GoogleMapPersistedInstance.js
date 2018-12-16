import GoogleMap from './GoogleMap';

const clearChildren = (node) => {
  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
}

export class GoogleMapPersistedInstance extends GoogleMap {

  get mapInstanceId () {
    return `google-map-${this.mapId}`;
  }

  get hiddenContainerId () {
    return `hidden-container-${this.mapId}`;
  }

  getHiddenMapContainer = () => {
    let element = document.getElementById(this.hiddenContainerId);
    if (!element) {
      element = document.createElement('div');
      element.id = this.hiddenContainerId;
      element.style.display = "none";
      document.body.appendChild(element);
    }
    return element;
  }

  getInstance () {
    const {
      zoom,
      center
    } = this.props;
    const map = window[this.mapInstanceId];
    const hiddenContainer = this.getHiddenMapContainer();
    if (map && hiddenContainer.children.length === 1) {
      map.setZoom(zoom);
      map.setCenter(center);
      const mapContainer = document.getElementById(this.mapId); // node.parentElement;
      clearChildren(mapContainer);
      mapContainer.appendChild(hiddenContainer.children[0]);
      return map;
    }
    return super.getInstance();
  }

  componentWillUnmount () {
    const hiddenContainer = this.getHiddenMapContainer();
    clearChildren(hiddenContainer);
    const mapContainer = document.getElementById(this.mapId);
    hiddenContainer.appendChild(mapContainer.children[0]);
    window[this.mapInstanceId] = this.state.map;
    super.componentWillUnmount();
  }
}
