<template>
    <div>
        <button @click="create">Create Playlists</button>
    </div>
</template>

<script>
    export default {
        props: ['tracks'],
        data () {
            return {
                accessToken: null,
                user_id: null,
                playlists: null,
                songs: [],
            }
        },
        methods: {
            create() {
                let trackFlattened = [].concat.apply([], this.tracks);
                this.$set(this, 'songs', trackFlattened);
                console.log(this.songs);
                let code = window.location.href;
                code = code.split('=')[1];
                code = code.split('&')[0];
                this.$set(this, 'accessToken', code);
                let count = 0;
                let songCount = 0;
                this.axios.get('https://api.spotify.com/v1/me/', {
                    headers: {
                        'Authorization': 'Bearer ' + this.accessToken
                    }
                }).then((response) => {
                    this.$set(this, 'user_id', response.data.id);
                    count = count + songCount;
                    let tracks = this.songs;
                    let trackDates = new Set();
                    console.log(songCount, count);
                    for (let track of tracks) {
                        let date = track.added_at;
                        date = date.split('-', 2).join();
                        trackDates.add(date);
                    }
                    this.axios.get('https://api.spotify.com/v1/me/playlists', {
                        headers: {
                            'Authorization': 'Bearer ' + this.accessToken
                        }
                    }).then((response) => {
                        if (response.data.total === 0) {

                        } else if (response.data.total !== 0) {
                            this.$set(this, 'playlists', response.data.items);
                            let playlists = this.playlists;
                            for (let playlist of playlists) {
                                if (trackDates.has(playlist.name)) {
                                    trackDates.delete(playlist.name);
                                }
                            }
                            for (let date of trackDates) {
                                this.axios.post('https://api.spotify.com/v1/users/' + this.user_id + '/playlists', {name: date}, {
                                    headers: {
                                        'Authorization': 'Bearer ' + this.accessToken,
                                        'Content-Type': 'application/json'
                                    }
                                }).then((response) => {
                                    console.log(response);
                                })
                            }
                        }
                    });
                });
            }
        }
    }
</script>

<style lang="scss">

</style>