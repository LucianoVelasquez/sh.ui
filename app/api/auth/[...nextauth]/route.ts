import NextAuht from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../../lib/prisma';


export const authOptions = {
  providers:[
  CredentialsProvider({
    name: "Credentials",
    credentials:{
      email: {label: "Email", type: "text", placeholder: "jsmith" },
      password: { label:"Password", type: "password"}
    },

    async authorize(credentials:any, req:any){
      
      const foundUser = await prisma.user.findUnique({where: {email: credentials!.email}})
      
      if(foundUser == null) throw new Error("Email incorrecto");

      if(foundUser.password != credentials?.password) throw new Error("Password incorrecta");
      
      return foundUser;
    }
  })
  ],

  pages:{
    signIn: "/auth/login"
  }
}

const handler = NextAuht(authOptions);

export { handler as GET ,handler as POST }; 

