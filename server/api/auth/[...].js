// file: ~/server/api/auth/[...].ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
const config = useRuntimeConfig()

export default NuxtAuthHandler({
    secret: config.NUXT_SECRET,
    pages: {
        // Change the default behavior to use `/login` as the path for the sign-in page
        signIn: '/login'
    },
    providers: [
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: "Credentials",
                credentials: {
                    username: { label: 'Username', type: 'text', placeholder: '(hint: atuny0)', value: 'hbingley1'},
                    password: { label: 'Password', type: 'password', placeholder: '(hint: h9uQFF1Lh)', value: 'CQutx25i8r' }
                },  // Object is required but can be left empty.
            async authorize(credentials) {

                try {
                    const response = await $fetch(
                        `${config.STRAPI_BASE_URL}/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                username: credentials.username,
                                password: credentials.password,
                            }),
                        }
                    );
                    return {email: response}
                } catch (error) {
                    return null
                }

            },
        }),
    ],
    callbacks: {
        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        async jwt({ token, account, profile }) {

            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                const {id, firstName, lastName,username, email, gender, image, token: accessToken} = token.email
                token.firstName = firstName
                token.lastName = lastName
                token.username = username
                token.email = email
                token.image = image
                token.gender = gender
                token.id = id
                token.jwt = accessToken

            }
            return token
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.jwt = token.jwt
            session.user = {
                firstName : token.firstName,
                lastName : token.lastName,
                username : token.username,
                email : token.email,
                image : token.image,
                gender : token.gender,
                id : token.id
            }

            return session
        }
    },
    session: {
        strategy: "jwt",
    },
});
