export default defineNuxtPlugin(async () => {
  if (!process.client) return;
  const { useAuthStore } = await import('~/stores/user');
  const auth = useAuthStore();
  try {
    await auth.whoami();
  } catch (_) {}
});


