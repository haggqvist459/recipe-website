import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Heading } from "@/components";
import { useAuth } from '@/contexts'
import { ROUTES } from "@/utils";

const AuthPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, handleSignIn } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await handleSignIn(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
        // future error handling will be done in AuthContext.tsx
      }
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return <Navigate to={ROUTES.PROFILE} replace />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <div className="border rounded border-neutral-800 bg-white shadow-sm flex flex-col gap-3 p-5 items-center">
        <Heading title="Sign In" />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          className="input-text"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          className="input-text"
        />
        <button type="submit" disabled={loading} className="primary-button">
          {loading ? "Authenticating..." : "Authenticate"}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm">{error.message}</div>}
    </form>
  );
};

export default AuthPage;