import TrackPlayer from 'react-native-track-player'
import TrackPlayerEvents from 'react-native-track-player/lib/eventTypes'


module.exports = async function() {
    TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PLAY, () => TrackPlayer.play())
    TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PAUSE, () => TrackPlayer.pause())
    TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PREVIOUS, () => TrackPlayer.skipToPrevious())
    TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_SKIP, () => TrackPlayer.skipToNext())
}