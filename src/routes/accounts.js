// right after verifing password and saving user to the session
// Inside your POST /login handler after authentication succeeds:
if (user.role === 'admin' || user.isAdmin) { // Match whichever field your User model uses
  return res.redirect('/admin/dashboard'); // Match your team's existing admin dashboard URL
}

return res.redirect('/dashboard');