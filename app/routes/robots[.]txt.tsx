function loader() {
  const body = 'User-Agent: *\nAllow: /\n';

  return new Response(body);
}

export { loader };
