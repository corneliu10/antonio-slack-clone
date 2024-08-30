import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';

interface SignUpCardProps {
  // eslint-disable-next-line no-unused-vars
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const handlePasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Password do not match');
      return;
    }

    setPending(true);
    signIn('password', { name, email, password, flow: 'signUp' })
      .catch(() => {
        setError('Something went wrong.');
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleProviderSignUp = (value: 'github' | 'google') => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form
          onSubmit={handlePasswordSignUp}
          className="space-y-2.5"
        >
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            required
          />
          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="w-full"
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => handleProviderSignUp('google')}
            variant="outline"
            size="lg"
            disabled={pending}
            className="relative w-full"
          >
            <FcGoogle className="absolute left-2.5 top-3 size-5" />
            Continue with Google
          </Button>
          <Button
            onClick={() => handleProviderSignUp('github')}
            variant="outline"
            size="lg"
            disabled={pending}
            className="relative w-full"
          >
            <FaGithub className="absolute left-2.5 top-3 size-5" />
            Continue with GitHub
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{' '}
          <span
            onClick={() => setState('signIn')}
            className="cursor-pointer text-sky-700 hover:underline"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
