errors = {
    'name': {'text': 'name error', 'visible': False},
    'mileage': {'text': 'mileage error', 'visible': False},
    'bikeName': {'text': 'bike name error', 'visible': False},
}

def show_errors(errors):
    make_visible = lambda x: {**x, **{'visible': True}}
    return {k: make_visible(v) for k, v in errors.items()}

visible = show_errors(errors)
print(visible)