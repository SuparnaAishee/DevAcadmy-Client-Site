// import axios from "axios";
// import type { AuthResponse, LoginData, RegisterData } from "../Types/authTypes";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export const authService = {
//   async login(credentials: LoginData): Promise<AuthResponse> {
//     try {
//       const response = await axios.post<AuthResponse>(
//         `${API_URL}/auth/login`,
//         credentials
//       );
//       return response.data;
//     } catch (error:any) {
//       console.error("Login error:", error.response?.data || error.message);
//       throw error;
//     }
//   },

//   async register(data: RegisterData): Promise<AuthResponse> {
//     try {
//       const response = await axios.post<AuthResponse>(
//         `${API_URL}/auth/signup`,
//         data
//       );
//       return response.data;
//     } catch (error:any) {
//       console.error(
//         "Registration error:",
//         error.response?.data || error.message
//       );
//       throw error;
//     }
//   },

//   logout(): void {
//     localStorage.removeItem("accessToken");
//   },

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem("accessToken");
//   },
// };
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import type { AuthResponse, LoginData, RegisterData } from "../Types/authTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const authService = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        credentials
      );

      if (response.data?.token) {
        // Store token in cookies
        Cookies.set("accessToken", response.data.token, {
          expires: 7,
          secure: true,
        });

        // Decode the token and store user info
        const decodedToken = jwtDecode(response.data.token);
        localStorage.setItem("userRole", decodedToken.role); // Assuming the token contains the user's role
        localStorage.setItem("userEmail", decodedToken.email); // Assuming the token contains the user's email
      }

      return response.data;
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  },

  logout(): void {
    // Remove token from cookies
    Cookies.remove("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
  },

  isLoggedIn(): boolean {
    // Check if accessToken exists in cookies
    return !!Cookies.get("accessToken");
  },

  getUserRole(): string | null {
    return localStorage.getItem("userRole");
  },

  getUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  },

  decodeToken(): any {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        return jwtDecode(token); // Decode and return the token data
      } catch (error) {
        console.error("Token decoding error:", error);
        return null;
      }
    }
    return null;
  },

  async fetchAndStoreUserRole(email: string): Promise<void> {
    try {
      const response = await axios.get(`${API_URL}/users/${email}`);
      if (!response.data || !response.data.role) {
        throw new Error("Invalid user data");
      }
      localStorage.setItem("userRole", response.data.role);
    } catch (error) {
      console.error("Failed to fetch user role:", error);
    }
  },
  
};
