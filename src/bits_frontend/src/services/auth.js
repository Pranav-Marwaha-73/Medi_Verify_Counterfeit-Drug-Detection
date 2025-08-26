import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

class AuthService {
  constructor() {
    this.authClient = null;
    this.identity = null;
    this.principal = null;
    this.isAuthenticated = false;
  }

  async init() {
    this.authClient = await AuthClient.create();
    this.isAuthenticated = await this.authClient.isAuthenticated();
    
    if (this.isAuthenticated) {
      this.identity = this.authClient.getIdentity();
      this.principal = this.identity.getPrincipal();
    }
    
    return this.isAuthenticated;
  }

  async login() {
    if (!this.authClient) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      this.authClient.login({
        identityProvider: 'https://identity.ic0.app/#authorize',
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days
        onSuccess: async () => {
          this.isAuthenticated = true;
          this.identity = this.authClient.getIdentity();
          this.principal = this.identity.getPrincipal();
          resolve(true);
        },
        onError: (error) => {
          console.error('Login failed:', error);
          reject(error);
        }
      });
    });
  }

  async logout() {
    if (this.authClient) {
      await this.authClient.logout();
      this.isAuthenticated = false;
      this.identity = null;
      this.principal = null;
    }
  }

  getPrincipal() {
    return this.principal;
  }

  getPrincipalText() {
    return this.principal ? this.principal.toString() : null;
  }

  getIdentity() {
    return this.identity;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  getUserId() {
    if (this.principal) {
      const principalText = this.principal.toString();
      // Return first 8 characters for display
      return principalText.substring(0, 8) + '...';
    }
    return 'Anonymous';
  }

  getFullUserId() {
    return this.principal ? this.principal.toString() : 'anonymous';
  }
}

export const authService = new AuthService();