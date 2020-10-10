def to_string(name, mileage, bike_name):
    return f'{name}, {mileage}, {bike_name}'

d = {
    'name': 'some name',
    'mileage': 'some mileage',
    'bike_name': 'some bike name',
}

string = to_string(*d.values())
print(string)
print(to_string(**d))