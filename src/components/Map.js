const request = {
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    fields: [
      "name",
      "formatted_address",
      "place_id",
      "geometry",
      "photos"
    ]
  };

  const service = new google.maps.places.PlacesService(map);
  service.getDetails(request, (place, status) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      place &&
      place.geometry &&
      place.geometry.location
    ) {
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location
      });
    }
    this.setState({
      photos: place.photos[0].getUrl(),
      name: place.formatted_address
    });
  });

  "photos" : [
    {
       "html_attributions" : [],
       "height" : 853,
       "width" : 1280,
       "photo_reference" : "CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0"
    }