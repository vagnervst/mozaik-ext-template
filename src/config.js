import convict from 'convict';


const config = convict({
    API_NAME: {
        baseUrl: {
            doc:     'MY API URL :)',
            default: 'https://myawesomeapi.com',
            format:  String,
            env:     'API_BASE_URL'
        },
        token: {
            doc:     'MY API TOKEN',
            default: 'token',
            format:  String,
            env:     'PAGARME_API_KEY'
        }
    }
});


export default config;
