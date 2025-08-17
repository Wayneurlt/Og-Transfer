export type OgUser = {
  id: number;
  username: string;
  email: string;
  is_premium?: boolean;
  package_id?: number | null;
  is_enabled?: boolean;
  is_admin?: boolean;
  created_at?: string;
  last_login?: string | null;
};

type LoginResponse = {
  access_token: string;
  refresh_token?: string;
  user: OgUser;
};

type RegisterBody = { username: string; email: string; password: string };
type LoginBody = { email: string; password: string };

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "" as string,
    refreshToken: "" as string,
    currentUser: null as OgUser | null,
    loading: false as boolean,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.accessToken && state.currentUser),
  },
  actions: {
    setSession(payload: LoginResponse) {
      this.accessToken = payload.access_token;
      this.refreshToken = payload.refresh_token || "";
      this.currentUser = payload.user;
      if (process.client) {
        localStorage.setItem("ogtoken", this.accessToken);
      }
    },
    clearSession() {
      this.accessToken = "";
      this.refreshToken = "";
      this.currentUser = null;
      if (process.client) {
        localStorage.removeItem("ogtoken");
      }
    },
    async register(body: RegisterBody) {
      const config = useRuntimeConfig();
      this.loading = true;
      try {
        const res = await $fetch<OgUser>(`${config.public.apiBase}/register`, {
          method: "POST",
          body,
        });
        return res;
      } finally {
        this.loading = false;
      }
    },
    async login(body: LoginBody) {
      const config = useRuntimeConfig();
      this.loading = true;
      try {
        const res = await $fetch<LoginResponse>(`${config.public.apiBase}/login`, {
          method: "POST",
          body,
        });
        this.setSession(res);
        return res;
      } finally {
        this.loading = false;
      }
    },
    async whoami() {
      const config = useRuntimeConfig();
      if (!this.accessToken && process.client) {
        const t = localStorage.getItem("ogtoken");
        if (t) this.accessToken = t;
      }
      if (!this.accessToken) return null;
      const user = await $fetch<OgUser>(`${config.public.apiBase}/whoami`, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      this.currentUser = user;
      return user;
    },
    async editUser(body: { username?: string; newPassword?: string; currentPassword?: string; mfa_enabled?: boolean }) {
      const config = useRuntimeConfig();
      const user = await $fetch<OgUser>(`${config.public.apiBase}/edit_user`, {
        method: "PUT",
        body,
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      this.currentUser = user;
      return user;
    },
    async listPackages() {
      const config = useRuntimeConfig();
      return await $fetch(`${config.public.apiBase}/packages`, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    },
    async createPayment(amount: number) {
      const config = useRuntimeConfig();
      return await $fetch(`${config.public.apiBase}/payments`, {
        method: "POST",
        body: { amount, status: "success" },
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    },
    async createUpload(payload: { title: string; type: string; size: number; link: string }) {
      const config = useRuntimeConfig();
      return await $fetch<{ msg: string; upload_id: number; upload_url: string }>(`${config.public.apiBase}/uploads`, {
        method: "POST",
        body: payload,
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    },
    async listUploads() {
      const config = useRuntimeConfig();
      return await $fetch(`${config.public.apiBase}/uploads`, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    },
  },
});
