import { redirect } from '@remix-run/node';

const loader = () => {
  return redirect('https://be.contentful.com/login');
};

export { loader };
