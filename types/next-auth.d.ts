import { DefaultSession } from "~/types/next-auth"
declare module "~/types/next-auth" {
    interface Session {
        // New access token field we added to the session
        token: string
        // user: DefaultSession["user"]
        // user: {
        //     fullName: string,
        //     firstName: string,
        //     lastName: string,
        //     email: string,
        //     id: number,
        //     image: string
        // }
        user: {
            /** The user's postal address. */
            fullName: string
        } & DefaultSession["user"]
    }


}







