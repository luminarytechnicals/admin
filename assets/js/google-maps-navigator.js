/**
 * google-maps-navigator.js — Luminary Technicals
 * Official Google Maps Platform Address Autocomplete & Address Descriptors Navigator
 * Centered on Luminary Technicals Bangalore Head Office (Nagavarapalya, C V Raman Nagar)
 */

(function () {
  const BANGALORE_COORDS = { lat: 12.9934, lng: 77.6616 };
  const BANGALORE_PLACE_ID = "ChIJG71w6Y0UrjsR2JtGk3J8W8c"; // Nagavarapalya / C V Raman Nagar area
  const MAP_ID = "f8b9e6163e48e501";

  // Pre-filled verified data for Luminary Technicals Bangalore Head Office
  const DEFAULT_OFFICE_DATA = {
    address: "Nagavarapalya, C V Raman Nagar",
    aptSuite: "Luminary Central NOC & Executive Desk",
    city: "Bengaluru",
    state: "Karnataka",
    zip: "560093",
    country: "India",
    landmark: "Near Versova Layout / Overhead Water Tank",
    combined: "Luminary Technicals (Head Office)\nNagavarapalya, C V Raman Nagar\nBengaluru, Karnataka 560093, India\nLandmark: Near Versova Layout / Overhead Water Tank",
    landmarksList: [
      { name: "Near Versova Layout / Overhead Water Tank", relationship: "Near" },
      { name: "Near Kaggadasapura Main Road Junction", relationship: "Near" },
      { name: "Opposite C V Raman Nagar Post Office Zone", relationship: "Opposite" },
      { name: "Adjacent Center for Artificial Intelligence & Robotics (CAIR)", relationship: "Adjacent" }
    ]
  };

  function getApiKey() {
    if (typeof window !== "undefined") {
      if (window.GOOGLE_MAPS_API_KEY && window.GOOGLE_MAPS_API_KEY !== "INSERT_YOUR_API_KEY") {
        return window.GOOGLE_MAPS_API_KEY;
      }
      if (window.GOOGLE_MAPS_DETAILS && window.GOOGLE_MAPS_DETAILS.apiKey && window.GOOGLE_MAPS_DETAILS.apiKey !== "INSERT_YOUR_API_KEY") {
        return window.GOOGLE_MAPS_DETAILS.apiKey;
      }
    }
    return null;
  }

  // Pre-fill form fields with Head Office data
  function prefillOfficeData() {
    const addressInput = document.getElementById("address-autocomplete");
    const aptSuiteInput = document.getElementById("apt-suite");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state-province");
    const zipInput = document.getElementById("zip-postal-code");
    const countryInput = document.getElementById("country");
    const combinedInput = document.getElementById("combined-address");
    const landmarksSelect = document.getElementById("landmarks");

    if (addressInput && !addressInput.value) addressInput.value = DEFAULT_OFFICE_DATA.address;
    if (aptSuiteInput && !aptSuiteInput.value) aptSuiteInput.value = DEFAULT_OFFICE_DATA.aptSuite;
    if (cityInput && !cityInput.value) cityInput.value = DEFAULT_OFFICE_DATA.city;
    if (stateInput && !stateInput.value) stateInput.value = DEFAULT_OFFICE_DATA.state;
    if (zipInput && !zipInput.value) zipInput.value = DEFAULT_OFFICE_DATA.zip;
    if (countryInput && !countryInput.value) countryInput.value = DEFAULT_OFFICE_DATA.country;
    if (combinedInput && !combinedInput.value) combinedInput.value = DEFAULT_OFFICE_DATA.combined;

    if (landmarksSelect && landmarksSelect.options.length <= 1) {
      landmarksSelect.innerHTML = '<option value="" disabled>Choose your Landmark</option>';
      DEFAULT_OFFICE_DATA.landmarksList.forEach((lm, idx) => {
        const opt = document.createElement("option");
        opt.value = lm.name;
        opt.textContent = `${lm.relationship} ${lm.name}`;
        if (idx === 0) opt.selected = true;
        landmarksSelect.appendChild(opt);
      });
    }
  }

  // Google Maps Dynamic Loader
  function loadGoogleMapsScript(apiKey, callback) {
    if (window.google && window.google.maps) {
      callback();
      return;
    }

    const g = { key: apiKey };
    const h = null;
    let a, k;
    const p = "The Google Maps JavaScript API";
    const c = "google";
    const l = "importLibrary";
    const q = "__ib__";
    const m = document;
    const b = window;
    b[c] = b[c] || {};
    const d = (b.maps = b.maps || {});
    const r = new Set(["places", "geometry", "marker"]);
    const e = new URLSearchParams();
    
    e.set("libraries", [...r].join(","));
    for (k in g) {
      e.set(k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), g[k]);
    }
    e.set("callback", c + ".maps." + q);

    const script = m.createElement("script");
    script.src = `https://maps.${c}apis.com/maps/api/js?` + e;
    script.async = true;
    script.defer = true;
    
    d[q] = () => {
      callback();
    };

    script.onerror = () => {
      console.warn("Google Maps JS API could not load with the provided key. Reverting to interactive embed view.");
      showEmbedFallback();
    };

    m.head.appendChild(script);
  }

  async function initGoogleMapsApp() {
    try {
      const { Map, InfoWindow } = await google.maps.importLibrary("maps");
      const { Autocomplete } = await google.maps.importLibrary("places");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      const mapContainer = document.getElementById("address-descriptor-map");
      if (!mapContainer) return;

      const mapOptions = {
        center: BANGALORE_COORDS,
        zoom: 16,
        mapId: MAP_ID
      };

      const map = new Map(mapContainer, mapOptions);
      const geocoder = new google.maps.Geocoder();
      const descriptorMarkers = [];

      let marker = new AdvancedMarkerElement({
        map,
        position: BANGALORE_COORDS,
        gmpDraggable: true,
        title: "Luminary Technicals — Head Office (Bengaluru)"
      });

      let infoWindow = new InfoWindow({
        content: "<strong>Luminary Technicals Head Office</strong><br>Nagavarapalya, C V Raman Nagar, Bengaluru 560093",
        headerDisabled: true
      });
      infoWindow.open(map, marker);

      const addressInput = document.getElementById("address-autocomplete");
      const aptSuiteInput = document.getElementById("apt-suite");
      const cityInput = document.getElementById("city");
      const stateProvinceInput = document.getElementById("state-province");
      const zipPostalCodeInput = document.getElementById("zip-postal-code");
      const countryInput = document.getElementById("country");
      const landmarksSelect = document.getElementById("landmarks");
      const combinedAddressInput = document.getElementById("combined-address");
      let formattedAddress = DEFAULT_OFFICE_DATA.address;

      if (addressInput) {
        const autocomplete = new google.maps.places.Autocomplete(addressInput, {
          fields: ["place_id", "address_components", "formatted_address", "geometry", "name"]
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            console.error("No details available for input: '" + place.name + "'");
            return;
          }

          marker.position = place.geometry.location;
          map.setCenter(place.geometry.location);

          fillInAddress(place);
          formattedAddress = place.formatted_address || place.name;
          addressDescriptorPlaceIdLookup(place.place_id);

          infoWindow.setContent(`<strong>${place.name}</strong><br>${formattedAddress}`);
          infoWindow.open(map, marker);
        });
      }

      function fillInAddress(place) {
        if (!place || !place.address_components) return;
        if (aptSuiteInput) aptSuiteInput.value = "";
        if (cityInput) cityInput.value = "";
        if (stateProvinceInput) stateProvinceInput.value = "";
        if (zipPostalCodeInput) zipPostalCodeInput.value = "";
        if (countryInput) countryInput.value = "";

        for (const component of place.address_components) {
          const componentType = component.types[0];
          switch (componentType) {
            case "street_number":
              if (addressInput) addressInput.value = `${component.long_name} `;
              break;
            case "route":
              if (addressInput) addressInput.value += component.short_name;
              break;
            case "premise":
            case "subpremise":
              if (aptSuiteInput) aptSuiteInput.value = component.short_name;
              break;
            case "locality":
              if (cityInput) cityInput.value = component.long_name;
              break;
            case "administrative_area_level_1":
              if (stateProvinceInput) stateProvinceInput.value = component.short_name;
              break;
            case "postal_code":
              if (zipPostalCodeInput) zipPostalCodeInput.value = component.long_name;
              break;
            case "country":
              if (countryInput) countryInput.value = component.long_name;
              break;
          }
        }
        updateCombinedAddress();
      }

      function addressDescriptorPlaceIdLookup(placeId) {
        if (!placeId || !geocoder) return;
        geocoder.geocode({
          placeId: placeId,
          extraComputations: ["ADDRESS_DESCRIPTORS"],
          fulfillOnZeroResults: true
        }, (results, status) => {
          if (status === "OK" && results[0] && results[0].address_descriptor) {
            const descriptors = results[0].address_descriptor.landmarks || [];
            if (landmarksSelect) {
              landmarksSelect.innerHTML = '<option value="" disabled selected>Choose your Landmark</option>';
              descriptorMarkers.forEach((m) => m.setMap && m.setMap(null));
              descriptorMarkers.length = 0;

              descriptors.forEach((descriptor, index) => {
                const option = document.createElement("option");
                option.value = descriptor.display_name;
                option.text = `${descriptor.spatial_relationship || "Near"} ${descriptor.display_name}`;
                landmarksSelect.appendChild(option);

                const descriptorMarkerContent = document.createElement("div");
                descriptorMarkerContent.className = index === 0 ? "descriptor-marker highlighted" : "descriptor-marker";
                descriptorMarkerContent.textContent = index + 1;

                geocoder.geocode({ placeId: descriptor.place_id }, (lmResults, lmStatus) => {
                  if (lmStatus === "OK" && lmResults[0]) {
                    const landmarkInfoWindow = new InfoWindow({
                      content: `<strong>${descriptor.display_name}</strong><br><small>${descriptor.spatial_relationship || "Landmark"}</small>`,
                      headerDisabled: true
                    });

                    const lmMarker = new AdvancedMarkerElement({
                      map: map,
                      position: lmResults[0].geometry.location,
                      content: descriptorMarkerContent
                    });
                    descriptorMarkers.push(lmMarker);

                    lmMarker.content.addEventListener("mouseover", () => landmarkInfoWindow.open(map, lmMarker));
                    lmMarker.content.addEventListener("mouseout", () => landmarkInfoWindow.close());
                  }
                });
              });

              if (landmarksSelect.options.length > 1) {
                landmarksSelect.selectedIndex = 1;
                updateCombinedAddress();
              }
            }
          }
        });
      }

      function updateCombinedAddress() {
        if (!combinedAddressInput) return;
        const address = formattedAddress || (addressInput ? addressInput.value : "");
        let landmark = "";
        if (landmarksSelect && landmarksSelect.selectedIndex >= 0 && landmarksSelect.options[landmarksSelect.selectedIndex]) {
          landmark = landmarksSelect.options[landmarksSelect.selectedIndex].text;
        }
        combinedAddressInput.value = `${address}\n${landmark ? "Landmark: " + landmark : ""}`.trim();
      }

      if (landmarksSelect) {
        landmarksSelect.addEventListener("change", () => {
          updateCombinedAddress();
          const selectedIndex = landmarksSelect.selectedIndex - 1;
          descriptorMarkers.forEach((m) => {
            if (selectedIndex === parseInt(m.content.textContent) - 1) {
              m.content.classList.add("highlighted");
            } else {
              m.content.classList.remove("highlighted");
            }
          });
        });
      }

      marker.addListener("dragend", () => {
        const newPosition = marker.position;
        geocoder.geocode({
          location: newPosition,
          extraComputations: ["ADDRESS_DESCRIPTORS"],
          fulfillOnZeroResults: true
        }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const place = results[0];
            fillInAddress(place);
            formattedAddress = place.formatted_address;
            updateCombinedAddress();
            if (place.place_id) {
              addressDescriptorPlaceIdLookup(place.place_id);
            }
            map.setCenter(newPosition);
          }
        });
      });

      // Update Combined initial trigger
      updateCombinedAddress();
    } catch (err) {
      console.error("Error initializing Google Maps Platform:", err);
      showEmbedFallback();
    }
  }

  function showEmbedFallback() {
    const dynamicCanvas = document.getElementById("address-descriptor-map");
    const embedIframe = document.getElementById("embed-map-frame");
    const demoBadge = document.getElementById("map-mode-badge");
    if (dynamicCanvas && embedIframe) {
      dynamicCanvas.style.display = "none";
      embedIframe.style.display = "block";
    }
    if (demoBadge) {
      demoBadge.innerHTML = '📍 Google Maps Embed &bull; <a href="https://share.google/V1pNWZPIrYMU6uPvo" target="_blank" style="color:var(--accent);text-decoration:none;">Open Official Google Listing &rarr;</a>';
    }
  }

  // Handle manual API key input / test
  window.applyGoogleMapsApiKey = function (key) {
    if (!key || key.trim() === "") return;
    window.GOOGLE_MAPS_API_KEY = key.trim();
    if (window.GOOGLE_MAPS_DETAILS) window.GOOGLE_MAPS_DETAILS.apiKey = key.trim();
    const dynamicCanvas = document.getElementById("address-descriptor-map");
    const embedIframe = document.getElementById("embed-map-frame");
    if (dynamicCanvas && embedIframe) {
      embedIframe.style.display = "none";
      dynamicCanvas.style.display = "block";
    }
    loadGoogleMapsScript(key.trim(), initGoogleMapsApp);
  };

  // Bootstrap when DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    prefillOfficeData();

    // Check if key is available
    const apiKey = getApiKey();
    if (apiKey) {
      const dynamicCanvas = document.getElementById("address-descriptor-map");
      const embedIframe = document.getElementById("embed-map-frame");
      if (dynamicCanvas && embedIframe) {
        embedIframe.style.display = "none";
        dynamicCanvas.style.display = "block";
      }
      loadGoogleMapsScript(apiKey, initGoogleMapsApp);
    } else {
      // Show verified interactive embed view by default, preloaded with Bangalore Head Office
      showEmbedFallback();
    }
  });
})();
