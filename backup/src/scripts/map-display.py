import folium

def generate_map():
    # Create a map object
    m = folium.Map(location=[45.5236, -122.6750], zoom_start=13)
    
    # Convert the map to HTML string
    return m._repr_html_()

if __name__ == "__main__":
    map_html = generate_map()
    with open('../public/map.html', 'w') as f:
        f.write(map_html)