import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { UsuarioService } from "../../../app/modules/admin/services/usuario.service";


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks:{
    signIn: async ({user}) => {
      const service = new UsuarioService();
      const users = await service.getAll({
        query: `email:'${user.email}'`
      })
      console.log("usuarios",users);
      
      return users && users.length === 1 && users[0].email === user.email;
    },
    redirect:async ({baseUrl,url}) => {
      return '/admin'
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login'
  }
}

export default NextAuth(authOptions)