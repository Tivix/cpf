import { login, signup } from '@app/actions/user';
import { Button } from '@app/components/common/Button';

export default function LoginPage() {
  return (
    <form>
      <div className="flex w-80 flex-1 flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-x-2">
            <label htmlFor="email">Email:</label>
            <input
              data-testid="input-email"
              className="w-full overflow-hidden rounded-lg border border-navy-200 px-2 py-1"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col gap-x-2">
            <label htmlFor="password">Password:</label>
            <input
              data-testid="input-password"
              className="w-full overflow-hidden rounded-lg border border-navy-200 px-2 py-1"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-y-2">
          <Button type="submit" formAction={login} data-testid="button-log-in">
            Log in
          </Button>
          <Button type="submit" formAction={signup} data-testid="button-sign-up">
            Sign up
          </Button>
        </div>
      </div>
    </form>
  );
}
