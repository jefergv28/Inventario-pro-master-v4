// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         try {
//           const res = await fetch("http://NEXT_PUBLIC_API_URL/auth/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               email: credentials.email,
//               password: credentials.password,
//             }),
//           });

//           const user = await res.json();
//           console.log("Usuario recibido desde backend:", user);

//           if (res.ok && user) {
//             return {
//               id: user.id,
//               name: user.nombre,
//               email: user.correo,
//               role: user.rol,
//               accessToken: user.token ?? "",
//             };
//           }

//           return null;
//         } catch (error) {
//           console.error("Error en la autenticación:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name ?? "";
//         token.email = user.email;
//         token.role = user.role;
//         token.accessToken = user.accessToken ?? "";
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           id: token.id,
//           name: token.name ?? "", // 👈 importante
//           email: token.email,
//           role: token.role,
//           accessToken: token.accessToken,
//         },
//       };
//     },
//     // Aquí agregas el callback de redirección
//     async redirect({ url, baseUrl }) {
//       // Si la URL es la de login, redirige al dashboard
//       if (url === baseUrl || url === "/") {
//         return `${baseUrl}/dashboard`;  // Cambia "/dashboard" a la ruta de tu dashboard
//       }
//       return url;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
