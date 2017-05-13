<template>
    <div>
        <button @click="addSongsToPlaylist">Add Songs</button>
    </div>
</template>

<script>
    export default {
        props: ['tracks'],
        data() {
            return {
                accessToken: null,
                playlist: null,
                user_id: null,
            }
        },
        methods: {
            addSongsToPlaylist() {
                let code = window.location.href;
                code = code.split('=')[1];
                code = code.split('&')[0];
                this.$set(this, 'accessToken', code);
                this.axios.get('https://api.spotify.com/v1/me/', {
                    headers: {
                        'Authorization': 'Bearer ' + this.accessToken
                    }
                }).then((response) => {
                    this.$set(this, 'user_id', response.data.id);
                });
                let tracks = this.tracks;
                for (let track of tracks) {
                    let songs = [];
                    this.axios.get('https://api.spotify.com/v1/me/playlists', {
                        headers: {
                            'Authorization': 'Bearer ' + this.accessToken
                        }
                    }).then((response) => {
                        if (response.data.items.length === 0) {
                            console.log('add Playlists first')
                        } else {
                            this.$set(this, 'playlist', response.data.items);
                            let playlists = response.data.items;
                            for (let tr of track) {
                                let date = tr.added_at;
                                date = date.split('-', 2).join();
                                function checkName(playlist) {
                                    return playlist.name === date;
                                }

                                let rightPlaylist = this.playlist.find(checkName);
                                this.$set(this, 'playlists', rightPlaylist);
                                let value = {playlist: rightPlaylist.id, track: tr.track.uri};
                                songs.push(value);
                            }
                        }
                        for (let playlist of this.playlist) {
                            let songsToSend = {};
                            let songsTo = [];
                            for (let song of songs) {
                                if (playlist.id === song.playlist) {
                                    songsTo.push(song.track);
//                                console.log(song.track);
                                }
                            }
                            songsToSend = songsTo;
                            if (songsToSend.length !== 0) {
                                this.axios.post('https://api.spotify.com/v1/users/' + this.user_id + '/playlists/' + playlist.id + '/tracks', {'uris': songsToSend}, {
                                    headers: {
                                        'Authorization': 'Bearer ' + this.accessToken,
                                        'Content-Type': 'application/json'
                                    }
                                }).then((response) => {
                                    console.log(response);
                                });
                            }
                        }
                    }, (response) => {
                        alert(response.status);
                    });
                }
            }
        }
    }
</script>
<style lang="scss">

</style>