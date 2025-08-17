export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = new Set([
    '/',
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/forgot-password',
  ]);
  if (publicRoutes.has(to.path)) return;
  const { useAuthStore } = await import('~/stores/user');
  const auth = useAuthStore();
  if (!auth.currentUser) {
    try {
      await auth.whoami();
    } catch (_) {}
  }
  if (!auth.currentUser) {
    return navigateTo('/auth/sign-in');
  }
});


