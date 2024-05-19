// HOST = 'http://localhost:5000/api';
// HOST = 'https://d5d710csp8btpmh27bp8.apigw.yandexcloud.net';

let HOST;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    HOST = 'http://localhost:5000/api';
else
    HOST = 'https://d5d710csp8btpmh27bp8.apigw.yandexcloud.net';

HOST = 'https://d5d710csp8btpmh27bp8.apigw.yandexcloud.net/api';
export default HOST;
