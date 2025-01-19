import folium

m = None

def generate_map():    
    global m
    if not m:
        m = folium.Map((45.5236, -122.6750), zoom_start=13)
    # Convert the map to HTML string
    return m._repr_html_()

def _clear_map():
    global m
    m = folium.Map((45.5236, -122.6750), zoom_start=13)
    
    return m._repr_html_()

def add_routes_to_map(routes):
    global m
    for route in routes:
        folium.PolyLine(route).add_to(m)
    
    return m._repr_html_()

if __name__ == "__main__":
    map_html = generate_map()
    with open('../public/map.html', 'w') as f:
        f.write(map_html)