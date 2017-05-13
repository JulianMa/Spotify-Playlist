<template>
    <div>
        <button @click="login">Login to Spotify</button>
    </div>
</template>

<script>
    export default {
        methods: {
            login() {
                let clientid = '5eb85618034840b3b319b8e4f72dcaea';
                let scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public user-library-read user-library-modify';
                let redirect_uri = 'http://localhost:8080/callback';
                window.location = 'https://accounts.spotify.com/authorize?' +
                    'client_id=' + clientid +
                    '&redirect_uri=' + redirect_uri +
                    '&scope=' + scope +
                    '&response_type=token' +
                    '&state=123456';
            }
        }
    }
</script>

<style lang="scss">

</style>