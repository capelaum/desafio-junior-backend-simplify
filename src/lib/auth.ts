import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GithubProvider, { type GithubProfile } from 'next-auth/providers/github'

import { db } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        return {
          ...session,
          user
        }
      }

      return session
    }
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',

      profile(profile: GithubProfile) {
        return {
          id: String(profile.id),
          name: profile.name,
          email: profile.email,
          avatar_url: profile.avatar_url
        }
      }
    })
  ]
}

export const getAuthSession = () => getServerSession(authOptions)
