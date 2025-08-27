
export function getUsers(hashPassword) {
  return new Map([
      ['admin', {
        username: 'admin',
        password: hashPassword('admin123'),
        role: 'admin'
      }],
      ['user', {
        username: 'user',
        password: hashPassword('user123'),
        role: 'user'
      }]
    ]);
  }