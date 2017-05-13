<template>
    <div>
        <button @click="getSongs">get Songs</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                accessToken: null,
                songs: null,
            }
        },
        methods: {
            getSongs() {
                let code = window.location.href;
                code = code.split('=')[1];
                code = code.split('&')[0];
                this.$set(this, 'accessToken', code);
                let tracks = [];
                let next = 'https://api.spotify.com/v1/me/tracks?limit=50&offset=0';
                const self = this;

                function getTrack() {
                    return self.axios.get(next, {
                        headers: {
                            'Authorization': 'Bearer ' + self.accessToken
                        }
                    });
                }

                function getTracks() {
                    self.axios.all([getTrack()]).then(response => {
                        next = response[0].data.next;
                        tracks.push(response[0].data.items);
                        if (next !== null) {
                            getTracks()
                        } else {
                            self.$set(self, 'songs', tracks);
                            self.$emit('done', self.songs);
                        }
                    });
                }

                if (next !== null) {
                    getTracks();
                }
            }
        }
    }
</script>
<style lang="scss">

</style>