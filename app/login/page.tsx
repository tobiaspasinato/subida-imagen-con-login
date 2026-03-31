'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        loginMutation.mutate({email, password});
        router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#2d1b4e] via-[#3d2d6b] to-[#1e3c72]">
      <div className="bg-white/10 backdrop-blur-[10px] rounded-3xl p-10 w-11/12 max-w-sm shadow-2xl border border-white/10">
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-400 text-xs text-center mb-6">
              {error}
            </p>
          )}

          <div className="mb-6">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3.5 text-sm bg-transparent border-b-2 border-white/30 text-white placeholder-white/50 focus:border-white/60 outline-none transition-colors"
            />
          </div>

          <div className="mb-8">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 text-sm bg-transparent border-b-2 border-white/30 text-white placeholder-white/50 focus:border-white/60 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 font-semibold tracking-widest rounded-lg text-white transition-all duration-200 ${
              loading
                ? 'bg-purple-600/50 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-[#6b3dd6] to-[#3b82f6] hover:shadow-lg hover:shadow-purple-500/60 hover:-translate-y-0.5 cursor-pointer'
            } shadow-lg shadow-purple-500/40`}
          >
            {loading ? 'CARGANDO...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
