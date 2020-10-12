errors = {
    'name': {
        'text': 'Name cannot be empty',
        'visible': False,
    },
    'mileage': {
        'text': 'Mileage canno be 0',
        'visible': False,
    }
}

def show_errors(errors):
    make_visible = lambda x : x.update({'visible': True}) or x
    return {k: make_visible(v) for k, v in errors.items()}

visible = show_errors(errors)
print(visible)