const { test, expect } = require('@playwright/test');

test.describe('API тесты', async () => {
    test('Создание пользователя c ошибкой, логин уже используется', async ({ request }) => {
        const response = await request.post('/Account/v1/User', {
            data: {
                "userName": "AlexPo",
                "password": "a1l2e3P4o!"
            }
        })
        expect(response.status()).toBe(406);
        const responseBody = await response.json();
        console.log("\n" + response.status() + " " + response.statusText());
        console.log('Message: ' + responseBody.message);
    })
    test('Создание пользователя c ошибкой, пароль не подходит', async ({ request }) => {
        const response = await request.post('/Account/v1/User', {
            data: {
                "userName": "AlexPo2",
                "password": "a1l2e"
            }
        })
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        console.log(response.status() + " " + response.statusText());
        console.log('Message: ' + responseBody.message);
    })
    test('Создание пользователя успешное', async ({ request }) => {
        const response = await request.post('/Account/v1/User', {
            data: {
                "userName": "AlexPo3",
                "password": "a1l2e3P4o5^"
            }
        })
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        console.log("\n" + response.status() + " " + response.statusText() + "\n" + "Body: ");
        console.log(responseBody);
    })

    test('Создание токена успешное', async ({ request }) => {
        const response = await request.post('/Account/v1/GenerateToken', {
            data: {
                "userName": "AlexPo3",
                "password": "a1l2e3P4o5@"
            }
        })
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log("\n" + response.status() + " " + response.statusText() + "\n" + "Body: ");
        console.log(responseBody);
    })

    test('Создание токена с ошибкой', async ({ request }) => {
        const response = await request.post('/Account/v1/GenerateToken', {
            data: {
                "userName": "string",
                "password": "string"
            }
        })
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log("\n" + response.status() + " " + response.statusText() + " " + "Message: " + responseBody.result);
    })
})
