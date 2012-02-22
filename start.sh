#!/bin/bash

# using daemon to put gaurd in the background. -r means respawn if dead
# daemon --rummung --name=guard-passenger should show the running thingy, but it doesnt.
daemon -r --name=guard-passenger guard

# the initial passenger we start manually
passenger start -d -e production