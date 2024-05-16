// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let cookie = request.cookies.get('token');
  console.log(cookie);

  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/*',
};
