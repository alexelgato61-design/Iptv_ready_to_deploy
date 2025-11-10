// Sample channels data - can be loaded from API or config file
const channels = [
    {
        id: 1,
        name: "Big Buck Bunny",
        description: "Open source test stream",
        url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    },
    {
        id: 2,
        name: "Sintel",
        description: "Open source movie",
        url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    },
    {
        id: 3,
        name: "Apple Test Stream",
        description: "Apple HLS test stream",
        url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8"
    },
    {
        id: 4,
        name: "Tears of Steel",
        description: "Open source test content",
        url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
    }
];

// Initialize Video.js player
let player;
let currentChannel = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Video.js player
    player = videojs('video-player', {
        fluid: true,
        responsive: true,
        controls: true,
        preload: 'auto',
        html5: {
            vhs: {
                overrideNative: true
            },
            nativeVideoTracks: false,
            nativeAudioTracks: false,
            nativeTextTracks: false
        }
    });

    // Load channels
    loadChannels();
    
    // Handle player errors
    player.on('error', function() {
        const error = player.error();
        console.error('Player error:', error);
        showNotification('Error loading stream. Please try another channel.', 'error');
    });

    // Handle player ready
    player.on('ready', function() {
        console.log('Player is ready');
    });

    // Handle playing event
    player.on('playing', function() {
        console.log('Stream is playing');
    });
});

// Load channels into the sidebar
function loadChannels() {
    const channelsList = document.getElementById('channels-list');
    channelsList.innerHTML = '';

    channels.forEach(channel => {
        const channelItem = createChannelElement(channel);
        channelsList.appendChild(channelItem);
    });
}

// Create channel element
function createChannelElement(channel) {
    const div = document.createElement('div');
    div.className = 'channel-item';
    div.dataset.channelId = channel.id;
    
    div.innerHTML = `
        <h4>${channel.name}</h4>
        <p>${channel.description}</p>
    `;
    
    div.addEventListener('click', function() {
        playChannel(channel);
    });
    
    return div;
}

// Play selected channel
function playChannel(channel) {
    console.log('Playing channel:', channel.name);
    
    // Update active channel styling
    document.querySelectorAll('.channel-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-channel-id="${channel.id}"]`).classList.add('active');
    
    // Update current channel info
    currentChannel = channel;
    document.getElementById('current-channel').textContent = `Now Playing: ${channel.name}`;
    
    // Load and play the stream
    try {
        player.src({
            src: channel.url,
            type: 'application/x-mpegURL'
        });
        player.play().catch(error => {
            console.error('Play error:', error);
            showNotification('Could not start playback. Click play button to start.', 'info');
        });
    } catch (error) {
        console.error('Error setting source:', error);
        showNotification('Error loading channel', 'error');
    }
}

// Show notification (simple console log for now, can be enhanced)
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Can be enhanced with toast notifications or alert messages
}

// Handle cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (player) {
        player.dispose();
    }
});
