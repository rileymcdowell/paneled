import statistics 

def average_panels(statuses):
    reds = [] 
    greens = []
    blues = []
    fans = []
    for status in statuses:
        reds.append(status['red'])
        greens.append(status['green'])
        blues.append(status['blue'])
        fans.append(status['fan'])

    return { 'red': statistics.mean(reds) 
           , 'green': statistics.mean(greens)
           , 'blue': statistics.mean(blues)
           , 'fan': statistics.mean(fans)
           }

