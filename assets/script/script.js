function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.550520, lng: -46.633308 }, // Coordenadas de São Paulo
        zoom: 14
    });

    const geocoder = new google.maps.Geocoder();
    const infoWindow = new google.maps.InfoWindow();

    // Obter a localização atual do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(userLocation);

            // Obter informações do endereço a partir das coordenadas
            geocoder.geocode({ location: userLocation }, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        const addressComponents = results[0].address_components;
                        const formattedAddress = results[0].formatted_address;

                        document.getElementById('endereco').value = formattedAddress;

                        // Preencher os campos com base nos componentes do endereço
                        addressComponents.forEach((component) => {
                            if (component.types.includes('postal_code')) {
                                document.getElementById('cep').value = component.long_name;
                            } else if (component.types.includes('administrative_area_level_1')) {
                                document.getElementById('uf').value = component.short_name;
                            }
                        });
                    } else {
                        window.alert('Nenhum resultado encontrado para a localização atual.');
                    }
                } else {
                    window.alert('Geocoding falhou devido a: ' + status);
                }
            });
        }, () => {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Erro: O serviço de geolocalização falhou.' :
        'Erro: Seu navegador não suporta geolocalização.');
    infoWindow.open(map);
}

function save() {
    
    const local = {
        endereco: document.getElementById(endereco).value,
        endereco: document.getElementById(cep).value,
        endereco: document.getElementById(uf).value,
        endereco: document.getElementById(referencia).value,
    }
    window.localStorage.setItem("local", JSON.stringify(local));
    window.open('start.html','_self')
    
}

function redirect1() {
    window.open('cadastro_end.html','_self')
}
