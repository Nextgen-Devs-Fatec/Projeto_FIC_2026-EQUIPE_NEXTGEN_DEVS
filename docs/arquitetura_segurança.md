### Pilares de Segurança

- **HTTPS / SSL:** Criptografia em trânsito ponta a ponta.
- **Bcrypt:** Criptografia unidirecional *(hash + salt)* para o armazenamento seguro de senhas.
- **JWT (JSON Web Token):** Autenticação *stateless* e segura para consumo do Front-end.
- **Variáveis de Ambiente (.env):** Segredos (chaves de assinatura JWT e credenciais de banco) gerenciados isoladamente no ambiente de hospedagem (*Vercel/Render*), nunca gravados no código fonte.
