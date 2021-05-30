# Setup
1. `cp .env.example .env`
2. Fill `.env` with desired values
3. `make start` to start application
4. `make seed` to seed database with 10 users:
```
user-0@example.com / password
user-1@example.com / password
user-2@example.com / password
[...]
```
5. Swagger available under `localhost:3000/docs`

# NodeJS task

Write NodeJS app that has 3 endpoints


# Some requirements:

1. Use any HTTP library you want
2. Don’t use real database - in-memory implementationis sufficient
3. Add README with setup, starting instructions,andall users and passwords
   used in mock


# Nice to have (not required though):

1. TypeScript
2. NestJS (and it’s features)

Tips:

1. Use proper HTTP statuses
2. Handle as many errors as you like - imagine, you area user of such API, and
   you want to know how you can fix something, in caseof a problem.
3. Treat this application as MVP, which will be expanded further later on.
4. For encryption you may need to ask Google for help,as you are expected to
   encounter some problems. Feel free to solve this problemas you like.
   Additional point if you manage to solve it withoutusage of external libraries.
5. Some application architecture is expected - the mostimportant is responsibility
   of different areas.
6. If you want to use a library for something, don’thesitate.

0. Authorization

Header: `Authorization: Bearer <token>`

1. POST /api/sign-in

Not authorized.

It should support at least 2 users (2 distinct emailaddresses).

```
In POST body you should be able to send:
```
```
{
"email" : "example@mail.com" ,
"password" : "1234"
```

## }

And in return you should get the JWT token valid for5 minutes:

```
{
"authToken" : "eyJhbGc..."
}
```
Which holds this payload:
{
"email" : "example@mail.com"
}

2. POST /api/generate-key-pair

```
Authorized.
```
```
It should associate appropriate key with authorizeduser.
It should return generated pair of public and privateRSA keys (any length)
```
## {

```
"privKey": "-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIJrT ....",
"pubKey": "-----BEGIN PUBLIC KEY-----MII..."
}
```
3. POST /api/encrypt

```
Authorized
```
Endpoint should encrypt file (http://www.africau.edu/images/default/sample.pdf)and
return it as Base64 string (content-type is up toYou). Payload should be encrypted
with usage of generated public key, so user can (hypothetically)decrypt it using his
private key.


