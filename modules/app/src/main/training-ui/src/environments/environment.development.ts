export const environment = {
    production: false,
    apiUrl: 'http://localhost:9092/selahpraise/v1',
    client_id: 'client-app',
    redirect_uri: 'http://localhost:4200/authorized',
    scope: 'read write openid profile',
    response_type: 'code',
    response_mode: 'form_post'
};