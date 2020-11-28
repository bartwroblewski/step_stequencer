from collections import defaultdict

def cached_sum():
    cache = defaultdict(list)
    def mysum(key, value):
        cache[key].append(int(value))
        return sum(cache[key])
    return mysum

mysum = cached_sum()

s = '{"a":  1, "a":  2, "a":  3, "a": 4, "b": 1, "b": 2}'
l = s[1:-1].split(', ')

result = {
    key: mysum(key, value)
    for x in l
    for key, value in [f'{x[1]}{x[-1]}']
}

print(result)

